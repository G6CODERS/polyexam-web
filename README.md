# PolyExam Web

Public Next.js 16 frontend for **PolyExam v2**, the learning platform for
Polytech Douala students: past papers, corrections, tutorials, and subscriptions.

The backend, admin panel, payments, content, and the product as a whole are
private and proprietary. This repository is the public student client and is
licensed under the **MIT License**.

## Status

Scaffold. Product screens are intentionally not built yet. This repository
contains the Next.js foundation, public API contract, generated client/mocks,
CI, security, and contribution rails.

## Stack

| Layer         | Technology                                           |
| ------------- | ---------------------------------------------------- |
| Framework     | Next.js 16 (App Router, Turbopack, Cache Components) |
| UI            | React 19, TypeScript, Tailwind CSS 4                 |
| API client    | Orval-generated fetch client from OpenAPI 3.1        |
| Mocks         | MSW generated from the contract                      |
| Tests         | Vitest + Playwright                                  |
| Contract lint | Redocly + oasdiff                                    |
| CI            | GitHub Actions                                       |

## Quick start

Prerequisites: Node.js 24+ and npm 12+ (see `.nvmrc` and `package.json`).

```bash
npm ci
npm run setup
npm run dev
```

Open <http://localhost:3000>.

The app does not need the private backend for UI work. Generated MSW handlers
are checked in; runtime MSW wiring is documented in [`docs/status.md`](docs/status.md)
and is enabled by default in development.

## Scripts

```bash
npm run dev              # Next.js dev server
npm run build            # production build
npm run lint             # ESLint (zero warnings)
npm run typecheck        # TypeScript check
npm run test             # Vitest
npm run test:watch       # Vitest watch
npm run verify           # format + docs + lint + typecheck + test + build
npm run verify:fast      # format + docs + lint + typecheck + test
npm run verify:full      # verify + contract check + e2e
npm run contract         # regenerate client + MSW from the OpenAPI contract
npm run contract:check   # regenerate and fail on generated drift
npm run contract:lint    # Redocly lint
npm run e2e              # Playwright (install browsers first)
npm run format:check     # Prettier check
npm run docs:check       # docs links, commands, and AGENTS.md budget
npm run doctor           # diagnose the local environment
npm run hooks:install    # install .githooks (also runs on npm ci)
```

First Playwright run:

```bash
npx playwright install chromium
```

## For AI agents

Read [`AGENTS.md`](AGENTS.md) first, then [`docs/index.md`](docs/index.md) for
the relevant deep dive. Run `npm run verify` before opening a pull request.

## API contract

The student-facing contract is the source of truth:

```text
contracts/public.openapi.yaml
```

- It is public by design and contains no secrets.
- Admin/internal endpoints are not published; the admin is Filament in the
  private backend.
- `npm run contract` generates `src/lib/api/generated.ts` and MSW handlers.
- Contract changes require review from both frontend and backend maintainers.
- Breaking changes require an explicit label/approval and a deprecation or
  version decision.

See [docs/contract.md](docs/contract.md).

## Architecture

```text
Browser
  │ same-origin
  ▼
Next.js 16 (this repo)
  ├─ RSC / Server Actions ──► private Laravel API
  ├─ BFF session cookie
  └─ MSW mocks for contributors
```

- The browser never holds the Laravel token; the BFF does.
- No backend secrets, payment keys, student data, or paid content belong here.
- Cache only public catalog data; authenticated data must not go into a shared
  server cache.
- Admin UI lives in the private Filament panel, not this repo.

See [docs/architecture.md](docs/architecture.md).

## Contributing

- Fork → branch → pull request.
- Conventional Commits.
- One maintainer approval; CODEOWNERS review for contract changes.
- CI must pass: lint, typecheck, test, build, contract, security.
- No secrets or personal data in issues, fixtures, or screenshots.

See [CONTRIBUTING.md](CONTRIBUTING.md) and the organization-wide
[contributing guide](https://github.com/G6CODERS/.github/blob/main/CONTRIBUTING.md).

## Security

Report vulnerabilities privately via the organization policy:
<https://github.com/G6CODERS/.github/blob/main/SECURITY.md>.

## License

MIT. See [LICENSE](LICENSE). The PolyExam name, content, backend, admin, and
product are proprietary and are not licensed by this repository.
