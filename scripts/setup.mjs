#!/usr/bin/env node
import { copyFileSync, existsSync } from 'node:fs';

if (existsSync('.env.local')) {
  console.log('.env.local already exists; leaving it untouched.');
} else {
  copyFileSync('.env.example', '.env.local');
  console.log('Created .env.local from .env.example.');
}

console.log('');
console.log('Next steps:');
console.log('  npm run dev      # start the app');
console.log(
  '  npm run verify   # format, docs, policy, lint, typecheck, test, build',
);
console.log('  npm run doctor   # check the local environment');
