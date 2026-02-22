import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import type { IStorageAdapter } from '@/adapters/types';
import { createMMKVAdapter } from '@/adapters/mmkv';
import {
  createAsyncStorageAdapter,
  type AsyncStorageModule,
} from '@/adapters/async-storage';
import { createKeychainAdapter, type KeychainModule } from '@/adapters/keychain';
import {
  createSecureStoreAdapter,
  type SecureStoreModule,
} from '@/adapters/secure-store';
import { StorageSection } from '@/components/StorageSection';
import { IconButton } from '@/components/IconButton';
import { styles } from '@/components/styles';
import { theme } from '@/theme';
import { strings } from '@/strings';

export interface StorageInspectorProps {
  mmkvInstances?: Array<{
    getAllKeys(): string[];
    getString(k: string): string | undefined;
    set(k: string, v: string | number | boolean): void;
    delete(k: string): void;
  }>;
  secureStoreKeys?: string[];
  customAdapters?: IStorageAdapter[];
}

export function StorageInspector({
  mmkvInstances = [],
  secureStoreKeys,
  customAdapters = [],
}: StorageInspectorProps) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(() => new Set([0]));

  const adapters = useMemo(() => {
    const list: IStorageAdapter[] = [];

    mmkvInstances.forEach((inst, i) => {
      list.push(
        createMMKVAdapter(inst, mmkvInstances.length > 1 ? `MMKV ${i + 1}` : 'MMKV')
      );
    });

    const asyncAdapter = createAsyncStorageAdapter();
    if (asyncAdapter.isAvailable()) list.push(asyncAdapter);

    const keychainAdapter = createKeychainAdapter();
    if (keychainAdapter.isAvailable()) list.push(keychainAdapter);

    const secureStoreAdapter = createSecureStoreAdapter(secureStoreKeys ?? []);
    if (secureStoreAdapter.isAvailable()) list.push(secureStoreAdapter);

    list.push(...customAdapters);
    return list;
  }, [mmkvInstances, secureStoreKeys, customAdapters]);

  const handleRefresh = () => {
    setRefreshing(true);
    setRefreshKey((k: number) => k + 1);
    setTimeout(() => setRefreshing(false), 400);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {adapters.length > 0 ? (
          <>
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
              }
            >
              {adapters.map((adapter: IStorageAdapter, index: number) => (
                <StorageSection
                  key={`${adapter.type}-${index}`}
                  adapter={adapter}
                  expanded={expandedIndices.has(index)}
                  onToggleExpanded={() => {
                    setExpandedIndices((prev) => {
                      const next = new Set(prev);
                      if (next.has(index)) next.delete(index);
                      else next.add(index);
                      return next;
                    });
                  }}
                  refreshTrigger={refreshKey}
                />
              ))}
            </ScrollView>

            <IconButton
              name="refresh"
              onPress={handleRefresh}
              size={24}
              tintColor={theme.colors.inverted}
              style={styles.fab}
              activeOpacity={0.85}
            />
          </>
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>{strings.noAdapterAvailable}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
