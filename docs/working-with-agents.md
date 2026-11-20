# Working with agents

This repository is designed for humans and coding agents to use the same rules.

## Canonical instruction file

`AGENTS.md` is the source of truth. It works across Claude Code, OpenAI Codex,
GitHub Copilot, Cursor, OpenCode, Windsurf, Zed, and other agents.

Do not copy its content into vendor files. Add a pointer only when a tool needs
one.

| Tool           | Reads                                 | Optional pointer                  |
| -------------- | ------------------------------------- | --------------------------------- |
| Claude Code    | `AGENTS.md` (v2.1.277+)               | `CLAUDE.md` with `@AGENTS.md`     |
| OpenAI Codex   | `AGENTS.md`                           | none                              |
| GitHub Copilot | `AGENTS.md`, `CLAUDE.md`, `GEMINI.md` | `.github/copilot-instructions.md` |
| Cursor         | `AGENTS.md`                           | none                              |
| OpenCode       | `AGENTS.md`                           | `opencode.jsonc`                  |
| Gemini CLI     | `GEMINI.md` or configured file        | `.gemini/settings.json`           |
| Aider          | configured read list                  | `.aider.conf.yml`                 |
| Windsurf / Zed | `AGENTS.md`                           | none                              |

## Setup

```bash
npm ci
npm run setup
npm run verify
npm run dev
```

Local hooks are installed by `npm ci`; they block env files, hand-edited
generated code, and non-formatted staged files. They can be bypassed with
`--no-verify`, but CI is the hard gate.

## Runtime introspection

Next.js 16 exposes `/_next/mcp` from the dev server. `.mcp.json` connects
`next-devtools-mcp` for routes, errors, logs, and compilation checks.

```bash
npm run dev
# then use the next-devtools MCP tools from your agent
```

Optional: use Playwright or `agent-browser` for DOM/console/network inspection
and PR screenshots.

## How to add a rule

1. Can the agent discover it by reading the code? If yes, do not add it.
2. Is it a preference? Put it in `AGENTS.md` or the relevant `docs/` page.
3. Is it a zero-exception rule? Enforce it in a script, CI job, permission, or
   CODEOWNERS.
4. Is it a procedure? Add a recipe in `docs/recipes/` or a skill.

Do not use emphasis (“IMPORTANT”, all caps) as a substitute for enforcement.

## Reviewing agent PRs

- Review the diff, not the agent's summary.
- Require commands run and an output summary.
- Check tests assert behavior, not implementation.
- Check generated files match the contract.
- Check loading/empty/error/disabled and accessibility.
- Check no secrets, real data, or paid content.
- Ask for a smaller PR or split if it exceeds the size policy.

## PR policy

- Conventional Commits title (`pr-title` check).
- ≤400 code lines and ≤20 code files (`pr-size` check).
- `size:large` label only with a written justification.
- One approval, CODEOWNERS review, and all required checks.
- Squash merge only; no force push; no direct `main` pushes.

## Metrics and evals

See `ai-metrics.md` and `evals/`. Measure onboarding time, first-pass CI rate,
review comments, docs drift, and agent task success.

## Security

Agents must not read `.env` files, force-push, or run destructive git commands.
Use `opencode.jsonc` permissions when using OpenCode. Report vulnerabilities
privately via `SECURITY.md`.
