# react-native-storage-inspector

Storage inspector for React Native and Expo apps. Inspect and edit key-value data in MMKV, AsyncStorage, Keychain, and Expo Secure Store.

**Use it as a full-page screen:** place `<StorageInspector />` on a page and it occupies the whole screen. No modal—the component fills its container.

## Supported storages

| Storage               | List keys                                  | Add / Edit / Delete | Expo Go        |
| --------------------- | ------------------------------------------ | ------------------- | -------------- |
| **MMKV**              | Yes                                        | Yes                 | No (dev build) |
| **Async Storage**     | Yes                                        | Yes                 | Yes            |
| **Keychain**          | Via `keychainKeys` prop or after adding    | Yes                 | No (dev build) |
| **Expo Secure Store** | Via `secureStoreKeys` prop or after adding | Yes                 | Yes            |

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

Use `StorageInspector` as a **full-page component**. Put it in a screen so it has full height (e.g. as the only child of a screen in your navigator, or inside a `View` with `flex: 1`).

```tsx
import { View } from 'react-native';
import { StorageInspector } from 'react-native-storage-inspector';
import { MMKV } from 'react-native-mmkv'; // if you use MMKV

const storage = new MMKV({ id: 'app-storage' });

// As a dedicated screen (e.g. in React Navigation stack):
export function StorageInspectorScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <StorageInspector
        onClose={() => navigation.goBack()}
        mmkvInstances={[storage]}
        keychainKeys={['auth-token', 'user-prefs']}
      />
    </View>
  );
}

// Or as the only content of a tab / root:
export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StorageInspector />
    </View>
  );
}
```

The component will fill the available space. Provide `onClose` if you want a back button (e.g. to pop the screen).

### Props

| Prop              | Type                | Description                                                                                                  |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------------ |
| `onClose`         | `() => void`        | Optional. If provided, a back button is shown and this is called when the user taps it (e.g. navigate back). |
| `mmkvInstances`   | `MMKV[]`            | Optional. MMKV instances to inspect.                                                                         |
| `keychainKeys`    | `string[]`          | Optional. Known Keychain keys to list (Keychain has no list API).                                            |
| `secureStoreKeys` | `string[]`          | Optional. Known Secure Store keys to list (expo-secure-store has no list API).                               |
| `customAdapters`  | `IStorageAdapter[]` | Optional. Custom adapters for other storages.                                                                |

Tabs for Async Storage, Keychain, and Expo Secure Store appear only when the corresponding package is installed.

## Expo

- **Expo Go**: Async Storage and Expo Secure Store work. MMKV and Keychain need native code and are not available in Expo Go.
- **Development build**: All four storages work with `expo-dev-client`.

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
npm run build        # Build src/ to dist/
```

- **Formatting:** No auto-format. Run `npm run format` to fix. **Pre-commit** runs `format:check`; **pre-push** runs `format:check` and `build`.
- **Commits:** Use [Conventional Commits](https://www.conventionalcommits.org/) (enforced by `commit-msg` hook).
- **Before publish:** `prepublishOnly` runs `format:check` then `build`—publish fails if any file is unformatted.

See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

## License

MIT
