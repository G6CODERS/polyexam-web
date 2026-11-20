# API client boundaries

The browser and the server use the API differently. Do not mix them.

## Browser

Browser code calls the generated client with same-origin relative URLs:

```ts
import { getHealth } from '@/lib/api/generated';

const response = await getHealth();
```

Those requests go to the Next.js BFF/route handlers, which own the Laravel
session and secrets. The browser never holds a Laravel token.

## Server Components and Server Actions

Server code calls Laravel directly through a server-only client with
`API_BASE_URL` and a Bearer token:

```ts
import 'server-only';
import { serverFetch } from '@/lib/api/server';

const response = await serverFetch('/v1/health');
```

Never import a server-only module into a Client Component.

## Rules

- `src/lib/api/generated.ts` is browser/BFF-oriented; it uses relative URLs.
- `src/lib/api/generated.msw.ts` and `generated.faker.ts` are test/dev only.
- Keep authorization close to the data source; `proxy.ts` is for optimistic
  redirects only.
- Cache public catalog data only. Never put authenticated data in a shared
  server cache.
- Map Laravel `Problem` responses to UI states; do not leak internal messages.

See `docs/contract.md`, `docs/security-model.md`, and `contracts/AGENTS.md`.
