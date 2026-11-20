# 0007 — Agent-assisted development

- Status: accepted
- Date: 2026-11-20

## Context

Contributors use different coding agents. Copying instructions into many
vendor-specific files causes drift; prompt-only rules are not enforceable.

## Decision

- `AGENTS.md` is the canonical, short, always-on instruction file.
- Deep knowledge lives in `docs/` and is loaded on demand.
- Hard rules are enforced by scripts, CI, CODEOWNERS, hooks, and permissions.
- Generated code is fenced with nested `AGENTS.md`, `.gitattributes`, and CI.
- PRs must be small, use Conventional Commits, and include verification evidence.
- Framework knowledge is retrieved from version-matched docs, not model memory.

## Consequences

- `AGENTS.md` must stay concise; new detail goes into `docs/`.
- `docs:check`, `contract:check`, and CI must stay green.
- Vendor files are thin pointers, not copies.
- Agent PRs get the same review as human PRs, with evidence.

## Alternatives considered

One giant instruction file (rejected: context bloat), only vendor files
(rejected: drift), prompt-only enforcement (rejected: not reliable).
