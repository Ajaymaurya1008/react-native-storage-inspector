/**
 * Theme: minimalistic black and white palette.
 * All colors centralized here - no direct hex values in components.
 */
export const theme = {
  colors: {
    background: '#ffffff',
    backgroundSecondary: '#f5f5f5',
    backgroundTertiary: '#eeeeee',
    border: '#e0e0e0',
    borderLight: '#ebebeb',
    text: '#000000',
    textSecondary: '#666666',
    textMuted: '#999999',
    inverted: '#ffffff',
    overlayBackdrop: 'rgba(0,0,0,0.5)',
  },
} as const;

export type Theme = typeof theme;
