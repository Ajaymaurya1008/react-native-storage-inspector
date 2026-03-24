---
sidebar_position: 3
---

# Async Storage

[@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage) is the community-maintained AsyncStorage API for React Native.

## Setup

1. Install the package:

```bash
npm install @react-native-async-storage/async-storage
```

2. Use `StorageInspector` as usual. **No extra props are required.** The inspector automatically detects Async Storage when the package is installed and adds an "Async Storage" tab.

```tsx
<StorageInspector />
```

## Behavior

- **Auto-detection:** If the package is present, the adapter is created and shown.
- **Single store:** There is one Async Storage namespace; one tab is shown.
- **Optional dependency:** If you don’t install the package, the tab simply doesn’t appear (no runtime error).

## Metro / Expo

If you see **"Requiring unknown module"** for optional storage packages, set in `metro.config.js`:

```js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
config.transformer ??= {};
config.transformer.allowOptionalDependencies = true;
module.exports = config;
```

See [Troubleshooting](/docs/troubleshooting) for more.
