---
sidebar_position: 4
---

# Keychain

[react-native-keychain](https://github.com/oblador/react-native-keychain) provides access to the iOS Keychain and Android Keystore for secure storage.

## Setup

1. Install the package:

```bash
npm install react-native-keychain
```

2. Use `StorageInspector` as usual. **No extra props are required.** The inspector detects Keychain when the package is installed and adds a "Keychain" tab.

```tsx
<StorageInspector />
```

## Behavior

- **Generic password only:** The adapter uses `getAllGenericPasswordServices`, `getGenericPassword`, `setGenericPassword`, and `resetGenericPassword`. Other Keychain APIs (e.g. internet credentials) are not exposed in the inspector.
- **Service = key:** Each "key" in the inspector is a Keychain service name; the value is the stored password.
- **Expo:** Keychain uses native code. It works in **development builds**, but **not** in Expo Go.

## Avoid mixing with Expo Secure Store

It is generally **not** recommended to use both React Native Keychain and Expo Secure Store in the same app. Both use the same underlying secure storage on each platform; using both can lead to conflicts or redundancy. Choose one for sensitive data.
