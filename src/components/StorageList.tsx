import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { StorageItem } from '@/adapters/types';
import { Icon } from '@/components/Icon';
import { ItemRowActions } from '@/components/ItemRowActions';
import { theme } from '@/theme';
import { strings } from '@/strings';
import { LAYOUT } from '@/constants';

export interface StorageListProps {
  item: StorageItem;
  onCopy: (item: StorageItem) => void;
  onEdit: (item: StorageItem) => void;
  onDelete: (item: StorageItem) => void;
}

export function StorageList(props: StorageListProps) {
  const { item, onCopy, onEdit, onDelete } = props;

  const [expandedKeys, setExpandedKeys] = useState(new Set<string>());
  const charCount = item.value.length;

  const handleToggleExpanded = () => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(item.key)) next.delete(item.key);
      else next.add(item.key);
      return next;
    });
  };
  const isExpanded = expandedKeys.has(item.key);
  return (
    <View style={styles.itemRow}>
      <TouchableOpacity onPress={handleToggleExpanded} activeOpacity={0.7}>
        <View style={styles.itemRowCollapsed}>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemKey} numberOfLines={1}>
              {item.key}
            </Text>
            <Text style={styles.itemChars}>{strings.charCount(charCount)}</Text>
          </View>
          {!isExpanded ? (
            <ItemRowActions
              item={item}
              onCopy={onCopy}
              onEdit={onEdit}
              onDelete={onDelete}
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
      {isExpanded && (
        <View style={styles.itemRowExpanded}>
          <TouchableOpacity onPress={() => onEdit(item)} style={styles.valueBox}>
            <Text style={styles.valueBoxLabel}>{strings.valueLabel}</Text>
            <Text style={styles.valueBoxText} selectable>
              {item.value}
            </Text>
          </TouchableOpacity>
          <ItemRowActions
            item={item}
            onCopy={onCopy}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </View>
      )}
    </View>
  );
}

const { colors } = theme;

const styles = StyleSheet.create({
  itemRow: {
    minHeight: LAYOUT.rowMinHeight,
    paddingHorizontal: LAYOUT.padding,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
    backgroundColor: colors.background,
    marginHorizontal: LAYOUT.padding,
    marginBottom: 4,
  },
  itemRowCollapsed: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  itemKey: {
    flex: 1,
    fontSize: LAYOUT.fontSize,
    fontWeight: '500',
    color: colors.text,
  },
  itemChars: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  iconSlot: {
    width: LAYOUT.iconButtonSize,
    height: LAYOUT.iconButtonSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemRowExpanded: {
    paddingTop: 4,
  },
  valueBox: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    marginBottom: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  valueBoxLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  valueBoxText: {
    fontSize: LAYOUT.fontSize,
    color: colors.text,
  },
});
