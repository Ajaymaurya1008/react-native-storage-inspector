import type { IStorageAdapter } from '@/adapters/types';
import { parsePersistedKeys } from '@/utils';

/** Reserved key in Secure Store where we persist the list of keys (so it survives restart). */
const PERSISTED_KEYS_STORAGE_KEY = '__storage_inspector_secure_store_keys__';

/**
 * expo-secure-store compatible module. Pass the module to avoid Metro
 * "unknown module" errors in Expo.
 */
export type SecureStoreModule = {
  getItemAsync(key: string): Promise<string | null>;
  setItemAsync(key: string, value: string): Promise<void>;
  deleteItemAsync(key: string): Promise<void>;
};

let secureStore: SecureStoreModule | null = null;

function getSecureStoreFromRequire(): SecureStoreModule | null {
  try {
    return require('expo-secure-store') as SecureStoreModule;
  } catch {
    return null;
  }
}

/**
 * Creates a Secure Store adapter. Since expo-secure-store has no API to list all keys, we persist the list of keys in Secure Store.
 */
export function createSecureStoreAdapter(knownKeys: string[] = []): IStorageAdapter {
  const getStore = () => getSecureStoreFromRequire();
  return {
    type: 'expo-secure-store',
    name: 'Secure Store',
    async getAllKeys(): Promise<string[]> {
      const store = getStore();
      if (!store) return [];
      const persistedKeysString = await store.getItemAsync(PERSISTED_KEYS_STORAGE_KEY);
      const persistedKeys = parsePersistedKeys(persistedKeysString);
      return [...new Set([...knownKeys, ...persistedKeys])];
    },
    async getItem(key: string): Promise<string | null> {
      const store = getStore();
      if (!store) return null;
      return store.getItemAsync(key);
    },
    async setItem(key: string, value: string): Promise<void> {
      const store = getStore();
      if (!store) throw new Error('expo-secure-store is not available');
      await store.setItemAsync(key, value);
      if (key === PERSISTED_KEYS_STORAGE_KEY) return;
      const persistedKeysString = await store.getItemAsync(PERSISTED_KEYS_STORAGE_KEY);
      const persistedKeys = parsePersistedKeys(persistedKeysString);
      const newPersistedKeys = [...new Set([...persistedKeys, key])];
      await store.setItemAsync(
        PERSISTED_KEYS_STORAGE_KEY,
        JSON.stringify(newPersistedKeys)
      );
    },
    async removeItem(key: string): Promise<void> {
      const store = getStore();
      if (!store) throw new Error('expo-secure-store is not available');
      await store.deleteItemAsync(key);
      const persistedKeysString = await store.getItemAsync(PERSISTED_KEYS_STORAGE_KEY);
      const persistedKeys = parsePersistedKeys(persistedKeysString);
      const newPersistedKeys = persistedKeys.filter((k) => k !== key);
      await store.setItemAsync(
        PERSISTED_KEYS_STORAGE_KEY,
        JSON.stringify(newPersistedKeys)
      );
    },
    isAvailable(): boolean {
      return getStore() !== null;
    },
  };
}

export function isSecureStoreAvailable(): boolean {
  return getSecureStoreFromRequire() !== null;
}
