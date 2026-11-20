# 0001 — Next.js App Router and Cache Components

- Status: accepted
- Date: 2026-11-20

## Context

The student client needs server rendering, streaming, route handlers, and a
future BFF. Next.js 16 is the selected framework and has breaking changes from
older model training data.

## Decision

Use the App Router with Cache Components, Turbopack, and Server Components by
default. Client Components are leaf-level exceptions. Use the version-matched
docs in `node_modules/next/dist/docs/`.

## Consequences

- Agents must read the bundled Next.js docs before using framework APIs.
- Caching is explicit; uncached data needs `<Suspense>` or a cache directive.
- `proxy.ts` replaces `middleware.ts`.

## Alternatives considered

Pages Router (rejected: no RSC/streaming), client-only SPA (rejected: SEO and
BFF boundary), older Next.js (rejected: new project).
