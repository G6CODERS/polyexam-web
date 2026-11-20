# Add a component

Use when adding a reusable UI primitive or composed component.

1. Read `docs/design-system.md` and `docs/ui-conventions.md`.
2. Check whether an existing primitive can be composed instead.
3. Put shared components in `src/components/`; colocate page-only ones.
4. Use named exports and the `@/` alias.
5. Keep it a Server Component unless it needs client behavior.
6. Define props explicitly; avoid `any`.
7. Handle loading, empty, error, and disabled states where relevant.
8. Use semantic HTML, labels, focus, and contrast.
9. Add a test for behavior and states.
10. Run `npm run verify`.

Use tokens from `src/app/globals.css`; do not scatter raw values.

## Acceptance

- Accessible name and keyboard behavior are covered.
- States are tested.
- No client bundle increase without a reason.
- No product-specific copy hardcoded outside the component.
