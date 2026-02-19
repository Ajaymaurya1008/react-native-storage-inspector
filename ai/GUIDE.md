# Development Guide for AI

Context and patterns for common tasks.

## What This Library Does

React Native/Expo debug UI for inspecting and editing key-value storage: MMKV, AsyncStorage, Keychain, Expo Secure Store. Renders as a full-page screen, not a modal.

## Public API (src/index.ts)

- `StorageInspector` (component) + `StorageInspectorProps`
- `strings`, `theme`, `Theme`
- `StorageItem`, `IStorageAdapter`
- Adapter factories: `createMMKVAdapter`, `createAsyncStorageAdapter`, `createKeychainAdapter`, `createSecureStoreAdapter`

## Storage-Specific Behavior

| Storage      | List keys                                                                  | Notes                                |
| ------------ | -------------------------------------------------------------------------- | ------------------------------------ |
| MMKV         | Native `.getAllKeys()`                                                     | Direct instance                      |
| AsyncStorage | Native API                                                                 | Works in Expo Go                     |
| Keychain     | `getAllGenericPasswordServices()` when available; else `keychainKeys` prop | No list API for internet credentials |
| Secure Store | `secureStoreKeys` prop                                                     | No list API                          |

## UI Patterns

- **Multiple sections open:** `expandedIndices: Set<number>`, not a single `expandedIndex`.
- **Icons:** Use `Icon` component. Rotation via `...(rotation ? [styles.rotated] : [])`.

## Adding a New Adapter

1. Create `src/adapters/your-storage.ts`.
2. Implement `IStorageAdapter`.
3. Add factory export to `src/index.ts`.
4. Wire availability check and section in `StorageInspector.tsx`.

## Testing

`storage-inspector-test` (sibling app) uses the library via `file:../`. Run with Expo to test.
