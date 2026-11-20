# GitHub Copilot instructions

Read `AGENTS.md` and `docs/index.md` first. They are the source of truth.

- Never edit `src/lib/api/generated*` or `src/lib/api/model/**`; run
  `npm run contract`.
- Run `npm run verify` before proposing a PR.
- Keep changes small and reviewable.
- Do not add secrets, `.env` files, real student data, or paid content.
