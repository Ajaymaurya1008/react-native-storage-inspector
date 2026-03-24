---
sidebar_position: 2
---

# MMKV

[react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) is a fast key-value storage backed by [MMKV](https://github.com/Tencent/MMKV).

## Setup

1. Install the package:

```bash
npm install react-native-mmkv
```

2. Create one or more MMKV instances in your app (e.g. in a module or context):

```ts
import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({ id: 'app-storage' });
// Optional: more instances
export const cache = createMMKV({ id: 'cache' });
```

3. Pass them to `StorageInspector`:

```tsx
import { StorageInspector } from 'react-native-storage-inspector';
import { storage, cache } from './storage';

<StorageInspector mmkvInstances={[storage, cache]} />;
```

## Behavior

- **Required:** Unlike Async Storage / Keychain / Secure Store, MMKV is **not** auto-discovered. You must pass `mmkvInstances` for MMKV to appear.
- **Multiple instances:** Each instance gets its own section (e.g. "MMKV", "MMKV 2" if you pass two).
- **Types:** MMKV can store strings, numbers, and booleans. The inspector reads/writes string values; the adapter uses `getString` and `set(key, value)`.

## Expo

MMKV uses native code. It works in **development builds** (e.g. with `expo-dev-client`), but **not** in Expo Go.
