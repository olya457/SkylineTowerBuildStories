import { ViewStyle } from 'react-native';

export const COLORS = {
  bgDark: '#0d1b4b',
  bgMid: '#1a2a6c',
  bgLight: '#2a3a8c',
  cardBg: 'rgba(255,255,255,0.12)',
  cardBorder: 'rgba(255,255,255,0.18)',
  accent: '#FFD700',
  accentSecondary: '#FFA500',
  white: '#FFFFFF',
  textMuted: '#a0b0d0',
} as const;

export const SHADOWS: Record<string, ViewStyle> = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
};