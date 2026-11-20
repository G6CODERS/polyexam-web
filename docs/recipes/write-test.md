# Write a test

Choose the lowest level that proves the behavior.

1. Contract invariant? Put it in `src/lib/contract.test.ts`.
2. Pure function? Colocate `*.test.ts`.
3. Component behavior/state? Colocate `*.test.tsx` with
   `// @vitest-environment jsdom`.
4. Critical journey? Add `e2e/*.spec.ts`.
5. Data boundary? Use MSW, not real network.

## Rules

- Name the behavior, not the implementation.
- Arrange / Act / Assert.
- No real time, network, or randomness. Seed Faker or freeze time.
- No `.only`; no unexplained skips.
- Test error, empty, loading, and disabled states when relevant.
- Do not assert on generated code internals.

## Commands

```bash
npm test -- src/lib/contract.test.ts
npm test -- -t "health"
npm run e2e -- e2e/smoke.spec.ts
```

## Acceptance

- The test fails without the behavior and passes with it.
- It is deterministic and fast.
- It runs in CI with no backend.
