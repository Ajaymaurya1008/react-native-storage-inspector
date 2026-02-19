import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { theme } from '@/theme';

const GLYPHS: Record<string, string> = {
  chevronBack: '‹',
  refresh: '↻',
  plus: '+',
  chevronDown: '›',
  chevronUp: '›',
  chevronRight: '›',
  close: '×',
  copy: '⎘',
  edit: '✎',
  trash: '⌫',
};

const ROTATION: Partial<Record<string, string>> = {
  chevronDown: '90deg',
  chevronUp: '-90deg',
};

export type IconName = keyof typeof GLYPHS;

export interface IconProps {
  name: IconName;
  size?: number;
  tintColor?: string;
  iconStyle?: TextStyle;
}

export function Icon({
  name,
  size = 20,
  tintColor = theme.colors.text,
  iconStyle,
}: IconProps) {
  const glyph = GLYPHS[name] ?? '?';
  const rotation = ROTATION[name];

  return (
    <Text
      style={[
        styles.icon,
        { fontSize: size, color: tintColor, lineHeight: size },
        ...(rotation ? [{ transform: [{ rotate: rotation }] }] : []),
        iconStyle,
      ]}
    >
      {glyph}
    </Text>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    fontWeight: '300',
  },
});
