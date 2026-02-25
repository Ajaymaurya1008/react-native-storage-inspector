---
sidebar_position: 13
---

# Contributing

Thank you for your interest in contributing to react-native-storage-inspector. Below is a short overview; the full guidelines are in the repo: [CONTRIBUTING.md](https://github.com/Ajaymaurya1008/react-native-storage-inspector/blob/main/docs/CONTRIBUTING.md).

## Getting started

1. Fork the repository and clone it locally.
2. Run `npm install` in the project root.
3. Run `npm run build` to ensure the project builds.

## Examples

Use the runnable examples under `examples/` to verify the inspector:

- **expo-example** — From `examples/expo-example`: `npm install` then `npx expo start`.
- **community-cli-example** — From `examples/community-cli-example`: `npm install`, then `npm start` and `npm run ios` or `npm run android` (iOS: run `bundle install` and `bundle exec pod install` once).

## Development

- **Format:** Prettier. Run `npm run format` before committing. The pre-commit hook runs `format:check`.
- **Tests:** `npm test` (Jest).
- **Build:** `npm run build` (tsup).

## Git hooks (Husky)

| Hook       | Command                   | Effect                                                                                   |
| ---------- | ------------------------- | ---------------------------------------------------------------------------------------- |
| pre-commit | `npm run format:check`    | Commit blocked if files are unformatted.                                                 |
| commit-msg | `commitlint --edit $1`    | Commit message must follow [Conventional Commits](https://www.conventionalcommits.org/). |
| pre-push   | format:check, test, build | Push blocked if any fail.                                                                |

Use `npm run commit` for a guided commit (Commitizen).

## Commit format

```
<type>(<scope>): <subject>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

**Examples:**

- `feat: add support for custom storage adapters`
- `fix(ui): correct chevron rotation on Android`
- `docs: update installation instructions`

## Pull requests

1. Create a branch from `main`.
2. Make your changes; ensure `npm run format:check`, `npm test`, and `npm run build` pass.
3. Commit with conventional commit messages.
4. Open a pull request. Ensure CI passes.

For full details, code style, and CI, see [CONTRIBUTING.md](https://github.com/Ajaymaurya1008/react-native-storage-inspector/blob/main/docs/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](https://github.com/Ajaymaurya1008/react-native-storage-inspector/blob/main/docs/CODE_OF_CONDUCT.md).
