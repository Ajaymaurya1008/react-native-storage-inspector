---
sidebar_position: 1
---

# Introduction

**react-native-storage-inspector** is a plug-and-play developer tool that lets you **browse**, **search**, and **edit** all your app's persisted data in one place.

## Why use it?

- **See everything**: MMKV, Async Storage, Keychain, and Expo Secure Store in a single UI
- **No backend**: Runs entirely inside your app; ideal for debugging and support
- **Optional dependencies**: Tabs appear only for the storage libraries you actually use
- **Custom storages**: Add your own adapters for any key-value store

## Supported libraries

Out of the box: **MMKV**, **Async Storage**, **React Native Keychain**, and **Expo Secure Store**. Tabs appear only for the packages you actually install.

See [Supported storages](/docs/storages) for the full comparison table, Expo Go compatibility, and per-storage setup.

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
      <StorageInspector />
    </SafeAreaView>
  );
}
```
