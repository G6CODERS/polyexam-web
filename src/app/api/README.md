# BFF route handlers

Browser-initiated BFF operations and webhooks live here. Keep product pages and
Server Actions outside this directory.

- The browser never holds a Laravel token.
- The BFF owns the HttpOnly session cookie.
- Validate inputs and map Laravel `Problem` responses.
- Do not cache authenticated data in a shared server cache.
- See `docs/api-client.md`, `docs/security-model.md`, and
  `docs/nextjs.md`.
