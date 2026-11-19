# API contract workflow

The public contract is `contracts/public.openapi.yaml`.

## Generate

```bash
npm run contract
```

This produces:

- `src/lib/api/generated.ts` — typed fetch client.
- `src/lib/api/model/` — generated types.
- MSW handlers for tests and local UI work.

Commit the generated output. CI runs `npm run contract:check` and fails on drift.

## Change process

1. Open a `contract:` PR against `contracts/public.openapi.yaml`.
2. Run `npm run contract` and commit generated files.
3. CI runs Redocly lint, generated-output drift check, and oasdiff breaking
   detection.
4. A frontend and a backend maintainer review the contract.
5. Merge; the backend updates `contracts.lock` to the merge commit SHA.
6. Backend implements first with backward-compatible changes; frontend deploys
   after.

## Rules

- No admin/internal endpoints in this file. Filament admin is private.
- No real student data, secrets, or paid content in examples or fixtures.
- Breaking changes need an explicit label/approval and a deprecation or version
  decision.
- Keep operation IDs stable; the client and mocks depend on them.
