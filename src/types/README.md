# Type Boundaries

This folder is **not** a global dumping ground for every type.

## What belongs in `src/types`

- Shared, stable **domain** types used across multiple features
- Canonical business language (for this repo, under `src/types/domain/*`)

## What does not belong here

- Feature-only data contracts
- Component prop types

## Placement rules

1. Put shared business/domain types in `src/types/domain/*`.
2. Keep feature-specific contracts inside their feature folders.
3. Keep component prop types local to the component file.

## Promotion rule

Promote a type into `src/types/domain/*` only when:

- It is used by multiple features, and
- It represents stable domain language (not UI wiring details).
