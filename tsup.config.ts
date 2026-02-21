import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-native',
    '@react-native-async-storage/async-storage',
    'react-native-keychain',
    'expo-secure-store',
    'react-native-mmkv',
  ],
  treeshake: true,
});
