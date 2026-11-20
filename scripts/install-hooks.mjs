#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { chmodSync, existsSync } from 'node:fs';

try {
  execFileSync('git', ['rev-parse', '--is-inside-work-tree'], {
    stdio: 'ignore',
  });
} catch {
  console.log('Not a git worktree; skipping hook installation.');
  process.exit(0);
}

try {
  execFileSync('git', ['config', 'core.hooksPath', '.githooks'], {
    stdio: 'inherit',
  });

  for (const hook of ['.githooks/pre-commit', '.githooks/pre-push']) {
    if (existsSync(hook)) chmodSync(hook, 0o755);
  }

  console.log('Git hooks installed from .githooks.');
} catch (error) {
  console.warn(
    'Could not install git hooks. Run `npm run hooks:install` manually.',
    error,
  );
}
