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
            '--candi-accent': 'oklch(52% 0.06 230)',
            '--candi-accent-subtle': 'oklch(85% 0.03 230)',
            '--candi-secondary': 'oklch(58% 0.12 55)',
            '--candi-secondary-subtle': 'oklch(88% 0.04 55)',
            '--candi-success': 'oklch(52% 0.08 145)',
            '--candi-warning': 'oklch(68% 0.13 70)',
            '--candi-error': 'oklch(58% 0.12 25)',
            '--candi-shadow': '0 2px 8px rgba(45, 50, 57, 0.06)',
            '--candi-shadow-md': '0 4px 20px rgba(45, 50, 57, 0.1)',
            '--candi-shadow-lg': '0 8px 40px rgba(45, 50, 57, 0.15)',
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
            '--candi-accent': 'oklch(62% 0.08 230)',
            '--candi-accent-subtle': 'oklch(35% 0.04 230)',
            '--candi-secondary': 'oklch(65% 0.12 55)',
            '--candi-secondary-subtle': 'oklch(30% 0.05 55)',
            '--candi-success': 'oklch(60% 0.1 145)',
            '--candi-warning': 'oklch(72% 0.13 70)',
            '--candi-error': 'oklch(65% 0.12 25)',
            '--candi-shadow': '0 2px 8px rgba(0, 0, 0, 0.25)',
            '--candi-shadow-md': '0 4px 20px rgba(0, 0, 0, 0.35)',
            '--candi-shadow-lg': '0 8px 40px rgba(0, 0, 0, 0.45)',
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

    addUtilities(newUtilities, ['responsive', 'hover', 'dark']);
});
