# Public API contract

`contracts/public.openapi.yaml` is the source of truth for the student-facing
API. It is public by design.

- Never add admin, internal, payment, or backend-only endpoints.
- Keep operation IDs stable; the generated client, mocks, and tests depend on them.
- Use synthetic examples only. Never add real student data, secrets, or paid content.
- Every operation needs `operationId`, `summary`, `description`, `tags`, and examples.
- Run `npm run contract` after editing; commit `src/lib/api` with the contract.
- Run `npm run contract:lint` and `npm run contract:check` before opening a PR.
- Breaking changes need an explicit label/approval and a deprecation or version decision.

See `docs/contract.md` and `docs/api-client.md`.
