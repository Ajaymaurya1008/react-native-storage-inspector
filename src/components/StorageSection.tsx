import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import type { IStorageAdapter } from '../adapters/types';
import type { StorageItem } from '../adapters/types';
import { useStorageItems } from '../hooks/useStorageItems';
import { ItemForm } from './ItemForm';
import { ConfirmModal } from './ConfirmModal';
import { Icon } from './Icon';
import { styles } from './styles';
import { theme } from '../theme';

const ICON_SIZE = 20;
const CHEVRON_SIZE = 24;

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
  const expanded =
    expandedProp !== undefined ? expandedProp : expandedInternal;

  const handleToggleExpanded = () => {
    if (onToggleExpanded) onToggleExpanded();
    else setExpandedInternal((p: boolean) => !p);
  };

  React.useEffect(() => {
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
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleAdd}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            activeOpacity={0.6}
          >
            <Icon name="plus" size={ICON_SIZE} tintColor={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => items.length > 0 && setClearAllVisible(true)}
            disabled={items.length === 0}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            activeOpacity={0.6}
          >
            <Icon
              name="trash"
              size={ICON_SIZE}
              tintColor={
                items.length === 0 ? theme.colors.textMuted : theme.colors.text
              }
            />
          </TouchableOpacity>
          <View style={styles.iconSlot}>
            <Icon
              name={expanded ? 'chevronUp' : 'chevronDown'}
              size={CHEVRON_SIZE}
              tintColor={theme.colors.text}
            />
          </View>
        </View>
      </TouchableOpacity>

      {expanded && (
        <>
          {showKeychainHint ? (
            <View style={styles.keychainHint}>
              <Text style={styles.keychainHintText}>
                Keychain has no list API. Pass keychainKeys prop with known keys,
                or add a key using + above.
              </Text>
            </View>
          ) : null}
          {showSecureStoreHint ? (
            <View style={styles.keychainHint}>
              <Text style={styles.keychainHintText}>
                Secure Store has no list API. Pass secureStoreKeys prop with known
                keys, or add a key using + above.
              </Text>
            </View>
          ) : null}
          {error ? (
            <View style={styles.error}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
          {loading ? (
            <View style={styles.loading}>
              <Text style={styles.loadingText}>Loading…</Text>
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
                <TouchableOpacity
                  key={item.key}
                  style={styles.itemRow}
                  onPress={toggleItemExpanded}
                  activeOpacity={0.7}
                >
                  <View style={styles.itemRowCollapsed}>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={styles.itemKey}
                        numberOfLines={1}
                      >
                        {item.key}
                      </Text>
                      <Text style={styles.itemChars}>
                        {charCount} char{charCount !== 1 ? 's' : ''}
                      </Text>
                    </View>
                    {!isItemExpanded ? (
                      <View style={styles.itemRowActions}>
                        <TouchableOpacity
                          style={styles.iconButton}
                          onPress={() => handleCopy(item)}
                          activeOpacity={0.6}
                        >
                          <Icon name="copy" size={ICON_SIZE} tintColor={theme.colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.iconButton}
                          onPress={() => handleEdit(item)}
                          activeOpacity={0.6}
                        >
                          <Icon name="edit" size={ICON_SIZE} tintColor={theme.colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.iconButton}
                          onPress={() => setDeleteItem(item)}
                          activeOpacity={0.6}
                        >
                          <Icon name="trash" size={ICON_SIZE} tintColor={theme.colors.text} />
                        </TouchableOpacity>
                        <View style={styles.iconSlot}>
                          <Icon name="chevronDown" size={CHEVRON_SIZE} tintColor={theme.colors.text} />
                        </View>
                      </View>
                    ) : (
                      <View style={styles.iconSlot}>
                        <Icon name="chevronUp" size={CHEVRON_SIZE} tintColor={theme.colors.text} />
                      </View>
                    )}
                  </View>
                  {isItemExpanded && (
                    <View style={styles.itemRowExpanded}>
                      <View style={styles.valueBox}>
                        <Text style={styles.valueBoxLabel}>Value</Text>
                        <Text
                          style={styles.valueBoxText}
                          selectable
                        >
                          {item.value || '(empty)'}
                        </Text>
                      </View>
                      <View style={styles.itemRowActions}>
                        <TouchableOpacity
                          style={styles.iconButton}
                          onPress={() => handleCopy(item)}
                          activeOpacity={0.6}
                        >
                          <Icon name="copy" size={ICON_SIZE} tintColor={theme.colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.iconButton}
                          onPress={() => handleEdit(item)}
                          activeOpacity={0.6}
                        >
                          <Icon name="edit" size={ICON_SIZE} tintColor={theme.colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.iconButton}
                          onPress={() => setDeleteItem(item)}
                          activeOpacity={0.6}
                        >
                          <Icon name="trash" size={ICON_SIZE} tintColor={theme.colors.text} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })
          )}
          {!loading && items.length === 0 && !showKeychainHint && !showSecureStoreHint ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No items</Text>
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
        title={`Delete ${deleteItem?.key ?? ''}?`}
        message={`This will permanently delete the ${deleteItem?.key ?? ''} storage item. Do you wish to continue?`}
        onConfirm={handleDeleteItem}
        onCancel={() => setDeleteItem(null)}
      />

      <ConfirmModal
        visible={clearAllVisible}
        title={`Clear All ${adapter.name}?`}
        message={`This will permanently delete all ${items.length} ${adapter.name} items. Do you wish to continue?`}
        onConfirm={handleClearAll}
        onCancel={() => setClearAllVisible(false)}
      />
    </>
  );
}
