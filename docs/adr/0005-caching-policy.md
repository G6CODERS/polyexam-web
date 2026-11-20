# 0005 — Caching policy

- Status: accepted
- Date: 2026-11-20

## Context

Cache Components make caching explicit and powerful. A mistake can leak
authenticated data across users.

## Decision

- Cache public catalog data only.
- Never cache authenticated or user-specific data in a shared server cache.
- Use request-time rendering or `"use cache: private"` for session-derived data.
- Use `"use cache: remote"` only with a reviewed durable cache handler.
- Revalidate public data after mutations with tags.

## Consequences

- Routes may need `<Suspense>` boundaries to avoid blocking prerender.
- Cache keys and tags are part of review.
- `docs/nextjs.md` is required reading.

## Alternatives considered

Cache everything (rejected: privacy risk), cache nothing (rejected: poor
performance), implicit framework defaults (rejected: too easy to misread).
