# Fix a bug

Use when behavior does not match the contract or accepted design.

1. Reproduce the bug with a failing test first.
2. Read the nearest `AGENTS.md` and the relevant doc.
3. Find the smallest correct fix; do not refactor unrelated code.
4. Keep the regression test.
5. Run `npm run verify`.
6. Update docs only if behavior/commands changed.
7. Open a `fix:` PR with reproduction and evidence.

If the bug reveals a missing product decision, stop and ask for it instead of
inventing a requirement.

## Acceptance

- A regression test fails before the fix and passes after it.
- No secrets or real student data in the reproduction.
- The fix is scoped to one logical change.
- CI is green; the PR includes commands run.
