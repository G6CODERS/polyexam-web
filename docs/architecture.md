# Architecture

## Current vs target

This is a scaffold. The app shell, contract, generated client, and collaboration
rails exist. Auth, catalog, payments, and product screens are targets. See
[status.md](status.md) before assuming a feature exists.

```text
Browser
  │ same-origin
  ▼
Next.js 16 (this public repo)
  ├─ RSC / Server Actions ──► private Laravel API
  ├─ BFF route handlers ─────► private Laravel API
  ├─ public catalog cache (Cache Components)
  └─ MSW mocks for local development and tests
                                      │
                                      ▼
                            Laravel 13 API (private)
                              ├─ Sanctum tokens
                              ├─ Filament admin at /admin
                              ├─ PostgreSQL
                              ├─ Redis/Valkey
                              └─ private object storage
```

## Boundaries

- **This repo:** student UI, design system, BFF/session boundary, SEO,
  accessibility, generated client, MSW mocks.
- **Private backend:** domain model, authorization, entitlements, payments,
  documents, admin, webhooks, queues.
- **Filament:** the only admin UI.

## Request lifecycle

| Need                            | Pattern                            | Notes                                             |
| ------------------------------- | ---------------------------------- | ------------------------------------------------- |
| Read public catalog data        | Server Component                   | Use the server API client; cache public data only |
| Mutate data                     | Server Action                      | Validate on the server; no client secrets         |
| Browser-initiated BFF operation | Route Handler under `src/app/api/` | Owns cookies/session and proxies Laravel          |
| Webhook                         | Route Handler                      | Verify signatures; no public contract             |
| Optimistic redirect             | `proxy.ts`                         | Never the authorization boundary                  |

The browser uses same-origin relative URLs to the BFF. Server code uses
`API_BASE_URL` directly. Do not mix the two clients. See
[api-client.md](api-client.md).

## Auth (target)

1. Browser submits credentials to a Next.js Route Handler.
2. Next.js calls the Laravel token endpoint.
3. Laravel returns a Sanctum token + user/entitlements.
4. Next.js stores the token in an encrypted, HttpOnly cookie.
5. RSC/Server Actions call Laravel with a Bearer token.
6. The browser never sees the token.

Product auth is not implemented in the scaffold. Do not use `localStorage` for
tokens. Do not treat `proxy.ts` as authorization.

## Caching

- Cache only public catalog data.
- Never put authenticated/user-specific data in a shared server cache.
- Use request-time rendering or `"use cache: private"` for session-derived data.
- Revalidate public data after mutations with tags.
- `proxy.ts` is for optimistic redirects only; authorization stays close to the
  data source.

See [ADR 0005](adr/0005-caching-policy.md) and
`node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md`.

## Secrets

Assume every line of this repository is public. Never commit:

- Laravel app keys, Sanctum tokens, payment keys, database credentials.
- Student data, paid PDFs, private screenshots.
- `.env` files.

`NEXT_PUBLIC_*` values are public by definition. See
[security-model.md](security-model.md).
