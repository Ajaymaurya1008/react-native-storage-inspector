import React from 'react';
import { View } from 'react-native';
import type { StorageItem } from '../adapters/types';
import type { IconName } from './Icon';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import { styles } from './styles';
import { theme } from '../theme';
import { LAYOUT } from '../constants';

export interface ItemRowActionsProps {
  item: StorageItem;
  onCopy: (item: StorageItem) => void;
  onEdit: (item: StorageItem) => void;
  onDelete: (item: StorageItem) => void;
  showChevron?: boolean;
  chevronDirection?: 'up' | 'down';
}

export function ItemRowActions({
  item,
  onCopy,
  onEdit,
  onDelete,
  showChevron = false,
  chevronDirection = 'down',
}: ItemRowActionsProps) {
  return (
    <View style={styles.itemRowActions}>
      <IconButton name="copy" onPress={() => onCopy(item)} />
      <IconButton name="edit" onPress={() => onEdit(item)} />
      <IconButton name="trash" onPress={() => onDelete(item)} />
      {showChevron && (
        <View style={styles.iconSlot}>
          <Icon
            name={chevronDirection === 'up' ? 'chevronUp' : 'chevronDown'}
            size={LAYOUT.chevronSize}
            tintColor={theme.colors.text}
          />
        </View>
      )}
    </View>
  );
}
