import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import type { StorageItem } from '@/adapters/types';
import { Icon } from '@/components/Icon';
import { ItemRowActions } from '@/components/ItemRowActions';
import { useExpandAnimation } from '@/hooks/useExpandAnimation';
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

  const [isExpanded, setIsExpanded] = useState(false);
  const charCount = item.value.length;
  const { chevronStyle, heightAnim, animate, onMeasureLayout } =
    useExpandAnimation(false);

  const handleToggleExpanded = () => {
    const next = !isExpanded;
    setIsExpanded(next);
    animate(next);
  };
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
          {!isExpanded && (
            <ItemRowActions
              item={item}
              onCopy={onCopy}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}
          <View style={styles.iconSlot}>
            <Animated.View style={chevronStyle}>
              <Icon
                name="chevronDown"
                size={LAYOUT.chevronSize}
                tintColor={theme.colors.text}
              />
            </Animated.View>
          </View>
        </View>
      </TouchableOpacity>
      {/* Ghost view: absolutely positioned so parent height:0 doesn't constrain it.
          onLayout fires with the true natural height used to drive the animation. */}
      <View
        style={styles.expandedMeasure}
        pointerEvents="none"
        onLayout={onMeasureLayout}
      >
        <View style={styles.itemRowExpanded}>
          <View style={styles.valueBox}>
            <Text style={styles.valueBoxLabel}>{strings.valueLabel}</Text>
            <Text style={styles.valueBoxText}>{item.value}</Text>
          </View>
          <ItemRowActions
            item={item}
            onCopy={onCopy}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </View>
      </View>

      <Animated.View style={{ height: heightAnim, overflow: 'hidden' }}>
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
      </Animated.View>
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
  expandedMeasure: {
    position: 'absolute',
    opacity: 0,
    left: 0,
    right: 0,
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
