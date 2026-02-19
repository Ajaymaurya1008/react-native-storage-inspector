import type { StorageType } from '@/types';

export interface StorageItem {
  key: string;
  value: string;
}

export interface IStorageAdapter {
  type: StorageType;
  name: string;
  getAllKeys(): Promise<string[]>;
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  isAvailable(): boolean;
}
