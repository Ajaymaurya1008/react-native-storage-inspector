import type { IStorageAdapter } from '@/adapters/types';

/**
 * Keychain-compatible module (generic password only).
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
 * Creates a Keychain adapter.
 */
export function createKeychainAdapter(): IStorageAdapter {
  const getKc = () => getKeychainFromRequire();
  return {
    type: 'keychain',
    name: 'Keychain',
    async getAllKeys(): Promise<string[]> {
      const kc = getKc();
      if (!kc) return [];

      const genericServices: string[] = [];
      if (typeof kc.getAllGenericPasswordServices === 'function') {
        try {
          const services = await kc.getAllGenericPasswordServices();
          if (Array.isArray(services)) genericServices.push(...services);
        } catch {
          // ignore
        }
      }

      return genericServices;
    },
    async getItem(key: string): Promise<string | null> {
      const kc = getKc();
      if (!kc?.getGenericPassword) return null;
      try {
        const creds = await kc.getGenericPassword({ service: key });
        if (creds && typeof creds === 'object' && 'password' in creds) {
          return creds.password;
        }
      } catch {
        // ignore
      }
      return null;
    },
    async setItem(key: string, value: string): Promise<void> {
      const kc = getKc();
      if (!kc?.setGenericPassword)
        throw new Error('react-native-keychain is not available');
      const result = await kc.setGenericPassword(key, value, { service: key });
      if (result === false) throw new Error('Keychain set failed');
    },
    async removeItem(key: string): Promise<void> {
      const kc = getKc();
      if (!kc?.resetGenericPassword)
        throw new Error('react-native-keychain is not available');
      await kc.resetGenericPassword({ service: key });
    },
    isAvailable(): boolean {
      return getKc() !== null;
    },
  };
}

export function isKeychainAvailable(): boolean {
  return getKeychainFromRequire() !== null;
}
