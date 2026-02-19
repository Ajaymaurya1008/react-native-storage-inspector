# Architecture & File Structure

## Layout

```

├── __tests__/              # Unit tests
│   ├── mmkv.test.ts
│   ├── async-storage.test.ts
│   ├── strings.test.ts
│   └── constants.test.ts
└── src/
    ├── index.ts            # Public API exports
    ├── strings.ts          # All UI strings
    ├── theme.ts            # Colors, visual tokens
    ├── constants.ts        # LAYOUT (sizes, hitSlop, etc.)
    ├── types.ts            # Shared types
    ├── adapters/           # Storage backends
    │   ├── types.ts        # IStorageAdapter interface
    │   ├── mmkv.ts
    │   ├── async-storage.ts
    │   ├── keychain.ts
    │   └── secure-store.ts
    ├── components/         # UI
    │   ├── StorageInspector.tsx   # Root component
    │   ├── StorageSection.tsx     # Per-storage section (tabs)
    │   ├── StorageList.tsx        # Key list
    │   ├── ItemForm.tsx           # Add/Edit form
    │   ├── ConfirmModal.tsx      # Delete confirmation
    │   ├── IconButton.tsx        # Reusable icon button
    │   ├── ItemRowActions.tsx    # Row action buttons
    │   ├── Icon.tsx              # Icon wrapper
    │   └── styles.ts             # Shared styles
    └── hooks/
        └── useStorageItems.ts    # Load items for a section
```

## Data Flow

1. `StorageInspector` receives `mmkvInstances`, `keychainKeys`, `secureStoreKeys`, `customAdapters`.
2. It builds a list of adapters (each implements `IStorageAdapter`) and renders one `StorageSection` per adapter.
3. Each `StorageSection` uses `useStorageItems` to load keys, fetches values via the adapter, and allows add/edit/delete through `ItemForm` and `ConfirmModal`.
4. Adapters are optional and only rendered if their peer dependency is installed.

## Adapter Pattern

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

All storage backends wrap their native APIs behind this interface. `StorageInspector` only talks to adapters.

## Build

- tsup builds `src/` → `dist/index.js`, `dist/index.mjs`, `dist/index.d.ts`
- Consumers use the built output. Path aliases are resolved at build time.
