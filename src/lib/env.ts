import 'server-only';

export type ServerEnv = {
  apiBaseUrl: string;
  sessionSecret: string | undefined;
};

/**
 * Validates server-only configuration at the point of use.
 *
 * Do not import this module from a Client Component. The `server-only` marker
 * makes that mistake fail at build time.
 */
export function getServerEnv(): ServerEnv {
  const apiBaseUrl = process.env.API_BASE_URL?.trim();

  if (!apiBaseUrl) {
    throw new Error(
      'API_BASE_URL is required for server-side API calls. Copy .env.example to .env.local.',
    );
  }

  const sessionSecret = process.env.SESSION_SECRET?.trim();

  if (sessionSecret?.startsWith('replace-with')) {
    throw new Error(
      'SESSION_SECRET still has the placeholder value. Set a long random value in .env.local.',
    );
  }

  return { apiBaseUrl, sessionSecret };
}
