import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import type { IStorageAdapter } from '../adapters/types';
import type { StorageItem } from '../adapters/types';
import { useStorageItems } from '../hooks/useStorageItems';
import { ItemForm } from './ItemForm';
import { styles } from './styles';

const VALUE_TRUNCATE = 60;

export interface StorageListProps {
  adapter: IStorageAdapter | null;
  keychainKeys?: string[];
  onKeychainKeyAdded?: (key: string) => void;
}

export function StorageList({
  adapter,
  keychainKeys,
  onKeychainKeyAdded,
}: StorageListProps) {
  const { items, loading, error, refresh } = useStorageItems(adapter);
  const [formVisible, setFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<StorageItem | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  const handleEdit = (item: StorageItem) => {
    setEditingItem(item);
    setFormVisible(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormVisible(true);
  };

  const handleSave = async (key: string, value: string) => {
    if (!adapter) return;
    const isNewKey = !editingItem || editingItem.key !== key;
    await adapter.setItem(key, value);
    if (adapter.type === 'keychain' && isNewKey) {
      onKeychainKeyAdded?.(key);
    }
    await refresh();
  };

  const handleDelete = async (item: StorageItem) => {
    if (!adapter) return;
    await adapter.removeItem(item.key);
    await refresh();
  };

  const handleFormCancel = () => {
    setFormVisible(false);
    setEditingItem(null);
  };

  if (!adapter || !adapter.isAvailable()) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>This storage is not available.</Text>
      </View>
    );
  }

  const isKeychain = adapter.type === 'keychain';
  const showKeychainHint = isKeychain && items.length === 0 && (keychainKeys?.length ?? 0) === 0;

  return (
    <>
      {showKeychainHint ? (
        <View style={styles.keychainHint}>
          <Text style={styles.keychainHintText}>
            Keychain has no list API. Pass keychainKeys prop with known keys to inspect, or add a key below to create and edit items.
          </Text>
        </View>
      ) : null}
      {error ? (
        <View style={styles.error}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
      {loading && !refreshing ? (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Loading…</Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={items}
          keyExtractor={(item) => item.key}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            !loading ? (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>No items</Text>
              </View>
            ) : null
          }
          renderItem={({ item }) => {
            const valuePreview =
              item.value.length > VALUE_TRUNCATE
                ? item.value.slice(0, VALUE_TRUNCATE) + '…'
                : item.value;
            return (
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowKey} numberOfLines={1}>
                    {item.key}
                  </Text>
                  <Text style={styles.rowValue} numberOfLines={1}>
                    {valuePreview || '(empty)'}
                  </Text>
                </View>
                <View style={styles.rowActions}>
                  <TouchableOpacity
                    style={styles.rowButton}
                    onPress={() => handleEdit(item)}
                  >
                    <Text style={styles.rowButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rowButton}
                    onPress={() => handleDelete(item)}
                  >
                    <Text style={[styles.rowButtonText, styles.rowButtonDanger]}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add item</Text>
      </TouchableOpacity>
      <ItemForm
        visible={formVisible}
        storageName={adapter?.name ?? 'Storage'}
        editingItem={editingItem}
        onSave={handleSave}
        onCancel={handleFormCancel}
      />
    </>
  );
}
