# Project skills

Project skills are installed from official vendor repositories. They are not
hand-written in this repo. `skills-lock.json` pins each source commit.

OpenCode discovers project skills from `.agents/skills`; it also supports the
OpenCode and Claude project skill directories. These are copied into
`.agents/skills` with `--copy` so they are reviewable in git.

## Installed skills

| Skill                                | Source                                                                                                                       | Why it applies here                                                   |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `next-dev-loop`                      | [vercel/next.js](https://github.com/vercel/next.js/tree/59164d1b22472a01efdc6c2ee26b5284023dc2f0/skills)                     | Verify runtime behavior with `/_next/mcp` + browser, not just compile |
| `next-cache-components-optimizer`    | [vercel/next.js](https://github.com/vercel/next.js/tree/59164d1b22472a01efdc6c2ee26b5284023dc2f0/skills)                     | Cache Components is enabled in `next.config.ts`                       |
| `next-partial-prefetching-optimizer` | [vercel/next.js](https://github.com/vercel/next.js/tree/59164d1b22472a01efdc6c2ee26b5284023dc2f0/skills)                     | Partial Prefetching is enabled in `next.config.ts`                    |
| `next-bundle-optimizer`              | [vercel/next.js](https://github.com/vercel/next.js/tree/59164d1b22472a01efdc6c2ee26b5284023dc2f0/skills)                     | Keep the client bundle small as the UI grows                          |
| `vercel-react-best-practices`        | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62)        | React 19 / Next.js performance guidance                               |
| `web-design-guidelines`              | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62)        | UI/accessibility review against Web Interface Guidelines              |
| `frontend-design`                    | [anthropics/skills](https://github.com/anthropics/skills/tree/e4bb5d960d87126ff3b3a8af1a104b7db67560ba)                      | Intentional visual direction and typography for the design system     |
| `playwright-cli`                     | [microsoft/playwright-cli](https://github.com/microsoft/playwright-cli/tree/c872a33cec77fa03c28fa7c6d1ad99d15d04ce42/skills) | Browser automation and e2e debugging                                  |

Upstream licenses: Next.js is MIT; Microsoft Playwright CLI is Apache-2.0.
The Anthropic and Vercel Labs repositories do not expose a detected repository
license through GitHub’s API; check each upstream repository and the `license`
metadata in the copied `SKILL.md` files before redistributing.

## Trust policy

- Only install skills from allowlisted owners: `anthropics`, `microsoft`,
  `openai`, `vercel`, `vercel-labs`.
- `npm run check:skills` validates the lockfile source owner, install mode,
  frontmatter name, and description.
- Do not edit copied skill files. Update from upstream and review the diff.

## Install or update

```bash
npx skills add <owner/repo> --skill <name> --agent opencode --copy -y
npx skills update -p
npx skills list
npm run check:skills
```

Restart OpenCode after adding or updating skills; the current session does not
reload the skill list automatically.

## MCP

`next-devtools-mcp` is configured in both:

- `opencode.jsonc` → `mcp.servers.next-devtools`
- `.mcp.json` → Claude Code / VS Code clients

Start `npm run dev` before using `nextjs_index` / `nextjs_call`; the MCP server
discovers running Next.js 16 dev servers through `/_next/mcp`. Verify with:

```bash
npm run dev
opencode mcp list
```
