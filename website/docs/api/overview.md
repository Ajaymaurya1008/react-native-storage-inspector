---
sidebar_position: 1
---

# API overview

The library exposes:

- **Components:** `StorageInspector`, the main UI.
- **Types:** `StorageInspectorProps`, `IStorageAdapter`, `StorageItem`, `Theme`, and adapter-specific types.
- **Adapter factories:** `createMMKVAdapter`, `createAsyncStorageAdapter`, `createKeychainAdapter`, `createSecureStoreAdapter` (used internally; you can use them for custom flows).
- **Theme and strings:** `theme`, `strings` for optional customization.

## Exports

```ts
// Component and props
export { StorageInspector } from 'react-native-storage-inspector';
export type { StorageInspectorProps } from 'react-native-storage-inspector';

// Types
export type { StorageItem, IStorageAdapter } from 'react-native-storage-inspector';

// MMKV
export { createMMKVAdapter, type MMKVInstance } from 'react-native-storage-inspector';

// Async Storage
export {
  createAsyncStorageAdapter,
  type AsyncStorageModule,
} from 'react-native-storage-inspector';

// Keychain
export {
  createKeychainAdapter,
  type KeychainModule,
} from 'react-native-storage-inspector';

// Secure Store
export {
  createSecureStoreAdapter,
  type SecureStoreModule,
} from 'react-native-storage-inspector';

// Theme and strings
export { theme, strings } from 'react-native-storage-inspector';
export type { Theme } from 'react-native-storage-inspector';
```

Next:

- [StorageInspector props](/docs/api/storage-inspector-props)
- [IStorageAdapter](/docs/api/i-storage-adapter)
- [Adapter factories](/docs/api/adapter-factories)
- [Theme and strings](/docs/api/theme-and-strings)
