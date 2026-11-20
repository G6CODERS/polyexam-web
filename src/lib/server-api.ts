import 'server-only';

import { getServerEnv } from '@/lib/env';

/**
 * Server-only API client for Server Components and Server Actions.
 *
 * The generated client in `src/lib/api/generated.ts` is browser/BFF-oriented
 * and uses relative URLs. Do not use this helper in Client Components.
 */
export async function serverFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const { apiBaseUrl } = getServerEnv();
  const base = apiBaseUrl.endsWith('/') ? apiBaseUrl : `${apiBaseUrl}/`;
  const url = new URL(path.replace(/^\//, ''), base);

  return fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...init.headers,
    },
  });
}
