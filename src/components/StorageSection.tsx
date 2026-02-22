import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Share, StyleSheet } from 'react-native';
import type { IStorageAdapter } from '@/adapters/types';
import type { StorageItem } from '@/adapters/types';
import { useStorageItems } from '@/hooks/useStorageItems';
import { ItemForm } from '@/components/ItemForm';
import { ConfirmModal } from '@/components/ConfirmModal';
import { Icon } from '@/components/Icon';
import { IconButton } from '@/components/IconButton';
import { StorageList } from '@/components/StorageList';
import { theme } from '@/theme';
import { strings } from '@/strings';
import { LAYOUT } from '@/constants';

export interface StorageSectionProps {
  key?: React.Key;
  adapter: IStorageAdapter;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onToggleExpanded?: () => void;
  refreshTrigger?: number;
}

export function StorageSection(props: StorageSectionProps) {
  const {
    adapter,
    defaultExpanded = true,
    expanded: expandedProp,
    onToggleExpanded,
    refreshTrigger,
  } = props;

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
    await adapter.setItem(key, value);
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
  const showKeychainHint = isKeychain && items.length === 0;
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
            items.map((item) => (
              <StorageList
                key={item.key}
                item={item}
                onCopy={handleCopy}
                onEdit={handleEdit}
                onDelete={setDeleteItem}
              />
            ))
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

const { colors } = theme;

const styles = StyleSheet.create({
  sectionHeader: {
    height: LAYOUT.sectionHeaderHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: LAYOUT.padding,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    backgroundColor: colors.backgroundSecondary,
    marginTop: LAYOUT.padding,
    marginHorizontal: LAYOUT.padding,
    borderRadius: LAYOUT.sectionRadius,
  },
  sectionHeaderLabelWrap: {
    flex: 1,
  },
  sectionHeaderLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  sectionHeaderCount: {
    color: colors.textSecondary,
    fontWeight: '400',
  },
  storageRowActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: LAYOUT.iconGap,
  },
  iconSlot: {
    width: LAYOUT.iconButtonSize,
    height: LAYOUT.iconButtonSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keychainHint: {
    padding: LAYOUT.padding,
    marginHorizontal: LAYOUT.padding,
    marginTop: 8,
    marginBottom: 4,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
  },
  keychainHintText: {
    fontSize: LAYOUT.fontSize - 1,
    color: colors.textSecondary,
  },
  error: {
    padding: LAYOUT.padding,
    backgroundColor: colors.backgroundTertiary,
    marginHorizontal: LAYOUT.padding,
    marginVertical: 8,
    borderRadius: 8,
  },
  errorText: {
    fontSize: LAYOUT.fontSize,
    color: colors.text,
  },
  loading: {
    padding: LAYOUT.padding * 2,
    alignItems: 'center',
    marginHorizontal: LAYOUT.padding,
  },
  loadingText: {
    fontSize: LAYOUT.fontSize,
    color: colors.textSecondary,
  },
  empty: {
    padding: LAYOUT.padding * 2,
    alignItems: 'center',
    marginHorizontal: LAYOUT.padding,
  },
  emptyText: {
    fontSize: LAYOUT.fontSize,
    color: colors.textMuted,
  },
});
