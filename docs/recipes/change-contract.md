# Change the public API contract

Use when adding or changing a student-facing endpoint.

1. Read `contracts/AGENTS.md`, `docs/contract.md`, and `docs/api-client.md`.
2. Edit `contracts/public.openapi.yaml` only. Keep operation IDs stable.
3. Add/update `summary`, `description`, `tags`, examples, and errors.
4. Run `npm run contract`.
5. Review the generated diff in `src/lib/api`.
6. Run `npm run contract:lint` and `npm run contract:check`.
7. Update mocks/tests and the page or action that uses the operation.
8. Run `npm run verify`.
9. Open a `contract:` PR. Note additive vs breaking.
10. Request frontend + backend review.

Do not hand-edit generated files. Do not add admin/internal endpoints.

## Acceptance

- `npm run contract:check` passes on a clean tree.
- `npm run contract:lint` passes.
- Generated client, mocks, and tests are committed together.
- No secrets, real data, or paid content in examples.
