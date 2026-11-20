# Repository map

Use this as a lookup table, not a reading assignment. `AGENTS.md` has the short
version.

## Tree

```text
.
├── AGENTS.md                 # always-on agent instructions
├── README.md                 # human quick start
├── CONTRIBUTING.md           # contribution workflow
├── contracts/
│   ├── AGENTS.md             # contract-specific rules
│   └── public.openapi.yaml   # public API source of truth
├── docs/                     # deep dives, ADRs, recipes, evals
├── e2e/                      # Playwright tests
├── public/                   # static assets + MSW worker
├── scripts/                  # verification, doctor, hooks, PR policy
├── src/
│   ├── app/                  # App Router routes, layouts, handlers
│   ├── components/           # shared UI (when the design system starts)
│   ├── lib/
│   │   ├── api/              # generated Orval client/models/mocks
│   │   ├── env.ts            # server/client env validation (Phase 2)
│   │   └── contract.test.ts  # contract invariants
│   └── mocks/                # MSW browser/server wiring (Phase 2)
└── .github/                  # CI, issue/PR templates, CODEOWNERS
```

## Where to add things

| Task                    | Location                                  | Read first                       |
| ----------------------- | ----------------------------------------- | -------------------------------- |
| New route/page          | `src/app/<segment>/page.tsx`              | `ui-conventions.md`, `nextjs.md` |
| Layout                  | `src/app/<segment>/layout.tsx`            | `nextjs.md`                      |
| Route Handler / BFF     | `src/app/api/<name>/route.ts`             | `api-client.md`, `nextjs.md`     |
| Server Action           | `src/app/<segment>/actions.ts`            | `ui-conventions.md`              |
| Shared component        | `src/components/<name>.tsx`               | `design-system.md`               |
| Utility                 | `src/lib/<name>.ts`                       | `ui-conventions.md`              |
| Generated client change | `contracts/public.openapi.yaml`           | `contract.md`                    |
| Test                    | Colocate as `*.test.ts(x)`; e2e in `e2e/` | `testing.md`                     |
| MSW handler override    | `src/mocks/handlers.ts`                   | `testing.md`                     |
| Docs                    | `docs/<topic>.md` + `docs/index.md`       | `index.md`                       |
| Durable decision        | `docs/adr/NNNN-<slug>.md`                 | `adr/README.md`                  |

## Do not edit

- `src/lib/api/generated.ts`
- `src/lib/api/generated.msw.ts`
- `src/lib/api/generated.faker.ts`
- `src/lib/api/model/**`
- `public/mockServiceWorker.js`
- `package-lock.json` by hand

Run the generator or the package manager instead.

## Generated files

| File                             | Generator | Command                       |
| -------------------------------- | --------- | ----------------------------- |
| `src/lib/api/generated.ts`       | Orval     | `npm run contract`            |
| `src/lib/api/model/**`           | Orval     | `npm run contract`            |
| `src/lib/api/generated.msw.ts`   | Orval     | `npm run contract`            |
| `src/lib/api/generated.faker.ts` | Orval     | `npm run contract`            |
| `public/mockServiceWorker.js`    | MSW       | `npx msw init public/ --save` |
