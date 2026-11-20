# Add a route or page

Use when adding a user-facing or system route.

1. Check `docs/status.md` and confirm the work is allowed in the scaffold phase.
2. Read `docs/ui-conventions.md` and `docs/nextjs.md`.
3. Create `src/app/<segment>/page.tsx` (and `layout.tsx` if needed).
4. Default to a Server Component; add `"use client"` only at leaves.
5. Add `loading.tsx`, `error.tsx`, or `not-found.tsx` when relevant.
6. Add metadata from the Next.js Metadata API.
7. Handle loading, empty, error, and disabled states.
8. Add a component or e2e test for the behavior.
9. Run `npm run verify`.
10. Update `docs/status.md` if the route changes the project status.

Do not invent product routes without an issue/ADR.

## Acceptance

- Route renders with French user-facing copy.
- No client-side token handling.
- No authenticated data in a shared cache.
- Keyboard and screen-reader basics work.
- Tests cover the happy path and at least one failure state.
