import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import type { IconName } from '@/components/Icon';
import { Icon } from '@/components/Icon';
import { theme } from '@/theme';
import { LAYOUT } from '@/constants';
import { styles as sharedStyles } from '@/components/styles';

export interface IconButtonProps {
  name: IconName;
  onPress: () => void;
  size?: number;
  tintColor?: string;
  disabled?: boolean;
  hitSlop?: { top: number; bottom: number; left: number; right: number };
  style?: ViewStyle;
  activeOpacity?: number;
}

export function IconButton({
  name,
  onPress,
  size = LAYOUT.iconSize,
  tintColor = theme.colors.text,
  disabled = false,
  hitSlop = LAYOUT.hitSlop,
  style,
  activeOpacity = 0.6,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      style={[sharedStyles.iconButton, style]}
      onPress={onPress}
      disabled={disabled}
      hitSlop={hitSlop}
      activeOpacity={activeOpacity}
    >
      <Icon
        name={name}
        size={size}
        tintColor={disabled ? theme.colors.textMuted : tintColor}
      />
    </TouchableOpacity>
  );
}
