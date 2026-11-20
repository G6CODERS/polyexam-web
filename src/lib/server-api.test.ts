import { http, HttpResponse } from 'msw';
import { describe, expect, it, vi } from 'vitest';

vi.mock('server-only', () => ({}));
vi.mock('@/lib/env', () => ({
  getServerEnv: () => ({
    apiBaseUrl: 'http://localhost:8000/api',
    sessionSecret: undefined,
  }),
}));

import { server } from '@/mocks/server';

import { serverFetch } from './server-api';

describe('serverFetch', () => {
  it('joins the base URL and sends the JSON accept header', async () => {
    let accept: string | null = null;

    server.use(
      http.get('http://localhost:8000/api/v1/health', ({ request }) => {
        accept = request.headers.get('accept');
        return HttpResponse.json({ status: 'ok' });
      }),
    );

    const response = await serverFetch('/v1/health');

    expect(response.status).toBe(200);
    expect(accept).toBe('application/json');
    await expect(response.json()).resolves.toEqual({ status: 'ok' });
  });
});
