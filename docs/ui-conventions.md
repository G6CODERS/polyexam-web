# UI conventions

## Server vs client

- Default to Server Components.
- Add `"use client"` only for hooks, events, browser APIs, or local state.
- Keep client boundaries at the leaves; pass serializable props.
- Never import server-only code into a Client Component.

## Data and mutations

| Need                            | Use                                                     |
| ------------------------------- | ------------------------------------------------------- |
| Read public catalog data        | Server Component + server API client                    |
| Mutate data                     | Server Action                                           |
| Browser-initiated BFF operation | Route Handler under `src/app/api/`                      |
| Webhook                         | Route Handler                                           |
| Optimistic redirect             | `proxy.ts` only; authorization stays at the data source |

- Do not fetch with client-side `useEffect` unless the interaction requires it.
- Do not add a client data library (SWR, React Query, Redux, Zustand) without an ADR.
- Browser requests go through the BFF; never expose Laravel tokens.

## UI states

Every data-driven view handles:

- loading
- empty
- error
- disabled/unauthorized when relevant

Use semantic status/alert roles so tests and assistive technology can find them.

## Accessibility

- Semantic HTML first; ARIA only when needed.
- Every input has a label; every icon-only button has an accessible name.
- Keyboard navigation and visible focus are required.
- Respect `prefers-reduced-motion`.
- Target WCAG 2.2 AA; test with keyboard and a screen reader when possible.

## Copy and language

- User-facing copy: French.
- Code, comments, tests, commits: English.
- Set `lang="fr"` on the root when French product copy ships.
- Use `Intl` for dates, numbers, and currency; no hardcoded formats.
- Never hardcode paid content or real student data in fixtures.

## Styling

- Tailwind CSS 4 is the styling layer.
- Define tokens in `src/app/globals.css`; do not scatter raw values.
- Prefer existing primitives over page-specific CSS.
- Keep components small and composable; split when a file exceeds ~200 lines.

## Metadata and SEO

- Use the Next.js Metadata API; add `generateMetadata` for dynamic pages.
- Every public page needs a title, description, canonical URL, and OpenGraph data.
- Public catalog pages eventually need structured data; do not add it speculatively.

## Errors

- Map RFC 9457 `Problem` responses to user-facing states.
- Never surface raw backend messages, stack traces, or request internals.
- Include a request ID in bug reports and logs when available.

See `design-system.md`, `security-model.md`, and `testing.md`.
