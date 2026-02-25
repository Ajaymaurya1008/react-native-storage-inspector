---
sidebar_position: 2
---

# Installation

Install the inspector and at least one storage library you use.

## npm

```bash
npm install react-native-storage-inspector
```

Then add one or more storage backends:

```bash
# MMKV (recommended for performance)
npm install react-native-mmkv

# Async Storage
npm install @react-native-async-storage/async-storage

# React Native Keychain (iOS/Android)
npm install react-native-keychain

# Expo Secure Store (Expo projects)
npm install expo-secure-store
```

## Yarn

```bash
yarn add react-native-storage-inspector
yarn add react-native-mmkv
# and/or: @react-native-async-storage/async-storage, react-native-keychain, expo-secure-store
```

## pnpm

```bash
pnpm add react-native-storage-inspector
pnpm add react-native-mmkv
```

## Peer dependencies

- **react** and **react-native** are peer dependencies; your project must already have them.
- Storage packages (`react-native-mmkv`, `@react-native-async-storage/async-storage`, `react-native-keychain`, `expo-secure-store`) are **optional** peer dependencies. Only the ones you install will show up as tabs in the inspector.

After installation, see [Usage](/docs/usage) to render the inspector in your app.
