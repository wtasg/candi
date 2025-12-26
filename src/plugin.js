/**
 * Scandinavian Theme - Tailwind Plugin
 *
 * Generates candi-* utility classes for semantic color usage.
 */

const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addUtilities, addBase, theme, e }) {
    // Inject CSS custom properties
    addBase({
        ':root': {
            '--candi-bg': 'oklch(98% 0.008 85)',
            '--candi-surface': 'oklch(95.5% 0.012 85)',
            '--candi-elevated': 'oklch(100% 0 0)',
            '--candi-text': 'oklch(28% 0.015 250)',
            '--candi-text-subtle': 'oklch(50% 0.01 250)',
            '--candi-text-muted': 'oklch(62% 0.008 250)',
            '--candi-border': 'oklch(90% 0.008 85)',
            '--candi-border-strong': 'oklch(82% 0.01 85)',
            '--candi-divider': 'oklch(88% 0.006 85)',
            '--candi-accent': 'oklch(52% 0.06 230)',
            '--candi-accent-subtle': 'oklch(85% 0.03 230)',
            '--candi-on-accent': 'oklch(100% 0 0)',
            '--candi-secondary': 'oklch(58% 0.12 55)',
            '--candi-secondary-subtle': 'oklch(88% 0.04 55)',
            '--candi-on-secondary': 'oklch(100% 0 0)',
            '--candi-success': 'oklch(52% 0.08 145)',
            '--candi-on-success': 'oklch(100% 0 0)',
            '--candi-warning': 'oklch(68% 0.13 70)',
            '--candi-on-warning': 'oklch(20% 0.02 70)',
            '--candi-error': 'oklch(58% 0.12 25)',
            '--candi-on-error': 'oklch(100% 0 0)',
            '--candi-info': 'oklch(55% 0.1 240)',
            '--candi-on-info': 'oklch(100% 0 0)',
            '--candi-link': 'oklch(50% 0.08 230)',
            '--candi-disabled': 'oklch(75% 0.005 250)',
            '--candi-overlay': 'oklch(0% 0 0 / 0.5)',
            '--candi-scrim': 'oklch(0% 0 0 / 0.32)',
            '--candi-inverse-surface': 'oklch(25% 0.015 250)',
            '--candi-inverse-text': 'oklch(92% 0.01 85)',
            '--candi-focus-ring': 'oklch(52% 0.06 230 / 0.4)',
            '--candi-shadow': '0 2px 8px rgba(45, 50, 57, 0.06)',
            '--candi-shadow-md': '0 4px 20px rgba(45, 50, 57, 0.1)',
            '--candi-shadow-lg': '0 8px 40px rgba(45, 50, 57, 0.15)',
            '--candi-shadow-color': 'oklch(25% 0.01 250 / 0.15)',
            '--candi-syntax-keyword': 'oklch(60% 0.15 0)',
            '--candi-syntax-type': 'oklch(65% 0.12 280)',
            '--candi-syntax-var': 'oklch(65% 0.1 200)',
            '--candi-syntax-const': 'oklch(70% 0.14 50)',
            '--candi-syntax-func': 'oklch(55% 0.12 240)',
            '--candi-syntax-string': 'oklch(60% 0.12 140)',
            '--candi-hover': 'oklch(0% 0 0 / 0.05)',
            '--candi-active': 'oklch(0% 0 0 / 0.1)',
        },
        '.dark': {
            '--candi-bg': 'oklch(18% 0.015 250)',
            '--candi-surface': 'oklch(22% 0.012 250)',
            '--candi-elevated': 'oklch(25% 0.015 250)',
            '--candi-text': 'oklch(92% 0.01 85)',
            '--candi-text-subtle': 'oklch(72% 0.008 85)',
            '--candi-text-muted': 'oklch(58% 0.006 85)',
            '--candi-border': 'oklch(30% 0.01 250)',
            '--candi-border-strong': 'oklch(40% 0.012 250)',
            '--candi-divider': 'oklch(28% 0.008 250)',
            '--candi-accent': 'oklch(62% 0.08 230)',
            '--candi-accent-subtle': 'oklch(35% 0.04 230)',
            '--candi-on-accent': 'oklch(15% 0.01 230)',
            '--candi-secondary': 'oklch(65% 0.12 55)',
            '--candi-secondary-subtle': 'oklch(30% 0.05 55)',
            '--candi-on-secondary': 'oklch(15% 0.02 55)',
            '--candi-success': 'oklch(60% 0.1 145)',
            '--candi-on-success': 'oklch(15% 0.02 145)',
            '--candi-warning': 'oklch(72% 0.13 70)',
            '--candi-on-warning': 'oklch(15% 0.02 70)',
            '--candi-error': 'oklch(65% 0.12 25)',
            '--candi-on-error': 'oklch(15% 0.02 25)',
            '--candi-info': 'oklch(65% 0.1 240)',
            '--candi-on-info': 'oklch(15% 0.02 240)',
            '--candi-link': 'oklch(60% 0.08 230)',
            '--candi-disabled': 'oklch(45% 0.005 250)',
            '--candi-overlay': 'oklch(0% 0 0 / 0.7)',
            '--candi-scrim': 'oklch(0% 0 0 / 0.6)',
            '--candi-inverse-surface': 'oklch(92% 0.008 85)',
            '--candi-inverse-text': 'oklch(25% 0.015 250)',
            '--candi-focus-ring': 'oklch(62% 0.08 230 / 0.5)',
            '--candi-shadow': '0 2px 8px rgba(0, 0, 0, 0.25)',
            '--candi-shadow-md': '0 4px 20px rgba(0, 0, 0, 0.35)',
            '--candi-shadow-lg': '0 8px 40px rgba(0, 0, 0, 0.45)',
            '--candi-shadow-color': 'oklch(0% 0 0 / 0.4)',
            '--candi-syntax-keyword': 'oklch(70% 0.15 0)',
            '--candi-syntax-type': 'oklch(75% 0.12 280)',
            '--candi-syntax-var': 'oklch(75% 0.1 200)',
            '--candi-syntax-const': 'oklch(80% 0.14 50)',
            '--candi-syntax-func': 'oklch(65% 0.12 240)',
            '--candi-syntax-string': 'oklch(70% 0.12 140)',
            '--candi-hover': 'oklch(100% 0 0 / 0.1)',
            '--candi-active': 'oklch(100% 0 0 / 0.2)',
        },
    });

    // Generate candi-* utilities
    const colors = theme('colors.candi') || {};
    const newUtilities = {};

    Object.keys(colors).forEach((key) => {
        const colorValue = colors[key];
        newUtilities[`.${e(`bg-candi-${key}`)}`] = { backgroundColor: colorValue };
        newUtilities[`.${e(`text-candi-${key}`)}`] = { color: colorValue };
        newUtilities[`.${e(`border-candi-${key}`)}`] = { borderColor: colorValue };
        newUtilities[`.${e(`fill-candi-${key}`)}`] = { fill: colorValue };
        newUtilities[`.${e(`stroke-candi-${key}`)}`] = { stroke: colorValue };
    });

    addUtilities(newUtilities);
});
