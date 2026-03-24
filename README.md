# react-native-storage-inspector

react-native-storage-inspector is a plug-and-play developer tool that empowers you to browse, search, and edit all your app's persisted data.

## Supported libraries

Tabs appear only when the corresponding package is installed (optional peer dependencies).

| Library                                                                      | Package                                     | Storage      |
| ---------------------------------------------------------------------------- | ------------------------------------------- | ------------ |
| [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)           | `react-native-mmkv`                         | MMKV         |
| [Async Storage](https://github.com/react-native-async-storage/async-storage) | `@react-native-async-storage/async-storage` | AsyncStorage |
| [react-native-keychain](https://github.com/oblador/react-native-keychain)    | `react-native-keychain`                     | Keychain     |
| [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/)  | `expo-secure-store`                         | Secure Store |

## Installation

```bash
npm install react-native-storage-inspector
```

Then install one or more storage libraries above. See [Installation docs](website/docs/installation.md) for yarn/pnpm and peer dependency notes.

## Usage

```tsx
import { SafeAreaView } from 'react-native';
import { StorageInspector } from 'react-native-storage-inspector';

export function StorageInspectorScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StorageInspector />
    </SafeAreaView>
  );
}
```

The component fills its container. Wrap with `SafeAreaView` and provide a header/back button via your navigation setup.

For full usage, props, Expo support, custom adapters, and troubleshooting: see the **[Documentation](#documentation)** section below.

## Documentation

Full docs are built with [Docusaurus](https://docusaurus.io) and cover installation, usage, all supported storages, API reference, Expo, custom adapters, troubleshooting, and examples:

```bash
cd website && npm install && npm run start
```

Key pages (also readable as Markdown in [`website/docs/`](website/docs/)):

| Topic           | File                                                               |
| --------------- | ------------------------------------------------------------------ |
| Installation    | [website/docs/installation.md](website/docs/installation.md)       |
| Usage & props   | [website/docs/usage.md](website/docs/usage.md)                     |
| Storages        | [website/docs/storages/](website/docs/storages/)                   |
| API reference   | [website/docs/api/](website/docs/api/)                             |
| Expo            | [website/docs/expo.md](website/docs/expo.md)                       |
| Custom adapters | [website/docs/custom-adapters.md](website/docs/custom-adapters.md) |
| Troubleshooting | [website/docs/troubleshooting.md](website/docs/troubleshooting.md) |
| Examples        | [website/docs/examples.md](website/docs/examples.md)               |

## Development & Contributing

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for setup, git hooks, commit format, CI, and PR process.

Key commands:

```bash
npm run commit       # Guided commit (Commitizen)
npm run format       # Format all files with Prettier
npm test             # Run tests
npm run build        # Build src/ to dist/
```

Releases are automated by **semantic-release** on push to `main`. See [docs/RELEASES.md](docs/RELEASES.md).

[Code of Conduct](docs/CODE_OF_CONDUCT.md) · For AI assistants: [ai/PRIMER.md](ai/PRIMER.md)

## License

MIT
