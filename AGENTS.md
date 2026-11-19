<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# PolyExam Web — agent instructions

Public Next.js 16 student client. The backend is private at
`G6CODERS/polyexam-api`; the admin is Filament and is not built here.

## Read first

- `README.md`
- `docs/architecture.md`
- `docs/contract.md`
- `contracts/public.openapi.yaml`

## Commands

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run contract
npm run contract:check
```

## Rules

- Never commit secrets, `.env` files, real student data, paid PDFs, or private
  screenshots.
- The browser must not hold Laravel tokens. The BFF owns the session; use
  HttpOnly cookies.
- Never use `localStorage` for auth tokens.
- Cache public catalog data only. Never cache authenticated data in a shared
  server cache.
- The public API contract is `contracts/public.openapi.yaml`; do not add admin or
  internal endpoints to it.
- Regenerate the client and MSW after contract changes:
  `npm run contract`.
- Use Server Components/Actions for data and mutations; use Route Handlers for
  browser-initiated BFF operations and webhooks.
- Do not add product screens in the scaffold phase without an issue/ADR.
- PR-only workflow; no direct pushes to `main`.

