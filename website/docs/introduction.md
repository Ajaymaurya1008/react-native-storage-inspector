---
sidebar_position: 1
---

# Introduction

**react-native-storage-inspector** is a plug-and-play developer tool that lets you **browse**, **search**, and **edit** all your app's persisted data in one place.

## Why use it?

- **See everything** — MMKV, Async Storage, Keychain, and Expo Secure Store in a single UI
- **No backend** — Runs entirely inside your app; ideal for debugging and support
- **Optional dependencies** — Tabs appear only for the storage libraries you actually use
- **Custom storages** — Add your own adapters for any key-value store

## Supported libraries

Tabs appear only when the corresponding package is installed (optional peer dependencies).

| Library                                                                      | Package                                     | Storage      |
| ---------------------------------------------------------------------------- | ------------------------------------------- | ------------ |
| [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)           | `react-native-mmkv`                         | MMKV         |
| [Async Storage](https://github.com/react-native-async-storage/async-storage) | `@react-native-async-storage/async-storage` | AsyncStorage |
| [react-native-keychain](https://github.com/oblador/react-native-keychain)    | `react-native-keychain`                     | Keychain     |
| [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/)  | `expo-secure-store`                         | Secure Store |

## Quick start

```bash
npm install react-native-storage-inspector react-native-mmkv
```

```tsx
import { SafeAreaView } from 'react-native';
import { StorageInspector } from 'react-native-storage-inspector';

export function StorageScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StorageInspector mmkvInstances={[yourMmkvInstance]} />
    </SafeAreaView>
  );
}
```

Next: [Installation](/docs/installation) → [Usage](/docs/usage).
