<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# PolyExam Web — agent instructions

Public Next.js 16 student client for PolyExam v2. The backend, admin, payments,
and content are private (`G6CODERS/polyexam-api`). This repo is in the scaffold
phase: infrastructure, docs, tests, design system, and MSW demo only. Do not add
product screens without an issue/ADR.

## Stack

Next.js 16 (App Router, Cache Components, Turbopack), React 19, TypeScript
strict, Tailwind CSS 4, Orval-generated client + MSW, Vitest, Playwright.
Node 24 (`.nvmrc`), npm 12 (`packageManager`).

## Commands

- Install: `npm ci` (first run: `npm run setup`)
- Dev: `npm run dev`
- Verify: `npm run verify` (format + docs + lint + typecheck + test + build)
- Fast: `npm run verify:fast`
- Full: `npm run verify:full`
- One test: `npm test -- src/lib/contract.test.ts`
- One test by name: `npm test -- -t "health"`
- E2E: `npm run e2e:install && npm run e2e`
- Contract: `npm run contract`; check: `npm run contract:check`
- Contract lint: `npm run contract:lint`
- Doctor: `npm run doctor`
- Docs: `npm run docs:check`; formatting: `npm run format:check`

## Read next (only what you need)

| When                   | Read                                                            |
| ---------------------- | --------------------------------------------------------------- |
| Any task               | `docs/index.md`, `docs/status.md`                               |
| Architecture/data flow | `docs/architecture.md`                                          |
| API/contract           | `docs/contract.md`, `docs/api-client.md`, `contracts/AGENTS.md` |
| UI/route/component     | `docs/ui-conventions.md`, `docs/design-system.md`               |
| Tests/fixtures         | `docs/testing.md`                                               |
| Security/auth/cache    | `docs/security-model.md`                                        |
| Workflow/PR/agents     | `CONTRIBUTING.md`, `docs/working-with-agents.md`                |
| Next.js APIs           | `docs/nextjs.md` → `node_modules/next/dist/docs/`               |

## Map

- `src/app/` — routes, layouts, pages, route handlers.
- `src/components/` — shared UI.
- `src/lib/` — API client, env, auth, utilities.
- `src/lib/api/` — **generated** Orval client/models/mocks; never edit.
- `src/mocks/` — MSW runtime.
- `contracts/` — public OpenAPI contract.
- `docs/` — deep dives, ADRs, recipes, evals.
- `e2e/` — Playwright.
- `scripts/` — verification, doctor, hooks, PR policy.

## Non-negotiables

- Never edit `src/lib/api/generated*` or `src/lib/api/model/**`; run `npm run contract`.
- Browser never holds Laravel tokens; BFF HttpOnly cookie only. No `localStorage`.
- Cache public catalog only; never authenticated data in a shared cache.
- No secrets, `.env*`, real student data, paid PDFs, private screenshots.
- No admin/internal endpoints in the public contract.
- No new runtime dependency without an issue/ADR.
- Server Components/Actions for data/mutations; Route Handlers for BFF/webhooks.
- PR-only; no direct `main`; Conventional Commits; no force pushes.
- Local hooks block env files, hand-edited generated code, and unformatted
  staged files. Do not bypass with `--no-verify`.
- Keep PRs reviewable: ≤400 code lines and ≤20 code files. Add `size:large`
  only with a written justification.

## Conventions

- Default Server Components; `"use client"` at leaves.
- Use `@/` alias; named exports except Next.js pages/layouts.
- French user-facing copy; English code/API names; `lang="fr"` when product copy ships.
- Every data-driven UI handles loading, empty, error, disabled states.
- Semantic HTML, labels, keyboard, focus, contrast, reduced motion.
- Tailwind 4 tokens; no scattered raw hex/spacing values.
- Tests: regression test for every bug fix; behavior over implementation; deterministic.
- Update docs when commands, behavior, or architecture change.

## Definition of done

1. `npm run verify` passes.
2. `npm run contract:check` if the contract or generated client changed.
3. Tests added/updated; no `.only`; no unexplained skips.
4. Loading/empty/error/disabled + accessibility considered.
5. Docs updated; no secrets/data.
6. PR includes commands run and an output summary.

## Stop and ask

Contract changes, new routes/product screens, auth/session, new dependencies,
caching strategy, ambiguous design/copy, or anything touching secrets/production.

## Context hygiene

- Do not read `node_modules` except `node_modules/next/dist/docs/`.
- Do not read `.next/`, `package-lock.json`, or generated files unless debugging generation.
- Prefer retrieval-led reasoning: read version-matched Next.js docs before using Next APIs.
- Keep diffs small; one logical change per PR.

## Next.js docs index

`node_modules/next/dist/docs/01-app/`

- getting-started: `05-server-and-client-components.md`, `08-caching.md`,
  `10-error-handling.md`, `15-route-handlers.md`, `16-proxy.md`
- guides: `backend-for-frontend.md`, `authentication.md`,
  `testing/vitest.md`, `testing/playwright.md`, `ai-agents.md`, `mcp.md`
- upgrading: `version-16.md`
