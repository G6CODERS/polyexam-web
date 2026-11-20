# Documentation index

Start here. Read only what the task needs; `AGENTS.md` is the always-on layer.

## Reading order

| Read when                                | Document                                         |
| ---------------------------------------- | ------------------------------------------------ |
| You need the current state vs target     | [status.md](status.md)                           |
| You need the repository map              | [repo-map.md](repo-map.md)                       |
| You need architecture and boundaries     | [architecture.md](architecture.md)               |
| You change the public API                | [contract.md](contract.md)                       |
| You use the generated client             | [api-client.md](api-client.md)                   |
| You test or add fixtures                 | [testing.md](testing.md)                         |
| You build UI                             | [ui-conventions.md](ui-conventions.md)           |
| You need visual rules                    | [design-system.md](design-system.md)             |
| You handle auth/cache/secrets            | [security-model.md](security-model.md)           |
| You need domain vocabulary               | [glossary.md](glossary.md)                       |
| You use Next.js APIs                     | [nextjs.md](nextjs.md)                           |
| You coordinate with backend              | [team-api.md](team-api.md)                       |
| You work with agents or review agent PRs | [working-with-agents.md](working-with-agents.md) |
| You use or update project skills / MCP   | [skills.md](skills.md)                           |
| You want repeatable procedures           | [recipes/](recipes/)                             |
| You need a durable decision              | [adr/](adr/)                                     |
| You run agent evals or metrics           | [evals/](evals/), [ai-metrics.md](ai-metrics.md) |

## Source of truth

| Topic                    | Source                          |
| ------------------------ | ------------------------------- |
| Commands and scripts     | `package.json`                  |
| Node/npm versions        | `.nvmrc`, `package.json`        |
| Public API               | `contracts/public.openapi.yaml` |
| Generated client/mocks   | `src/lib/api` (generated)       |
| Architecture             | `architecture.md` + `adr/`      |
| Agent instructions       | `AGENTS.md`                     |
| Human contribution rules | `CONTRIBUTING.md`               |
| Current status           | `status.md`                     |

If two sources disagree, fix the disagreement in the same PR. Do not add a
third source of truth.

## Rules

- Keep each document focused and under ~300 lines.
- Mark planned work as **target**, not current.
- Link to canonical examples instead of copying code.
- Update the relevant doc in the PR that changes behavior.
