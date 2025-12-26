/**
 * Candi Color Palette - Single Source of Truth
 *
 * This file defines all color tokens used across the Candi design system.
 * It is used to generate CSS, JSON, and platform-specific themes.
 */

const palette = {
    light: {
        bg: { oklch: 'oklch(98% 0.008 85)', name: 'Background', usage: 'Page background' },
        surface: { oklch: 'oklch(95.5% 0.012 85)', name: 'Surface', usage: 'Cards, sections' },
        elevated: { oklch: 'oklch(100% 0 0)', name: 'Elevated', usage: 'Elevated surfaces' },
        text: { oklch: 'oklch(28% 0.015 250)', name: 'Text', usage: 'Primary text' },
        textSubtle: { oklch: 'oklch(50% 0.01 250)', name: 'Text Subtle', usage: 'Secondary text' },
        textMuted: { oklch: 'oklch(62% 0.008 250)', name: 'Text Muted', usage: 'Muted text' },
        border: { oklch: 'oklch(90% 0.008 85)', name: 'Border', usage: 'Borders' },
        borderStrong: { oklch: 'oklch(82% 0.01 85)', name: 'Border Strong', usage: 'Strong borders' },
        accent: { oklch: 'oklch(52% 0.06 230)', name: 'Accent', usage: 'Primary actions' },
        accentSubtle: { oklch: 'oklch(85% 0.03 230)', name: 'Accent Subtle', usage: 'Subtle accents' },
        secondary: { oklch: 'oklch(58% 0.12 55)', name: 'Secondary', usage: 'Secondary actions' },
        secondarySubtle: { oklch: 'oklch(88% 0.04 55)', name: 'Secondary Subtle', usage: 'Subtle secondary' },
        success: { oklch: 'oklch(52% 0.08 145)', name: 'Success', usage: 'Success states' },
        warning: { oklch: 'oklch(68% 0.13 70)', name: 'Warning', usage: 'Warning states' },
        error: { oklch: 'oklch(58% 0.12 25)', name: 'Error', usage: 'Error states' },
        info: { oklch: 'oklch(55% 0.1 240)', name: 'Info', usage: 'Information states' },
        link: { oklch: 'oklch(50% 0.08 230)', name: 'Link', usage: 'Hyperlinks' },
        disabled: { oklch: 'oklch(75% 0.005 250)', name: 'Disabled', usage: 'Disabled UI' },
        overlay: { oklch: 'oklch(0% 0 0 / 0.5)', name: 'Overlay', usage: 'Modal backdrops' },

        // Special
        shadow: { value: '0 2px 8px rgba(45, 50, 57, 0.06)', name: 'Shadow', usage: 'Card shadows' },
        shadowMd: { value: '0 4px 20px rgba(45, 50, 57, 0.1)', name: 'Shadow MD', usage: 'Medium shadows' },
        shadowLg: { value: '0 8px 40px rgba(45, 50, 57, 0.15)', name: 'Shadow LG', usage: 'Large shadows' },
        focusRing: { oklch: 'oklch(52% 0.06 230 / 0.4)', name: 'Focus Ring', usage: 'Focus indicators' },

        // Extended Syntax
        syntaxKeyword: { oklch: 'oklch(60% 0.15 0)', name: 'Syntax Keyword', usage: 'Language keywords' },
        syntaxType: { oklch: 'oklch(65% 0.12 280)', name: 'Syntax Type', usage: 'Types and classes' },
        syntaxVar: { oklch: 'oklch(65% 0.1 200)', name: 'Syntax Variable', usage: 'Variables' },
        syntaxConst: { oklch: 'oklch(70% 0.14 50)', name: 'Syntax Constant', usage: 'Constants' },
        syntaxFunc: { oklch: 'oklch(55% 0.12 240)', name: 'Syntax Function', usage: 'Functions' },
        syntaxString: { oklch: 'oklch(60% 0.12 140)', name: 'Syntax String', usage: 'Strings' },

        // UI States
        hover: { oklch: 'oklch(0% 0 0 / 0.05)', name: 'Hover State', usage: 'Hover background' },
        active: { oklch: 'oklch(0% 0 0 / 0.1)', name: 'Active State', usage: 'Active background' },
    },
    dark: {
        bg: { oklch: 'oklch(18% 0.015 250)', name: 'Background', usage: 'Page background' },
        surface: { oklch: 'oklch(22% 0.012 250)', name: 'Surface', usage: 'Cards, sections' },
        elevated: { oklch: 'oklch(25% 0.015 250)', name: 'Elevated', usage: 'Elevated surfaces' },
        text: { oklch: 'oklch(92% 0.01 85)', name: 'Text', usage: 'Primary text' },
        textSubtle: { oklch: 'oklch(72% 0.008 85)', name: 'Text Subtle', usage: 'Secondary text' },
        textMuted: { oklch: 'oklch(58% 0.006 85)', name: 'Text Muted', usage: 'Muted text' },
        border: { oklch: 'oklch(30% 0.01 250)', name: 'Border', usage: 'Borders' },
        borderStrong: { oklch: 'oklch(40% 0.012 250)', name: 'Border Strong', usage: 'Strong borders' },
        accent: { oklch: 'oklch(62% 0.08 230)', name: 'Accent', usage: 'Primary actions' },
        accentSubtle: { oklch: 'oklch(35% 0.04 230)', name: 'Accent Subtle', usage: 'Subtle accents' },
        secondary: { oklch: 'oklch(65% 0.12 55)', name: 'Secondary', usage: 'Secondary actions' },
        secondarySubtle: { oklch: 'oklch(30% 0.05 55)', name: 'Secondary Subtle', usage: 'Subtle secondary' },
        success: { oklch: 'oklch(60% 0.1 145)', name: 'Success', usage: 'Success states' },
        warning: { oklch: 'oklch(72% 0.13 70)', name: 'Warning', usage: 'Warning states' },
        error: { oklch: 'oklch(65% 0.12 25)', name: 'Error', usage: 'Error states' },
        info: { oklch: 'oklch(65% 0.1 240)', name: 'Info', usage: 'Information states' },
        link: { oklch: 'oklch(60% 0.08 230)', name: 'Link', usage: 'Hyperlinks' },
        disabled: { oklch: 'oklch(45% 0.005 250)', name: 'Disabled', usage: 'Disabled UI' },
        overlay: { oklch: 'oklch(0% 0 0 / 0.7)', name: 'Overlay', usage: 'Modal backdrops' },

        // Special
        shadow: { value: '0 2px 8px rgba(0, 0, 0, 0.25)', name: 'Shadow', usage: 'Card shadows' },
        shadowMd: { value: '0 4px 20px rgba(0, 0, 0, 0.35)', name: 'Shadow MD', usage: 'Medium shadows' },
        shadowLg: { value: '0 8px 40px rgba(0, 0, 0, 0.45)', name: 'Shadow LG', usage: 'Large shadows' },
        focusRing: { oklch: 'oklch(62% 0.08 230 / 0.5)', name: 'Focus Ring', usage: 'Focus indicators' },

        // Extended Syntax
        syntaxKeyword: { oklch: 'oklch(70% 0.15 0)', name: 'Syntax Keyword', usage: 'Language keywords' },
        syntaxType: { oklch: 'oklch(75% 0.12 280)', name: 'Syntax Type', usage: 'Types and classes' },
        syntaxVar: { oklch: 'oklch(75% 0.1 200)', name: 'Syntax Variable', usage: 'Variables' },
        syntaxConst: { oklch: 'oklch(80% 0.14 50)', name: 'Syntax Constant', usage: 'Constants' },
        syntaxFunc: { oklch: 'oklch(65% 0.12 240)', name: 'Syntax Function', usage: 'Functions' },
        syntaxString: { oklch: 'oklch(70% 0.12 140)', name: 'Syntax String', usage: 'Strings' },

        // UI States
        hover: { oklch: 'oklch(100% 0 0 / 0.1)', name: 'Hover State', usage: 'Hover background' },
        active: { oklch: 'oklch(100% 0 0 / 0.2)', name: 'Active State', usage: 'Active background' },
    }
};

module.exports = palette;
