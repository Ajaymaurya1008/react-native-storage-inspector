---
sidebar_position: 1
---

# Supported storages

The inspector shows a tab for each storage backend that is **installed** and **available** at runtime. You only need to install the packages you use.

| Storage           | Package                                     | Notes                                                                      |
| ----------------- | ------------------------------------------- | -------------------------------------------------------------------------- |
| **MMKV**          | `react-native-mmkv`                         | You must pass `mmkvInstances` to `StorageInspector`.                       |
| **Async Storage** | `@react-native-async-storage/async-storage` | Auto-detected when installed.                                              |
| **Keychain**      | `react-native-keychain`                     | Auto-detected; uses generic password services.                             |
| **Secure Store**  | `expo-secure-store`                         | No list API; use `secureStoreKeys` or keys are discovered as you add them. |

## Compatibility

- **Expo Go**: Async Storage and Expo Secure Store work. MMKV and Keychain require native code and are **not** available in Expo Go.
- **Development build** (e.g. `expo-dev-client`): All four storages are supported.

See the individual pages for setup and caveats:

- [MMKV](/docs/storages/mmkv)
- [Async Storage](/docs/storages/async-storage)
- [Keychain](/docs/storages/keychain)
- [Secure Store](/docs/storages/secure-store)
