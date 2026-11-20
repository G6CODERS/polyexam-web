# 0002 — BFF session boundary

- Status: accepted
- Date: 2026-11-20

## Context

The browser must not hold Laravel Sanctum tokens. The public client is a
separate deployment from the private backend.

## Decision

The Next.js BFF owns the session in an encrypted, HttpOnly, Secure, SameSite
cookie. Browser requests go through Route Handlers. Server Components/Actions
call Laravel with a Bearer token. `proxy.ts` is for optimistic redirects only.

## Consequences

- No tokens in `localStorage`, client state, or props.
- CSRF protection is required for cookie-authenticated mutations.
- Auth is not implemented yet; see `docs/status.md`.

## Alternatives considered

Token in browser storage (rejected: XSS exposure), direct browser-to-Laravel
calls (rejected: token exposure and CORS complexity).
