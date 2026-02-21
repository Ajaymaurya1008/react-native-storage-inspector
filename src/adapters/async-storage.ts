import type { IStorageAdapter } from '@/adapters/types';

/**
 * AsyncStorage-compatible module interface.
 * Pass your AsyncStorage instance to avoid Metro "unknown module" errors in Expo:
 * @example
 * import AsyncStorage from '@react-native-async-storage/async-storage';
 * createAsyncStorageAdapter(AsyncStorage)
 */
export type AsyncStorageModule = {
  getAllKeys(): Promise<string[]>;
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
};

let asyncStorage: AsyncStorageModule | null = null;

function getAsyncStorageFromRequire(): AsyncStorageModule | null {
  try {
    const mod = require('@react-native-async-storage/async-storage') as
      | { default: AsyncStorageModule }
      | AsyncStorageModule;
    return (
      (mod as { default?: AsyncStorageModule }).default ?? (mod as AsyncStorageModule)
    );
  } catch {
    return null;
  }
}

/**
 * Creates an AsyncStorage adapter. Pass the AsyncStorage instance for reliable
 * bundling in Expo/Metro (avoids "unknown module" errors):
 *
 * @example
 * import AsyncStorage from '@react-native-async-storage/async-storage';
 * createAsyncStorageAdapter(AsyncStorage)
 */
export function createAsyncStorageAdapter(
  instance?: AsyncStorageModule | null
): IStorageAdapter {
  const getStorage = () => instance ?? (asyncStorage ??= getAsyncStorageFromRequire());
  return {
    type: 'async-storage',
    name: 'Async Storage',
    async getAllKeys(): Promise<string[]> {
      const storage = getStorage();
      if (!storage) return [];
      return storage.getAllKeys();
    },
    async getItem(key: string): Promise<string | null> {
      const storage = getStorage();
      if (!storage) return null;
      return storage.getItem(key);
    },
    async setItem(key: string, value: string): Promise<void> {
      const storage = getStorage();
      if (!storage) throw new Error('AsyncStorage is not available');
      await storage.setItem(key, value);
    },
    async removeItem(key: string): Promise<void> {
      const storage = getStorage();
      if (!storage) throw new Error('AsyncStorage is not available');
      await storage.removeItem(key);
    },
    isAvailable(): boolean {
      return getStorage() !== null;
    },
  };
}

export function isAsyncStorageAvailable(instance?: AsyncStorageModule | null): boolean {
  return (instance ?? getAsyncStorageFromRequire()) !== null;
}
