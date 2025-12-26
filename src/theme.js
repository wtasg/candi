/**
 * Scandinavian Theme - Tailwind Theme Extension
 *
 * Use this to extend your Tailwind config with Scandinavian design tokens.
 */

module.exports = {
    colors: {
        candi: {
            // Backgrounds
            bg: 'var(--candi-bg)',
            surface: 'var(--candi-surface)',
            elevated: 'var(--candi-elevated)',

            // Text
            text: 'var(--candi-text)',
            subtle: 'var(--candi-text-subtle)',
            muted: 'var(--candi-text-muted)',

            // Borders
            border: 'var(--candi-border)',
            'border-strong': 'var(--candi-border-strong)',

            // Accents
            accent: 'var(--candi-accent)',
            'accent-subtle': 'var(--candi-accent-subtle)',
            secondary: 'var(--candi-secondary)',
            'secondary-subtle': 'var(--candi-secondary-subtle)',
            success: 'var(--candi-success)',
            warning: 'var(--candi-warning)',
            error: 'var(--candi-error)',
            info: 'var(--candi-info)',
            link: 'var(--candi-link)',
            disabled: 'var(--candi-disabled)',
            overlay: 'var(--candi-overlay)',
            'focus-ring': 'var(--candi-focus-ring)',

            // Extended Syntax
            'syntax-keyword': 'var(--candi-syntax-keyword)',
            'syntax-type': 'var(--candi-syntax-type)',
            'syntax-var': 'var(--candi-syntax-var)',
            'syntax-const': 'var(--candi-syntax-const)',
            'syntax-func': 'var(--candi-syntax-func)',
            'syntax-string': 'var(--candi-syntax-string)',

            // Terminal
            'terminal-black': 'var(--candi-terminal-black)',
            'terminal-red': 'var(--candi-terminal-red)',
            'terminal-green': 'var(--candi-terminal-green)',
            'terminal-yellow': 'var(--candi-terminal-yellow)',
            'terminal-blue': 'var(--candi-terminal-blue)',
            'terminal-magenta': 'var(--candi-terminal-magenta)',
            'terminal-cyan': 'var(--candi-terminal-cyan)',
            'terminal-white': 'var(--candi-terminal-white)',

            // UI States
            hover: 'var(--candi-hover)',
            active: 'var(--candi-active)',
        },
    },

    spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '7': '1.75rem',
        '9': '2.25rem',
        '11': '2.75rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
    },

    fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
    },

    fontSize: {
        'xs': ['0.8125rem', { lineHeight: '1.5' }],
        'sm': ['0.9375rem', { lineHeight: '1.6' }],
    },

    lineHeight: {
        'relaxed': '1.7',
        'relaxed-plus': '1.85',
    },

    minHeight: {
        'btn': '3.25rem',
        'input': '3.5rem',
    },

    borderRadius: {
        'soft': '0.75rem',
        'softer': '1rem',
        'pill': '2rem',
    },

    boxShadow: {
        'hygge': 'var(--candi-shadow)',
        'hygge-md': 'var(--candi-shadow-md)',
        'hygge-lg': 'var(--candi-shadow-lg)',
    },

    transitionDuration: {
        '250': '250ms',
    },
};
