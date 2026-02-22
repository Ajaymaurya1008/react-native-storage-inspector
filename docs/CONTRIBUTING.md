# Contributing to react-native-storage-inspector

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository and clone it locally.
2. Run `npm install` in the project root.
3. Run `npm run build` to ensure the project builds.

## Development

- **Format:** All code is formatted with [Prettier](https://prettier.io/). Run `npm run format` before committing.
- **Component props:** Use a single `props` parameter and destructure inside the body: `function MyComponent(props: MyComponentProps) { const { a, b } = props; ... }`. Do not destructure in the parameter list.
- **Test:** Run `npm test` before pushing.
- **Build:** The library is built with [tsup](https://tsup.egoist.dev/). Run `npm run build` to build.

## Git Hooks

The project uses [Husky](https://typicode.github.io/husky/) for Git hooks:

- **pre-commit:** Runs `format:check`; commit is blocked if any file is unformatted.
- **commit-msg:** Validates commit messages with [commitlint](https://commitlint.js.org/) (conventional commits).
- **pre-push:** Runs `format:check`, `test`, and `build`; push is blocked if any fail.

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/) for clear and machine-readable history. Format:

```
<type>(<scope>): <subject>

[optional body]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

**Examples:**

- `feat: add support for custom storage adapters`
- `fix(ui): correct chevron rotation on Android`
- `docs: update installation instructions`
- `chore(deps): update prettier to v3.9`

## Pull Requests

1. Create a branch from `main` for your work.
2. Make your changes and ensure they pass `npm run format:check`, `npm test`, and `npm run build`.
3. Commit with conventional commit messages.
4. Open a pull request. Use the [PR template](../.github/PULL_REQUEST_TEMPLATE.md); it will pre-fill when you open a new PR on GitHub.
5. Ensure CI passes (if applicable).

## Testing

The `storage-inspector-test` app in the monorepo can be used to manually verify changes. Run it with Expo and test the inspector with different storage backends.

## Questions?

Feel free to open an issue for questions or discussions.
