# Design system

The visual system is not implemented yet. This is the collaboration contract for
the frontend team.

## Rules

- Tailwind CSS 4 is the styling layer.
- Prefer accessible, composable components over page-specific CSS.
- Every component has loading, empty, error, and disabled states where relevant.
- Use semantic HTML and keyboard-accessible interactions.
- French user-facing copy; English component/API names.
- Do not include real exam content or student data in Storybook/fixtures.
- Publish Storybook to GitHub Pages when the component library exists.

## Tokens

Define color, spacing, typography, radius, and motion tokens in one place before
building pages. Do not scatter raw values across components.

## Review

- Design review happens on the public repo with screenshots.
- Accessibility is part of the PR checklist, not a later audit.
