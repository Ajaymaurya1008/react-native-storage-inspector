---
sidebar_position: 8
---

# Expo

react-native-storage-inspector works in both **Expo Go** and **development builds**, with some differences per storage.

## Expo Go

| Storage               | Supported                 |
| --------------------- | ------------------------- |
| Async Storage         | ✅                        |
| Expo Secure Store     | ✅                        |
| MMKV                  | ❌ (requires native code) |
| React Native Keychain | ❌ (requires native code) |

Install only the packages you need:

```bash
npx expo install react-native-storage-inspector @react-native-async-storage/async-storage expo-secure-store
```

Use `StorageInspector` as usual. Omit `mmkvInstances` if you don’t use MMKV. You can pass `secureStoreKeys` for Secure Store.

## Development build (expo-dev-client)

All four storages are supported:

- **MMKV:** Install `react-native-mmkv`, create instances, and pass them in `mmkvInstances`.
- **Keychain:** Install `react-native-keychain`; the inspector will show the Keychain tab when available.

## Optional dependencies and Metro

If you see **"Requiring unknown module"** for optional storage packages (Async Storage, Keychain, Secure Store), see [Troubleshooting → "Requiring unknown module"](/docs/troubleshooting#requiring-unknown-module-metro) for the Metro fix.
