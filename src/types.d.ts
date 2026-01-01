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
