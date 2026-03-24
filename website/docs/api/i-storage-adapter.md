---
sidebar_position: 3
---

# IStorageAdapter

Custom storage backends are integrated by implementing the `IStorageAdapter` interface and passing adapters via `customAdapters`.

## Interface

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

## Fields

| Member                | Type                                            | Description                                                                                  |
| --------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `type`                | `string`                                        | Internal type id (e.g. `'mmkv'`, `'custom-db'`). Used for React keys.                        |
| `name`                | `string`                                        | Label shown in the UI (e.g. "MMKV", "My Custom Store").                                      |
| `getAllKeys()`        | `() => Promise<string[]>`                       | Return all keys currently in the store.                                                      |
| `getItem(key)`        | `(key: string) => Promise<string \| null>`      | Return the value for `key`, or `null` if missing.                                            |
| `setItem(key, value)` | `(key: string, value: string) => Promise<void>` | Write `value` for `key`.                                                                     |
| `removeItem(key)`     | `(key: string) => Promise<void>`                | Remove `key`.                                                                                |
| `isAvailable()`       | `() => boolean`                                 | Whether the backend is available (e.g. module loaded). If `false`, the adapter is not shown. |

## StorageItem

Values are strings. The UI also uses a simple item shape:

```ts
interface StorageItem {
  key: string;
  value: string;
}
```

## Example

See [Custom adapters](/docs/custom-adapters) for a full example of implementing and passing an `IStorageAdapter`.
