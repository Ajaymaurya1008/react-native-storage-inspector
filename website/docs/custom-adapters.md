---
sidebar_position: 9
---

# Custom adapters

You can add your own storage backends by implementing [IStorageAdapter](/docs/api/i-storage-adapter) and passing adapters in `customAdapters`.

## Implement IStorageAdapter

```ts
import type { IStorageAdapter } from 'react-native-storage-inspector';

function createMyStorageAdapter(): IStorageAdapter {
  return {
    type: 'my-storage',
    name: 'My Storage',
    async getAllKeys() {
      // Return all keys in your store
      return await myStorage.getAllKeys();
    },
    async getItem(key: string) {
      const value = await myStorage.get(key);
      return value ?? null;
    },
    async setItem(key: string, value: string) {
      await myStorage.set(key, value);
    },
    async removeItem(key: string) {
      await myStorage.delete(key);
    },
    isAvailable() {
      return myStorage != null;
    },
  };
}
```

## Pass to StorageInspector

```tsx
const adapter = createMyStorageAdapter();

<StorageInspector mmkvInstances={[storage]} customAdapters={[adapter]} />;
```

Custom adapters appear as additional tabs, sorted by `name` together with built-in storages (MMKV, Async Storage, etc.).

## Rules

- **Values are strings.** The inspector reads and writes string values. If your backend stores JSON or other formats, serialize/deserialize inside `getItem` / `setItem`.
- **isAvailable()**: Return `false` when the backend is not usable (e.g. not initialized); the adapter will be hidden.
- **Errors**: Throwing from `getAllKeys`, `getItem`, `setItem`, or `removeItem` will surface in the UI; handle errors appropriately so the inspector can show a clear message.
