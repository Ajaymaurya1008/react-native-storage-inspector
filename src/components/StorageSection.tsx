import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import type { IStorageAdapter } from '@/adapters/types';
import type { StorageItem } from '@/adapters/types';
import { useStorageItems } from '@/hooks/useStorageItems';
import { ItemForm } from '@/components/ItemForm';
import { ConfirmModal } from '@/components/ConfirmModal';
import { Icon } from '@/components/Icon';
import { IconButton } from '@/components/IconButton';
import { ItemRowActions } from '@/components/ItemRowActions';
import { styles } from '@/components/styles';
import { theme } from '@/theme';
import { strings } from '@/strings';
import { LAYOUT } from '@/constants';

export interface StorageSectionProps {
  key?: React.Key;
  adapter: IStorageAdapter;
  keychainKeys?: string[];
  onKeychainKeyAdded?: (key: string) => void;
  onSecureStoreKeyAdded?: (key: string) => void;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onToggleExpanded?: () => void;
  refreshTrigger?: number;
}

export function StorageSection({
  adapter,
  keychainKeys,
  onKeychainKeyAdded,
  onSecureStoreKeyAdded,
  defaultExpanded = true,
  expanded: expandedProp,
  onToggleExpanded,
  refreshTrigger,
}: StorageSectionProps) {
  const { items, loading, error, refresh } = useStorageItems(adapter);
  const [expandedInternal, setExpandedInternal] = useState(defaultExpanded);
  const expanded = expandedProp !== undefined ? expandedProp : expandedInternal;

  const handleToggleExpanded = () => {
    if (onToggleExpanded) onToggleExpanded();
    else setExpandedInternal((p: boolean) => !p);
  };

  useEffect(() => {
    if (refreshTrigger !== undefined) refresh();
  }, [refreshTrigger, refresh]);

  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  const [formVisible, setFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<StorageItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<StorageItem | null>(null);
  const [clearAllVisible, setClearAllVisible] = useState(false);

  const handleAdd = () => {
    setEditingItem(null);
    setFormVisible(true);
  };

  const handleEdit = (item: StorageItem) => {
    setEditingItem(item);
    setFormVisible(true);
  };

  const handleSave = async (key: string, value: string) => {
    const isNewKey = !editingItem || editingItem.key !== key;
    await adapter.setItem(key, value);
    if (adapter.type === 'keychain' && isNewKey) {
      onKeychainKeyAdded?.(key);
    }
    if (adapter.type === 'expo-secure-store' && isNewKey) {
      onSecureStoreKeyAdded?.(key);
    }
    await refresh();
  };

  const handleDeleteItem = async () => {
    if (deleteItem) {
      await adapter.removeItem(deleteItem.key);
      setDeleteItem(null);
      await refresh();
    }
  };

  const handleClearAll = async () => {
    for (const item of items) {
      await adapter.removeItem(item.key);
    }
    setClearAllVisible(false);
    await refresh();
  };

  const handleCopy = async (item: StorageItem) => {
    try {
      await Share.share({
        message: item.value,
        title: item.key,
      });
    } catch {
      // Share cancelled or not available
    }
  };

  const isKeychain = adapter.type === 'keychain';
  const isSecureStore = adapter.type === 'expo-secure-store';
  const showKeychainHint =
    isKeychain && items.length === 0 && (keychainKeys?.length ?? 0) === 0;
  const showSecureStoreHint = isSecureStore && items.length === 0;

  if (!adapter.isAvailable()) return null;

  return (
    <>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={handleToggleExpanded}
        activeOpacity={0.7}
      >
        <View style={styles.sectionHeaderLabelWrap}>
          <Text style={styles.sectionHeaderLabel}>
            {adapter.name}
            <Text style={styles.sectionHeaderCount}> ({items.length})</Text>
          </Text>
        </View>
        <View style={styles.storageRowActions}>
          <IconButton name="plus" onPress={handleAdd} />
          <IconButton
            name="trash"
            onPress={() => items.length > 0 && setClearAllVisible(true)}
            disabled={items.length === 0}
          />
          <View style={styles.iconSlot}>
            <Icon
              name={expanded ? 'chevronUp' : 'chevronDown'}
              size={LAYOUT.chevronSize}
              tintColor={theme.colors.text}
            />
          </View>
        </View>
      </TouchableOpacity>

      {expanded && (
        <>
          {showKeychainHint ? (
            <View style={styles.keychainHint}>
              <Text style={styles.keychainHintText}>{strings.keychainHint}</Text>
            </View>
          ) : null}
          {showSecureStoreHint ? (
            <View style={styles.keychainHint}>
              <Text style={styles.keychainHintText}>{strings.secureStoreHint}</Text>
            </View>
          ) : null}
          {error ? (
            <View style={styles.error}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
          {loading ? (
            <View style={styles.loading}>
              <Text style={styles.loadingText}>{strings.loading}</Text>
            </View>
          ) : (
            items.map((item) => {
              const isItemExpanded = expandedKeys.has(item.key);
              const charCount = item.value.length;
              const toggleItemExpanded = () => {
                setExpandedKeys((prev: Set<string>) => {
                  const next = new Set(prev);
                  if (next.has(item.key)) next.delete(item.key);
                  else next.add(item.key);
                  return next;
                });
              };
              return (
                <View key={item.key} style={styles.itemRow}>
                  <TouchableOpacity
                    key={item.key}
                    onPress={toggleItemExpanded}
                    activeOpacity={0.7}
                  >
                    <View style={styles.itemRowCollapsed}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.itemKey} numberOfLines={1}>
                          {item.key}
                        </Text>
                        <Text style={styles.itemChars}>
                          {strings.charCount(charCount)}
                        </Text>
                      </View>
                      {!isItemExpanded ? (
                        <ItemRowActions
                          item={item}
                          onCopy={handleCopy}
                          onEdit={handleEdit}
                          onDelete={setDeleteItem}
                          showChevron
                          chevronDirection="down"
                        />
                      ) : (
                        <View style={styles.iconSlot}>
                          <Icon
                            name="chevronUp"
                            size={LAYOUT.chevronSize}
                            tintColor={theme.colors.text}
                          />
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                  {isItemExpanded && (
                    <View style={styles.itemRowExpanded}>
                      <TouchableOpacity
                        onPress={() => handleEdit(item)}
                        style={styles.valueBox}
                      >
                        <Text style={styles.valueBoxLabel}>{strings.valueLabel}</Text>
                        <Text style={styles.valueBoxText} selectable>
                          {item.value || strings.emptyValue}
                        </Text>
                      </TouchableOpacity>
                      <ItemRowActions
                        item={item}
                        onCopy={handleCopy}
                        onEdit={handleEdit}
                        onDelete={setDeleteItem}
                      />
                    </View>
                  )}
                </View>
              );
            })
          )}
          {!loading && items.length === 0 && !showKeychainHint && !showSecureStoreHint ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>{strings.noItems}</Text>
            </View>
          ) : null}
        </>
      )}

      <ItemForm
        visible={formVisible}
        storageName={adapter.name}
        editingItem={editingItem}
        onSave={handleSave}
        onCancel={() => {
          setFormVisible(false);
          setEditingItem(null);
        }}
      />

      <ConfirmModal
        visible={deleteItem !== null}
        title={strings.deleteItemTitle(deleteItem?.key ?? '')}
        message={strings.deleteItemMessage(deleteItem?.key ?? '')}
        onConfirm={handleDeleteItem}
        onCancel={() => setDeleteItem(null)}
      />

      <ConfirmModal
        visible={clearAllVisible}
        title={strings.clearAllTitle(adapter.name)}
        message={strings.clearAllMessage(items.length, adapter.name)}
        onConfirm={handleClearAll}
        onCancel={() => setClearAllVisible(false)}
      />
    </>
  );
}
