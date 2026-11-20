import { execFileSync } from 'node:child_process';
import {
  appendFileSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

const root = process.cwd();

function run(script: string, env: Record<string, string> = {}) {
  return execFileSync(process.execPath, [resolve(root, script)], {
    cwd: root,
    encoding: 'utf8',
    env: { ...process.env, ...env },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

function git(directory: string, args: string[]) {
  return execFileSync('git', args, {
    cwd: directory,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

describe('guardrail scripts', () => {
  it('accepts a Conventional Commit title', () => {
    expect(
      run('scripts/check-pr-title.mjs', {
        PR_TITLE: 'feat(catalog): add exam papers',
      }),
    ).toContain('pr-title passed');
  });

  it('rejects a non-conventional title', () => {
    expect(() =>
      run('scripts/check-pr-title.mjs', { PR_TITLE: 'Add exam papers' }),
    ).toThrow();
  });

  it('passes the documentation check', () => {
    expect(run('scripts/check-docs.mjs')).toContain('docs:check passed');
  });

  it('matches the MSW worker to the installed package', () => {
    expect(run('scripts/check-msw-worker.mjs')).toContain('MSW worker matches');
  });

  it('confirms no env files are tracked', () => {
    expect(run('scripts/check-env-files.mjs')).toContain(
      'No disallowed env files',
    );
  });

  it('blocks an env file in pre-commit', () => {
    const directory = mkdtempSync(join(tmpdir(), 'polyexam-env-'));

    try {
      git(directory, ['init']);
      writeFileSync(join(directory, '.envrc'), 'SECRET=1');
      git(directory, ['add', '.envrc']);

      expect(() =>
        execFileSync(
          process.execPath,
          [resolve(root, 'scripts/precommit.mjs')],
          {
            cwd: directory,
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'pipe'],
          },
        ),
      ).toThrow();
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it('requires a justification for a large PR', () => {
    const directory = mkdtempSync(join(tmpdir(), 'polyexam-size-'));

    try {
      git(directory, ['init']);
      git(directory, ['config', 'user.email', 'test@example.com']);
      git(directory, ['config', 'user.name', 'Test']);
      writeFileSync(join(directory, 'app.ts'), 'export {};\n');
      git(directory, ['add', 'app.ts']);
      git(directory, ['commit', '-m', 'initial']);
      const base = git(directory, ['rev-parse', 'HEAD']).trim();

      for (let index = 0; index < 500; index += 1) {
        appendFileSync(join(directory, 'app.ts'), `// line ${index}\n`);
      }
      git(directory, ['add', 'app.ts']);
      git(directory, ['commit', '-m', 'large change']);

      const script = resolve(root, 'scripts/check-pr-size.mjs');
      const runSize = (body: string) =>
        execFileSync(process.execPath, [script], {
          cwd: directory,
          encoding: 'utf8',
          env: {
            ...process.env,
            BASE_REF: base,
            PR_LABELS: 'size:large',
            PR_BODY: body,
          },
          stdio: ['ignore', 'pipe', 'pipe'],
        });

      expect(() => runSize('No justification.')).toThrow();
      expect(() =>
        runSize(
          '## Size justification\n\n<!-- Required only if over the limit. Explain why the change cannot be split. -->\n',
        ),
      ).toThrow();
      expect(
        runSize(
          '## Size justification\n\nThis is a one-time generated migration that cannot be split safely.\n',
        ),
      ).toContain('pr-size passed');
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it('blocks generated files without the contract', () => {
    const directory = mkdtempSync(join(tmpdir(), 'polyexam-generated-'));

    try {
      git(directory, ['init']);
      const generated = join(directory, 'src/lib/api');
      mkdirSync(generated, { recursive: true });
      writeFileSync(join(generated, 'generated.ts'), 'export {};');
      git(directory, ['add', 'src/lib/api/generated.ts']);

      expect(() =>
        execFileSync(
          process.execPath,
          [resolve(root, 'scripts/precommit.mjs')],
          {
            cwd: directory,
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'pipe'],
          },
        ),
      ).toThrow();
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});
