## What changed and why

<!-- Link the issue and explain the problem. Keep it one logical change. -->

Closes #

## Size and scope

- Code lines changed: <!-- from the pr-size check -->
- Code files changed:

## Size justification

<!-- Required only if over the limit. Explain why the change cannot be split. -->

## API contract

- Contract changed: Yes / No
- If yes, note additive/breaking and link the contract issue/PR:
- Generated client + MSW updated: Yes / No / N/A

## How it was verified

```text
# Paste the commands you ran and the result summary.
```

- [ ] `npm run verify` passes
- [ ] `npm run contract:check` passes when the contract changed
- [ ] `npm run docs:check` passes when docs changed
- [ ] E2E passes when a user journey changed

## Screenshots

<!-- Remove secrets, personal data, and paid content. -->

## Risk and rollback

<!-- What could break? How do we revert safely? -->

## Agent assistance

<!-- Optional: which agent/tool, and what you reviewed manually. -->

## Checklist

- [ ] The PR title follows Conventional Commits.
- [ ] The PR is small and reviewable, or `size:large` is justified.
- [ ] Tests were added or updated for behavior changes.
- [ ] Loading, empty, error, and disabled states are handled.
- [ ] Accessibility was considered (keyboard, labels, focus, contrast).
- [ ] No secrets, `.env` files, real student data, or paid PDFs are committed.
- [ ] Generated files were produced by `npm run contract`, not edited by hand.
- [ ] Docs/status were updated when behavior or commands changed.
- [ ] I did not push directly to `main` or force-push.
