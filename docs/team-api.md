# Team API

## Frontend team provides

- Next.js app, design system, BFF/session boundary.
- Public OpenAPI contract PRs and generated client/MSW.
- Preview URLs and Playwright smoke tests.
- Accessibility/performance budgets.
- Public MSW demo and contributor-friendly setup.

## Frontend team needs from backend

- Stable contract, examples, and error codes.
- Seeded test accounts and staging API access.
- Contract review within 24 hours.
- Latency/rate-limit expectations.
- Confirmation that no backend secret is required in the public repo.

## Backend team provides

- Versioned API at `/api/v1`.
- `contracts.lock` pin and contract-aware tests.
- Filament admin and back-office workflows.
- Staging/preview API and test personas.
- `#api-help` support and contract review.

## Backend team needs from frontend

- User journeys, acceptance criteria, error/empty/loading states.
- Early API ergonomics feedback.
- Contract review before merge.
- Bug reports with request ID and contract commit.
- No real student data or paid content in public fixtures.

## Shared rules

- No direct pushes to `main`.
- Contract changes are additive unless both leads approve a break.
- Backend deploys backward-compatible changes first; frontend deploys after.
- No admin/internal endpoints in the public contract.
- Decisions live in an ADR, contract changelog, or PR description.
