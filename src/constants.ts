import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const LAYOUT = {
  padding: 16,
  fontSize: 14,
  headerHeight: 52,
  rowMinHeight: 48,
  sectionHeaderHeight: 48,
  iconSize: 20,
  iconGap: 2,
  iconButtonSize: 36,
  fabSize: 52,
  modalRadius: 16,
  screenWidth: SCREEN_WIDTH,
} as const;
