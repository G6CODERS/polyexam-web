# Architecture

```text
Browser
  │ same-origin
  ▼
Next.js 16 (this public repo)
  ├─ RSC / Server Actions ──► private Laravel API
  ├─ BFF session cookie
  ├─ public catalog cache (Cache Components, public data only)
  └─ MSW mocks for contributors
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

## Auth

1. Browser submits credentials to a Next.js route handler.
2. Next.js calls the Laravel token endpoint.
3. Laravel returns a Sanctum token + user/entitlements.
4. Next.js stores the token in an encrypted, HttpOnly cookie.
5. RSC/Server Actions call Laravel with a Bearer token.
6. The browser never sees the token.

Product auth is not implemented in the scaffold. Do not use `localStorage` for
tokens.

## Caching

- Cache only public catalog data.
- Never put authenticated/user-specific data in a shared server cache.
- Use request-time rendering or private caching for session-derived data.
- `proxy.ts` is for optimistic redirects only; authorization stays close to the
  data source.

## Secrets

Assume every line of this repository is public. Never commit:

- Laravel app keys, Sanctum tokens, payment keys, database credentials.
- Student data, paid PDFs, private screenshots.
- `.env` files.

`NEXT_PUBLIC_*` values are public by definition.
