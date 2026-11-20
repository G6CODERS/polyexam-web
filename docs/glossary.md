# Glossary and naming

Use these terms consistently in code, tests, docs, and issues. French is for
user-facing copy; English is for code and API names.

## Domain terms

| Term                              | Meaning                                  | Code name              |
| --------------------------------- | ---------------------------------------- | ---------------------- |
| Filière / track                   | A study programme, e.g. computer science | `track`                |
| Niveau / level                    | A year or level within a track           | `level`                |
| Épreuve / paper                   | A past exam paper                        | `paper`                |
| Correction                        | A worked solution for a paper            | `correction`           |
| Tutoriel / tutorial               | A learning resource                      | `tutorial`             |
| Abonnement / plan                 | A purchasable access plan                | `plan`, `subscription` |
| Droit d'accès / entitlement       | What a student may access                | `entitlement`          |
| Catalogue                         | Publicly listable tracks/levels/papers   | `catalog`              |
| Demande de changement de parcours | Request to change track/level            | `pathChangeRequest`    |
| Bibliothèque de téléchargements   | Student download library                 | `downloadLibrary`      |
| Aperçu de document                | Document preview                         | `documentPreview`      |

## Naming rules

- API fields follow the OpenAPI contract; do not rename them in UI types.
- TypeScript types/interfaces: `PascalCase`.
- Functions/variables: `camelCase`.
- Components: `PascalCase`; files may be kebab-case.
- True constants: `SCREAMING_SNAKE_CASE`; derived values stay `camelCase`.
- Route segments: kebab-case and French where user-visible.
- Test names describe behavior, not implementation.

## Copy rules

- User-facing copy: French.
- Code, comments, commits, tests, and API names: English.
- Use `Intl` with `fr-CM` for dates and numbers when the product ships.
- Do not hardcode currency, dates, or pluralization in components.

If a term is missing, add it here before inventing a synonym.
