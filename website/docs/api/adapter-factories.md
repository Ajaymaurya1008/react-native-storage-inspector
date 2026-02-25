---
sidebar_position: 4
---

# Adapter factories

The library provides factory functions that return `IStorageAdapter` for each built-in storage. `StorageInspector` uses them internally; you only need to call them if you build a custom inspector or wrap an adapter.

## createMMKVAdapter

```ts
function createMMKVAdapter(instance: MMKVInstance, name?: string): IStorageAdapter;
```

- **instance:** Raw MMKV instance from `createMMKV()` (react-native-mmkv).
- **name:** Optional label (default `'MMKV'`). Use different names when passing multiple instances (e.g. `'MMKV 1'`, `'MMKV 2'`).

**MMKVInstance** (shape expected from react-native-mmkv):

```ts
type MMKVInstance = {
  getAllKeys(): string[];
  getString(key: string): string | undefined;
  set(key: string, value: string | number | boolean): void;
  remove(key: string): void | boolean;
};
```

## createAsyncStorageAdapter

```ts
function createAsyncStorageAdapter(): IStorageAdapter;
```

- No arguments. Uses `@react-native-async-storage/async-storage` if installed.
- `isAvailable()` is `true` only when the package is present.

## createKeychainAdapter

```ts
function createKeychainAdapter(): IStorageAdapter;
```

- No arguments. Uses `react-native-keychain` (generic password API) if installed.

## createSecureStoreAdapter

```ts
function createSecureStoreAdapter(knownKeys: string[] = []): IStorageAdapter;
```

- **knownKeys:** Keys to merge with the list the inspector persists in Secure Store (expo-secure-store has no list API).

## Availability helpers

Not exported from the main package but used internally; you can check availability by whether the adapter’s `isAvailable()` is true after creating it.

- MMKV: always available once you pass an instance.
- Async Storage / Keychain / Secure Store: available when the corresponding package is installed and requireable.
