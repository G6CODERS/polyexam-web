#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ignoredDirectories = new Set([
  '.agents',
  '.git',
  '.next',
  'coverage',
  'node_modules',
  'playwright-report',
  'test-results',
]);

const markdownFiles = [];

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (ignoredDirectories.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(path);
    } else if (entry.name.endsWith('.md')) {
      markdownFiles.push(path);
    }
  }
}

walk(root);

const packageJson = JSON.parse(
  readFileSync(join(root, 'package.json'), 'utf8'),
);
const scripts = new Set(Object.keys(packageJson.scripts ?? {}));
const brokenLinks = [];
const missingPaths = [];
const missingScripts = [];
let linkChecks = 0;
let pathChecks = 0;
let scriptChecks = 0;

for (const file of markdownFiles) {
  const text = readFileSync(file, 'utf8');

  for (const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].trim();
    if (/^(https?:|mailto:|#)/.test(target)) continue;

    const pathPart = target.split('#')[0];
    if (!pathPart) continue;

    linkChecks += 1;
    const resolved = resolve(dirname(file), decodeURIComponent(pathPart));
    if (!existsSync(resolved)) {
      brokenLinks.push({ file: relative(root, file), target });
    }
  }

  for (const match of text.matchAll(/npm run ([a-zA-Z0-9:_-]+)/g)) {
    scriptChecks += 1;
    if (!scripts.has(match[1])) {
      missingScripts.push({ file: relative(root, file), script: match[1] });
    }
  }

  for (const match of text.matchAll(
    /`((?:src|docs|contracts|e2e|scripts|public|\.github|\.githooks|\.claude|\.agents|node_modules)\/[^`\s]+|(?:AGENTS|README|CONTRIBUTING|CLAUDE)\.md|package\.json|opencode\.jsonc|\.mcp\.json|\.aider\.conf\.yml)`/g,
  )) {
    const candidate = match[1].replace(/[.,;:]+$/, '');
    if (
      candidate.includes('<') ||
      candidate.includes('*') ||
      candidate.includes('...')
    ) {
      continue;
    }

    pathChecks += 1;
    if (!existsSync(resolve(root, candidate))) {
      missingPaths.push({ file: relative(root, file), path: candidate });
    }
  }
}

const agentsPath = join(root, 'AGENTS.md');
const agents = readFileSync(agentsPath, 'utf8');
const agentsLines = agents.split('\n').length;
const errors = [];

for (const link of brokenLinks) {
  errors.push(`${link.file}: broken internal link -> ${link.target}`);
}

for (const missing of missingPaths) {
  errors.push(`${missing.file}: missing referenced path -> ${missing.path}`);
}

for (const missing of missingScripts) {
  errors.push(`${missing.file}: unknown npm script -> ${missing.script}`);
}

if (!existsSync(join(root, 'docs/index.md'))) {
  errors.push(
    'docs/index.md is missing; it is the canonical documentation index.',
  );
}

if (agentsLines > 200) {
  errors.push(
    `AGENTS.md is ${agentsLines} lines; keep it at or below 200 lines.`,
  );
}

if (
  !agents.includes('BEGIN:nextjs-agent-rules') ||
  !agents.includes('END:nextjs-agent-rules')
) {
  errors.push('AGENTS.md is missing the managed Next.js agent-rules block.');
}

if (errors.length > 0) {
  console.error(
    ['docs:check failed:', ...errors.map((error) => `- ${error}`)].join('\n'),
  );
  process.exit(1);
}

console.log(
  [
    'docs:check passed.',
    `- ${markdownFiles.length} Markdown files`,
    `- ${linkChecks} internal links, ${pathChecks} backticked paths, ${scriptChecks} npm script references`,
    `- AGENTS.md: ${agentsLines} lines`,
  ].join('\n'),
);
