# API contract workflow

The public contract is `contracts/public.openapi.yaml`. It is the source of
truth for the generated client, mocks, and tests.

## Generate

```bash
npm run contract
```

This produces:

- `src/lib/api/generated.ts` — typed fetch client.
- `src/lib/api/model/` — generated types.
- `src/lib/api/generated.msw.ts` — MSW handlers.
- `src/lib/api/generated.faker.ts` — Faker factories.

Commit the generated output. CI runs `npm run contract:check` and fails on
drift. Never hand-edit generated files.

## Verify

```bash
npm run contract:check   # regenerate + fail if src/lib/api changed
npm run contract:lint    # Redocly lint
```

`contract:check` runs the generator and fails if `src/lib/api` is dirty or
untracked. That catches both stale output and hand-edited generated files. It
compares the working tree to `HEAD`, so commit the contract and generated
output before running it locally. Do not run it concurrently with tests;
Orval cleans the output directory while regenerating.

## Change process

1. Open a `contract:` PR against `contracts/public.openapi.yaml`.
2. Run `npm run contract` and commit generated files with the contract change.
3. CI runs Redocly lint, generated-output drift check, and oasdiff breaking
   detection.
4. A frontend and a backend maintainer review the contract.
5. Merge; the backend updates `contracts.lock` to the merge commit SHA. The lock
   file is backend-owned and is not part of this repository.
6. Backend implements first with backward-compatible changes; frontend deploys
   after.

## Rules

- No admin/internal endpoints in this file. Filament admin is private.
- No real student data, secrets, or paid content in examples or fixtures.
- Breaking changes are blocked by the required `contract-breaking` check. A
  breaking change needs a version/deprecation plan and an explicit maintainer
  ruleset change; do not rely on a label alone.
- Keep operation IDs stable; the client and mocks depend on them.
- Every operation needs `operationId`, `summary`, `description`, `tags`, and
  examples.
- Use synthetic examples; Orval uses them for deterministic mocks.
- Read `contracts/AGENTS.md` and `docs/api-client.md` before changing the
  contract or using the generated client.
