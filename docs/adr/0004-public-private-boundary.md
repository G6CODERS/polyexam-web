# 0004 — Public/private repository boundary

- Status: accepted
- Date: 2026-11-20

## Context

The student client is public and MIT-licensed. The backend, admin, payments,
content, and student data are proprietary and private.

## Decision

This repository contains only the public student client, public API contract,
synthetic fixtures, and collaboration docs. Admin remains Filament in the
private backend. No private endpoints, secrets, real data, or paid content enter
this repo.

## Consequences

- Public issues/PRs must never include private logs or data.
- The contract contains no admin/internal endpoints.
- Contributors do not need backend access; MSW is the default local path.

## Alternatives considered

Private monorepo (rejected: loses open collaboration), public backend
(rejected: exposes proprietary domain and data).
