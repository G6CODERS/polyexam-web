#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const checks = [];

function check(name, fn) {
  try {
    checks.push({ name, ok: true, detail: fn() });
  } catch (error) {
    checks.push({
      name,
      ok: false,
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}

check('Node.js 24+', () => {
  const major = Number(process.versions.node.split('.')[0]);
  if (major < 24) {
    throw new Error(`found ${process.version}; run \`nvm use\` (see .nvmrc)`);
  }
  return process.version;
});

check('npm 12+', () => {
  const version = execFileSync('npm', ['--version'], {
    encoding: 'utf8',
  }).trim();
  const major = Number(version.split('.')[0]);
  if (major < 12) {
    throw new Error(`found ${version}; package.json expects npm 12`);
  }
  return version;
});

check('.env.local', () => {
  if (!existsSync('.env.local')) {
    throw new Error('missing; run `npm run setup`');
  }
  return 'present';
});

check('MSW worker', () => {
  if (!existsSync('public/mockServiceWorker.js')) {
    throw new Error('missing; run `npx msw init public/ --save`');
  }
  return 'present';
});

check('generated API client', () => {
  const status = execFileSync(
    'git',
    ['status', '--porcelain', '--', 'src/lib/api'],
    { encoding: 'utf8' },
  ).trim();
  if (status) {
    throw new Error(
      'src/lib/api has uncommitted changes; run `npm run contract`',
    );
  }
  return 'clean';
});

check('Playwright browsers', () => {
  const home = process.env.HOME ?? process.env.USERPROFILE ?? '';
  const candidates = [
    `${home}/.cache/ms-playwright`,
    `${home}/Library/Caches/ms-playwright`,
  ];
  if (!candidates.some((path) => existsSync(path))) {
    throw new Error('not found; run `npm run e2e:install`');
  }
  return 'present';
});

for (const item of checks) {
  console.log(`${item.ok ? 'ok' : '!!'} ${item.name}: ${item.detail}`);
}

if (checks.some((item) => !item.ok)) {
  process.exit(1);
}
