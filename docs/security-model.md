# Security model

Assume every line of this repository is public. The backend, admin, payments,
and content are private.

## Secrets

Never commit or read into an agent context:

- `.env`, `.env.local`, `.env.*`
- Laravel app keys, Sanctum tokens, payment keys, database credentials
- private keys, certificates, session secrets
- real student data, paid PDFs, private screenshots

`NEXT_PUBLIC_*` values are public by definition. Do not put secrets there.

## Auth and session

Target flow:

1. Browser submits credentials to a Next.js Route Handler.
2. Next.js calls Laravel.
3. Laravel returns a Sanctum token + user/entitlements.
4. Next.js stores the token in an encrypted, HttpOnly, Secure, SameSite cookie.
5. Server Components/Actions call Laravel with a Bearer token.
6. The browser never sees the token.

Rules:

- No tokens in `localStorage` or `sessionStorage`.
- No tokens in Client Component props or client state.
- CSRF protection for cookie-authenticated mutations.
- `proxy.ts` is for optimistic redirects only; authorize at the data source.

## Caching

- Cache public catalog data only.
- Never put authenticated or user-specific data in a shared server cache.
- Use request-time rendering or `"use cache: private"` for session-derived data.
- Revalidate public data after mutations with the appropriate tag.

## Data and content

- Fixtures and examples are synthetic.
- No real student data, paid PDFs, or private screenshots in issues/PRs.
- Do not add admin/internal endpoints to the public contract.
- Do not expose backend error details to users.

## Dependencies

- No new runtime dependency without an issue/ADR and bundle/security review.
- Keep `npm audit` clean at high severity.
- Prefer platform APIs and existing dependencies.

## Agents

- Follow `AGENTS.md`.
- Do not read `.env` files, even to debug.
- Do not run destructive git commands or force-push.
- Use `npm run doctor` and `npm run verify` for diagnosis.
- Local hooks and `opencode.jsonc` enforce the common cases; CI and branch
  protection are the hard gate.
- Report vulnerabilities privately via the organization policy.

See `architecture.md`, `api-client.md`, and `SECURITY.md`.
