import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';

import { getPolyExamPublicAPIMock } from '@/lib/api/generated.msw';

type Operation = {
  paths: Record<string, Record<string, unknown>>;
};

const methods = new Set([
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'head',
  'options',
  'trace',
]);

describe('MSW handlers', () => {
  const contract = parse(
    readFileSync(
      resolve(process.cwd(), 'contracts/public.openapi.yaml'),
      'utf8',
    ),
  ) as Operation;

  const operationCount = Object.values(contract.paths).reduce(
    (total, path) =>
      total + Object.keys(path).filter((method) => methods.has(method)).length,
    0,
  );

  it('covers every operation in the public contract', () => {
    expect(getPolyExamPublicAPIMock()).toHaveLength(operationCount);
  });

  it('serves the generated health response', async () => {
    const response = await fetch('http://localhost/v1/health');
    const body = (await response.json()) as { status: string; service: string };

    expect(response.status).toBe(200);
    expect(body.status).toBe('ok');
    expect(body.service).toEqual(expect.any(String));
  });
});
