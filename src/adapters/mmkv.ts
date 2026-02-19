import type { IStorageAdapter } from '@/adapters/types';

type MMKVInstance = {
  getAllKeys(): string[];
  getString(key: string): string | undefined;
  set(key: string, value: string | number | boolean): void;
  delete(key: string): void;
};

export function createMMKVAdapter(instance: MMKVInstance, name?: string): IStorageAdapter {
  return {
    type: 'mmkv',
    name: name ?? 'MMKV',
    getAllKeys(): Promise<string[]> {
      return Promise.resolve(instance.getAllKeys());
    },
    getItem(key: string): Promise<string | null> {
      const value = instance.getString(key);
      return Promise.resolve(value ?? null);
    },
    setItem(key: string, value: string): Promise<void> {
      instance.set(key, value);
      return Promise.resolve();
    },
    removeItem(key: string): Promise<void> {
      instance.delete(key);
      return Promise.resolve();
    },
    isAvailable(): boolean {
      return true;
    },
  };
}

export function isMMKVAvailable(): boolean {
  try {
    require('react-native-mmkv');
    return true;
  } catch {
    return false;
  }
}
