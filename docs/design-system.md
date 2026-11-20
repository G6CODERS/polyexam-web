# Design system

The visual system is not fully implemented yet. This is the collaboration
contract for the frontend team.

## Current vs target

- **Current:** Tailwind 4, a small token layer in `src/app/globals.css`, one
  scaffold page.
- **Target:** documented tokens, accessible primitives, component stories, and
  visual regression.

## Rules

- Tailwind CSS 4 is the styling layer.
- Prefer accessible, composable components over page-specific CSS.
- Every component has loading, empty, error, and disabled states where relevant.
- Use semantic HTML and keyboard-accessible interactions.
- French user-facing copy; English component/API names.
- Do not include real exam content or student data in stories/fixtures.
- Publish Storybook to GitHub Pages when the component library exists.

## Tokens

Define color, spacing, typography, radius, and motion tokens in
`src/app/globals.css` before building pages. Do not scatter raw values across
components. Use `@theme` variables and Tailwind utilities.

## Components

- Default to Server Components; add `"use client"` only at leaves.
- Named exports; explicit props; no `any`.
- Keep files under ~200 lines; extract subcomponents.
- Colocate tests and stories when the component library starts.
- Use `Intl` for dates/numbers; no hardcoded formats.

## Review

- Design review happens on the public repo with screenshots.
- Accessibility is part of the PR checklist, not a later audit.
- New primitives need a usage example and a test.

See [ui-conventions.md](ui-conventions.md) and
[ADR 0001](adr/0001-nextjs-app-router.md).
