#!/usr/bin/env node
const title = process.env.PR_TITLE ?? '';

const conventional =
  /^(build|chore|ci|contract|docs|feat|fix|perf|refactor|revert|style|test)(\([a-z0-9._-]+\))?!?: \S/;

if (!conventional.test(title)) {
  console.error(
    [
      `Invalid PR title: "${title}"`,
      '',
      'Use Conventional Commits, for example:',
      '  feat(catalog): add exam paper detail page',
      '  fix(auth): expire stale session cookies',
      '  contract: add paper download operation',
      '  docs(agents): document the verification workflow',
    ].join('\n'),
  );
  process.exit(1);
}

console.log(`pr-title passed: ${title}`);
