# Contributing to react-native-storage-inspector

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository and clone it locally.
2. Run `npm install` in the project root.
3. Run `npm run build` to ensure the project builds.

## Examples

The repo includes runnable examples under `examples/`:

- **expo-example**: Expo app. From `examples/expo-example`: `npm install` then `npx expo start`. Use a dev build or Expo Go to try the inspector.
- **community-cli-example**: React Native CLI app. From `examples/community-cli-example`: `npm install`, then `npm start` in one terminal and `npm run ios` or `npm run android` in another. For iOS, run `bundle install` and `bundle exec pod install` once.

Use these to manually verify the inspector with different storage backends (MMKV, Async Storage, etc.) before opening a PR.

## Development

- **Format:** All code is formatted with [Prettier](https://prettier.io/). Run `npm run format` before committing. The pre-commit hook runs `format:check` and blocks commits when files are unformatted.
- **Component props:** Use a single `props` parameter and destructure inside the body: `function MyComponent(props: MyComponentProps) { const { a, b } = props; ... }`. Do not destructure in the parameter list.
- **Test:** Run `npm test` before pushing.
- **Build:** The library is built with [tsup](https://tsup.egoist.dev/). Run `npm run build` to build.

## Git Hooks (Husky)

The project uses [Husky](https://typicode.github.io/husky/) for Git hooks:

| Hook           | Command                                 | Effect                                                                                   |
| -------------- | --------------------------------------- | ---------------------------------------------------------------------------------------- |
| **pre-commit** | `npm run format:check`                  | Commit is blocked if any file is unformatted.                                            |
| **commit-msg** | `npx commitlint --edit $1`              | Commit message must follow [Conventional Commits](https://www.conventionalcommits.org/). |
| **pre-push**   | `format:check` then `test` then `build` | Push is blocked if format check, tests, or build fail.                                   |

Fix format with `npm run format`. Use `npm run commit` for a guided commit (Commitizen).

## CI

GitHub Actions runs on every push and pull request to `main` (see [.github/workflows/ci.yml](../.github/workflows/ci.yml)):

1. `npm ci`
2. `npm run format:check`
3. `npm test`
4. `npm run build`

All steps must pass for PRs to be merged. Run the same commands locally before pushing.

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
2. Make your changes and ensure they pass `npm run format:check`, `npm test`, and `npm run build` (same as CI and the pre-push hook).
3. Commit with conventional commit messages (use `npm run commit` or follow the format enforced by commitlint).
4. Open a pull request. Use the [PR template](../.github/PULL_REQUEST_TEMPLATE.md); it will pre-fill when you open a new PR on GitHub.
5. Ensure CI passes on your PR (format:check, test, build).

## Testing

- **Unit tests:** `npm test` (Jest). CI and the pre-push hook run this.
- **Manual testing:** Use the apps in `examples/` (see [Examples](#examples) above) to verify the inspector with MMKV, Async Storage, Keychain, or Secure Store before submitting a PR.

## Questions?

Feel free to open an issue for questions or discussions.
