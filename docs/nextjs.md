# Next.js 16 notes

This repo uses Next.js 16. Model training data is often older. Read the
version-matched docs bundled with the installed package before using a Next.js
API.

## Docs map

Root: `node_modules/next/dist/docs/01-app/`

| Topic                    | File                                                    |
| ------------------------ | ------------------------------------------------------- |
| Project structure        | `01-getting-started/02-project-structure.md`            |
| Server/client components | `01-getting-started/05-server-and-client-components.md` |
| Fetching data            | `01-getting-started/06-fetching-data.md`                |
| Mutating data            | `01-getting-started/07-mutating-data.md`                |
| Caching                  | `01-getting-started/08-caching.md`                      |
| Error handling           | `01-getting-started/10-error-handling.md`               |
| Route Handlers           | `01-getting-started/15-route-handlers.md`               |
| Proxy                    | `01-getting-started/16-proxy.md`                        |
| BFF                      | `02-guides/backend-for-frontend.md`                     |
| Authentication           | `02-guides/authentication.md`                           |
| Vitest                   | `02-guides/testing/vitest.md`                           |
| Playwright               | `02-guides/testing/playwright.md`                       |
| AI agents                | `02-guides/ai-agents.md`                                |
| MCP                      | `02-guides/mcp.md`                                      |
| Upgrade to 16            | `02-guides/upgrading/version-16.md`                     |

## Gotchas

- `middleware.ts` is deprecated and renamed to `proxy.ts`. Only one proxy file
  per project.
- `cookies()` and `headers()` are async.
- Cache Components are enabled. Uncached data blocks prerendering unless it is
  inside `<Suspense>` or cached.
- `"use cache"` caches a function/component; `"use cache: private"` caches
  request-derived data in the browser; `"use cache: remote"` uses a durable
  shared cache.
- `connection()` marks request-time data.
- `after()` runs work after the response.
- Use `next build --debug-prerender` when diagnosing prerender errors.
- The Next.js dev server exposes runtime tools at `/_next/mcp`; see
  `docs/working-with-agents.md`.

## Rule

Prefer retrieval-led reasoning over pre-training-led reasoning. If the API is
not in the bundled docs, do not invent it.
