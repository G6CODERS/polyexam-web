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
`--no-verify`, but CI is the hard gate. OpenCode users also get read/shell
denials from `opencode.jsonc`; Claude Code users get `.env` read denials from
`.claude/settings.json`. These agent permission files are best-effort local
guardrails, not a security boundary.

## Project skills

Eight project skills are installed from official vendor repositories:

- Vercel Next.js: `next-dev-loop`, `next-cache-components-optimizer`,
  `next-partial-prefetching-optimizer`, `next-bundle-optimizer`
- Vercel Labs: `vercel-react-best-practices`, `web-design-guidelines`
- Anthropic: `frontend-design`
- Microsoft: `playwright-cli`

They live in `.agents/skills` and are pinned by `skills-lock.json`. Do not
hand-write or edit skills; install/update from an allowlisted owner and run
`npm run check:skills`. See [skills.md](skills.md).

## Runtime introspection

Next.js 16 exposes `/_next/mcp` from the dev server. `next-devtools-mcp` is
configured in:

- `opencode.jsonc` → `mcp.servers.next-devtools` (OpenCode)
- `.mcp.json` → Claude Code / VS Code

```bash
npm run dev
opencode mcp list
# then use nextjs_index / nextjs_call from your agent
```

Optional: use the `playwright-cli` or `agent-browser` skill for DOM/console/
network inspection and PR screenshots.

## How to add a rule

1. Can the agent discover it by reading the code? If yes, do not add it.
2. Is it a preference? Put it in `AGENTS.md` or the relevant `docs/` page.
3. Is it a zero-exception rule? Enforce it in a script, CI job, permission, or
   CODEOWNERS.
4. Is it a procedure? Add a recipe in `docs/recipes/`, or use an installed
   project skill. Do not hand-write a skill; source it from an allowlisted
   vendor and pin it in `skills-lock.json`.

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
- `size:large` label only with a non-empty `## Size justification` section in
  the PR body; the check rejects an empty one.
- One approval, CODEOWNERS review, and all required checks.
- Required checks include `ci-success`, `pr-size`, `pr-title`,
  `contract-breaking`, `security-secrets`, and `security-dependencies`.
- The main ruleset protects the default branch. A second ruleset protects the
  current `chore/ai-friendly-*` stacked bases so those PRs also require checks
  and approval. Future stacks should add the same protection or merge through
  `main`.
- Squash merge only; no force push; no direct `main` pushes.

## Metrics and evals

See `ai-metrics.md` and `evals/`. Measure onboarding time, first-pass CI rate,
review comments, docs drift, and agent task success.

## Security

Agents must not read `.env` files, force-push, or run destructive git commands.
Use `opencode.jsonc` permissions when using OpenCode. Report vulnerabilities
privately via `SECURITY.md`.

## Sources

- [AGENTS.md standard](https://agents.md/)
- [Claude Code memory and AGENTS.md](https://code.claude.com/docs/en/memory)
- [OpenAI Codex AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- [GitHub Copilot repository instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)
- [Cursor rules](https://cursor.com/docs/context/rules)
- [OpenCode rules](https://opencode.ai/docs/rules/) and [skills](https://opencode.ai/docs/skills/)
- [Skills CLI](https://skills.sh/) and [OpenCode MCP servers](https://opencode.ai/docs/mcp-servers/)
- [Vercel Next.js skills](https://github.com/vercel/next.js/tree/canary/skills)
- [Vercel Labs agent skills](https://github.com/vercel-labs/agent-skills)
- [Microsoft Playwright CLI skill](https://github.com/microsoft/playwright-cli)
- [Vercel: AGENTS.md vs skills](https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals)
