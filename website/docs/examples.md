---
sidebar_position: 11
---

# Examples

The repository includes runnable example apps that demonstrate the inspector with different storage setups. Use them to try the UI, test changes, or copy integration patterns.

## expo-example

**Path:** `examples/expo-example`

**Storages:** react-native-mmkv, Async Storage, expo-secure-store.

**Run:**

```bash
cd examples/expo-example
npm install
npx expo start
```

Use a **development build** or **Expo Go** to open the app. In Expo Go, MMKV is not available; use a dev build to try all three.

## community-cli-example

**Path:** `examples/community-cli-example`

**Storages:** react-native-mmkv, Async Storage, react-native-keychain.

**Run:**

```bash
cd examples/community-cli-example
npm install
# iOS: run once
bundle install && bundle exec pod install
# Start Metro and run app
npm start
# In another terminal:
npm run ios
# or
npm run android
```

## Summary

| Example                   | Storages                                   |
| ------------------------- | ------------------------------------------ |
| **expo-example**          | MMKV, Async Storage, Expo Secure Store     |
| **community-cli-example** | MMKV, Async Storage, React Native Keychain |

**Note:** It’s generally not recommended to use both Keychain and Expo Secure Store in the same app; the examples use one or the other. Choose the provider that fits your app.
