# Contributing to PolyExam Web

Thanks for helping. This is the public student client; the backend, admin, and
content are private.

## Workflow

1. Fork the repository.
2. Create a short-lived branch:
   - `feat/<slug>`
   - `fix/<slug>`
   - `chore/<slug>`
   - `docs/<slug>`
   - `contract/<slug>`
3. Use [Conventional Commits](https://www.conventionalcommits.org/).
4. Open a pull request against `main` and fill the template.
5. Wait for CI and one maintainer approval.
6. A maintainer squash-merges and deletes the branch.

Maintainers also use pull requests; nobody pushes directly to `main`.

## Local setup

```bash
npm ci
cp .env.example .env.local
npm run dev
```

You do not need access to the private backend. Use the generated MSW handlers
and fixtures for UI work.

## Contract changes

The public contract is `contracts/public.openapi.yaml`.

- Run `npm run contract` after editing it.
- Commit the regenerated client and MSW handlers.
- `npm run contract:check` must pass in CI.
- Contract PRs need review from both frontend and backend maintainers.
- Do not add admin/internal endpoints or secrets to the public contract.

## Quality bar

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- No secrets, `.env` files, real student data, paid PDFs, or private screenshots.
- New UI should be responsive and accessible; include loading/empty/error states.
- Public fixtures must be synthetic.

## Security

Do not open a public issue for a vulnerability. Follow
<https://github.com/G6CODERS/.github/blob/main/SECURITY.md>.
