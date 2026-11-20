#!/usr/bin/env node
import { execFileSync } from 'node:child_process';

function run(command, args) {
  return execFileSync(command, args, { encoding: 'utf8' }).trim();
}

const status = run('git', ['status', '--porcelain', '--', 'src/lib/api']);

if (status) {
  console.error(
    [
      'Generated API client is stale or was edited by hand.',
      '',
      status,
      '',
      'Run `npm run contract` from the repo root, review the diff, and commit',
      '`src/lib/api` with the contract change.',
    ].join('\n'),
  );
  process.exit(1);
}

console.log('Generated API client is up to date.');
