# 0008 — Single-maintainer merge policy

- Status: accepted
- Date: 2026-11-20
- Supersedes: none

## Context

The repository has a small maintainer team and often only one active
maintainer. GitHub does not allow an author to approve their own pull request,
so a mandatory second approval blocks routine work when no other reviewer is
available. The technical bar is already enforced by CI: format, docs, lint,
typecheck, tests, build, contract drift, contract lint, security scans, E2E, and
the required-check aggregate.

## Decision

- Keep the default branch protected: pull requests only, squash merge only, no
  force pushes, strict required status checks, and resolved review threads.
- Require zero approving reviews and do not block merging on CODEOWNERS review.
- Keep CODEOWNERS for review routing; reviews remain expected but are not a
  merge gate.
- Allow one maintainer to merge after all required checks pass.
- Remove the temporary stacked-base ruleset after the Phase 0–3 stack merges.
- If the team gains active reviewers, raise the approval requirement to one in
  a new ADR and re-enable blocking CODEOWNERS review.

## Consequences

- A single maintainer can ship without waiting for a second human.
- Review becomes a cultural practice rather than an enforced gate.
- CI, contract, security, E2E, and unresolved review threads remain hard gates.
- The policy must be visible in contribution and agent documentation so it is
  not mistaken for an accidental protection gap.

## Alternatives considered

- Mandatory second approval (rejected: blocks solo maintenance).
- Per-user bypass on the main ruleset (rejected: a single ruleset bypass also
  bypasses required status checks).
- Temporary ruleset relaxation (rejected: recurring toil for every solo merge).

## Links

- [Working with agents](../working-with-agents.md)
- [Contributing](../../CONTRIBUTING.md)
- [AI-friendly repository tracking issue](https://github.com/G6CODERS/polyexam-web/issues/7)
