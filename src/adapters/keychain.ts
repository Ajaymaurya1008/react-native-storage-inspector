import type { IStorageAdapter } from '@/adapters/types';

/**
 * Keychain-compatible module. Pass your keychain instance to avoid Metro
 * "unknown module" errors in Expo.
 */
export type KeychainModule = {
  getAllGenericPasswordServices?(options?: object): Promise<string[]>;
  getGenericPassword?(options?: {
    service?: string;
  }): Promise<{ password: string } | false>;
  setGenericPassword?(
    username: string,
    password: string,
    options?: { service?: string }
  ): Promise<{ storage: string } | false>;
  resetGenericPassword?(options?: { service?: string }): Promise<void>;
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

function getKeychainFromRequire(): KeychainModule | null {
  try {
    return require('react-native-keychain') as KeychainModule;
  } catch {
    return null;
  }
}

/**
 * Keychain adapter. Pass the keychain instance for reliable bundling in Expo:
 * @example import * as Keychain from 'react-native-keychain';
 * createKeychainAdapter([], Keychain)
 */
export function createKeychainAdapter(
  knownKeys: string[] = [],
  instance?: KeychainModule | null
): IStorageAdapter {
  const getKc = () => instance ?? (keychain ??= getKeychainFromRequire());
  return {
    type: 'keychain',
    name: 'Keychain',
    async getAllKeys(): Promise<string[]> {
      const kc = getKc();
      if (!kc) return [...knownKeys];

      const genericServices: string[] = [];
      if (typeof kc.getAllGenericPasswordServices === 'function') {
        try {
          const services = await kc.getAllGenericPasswordServices();
          if (Array.isArray(services)) genericServices.push(...services);
        } catch {
          // Ignore – fall back to knownKeys
        }
      }

      const merged = new Set([...genericServices, ...knownKeys]);
      return Array.from(merged);
    },
    async getItem(key: string): Promise<string | null> {
      const kc = getKc();
      if (!kc) return null;

      if (typeof kc.getGenericPassword === 'function') {
        try {
          const creds = await kc.getGenericPassword({ service: key });
          if (creds && typeof creds === 'object' && 'password' in creds) {
            return creds.password;
          }
        } catch {
          // Fall through to internet credentials
        }
      }

      const creds = await kc.getInternetCredentials(key);
      return creds?.password ?? null;
    },
    async setItem(key: string, value: string): Promise<void> {
      const kc = getKc();
      if (!kc) throw new Error('react-native-keychain is not available');

      if (typeof kc.setGenericPassword === 'function') {
        const result = await kc.setGenericPassword(key, value, { service: key });
        if (result === false) throw new Error('Keychain set failed');
        return;
      }

      const result = await kc.setInternetCredentials(key, key, value);
      if (result === false) throw new Error('Keychain set failed');
    },
    async removeItem(key: string): Promise<void> {
      const kc = getKc();
      if (!kc) throw new Error('react-native-keychain is not available');

      if (typeof kc.resetGenericPassword === 'function') {
        await kc.resetGenericPassword({ service: key });
      }
      await kc.resetInternetCredentials(key);
    },
    isAvailable(): boolean {
      return getKc() !== null;
    },
  };
}

export function isKeychainAvailable(instance?: KeychainModule | null): boolean {
  return (instance ?? getKeychainFromRequire()) !== null;
}
