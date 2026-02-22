import type { IStorageAdapter } from '@/adapters/types';

/**
 * AsyncStorage-compatible module interface.
 */
export type AsyncStorageModule = {
  getAllKeys(): Promise<string[]>;
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
};

// Optional require; support both ESM (mod.default) and CJS (mod) so we always get the API object.
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
 * Creates an AsyncStorage adapter.
 */
export function createAsyncStorageAdapter(): IStorageAdapter {
  const getStorage = () => getAsyncStorageFromRequire();
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

export function isAsyncStorageAvailable(): boolean {
  return getAsyncStorageFromRequire() !== null;
}
