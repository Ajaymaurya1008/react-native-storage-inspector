# AI Rules: Must Follow

Hard rules when editing this codebase. Violate none.

## Imports

- Always use `@/` path alias. Never use relative imports (`../`, `./`) when crossing directories.
- Example: `import { theme } from '@/theme'` ✓ | `import { theme } from '../../theme'` ✗

## Strings

- All user-facing text must live in `src/strings.ts`. No hardcoded labels, placeholders, or messages in components.

## Constants

- Layout values (sizes, hitSlop, spacing) go in `src/constants.ts` under `LAYOUT`. No magic numbers in components or styles.

## Components

- Extract reusable UI (buttons, icon wrappers, action rows) into shared components. Reuse them; do not duplicate JSX.
- Use `IconButton` and `ItemRowActions` for shared button/action patterns.

## Styling

- Use `StyleSheet.create`. Reuse styles from `src/components/styles.ts` where applicable.
- For conditional styles (e.g. rotation): `...(condition ? [styles.x] : [])`; never `...(value && [styles.x])` when the value can be falsy.

## Adapters

- New storage backends implement `IStorageAdapter` from `src/adapters/types.ts`. Put adapters in `src/adapters/`.

## Commits

- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore`.
