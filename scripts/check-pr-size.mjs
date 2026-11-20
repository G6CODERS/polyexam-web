#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { appendFileSync } from 'node:fs';

const base = process.env.BASE_REF ?? 'origin/main';
const labels = (process.env.PR_LABELS ?? '')
  .split(',')
  .map((label) => label.trim())
  .filter(Boolean);

const MAX_CODE_LINES = 400;
const MAX_CODE_FILES = 20;

const ignored = (file) =>
  file === 'package-lock.json' ||
  file.startsWith('src/lib/api/generated') ||
  file.startsWith('src/lib/api/model/') ||
  file === 'public/mockServiceWorker.js';

const isDocumentation = (file) =>
  file.startsWith('docs/') ||
  file.startsWith('.github/ISSUE_TEMPLATE/') ||
  file.endsWith('.md');

let raw = '';
try {
  raw = execFileSync('git', ['diff', '--numstat', `${base}...HEAD`], {
    encoding: 'utf8',
  });
} catch {
  console.error(`Could not diff against ${base}. Fetch the base branch first.`);
  process.exit(1);
}

const rows = raw
  .trim()
  .split('\n')
  .filter(Boolean)
  .map((line) => {
    const [added, deleted, file] = line.split('\t');
    return {
      added: Number.parseInt(added, 10) || 0,
      deleted: Number.parseInt(deleted, 10) || 0,
      file,
    };
  });

const relevant = rows.filter(
  (row) => !ignored(row.file) && !isDocumentation(row.file),
);
const codeLines = relevant.reduce(
  (total, row) => total + row.added + row.deleted,
  0,
);
const codeFiles = relevant.length;
const docsLines = rows
  .filter((row) => isDocumentation(row.file))
  .reduce((total, row) => total + row.added + row.deleted, 0);

const summary = [
  '## PR size',
  '',
  `- Code lines changed: **${codeLines}** (limit ${MAX_CODE_LINES})`,
  `- Code files changed: **${codeFiles}** (limit ${MAX_CODE_FILES})`,
  `- Documentation lines changed: **${docsLines}**`,
  `- Documentation-only or mechanically generated changes are exempt.`,
].join('\n');

console.log(summary);

if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${summary}\n`);
}

const isLarge = codeLines > MAX_CODE_LINES || codeFiles > MAX_CODE_FILES;
const hasOverride = labels.includes('size:large');

if (isLarge && !hasOverride) {
  console.error(
    [
      '',
      'This PR is too large to review safely.',
      'Split it into smaller PRs, or add the `size:large` label with a written justification.',
    ].join('\n'),
  );
  process.exit(1);
}

if (isLarge && hasOverride) {
  console.log('\nLarge PR accepted because the `size:large` label is present.');
}

console.log('\npr-size passed.');
