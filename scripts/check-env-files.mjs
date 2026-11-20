#!/usr/bin/env node
import { execFileSync } from 'node:child_process';

const files = execFileSync('git', ['ls-files'], { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter(Boolean);

const disallowed = files.filter((file) => {
  const basename = file.split('/').pop() ?? file;
  if (basename === '.env.example') return false;
  return (
    basename === '.env' ||
    basename.startsWith('.env.') ||
    basename === '.envrc' ||
    basename.startsWith('.env-')
  );
});

if (disallowed.length > 0) {
  console.error(
    [
      'Disallowed env files are tracked:',
      ...disallowed.map((file) => `  ${file}`),
    ].join('\n'),
  );
  process.exit(1);
}

console.log('No disallowed env files are tracked.');
