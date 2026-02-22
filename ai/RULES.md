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
- **Props:** Always declare component props as a single parameter and destructure inside the body:
  - `function MyComponent(props: MyComponentProps) { const { a, b } = props; ... }`
  - Do not destructure in the parameter list: `function MyComponent({ a, b }: MyComponentProps)` ✗

## Styling

- Use `StyleSheet.create`. Keep styles in the same file as the component, below the component.
- For conditional styles (e.g. rotation): `...(condition ? [styles.x] : [])`; never `...(value && [styles.x])` when the value can be falsy.

## Adapters

- New storage backends implement `IStorageAdapter` from `src/adapters/types.ts`. Put adapters in `src/adapters/`.

## Commits

- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore`.
