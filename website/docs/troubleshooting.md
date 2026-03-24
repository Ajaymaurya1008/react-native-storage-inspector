---
sidebar_position: 10
---

# Troubleshooting

## "Requiring unknown module" (Metro)

If you see an error like **Requiring unknown module '@react-native-async-storage/async-storage'** (or keychain, expo-secure-store), Metro is resolving optional dependencies too strictly.

**Fix:** In `metro.config.js`, enable optional dependencies:

```js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
config.transformer ??= {};
config.transformer.allowOptionalDependencies = true;
module.exports = config;
```

Then restart the bundler (e.g. `npx expo start --clear` or `npm start` with cache clear).

## No tabs / "No storage adapter available"

- **MMKV:** You must pass `mmkvInstances={[yourInstance]}`. If you don’t pass any MMKV instance, the MMKV tab won’t appear.
- **Other storages:** Ensure the corresponding package is installed and linked (e.g. run `pod install` for iOS if you added a native dependency). In Expo Go, only Async Storage and Expo Secure Store are available; MMKV and Keychain need a dev build.
- **Custom adapters:** Ensure `isAvailable()` returns `true` and that you passed the adapter in `customAdapters`.

## Secure Store: keys not showing

expo-secure-store has no API to list keys. The inspector maintains its own list. Either:

- Pass known key names in `secureStoreKeys`, or
- Add/edit keys through the inspector so they get persisted to the list.

## Keychain vs Secure Store in the same app

Using both **react-native-keychain** and **expo-secure-store** in one app can lead to conflicts or redundant use of the same underlying secure storage. Prefer one for sensitive data.

## Build / type errors

- Ensure you’re on a supported Node version (e.g. ≥ 18).
- Run `npm install` in the project root and in `website/` if you’re building the docs.
- For TypeScript, use the types exported from `react-native-storage-inspector` (e.g. `StorageInspectorProps`, `IStorageAdapter`).

## Still stuck?

Open an issue with your environment (React Native/Expo version, OS, and the exact error or behavior): [GitHub Issues](https://github.com/Ajaymaurya1008/react-native-storage-inspector/issues).
