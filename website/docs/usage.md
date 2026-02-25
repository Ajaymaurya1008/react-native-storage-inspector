---
sidebar_position: 3
---

# Usage

Use `StorageInspector` as a **full-page component**. It renders only the content area (list of storages, keys, and values). It does **not** render a header, back button, or status bar — your screen or navigation should provide those.

## Basic setup

1. Put the inspector in a screen that has `flex: 1` so it fills the available space.
2. Wrap with `SafeAreaView` (or your navigation’s safe area) so it respects the status bar and notches.

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

The component fills its container. You are responsible for the header, back button, and safe area (e.g. via your stack navigator).

## With MMKV

If you use **MMKV**, you must pass your MMKV instances so the inspector can read and write them:

```tsx
import { createMMKV } from 'react-native-mmkv';
import { StorageInspector } from 'react-native-storage-inspector';

const storage = createMMKV({ id: 'app-storage' });

export function StorageInspectorScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StorageInspector mmkvInstances={[storage]} />
    </SafeAreaView>
  );
}
```

Multiple MMKV instances are supported; each gets its own tab (e.g. "MMKV 1", "MMKV 2").

## Props overview

| Prop              | Type                | Description                                                                                       |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------- |
| `mmkvInstances`   | `MMKV[]`            | **Required for MMKV.** Pass your MMKV instances to inspect.                                       |
| `secureStoreKeys` | `string[]`          | Optional. Known keys for Secure Store (no list API). Merged with keys persisted by the inspector. |
| `customAdapters`  | `IStorageAdapter[]` | Optional. Custom adapters for other storages.                                                     |

See [StorageInspector props](/docs/api/storage-inspector-props) for full API details.

## Navigation example

With React Navigation (or similar), add a screen that renders the inspector and a header:

```tsx
<Stack.Screen
  name="StorageInspector"
  options={{ title: 'Storage' }}
  component={StorageInspectorScreen}
/>
```

Users can then open "Storage" from a dev menu or settings to inspect and edit persisted data.
