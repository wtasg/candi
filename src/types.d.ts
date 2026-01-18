/**
 * TypeScript definitions for Candi Design System
 */

export interface CandiColorTokens {
  // Backgrounds
  bg: string;
  surface: string;
  elevated: string;
  // Text
  text: string;
  subtle: string;
  muted: string;
  // Borders
  border: string;
  'border-strong': string;
  divider: string;
  // Accents
  accent: string;
  'accent-subtle': string;
  'on-accent': string;
  secondary: string;
  'secondary-subtle': string;
  'on-secondary': string;
  // Status
  success: string;
  'on-success': string;
  warning: string;
  'on-warning': string;
  error: string;
  'on-error': string;
  info: string;
  'on-info': string;
  // Interactive
  link: string;
  disabled: string;
  overlay: string;
  scrim: string;
  'focus-ring': string;
  // Inverse
  'inverse-surface': string;
  'inverse-text': string;
  // Shadow
  'shadow-color': string;
  // Syntax
  'syntax-keyword': string;
  'syntax-type': string;
  'syntax-var': string;
  'syntax-const': string;
  'syntax-func': string;
  'syntax-string': string;
  // Terminal
  'terminal-black': string;
  'terminal-red': string;
  'terminal-green': string;
  'terminal-yellow': string;
  'terminal-blue': string;
  'terminal-magenta': string;
  'terminal-cyan': string;
  'terminal-white': string;
  // UI States
  hover: string;
  active: string;
  // Primitive Colors with variations
  // Red
  red: string;
  'red-subtle': string;
  'red-soft': string;
  'red-strong': string;
  'red-outline': string;
  'on-red': string;
  // Blue
  blue: string;
  'blue-subtle': string;
  'blue-soft': string;
  'blue-strong': string;
  'blue-outline': string;
  'on-blue': string;
  // Green
  green: string;
  'green-subtle': string;
  'green-soft': string;
  'green-strong': string;
  'green-outline': string;
  'on-green': string;
  // Yellow
  yellow: string;
  'yellow-subtle': string;
  'yellow-soft': string;
  'yellow-strong': string;
  'yellow-outline': string;
  'on-yellow': string;
  // Magenta
  magenta: string;
  'magenta-subtle': string;
  'magenta-soft': string;
  'magenta-strong': string;
  'magenta-outline': string;
  'on-magenta': string;
  // Cyan
  cyan: string;
  'cyan-subtle': string;
  'cyan-soft': string;
  'cyan-strong': string;
  'cyan-outline': string;
  'on-cyan': string;
  // Teal
  teal: string;
  'teal-subtle': string;
  'teal-soft': string;
  'teal-strong': string;
  'teal-outline': string;
  'on-teal': string;
  // Pink
  pink: string;
  'pink-subtle': string;
  'pink-soft': string;
  'pink-strong': string;
  'pink-outline': string;
  'on-pink': string;
  // Gold
  gold: string;
  'gold-subtle': string;
  'gold-soft': string;
  'gold-strong': string;
  'gold-outline': string;
  'on-gold': string;
  // Silver
  silver: string;
  'silver-subtle': string;
  'silver-soft': string;
  'silver-strong': string;
  'silver-outline': string;
  'on-silver': string;
}

export interface CandiTheme {
  colors: {
    candi: CandiColorTokens;
  };
  spacing: Record<string, string>;
  fontFamily: Record<string, string[]>;
  fontSize: Record<string, [string, { lineHeight: string }]>;
  lineHeight: Record<string, string>;
  minHeight: Record<string, string>;
  borderRadius: Record<string, string>;
  boxShadow: Record<string, string>;
  transitionDuration: Record<string, string>;
}

declare const theme: CandiTheme;
export default theme;
