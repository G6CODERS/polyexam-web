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
4. Keep the PR small: at most 400 code lines and 20 code files. If it cannot be
   split, add the `size:large` label and justify it in the PR.
5. Open a pull request against `main` and fill the template with commands run
   and output.
6. Wait for CI and one maintainer approval.
7. A maintainer squash-merges and deletes the branch.

Maintainers also use pull requests; nobody pushes directly to `main`.

## Local setup

```bash
npm ci
npm run setup
npm run dev
```

You do not need access to the private backend. Use the generated MSW handlers
and fixtures for UI work.

Local git hooks are installed by `npm ci`. They block `.env` files, hand-edited
generated code, and unformatted staged files. They can be bypassed with
`--no-verify`, but CI is the hard gate.

## Quality bar

```bash
npm run verify
npm run format:check
npm run docs:check
npm run contract:check   # when the contract changed
npm run e2e              # when a journey changed
```

- No secrets, `.env` files, real student data, paid PDFs, or private screenshots.
- New UI should be responsive and accessible; include loading/empty/error states.
- Public fixtures must be synthetic.
- Update docs/status when behavior or commands change.

## Working with agents

AI-assisted contributions are welcome and held to the same bar.

- Read [`AGENTS.md`](AGENTS.md) first; it is the canonical instruction file.
- Use [`docs/index.md`](docs/index.md) to find the relevant deep dive.
- Do not let an agent edit generated files; run `npm run contract`.
- Do not let an agent read `.env` files or add dependencies casually.
- Review the diff, tests, and evidence—not the agent's summary.
- Disclose agent assistance in the PR if it materially shaped the change.

See [`docs/working-with-agents.md`](docs/working-with-agents.md).

## Contract changes

The public contract is `contracts/public.openapi.yaml`.

- Run `npm run contract` after editing it.
- Commit the regenerated client and MSW handlers.
- `npm run contract:check` must pass in CI.
- Contract PRs need review from both frontend and backend maintainers.
- Do not add admin/internal endpoints or secrets to the public contract.

## Security

Do not open a public issue for a vulnerability. Follow
<https://github.com/G6CODERS/.github/blob/main/SECURITY.md>.
