import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  RefreshControl,
} from 'react-native';
import type { IStorageAdapter } from '../adapters/types';
import { createMMKVAdapter } from '../adapters/mmkv';
import { createAsyncStorageAdapter } from '../adapters/async-storage';
import { createKeychainAdapter } from '../adapters/keychain';
import { createSecureStoreAdapter } from '../adapters/secure-store';
import { StorageSection } from './StorageSection';
import { Icon } from './Icon';
import { styles } from './styles';
import { theme } from '../theme';

export interface StorageInspectorProps {
  onClose?: () => void;
  mmkvInstances?: Array<{
    getAllKeys(): string[];
    getString(k: string): string | undefined;
    set(k: string, v: string | number | boolean): void;
    delete(k: string): void;
  }>;
  keychainKeys?: string[];
  secureStoreKeys?: string[];
  customAdapters?: IStorageAdapter[];
}

export function StorageInspector({
  onClose,
  mmkvInstances = [],
  keychainKeys: keychainKeysProp,
  secureStoreKeys: secureStoreKeysProp,
  customAdapters = [],
}: StorageInspectorProps) {
  const [keychainKeysAdded, setKeychainKeysAdded] = useState<string[]>([]);
  const [secureStoreKeysAdded, setSecureStoreKeysAdded] = useState<string[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const keychainKeys = useMemo(
    () => [...(keychainKeysProp ?? []), ...keychainKeysAdded],
    [keychainKeysProp, keychainKeysAdded]
  );

  const secureStoreKeys = useMemo(
    () => [...(secureStoreKeysProp ?? []), ...secureStoreKeysAdded],
    [secureStoreKeysProp, secureStoreKeysAdded]
  );

  const adapters = useMemo(() => {
    const list: IStorageAdapter[] = [];

    mmkvInstances.forEach((inst, i) => {
      list.push(
        createMMKVAdapter(
          inst,
          mmkvInstances.length > 1 ? `MMKV ${i + 1}` : 'MMKV'
        )
      );
    });

    const asyncAdapter = createAsyncStorageAdapter();
    if (asyncAdapter.isAvailable()) list.push(asyncAdapter);

    const keychainAdapter = createKeychainAdapter(keychainKeys);
    if (keychainAdapter.isAvailable()) list.push(keychainAdapter);

    const secureStoreAdapter = createSecureStoreAdapter(secureStoreKeys);
    if (secureStoreAdapter.isAvailable()) list.push(secureStoreAdapter);

    list.push(...customAdapters);
    return list;
  }, [mmkvInstances, keychainKeys, secureStoreKeys, customAdapters]);

  const handleKeychainKeyAdded = (key: string) => {
    setKeychainKeysAdded((prev: string[]) =>
      prev.includes(key) ? prev : [...prev, key]
    );
  };

  const handleSecureStoreKeyAdded = (key: string) => {
    setSecureStoreKeysAdded((prev: string[]) =>
      prev.includes(key) ? prev : [...prev, key]
    );
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setRefreshKey((k: number) => k + 1);
    setTimeout(() => setRefreshing(false), 400);
  };

  const topInset =
    Platform.OS === 'android'
      ? (StatusBar.currentHeight ?? 24)
      : 59;

  return (
    <View style={[styles.container, { paddingTop: topInset }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {onClose ? (
              <TouchableOpacity
                style={styles.headerButton}
                onPress={onClose}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                activeOpacity={0.6}
              >
                <Icon
                  name="chevronBack"
                  size={28}
                  tintColor={theme.colors.text}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.headerButton} />
            )}
          </View>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Device Storage</Text>
          </View>
          <View style={styles.headerRight} />
        </View>

        {adapters.length > 0 ? (
          <>
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }
            >
              {adapters.map((adapter: IStorageAdapter, index: number) => (
                <StorageSection
                  key={`${adapter.type}-${index}`}
                  adapter={adapter}
                  keychainKeys={keychainKeysProp}
                  onKeychainKeyAdded={handleKeychainKeyAdded}
                  onSecureStoreKeyAdded={handleSecureStoreKeyAdded}
                  expanded={expandedIndex === index}
                  onToggleExpanded={() =>
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                  refreshTrigger={refreshKey}
                />
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.fab}
              onPress={handleRefresh}
              activeOpacity={0.85}
            >
              <Icon
                name="refresh"
                size={24}
                tintColor={theme.colors.inverted}
              />
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No storage adapter available. Install at least one of:
              react-native-mmkv, @react-native-async-storage/async-storage,
              react-native-keychain, expo-secure-store
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
