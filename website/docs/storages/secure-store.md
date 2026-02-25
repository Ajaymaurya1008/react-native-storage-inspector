---
sidebar_position: 5
---

# Secure Store (Expo)

[expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/) provides secure storage for Expo apps (iOS Keychain / Android Keystore).

## Setup

1. Install the package:

```bash
npm install expo-secure-store
```

2. Use `StorageInspector`. Optionally pass **known keys** so they appear even if not yet written by the inspector:

```tsx
<StorageInspector secureStoreKeys={['auth_token', 'user_id']} />
```

## Behavior

- **No list API:** expo-secure-store does not provide a way to list all keys. The inspector works around this by:
  - Persisting a list of keys in a reserved Secure Store key (`__storage_inspector_secure_store_keys__`).
  - Merging that list with any keys you pass in `secureStoreKeys`.
- **Discovery:** Keys you add or edit through the inspector are remembered and shown on next load.
- **Expo Go:** Secure Store works in Expo Go and in development builds.

## secureStoreKeys

Use `secureStoreKeys` when you already know the key names your app uses (e.g. from code or docs). Those keys will appear in the list even if they were never written through the inspector, so you can open and edit them.
