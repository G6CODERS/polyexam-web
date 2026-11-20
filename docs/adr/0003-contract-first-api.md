# 0003 — Contract-first API

- Status: accepted
- Date: 2026-11-20

## Context

The backend is private; the public repo needs a stable, typed interface and
deterministic mocks for contributors and agents.

## Decision

`contracts/public.openapi.yaml` is the source of truth. Orval generates the
fetch client, models, MSW handlers, and Faker factories. Generated output is
committed; CI fails on drift. MSW uses contract examples where available.

## Consequences

- Contract changes require frontend and backend review.
- Operation IDs are stable API.
- Generated files are never hand-edited.
- Public mocks and examples must be synthetic.

## Alternatives considered

Hand-written client (rejected: drift), backend-generated SDK (rejected:
couples the public repo to private code), runtime-only mocks (rejected: no
contract verification).
