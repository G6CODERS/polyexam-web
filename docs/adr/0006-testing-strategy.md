# 0006 — Testing strategy

- Status: accepted
- Date: 2026-11-20

## Context

Agents and humans need a fast, deterministic pass/fail loop without the private
backend. E2E alone is too slow; unit tests alone miss integration boundaries.

## Decision

Use contract invariants, unit tests, component tests (Vitest + jsdom +
Testing Library), MSW for data, and Playwright for critical journeys. `npm run
verify` is the local gate; CI adds format, docs, contract, and e2e checks.

## Consequences

- No real network, time, or randomness in tests.
- Every bug fix gets a regression test.
- MSW handlers are generated from the contract and kept deterministic.
- E2E is deliberately small and stable.

## Alternatives considered

Only e2e (rejected: slow/flaky), only unit (rejected: misses boundaries),
manual QA (rejected: not enforceable).
