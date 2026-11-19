import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';

type OpenApiDocument = {
  openapi: string;
  paths: Record<string, unknown>;
  components?: { schemas?: Record<string, unknown> };
};

describe('public OpenAPI contract', () => {
  const contractPath = resolve(process.cwd(), 'contracts/public.openapi.yaml');
  const contract = parse(readFileSync(contractPath, 'utf8')) as OpenApiDocument;

  it('is OpenAPI 3.1', () => {
    expect(contract.openapi).toMatch(/^3\.1\./);
  });

  it('exposes the API health endpoint', () => {
    expect(contract.paths).toHaveProperty('/v1/health');
  });

  it('defines the health and problem schemas', () => {
    expect(contract.components?.schemas).toHaveProperty('Health');
    expect(contract.components?.schemas).toHaveProperty('Problem');
  });
});
