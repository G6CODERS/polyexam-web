#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { parse } from 'yaml';

const trustedOwners = new Set([
  'anthropics',
  'microsoft',
  'openai',
  'vercel',
  'vercel-labs',
]);

const lock = JSON.parse(readFileSync('skills-lock.json', 'utf8'));
const skills = Object.entries(lock.skills ?? {});
const errors = [];

for (const [name, entry] of skills) {
  const owner = String(entry.source ?? '').split('/')[0];

  if (!trustedOwners.has(owner)) {
    errors.push(
      `${name}: untrusted source "${entry.source}" (owner "${owner}" is not allowlisted)`,
    );
  }

  if (entry.installMode !== 'copy') {
    errors.push(
      `${name}: expected installMode "copy", found "${entry.installMode}"`,
    );
  }

  const skillPath = resolve('.agents/skills', name, 'SKILL.md');
  if (!existsSync(skillPath)) {
    errors.push(`${name}: missing ${skillPath}`);
    continue;
  }

  const text = readFileSync(skillPath, 'utf8');
  const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatter) {
    errors.push(`${name}: missing YAML frontmatter`);
    continue;
  }

  let metadata;
  try {
    metadata = parse(frontmatter[1]);
  } catch (error) {
    errors.push(`${name}: invalid YAML frontmatter (${error.message})`);
    continue;
  }

  if (metadata?.name !== name) {
    errors.push(`${name}: frontmatter name is "${metadata?.name}"`);
  }

  if (
    typeof metadata?.description !== 'string' ||
    !metadata.description.trim()
  ) {
    errors.push(`${name}: missing description`);
  }
}

if (skills.length === 0) {
  errors.push('skills-lock.json contains no skills');
}

if (errors.length > 0) {
  console.error(
    ['check:skills failed:', ...errors.map((error) => `- ${error}`)].join('\n'),
  );
  process.exit(1);
}

console.log(
  `check:skills passed: ${skills.length} skills from trusted sources.`,
);
