# AI collaboration metrics

Measure outcomes, not vibes. Record a baseline, review monthly, and change one
thing at a time.

| Metric                     | How to measure                    | Target             |
| -------------------------- | --------------------------------- | ------------------ |
| Clone → first green verify | Stopwatch on a fresh clone        | <10 min            |
| Orientation accuracy       | 5-question quiz for a fresh agent | 5/5                |
| Agent task success         | `evals/` task suite               | >80% first-pass CI |
| CI first-pass rate         | Agent PRs passing CI on first run | >70%               |
| Review load                | Substantive comments per agent PR | <3                 |
| Context size               | `AGENTS.md` lines                 | ≤200               |
| Docs drift                 | `npm run docs:check`              | 0 failures         |
| Generated edits            | Edits outside contract PRs        | 0                  |
| Time-to-green              | Small task start → green PR       | <15 min            |

## Baseline (2026-11-20, local Linux)

| Measurement           | Value                                              |
| --------------------- | -------------------------------------------------- |
| `npm run verify:fast` | 5.64 s                                             |
| `npm run verify`      | 14.79 s                                            |
| Vitest                | 6 files, 19 tests                                  |
| Playwright            | 2 tests                                            |
| `docs:check`          | 46 Markdown files, 53 links, 162 paths, 94 scripts |
| `AGENTS.md`           | 121 lines                                          |
| CI `ci-success`       | required by the active ruleset                     |

## Notes

- Count substantive review comments, not bot noise.
- Exclude documentation-only and mechanically generated changes from size metrics.
- Re-run evals after Next.js upgrades or major architecture changes.
- If a metric regresses, fix the layer: context, verification, or enforcement.
