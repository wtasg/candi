/**
 * TypeScript definitions for Candi Design System
 */

export interface CandiColorTokens {
  bg: string;
  surface: string;
  elevated: string;
  text: string;
  subtle: string;
  muted: string;
  border: string;
  'border-strong': string;
  accent: string;
  'accent-subtle': string;
  secondary: string;
  'secondary-subtle': string;
  success: string;
  warning: string;
  error: string;
  info: string;
  link: string;
  disabled: string;
  overlay: string;
  'focus-ring': string;
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
