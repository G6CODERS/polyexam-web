# Project status

This page distinguishes what exists today from what is planned. Update it in
the same PR that changes the status.

| Area             | Current                      | Target                                | Source                          |
| ---------------- | ---------------------------- | ------------------------------------- | ------------------------------- |
| App shell        | Scaffold home page           | Student shell                         | `src/app/`                      |
| Auth/session     | Not implemented              | BFF HttpOnly cookie + Laravel Sanctum | `docs/architecture.md`          |
| API contract     | Public health endpoint       | Student-facing catalog/auth/plans     | `contracts/public.openapi.yaml` |
| Generated client | Orval client + models        | Same                                  | `src/lib/api/`                  |
| MSW runtime      | Browser + Node wiring        | Dev/e2e only; never production        | `docs/testing.md`               |
| Catalog          | Not implemented              | Tracks, levels, papers                | `ROADMAP.md`                    |
| Design system    | Tokens not finalized         | Tokens + primitives                   | `docs/design-system.md`         |
| Cache Components | Enabled in config            | Public-catalog caching rules          | `docs/architecture.md`          |
| E2E              | Home + MSW health            | Critical journeys                     | `e2e/`                          |
| Language         | French scaffold copy         | French product copy + `lang="fr"`     | `docs/ui-conventions.md`        |
| Agent tooling    | AGENTS.md, docs, MCP, hooks  | Evals + metrics                       | `docs/working-with-agents.md`   |
| PR enforcement   | Ruleset + size/title + hooks | Keep required checks in sync          | `docs/working-with-agents.md`   |

## Rules

- Do not describe a planned feature as implemented.
- If you add a feature, update this table.
- If a claim here is stale, fix it in the same PR as the code change.
