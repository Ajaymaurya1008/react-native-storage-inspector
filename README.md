# react-native-storage-inspector

react-native-storage-inspector is a plug-and-play developer tool that empowers you to browse, search, and edit all your app’s persisted data.

## Supported libraries

Tabs appear only when the corresponding package is installed (optional peer dependencies).

| Library                                                                      | Package                                     | Storage      |
| ---------------------------------------------------------------------------- | ------------------------------------------- | ------------ |
| [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)           | `react-native-mmkv`                         | MMKV         |
| [Async Storage](https://github.com/react-native-async-storage/async-storage) | `@react-native-async-storage/async-storage` | AsyncStorage |
| [react-native-keychain](https://github.com/oblador/react-native-keychain)    | `react-native-keychain`                     | Keychain     |
| [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/)  | `expo-secure-store`                         | Secure Store |

## Installation

Install the inspector and at least one storage library you use:

```bash
npm install react-native-storage-inspector
# And one or more:
npm install react-native-mmkv
npm install @react-native-async-storage/async-storage
npm install react-native-keychain
npm install expo-secure-store
```

## Usage

Use `StorageInspector` as a **full-page component**. It renders only the content area, no header, back button, or status bar. The consumer screen must handle those.

Put it in a screen with `flex: 1`, and wrap with `SafeAreaView` (or your nav's safe area) so it respects status bar and notches.

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

The component fills its container. The consumer is responsible for header, back button, and status bar (via SafeAreaView or your navigation setup).

### Props

| Prop              | Type                | Description                                                                                                                   |
| ----------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `mmkvInstances`   | `MMKV[]`            | **Required for MMKV.** Pass your MMKV instances to inspect.                                                                   |
| `secureStoreKeys` | `string[]`          | **Required for Secure Store.** Keys to list (no list API).                                                                    |
| `keychainKeys`    | `string[]`          | Optional. Only for internet credentials (no list API). Generic passwords auto-discovered via `getAllGenericPasswordServices`. |
| `customAdapters`  | `IStorageAdapter[]` | Optional. Custom adapters for other storages.                                                                                 |

## Expo

- **Expo Go**: Async Storage and Expo Secure Store work. MMKV and Keychain need native code and are not available in Expo Go.
- **Development build**: All four storages work with `expo-dev-client`.

## Troubleshooting

If you see **"Requiring unknown module"** for optional storage packages (AsyncStorage, Keychain, Secure Store), add to your `metro.config.js`:

```js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
config.transformer ??= {};
config.transformer.allowOptionalDependencies = true;
module.exports = config;
```

## API (for custom adapters)

Implement `IStorageAdapter` and pass it via `customAdapters`:

```ts
interface IStorageAdapter {
  type: string;
  name: string;
  getAllKeys(): Promise<string[]>;
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  isAvailable(): boolean;
}
```

## Development

```bash
npm run format       # Format all files with Prettier
npm run format:check # Check formatting (fails if any file is unformatted)
npm run lint         # Same as format:check
npm test             # Run tests
npm run build        # Build src/ to dist/
```

- **Formatting:** No auto-format. Run `npm run format` to fix. **Pre-commit** runs `format:check`; **pre-push** runs `format:check`, `test`, and `build`.
- **Commits:** Use [Conventional Commits](https://www.conventionalcommits.org/) (enforced by `commit-msg` hook).
- **Before publish:** `prepublishOnly` runs `format:check`, `test`, and `build`.

### Publishing

1. Run `npm version patch` (or `minor`/`major`).
2. Run `npm publish` (prepublishOnly will run checks and build).

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for full guidelines. [Code of Conduct](docs/CODE_OF_CONDUCT.md).

For AI assistants: see [ai/PRIMER.md](ai/PRIMER.md).

## License

MIT
