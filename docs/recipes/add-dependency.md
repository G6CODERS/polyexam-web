# Add a dependency

Use rarely. Prefer platform APIs and existing dependencies.

1. Open an issue/ADR explaining the problem and why existing tools are not enough.
2. Check bundle impact, maintenance status, license, and security history.
3. Prefer a dev dependency for tooling; runtime dependencies need extra scrutiny.
4. Install with the package manager; do not hand-edit `package-lock.json`.
5. Run `npm run verify` and `npm audit --omit=dev --audit-level=high`.
6. Document the decision in the PR.
7. If it changes an architectural boundary, add an ADR.

Do not add a client data library, state manager, or UI kit without an ADR.

## Acceptance

- The PR explains the alternative considered.
- Lockfile is committed.
- Build size impact is understood.
- No duplicate functionality with an existing dependency.
