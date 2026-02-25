---
sidebar_position: 2
---

# StorageInspector props

`StorageInspector` accepts a single props object with optional fields.

## Type

```ts
interface StorageInspectorProps {
  /** Raw MMKV instances from createMMKV() (react-native-mmkv). */
  mmkvInstances?: MMKVInstance[];
  /** Known keys for Secure Store (no list API). Merged with keys persisted by the inspector. */
  secureStoreKeys?: string[];
  /** Custom adapters for other storages. */
  customAdapters?: IStorageAdapter[];
}
```

## Props

| Prop              | Type                | Description                                                                                                                                                         |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mmkvInstances`   | `MMKVInstance[]`    | **Required for MMKV.** Pass your MMKV instances from `createMMKV()`. Each instance gets its own section (e.g. "MMKV", "MMKV 2"). Omit or empty array = no MMKV tab. |
| `secureStoreKeys` | `string[]`          | Optional. List of key names for Expo Secure Store. Merged with keys the inspector persists. Use when you know keys that aren’t yet in the persisted list.           |
| `customAdapters`  | `IStorageAdapter[]` | Optional. Custom adapters implementing [IStorageAdapter](/docs/api/i-storage-adapter). They appear as additional tabs, sorted by name with built-in storages.       |

## Example

```tsx
<StorageInspector
  mmkvInstances={[appStorage, cacheStorage]}
  secureStoreKeys={['auth_token', 'refresh_token']}
  customAdapters={[myCustomAdapter]}
/>
```
