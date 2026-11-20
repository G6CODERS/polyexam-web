# Testing

The goal is a fast, deterministic pass/fail loop an agent can run without the
private backend.

## Test levels

| Level               | Tool                             | What it proves                                             |
| ------------------- | -------------------------------- | ---------------------------------------------------------- |
| Contract invariants | Vitest                           | The OpenAPI contract has the required shape and operations |
| Unit                | Vitest                           | Pure functions and edge cases                              |
| Component           | Vitest + jsdom + Testing Library | UI behavior, states, accessibility wiring                  |
| E2E                 | Playwright                       | Critical journeys in a real browser                        |
| Generated mocks     | Vitest + MSW                     | Every contract operation has a handler                     |

## Commands

```bash
npm test                                  # all Vitest tests
npm test -- src/lib/contract.test.ts      # one file
npm test -- -t "health"                   # one test name
npm run e2e:install                       # first time
npm run e2e                              # all Playwright tests
npm run e2e -- e2e/smoke.spec.ts         # one spec
```

## MSW

- Browser: `src/mocks/browser.ts` + `src/mocks/provider.tsx`.
- Node/Vitest: `src/mocks/server.ts` + `vitest.setup.ts`.
- Overrides: `src/mocks/handlers.ts`.
- Use contract examples and a fixed Faker seed; never use real data.
- `onUnhandledFrame: 'error'` in tests so missing handlers fail loudly.

## Rules

- Every bug fix gets a regression test.
- Every new behavior gets a test at the lowest useful level.
- Test behavior and observable output, not implementation details.
- No `.only`; no skipped tests without a linked issue.
- No real network, clock, or randomness. Freeze/seed when needed.
- Do not test generated code; test the contract and the app boundary.
- Loading, empty, error, and disabled states are behavior; test them.

## Local e2e

Playwright reuses an existing server on port 3000 outside CI. Stop any stray
`next dev`/`next start` before running `npm run e2e`, or set
`PLAYWRIGHT_BASE_URL`. CI never reuses a server.

## CI

`npm run verify` is the local gate and includes format, docs, policy checks,
lint, typecheck, tests, and build. CI adds contract and e2e checks plus the
security workflows. A red check is the source of truth, not a local claim.
