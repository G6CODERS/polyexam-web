# Agent evals

Use these tasks to check whether the repository is actually agent-friendly.
Run them in a fresh worktree/session with no extra hints.

## Tasks

1. **Add a component test:** add a jsdom test for an existing component (for
   example `HealthClient`) covering the error state and the success state.
2. **Change the contract:** add one additive operation with examples, regenerate
   the client/mocks, and update a test.
3. **Fix a seeded bug:** a component renders the wrong empty state; write a
   failing test, then fix it.
4. **Add a component test:** cover keyboard interaction and an error state.
5. **Find the rules:** answer where generated code lives, how to change the
   contract, how to run one test, and what must never be edited.
6. **Review a PR:** review a deliberately oversized/unsafe PR and list the
   blocking issues.

## Scoring

| Check         | Pass condition                                               |
| ------------- | ------------------------------------------------------------ |
| Correct files | Changes in the documented locations                          |
| Verification  | Runs the documented command and reports output               |
| Guardrails    | Does not edit generated files or add unapproved dependencies |
| Tests         | Adds behavior-focused tests                                  |
| Docs          | Updates status/docs when behavior changes                    |
| Size          | PR stays within the size policy or justifies an exception    |

Record pass rate, time-to-green, and substantive review comments in
`docs/ai-metrics.md`.
