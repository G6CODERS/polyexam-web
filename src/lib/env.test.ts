import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('server-only', () => ({}));

import { getServerEnv } from './env';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('getServerEnv', () => {
  it('requires API_BASE_URL', () => {
    vi.stubEnv('API_BASE_URL', '');

    expect(() => getServerEnv()).toThrow(/API_BASE_URL/);
  });

  it('rejects the placeholder session secret', () => {
    vi.stubEnv('API_BASE_URL', 'http://localhost:8000/api');
    vi.stubEnv('SESSION_SECRET', 'replace-with-a-long-random-value');

    expect(() => getServerEnv()).toThrow(/SESSION_SECRET/);
  });

  it('returns validated server values', () => {
    vi.stubEnv('API_BASE_URL', 'http://localhost:8000/api');
    vi.stubEnv('SESSION_SECRET', 'test-session-secret');

    expect(getServerEnv()).toEqual({
      apiBaseUrl: 'http://localhost:8000/api',
      sessionSecret: 'test-session-secret',
    });
  });
});
