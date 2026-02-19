import type { IStorageAdapter } from '@/adapters/types';

type AsyncStorageModule = {
  getAllKeys(): Promise<string[]>;
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
};

let asyncStorage: AsyncStorageModule | null = null;

function getAsyncStorage() {
  if (asyncStorage) return asyncStorage;
  try {
    asyncStorage = require('@react-native-async-storage/async-storage').default;
    return asyncStorage;
  } catch {
    return null;
  }
}

export function createAsyncStorageAdapter(): IStorageAdapter {
  return {
    type: 'async-storage',
    name: 'Async Storage',
    async getAllKeys(): Promise<string[]> {
      const storage = getAsyncStorage();
      if (!storage) return [];
      return storage.getAllKeys();
    },
    async getItem(key: string): Promise<string | null> {
      const storage = getAsyncStorage();
      if (!storage) return null;
      return storage.getItem(key);
    },
    async setItem(key: string, value: string): Promise<void> {
      const storage = getAsyncStorage();
      if (!storage) throw new Error('AsyncStorage is not available');
      await storage.setItem(key, value);
    },
    async removeItem(key: string): Promise<void> {
      const storage = getAsyncStorage();
      if (!storage) throw new Error('AsyncStorage is not available');
      await storage.removeItem(key);
    },
    isAvailable(): boolean {
      return getAsyncStorage() !== null;
    },
  };
}

export function isAsyncStorageAvailable(): boolean {
  return getAsyncStorage() !== null;
}
