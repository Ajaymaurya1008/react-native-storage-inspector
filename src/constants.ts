import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const LAYOUT = {
  padding: 16,
  fontSize: 14,
  headerHeight: 52,
  rowMinHeight: 48,
  sectionHeaderHeight: 48,
  iconSize: 20,
  chevronSize: 24,
  iconGap: 2,
  iconButtonSize: 36,
  hitSlop: { top: 8, bottom: 8, left: 8, right: 8 },
  hitSlopLarge: { top: 10, bottom: 10, left: 10, right: 10 },
  fabSize: 52,
  modalRadius: 16,
  sectionRadius: 4,
  screenWidth: SCREEN_WIDTH,
} as const;
