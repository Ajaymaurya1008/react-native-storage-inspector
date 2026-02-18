import type { IStorageAdapter } from './types';

type KeychainModule = {
  setInternetCredentials(
    server: string,
    username: string,
    password: string
  ): Promise<{ storage: string } | false>;
  getInternetCredentials(server: string): Promise<{
    username: string;
    password: string;
  } | null>;
  resetInternetCredentials(server: string): Promise<void>;
};

let keychain: KeychainModule | null = null;

function getKeychain(): KeychainModule | null {
  if (keychain) return keychain;
  try {
    keychain = require('react-native-keychain');
    return keychain;
  } catch {
    return null;
  }
}

export function createKeychainAdapter(knownKeys: string[] = []): IStorageAdapter {
  return {
    type: 'keychain',
    name: 'Keychain',
    async getAllKeys(): Promise<string[]> {
      return [...knownKeys];
    },
    async getItem(key: string): Promise<string | null> {
      const kc = getKeychain();
      if (!kc) return null;
      const creds = await kc.getInternetCredentials(key);
      return creds?.password ?? null;
    },
    async setItem(key: string, value: string): Promise<void> {
      const kc = getKeychain();
      if (!kc) throw new Error('react-native-keychain is not available');
      const result = await kc.setInternetCredentials(key, key, value);
      if (result === false) throw new Error('Keychain set failed');
    },
    async removeItem(key: string): Promise<void> {
      const kc = getKeychain();
      if (!kc) throw new Error('react-native-keychain is not available');
      await kc.resetInternetCredentials(key);
    },
    isAvailable(): boolean {
      return getKeychain() !== null;
    },
  };
}

export function isKeychainAvailable(): boolean {
  return getKeychain() !== null;
}
