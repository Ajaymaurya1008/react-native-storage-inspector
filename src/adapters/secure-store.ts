import type { IStorageAdapter } from '@/adapters/types';

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
 * expo-secure-store has no API to list all keys. Pass knownKeys to inspect
 * those entries. Pass the module for reliable bundling in Expo:
 * @example import * as SecureStore from 'expo-secure-store';
 * createSecureStoreAdapter([], SecureStore)
 */
export function createSecureStoreAdapter(
  knownKeys: string[] = [],
  instance?: SecureStoreModule | null
): IStorageAdapter {
  const getStore = () => instance ?? (secureStore ??= getSecureStoreFromRequire());
  return {
    type: 'expo-secure-store',
    name: 'Secure Store',
    async getAllKeys(): Promise<string[]> {
      return [...knownKeys];
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
    },
    async removeItem(key: string): Promise<void> {
      const store = getStore();
      if (!store) throw new Error('expo-secure-store is not available');
      await store.deleteItemAsync(key);
    },
    isAvailable(): boolean {
      return getStore() !== null;
    },
  };
}

export function isSecureStoreAvailable(instance?: SecureStoreModule | null): boolean {
  return (instance ?? getSecureStoreFromRequire()) !== null;
}
