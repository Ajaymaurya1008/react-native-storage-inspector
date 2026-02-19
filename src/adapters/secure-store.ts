import type { IStorageAdapter } from '@/adapters/types';

type SecureStoreModule = {
  getItemAsync(key: string): Promise<string | null>;
  setItemAsync(key: string, value: string): Promise<void>;
  deleteItemAsync(key: string): Promise<void>;
};

let secureStore: SecureStoreModule | null = null;

function getSecureStore(): SecureStoreModule | null {
  if (secureStore) return secureStore;
  try {
    secureStore = require('expo-secure-store');
    return secureStore;
  } catch {
    return null;
  }
}

/**
 * expo-secure-store has no API to list all keys. Pass knownKeys to inspect
 * those entries, or keys will appear after the user adds them via the inspector.
 */
export function createSecureStoreAdapter(knownKeys: string[] = []): IStorageAdapter {
  return {
    type: 'expo-secure-store',
    name: 'Secure Store',
    async getAllKeys(): Promise<string[]> {
      return [...knownKeys];
    },
    async getItem(key: string): Promise<string | null> {
      const store = getSecureStore();
      if (!store) return null;
      return store.getItemAsync(key);
    },
    async setItem(key: string, value: string): Promise<void> {
      const store = getSecureStore();
      if (!store) throw new Error('expo-secure-store is not available');
      await store.setItemAsync(key, value);
    },
    async removeItem(key: string): Promise<void> {
      const store = getSecureStore();
      if (!store) throw new Error('expo-secure-store is not available');
      await store.deleteItemAsync(key);
    },
    isAvailable(): boolean {
      return getSecureStore() !== null;
    },
  };
}

export function isSecureStoreAvailable(): boolean {
  return getSecureStore() !== null;
}
