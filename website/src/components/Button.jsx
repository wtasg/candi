import PropTypes from 'prop-types'

/**
 * Button component with multiple variants
 */
export default function Button({
    children,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    fullWidth = false,
    onClick,
    type = 'button',
    className = '',
    ...props
}) {
    const baseStyles = 'font-medium rounded-soft transition-all inline-flex items-center justify-center gap-2'

    const variants = {
        primary: 'bg-candi-accent text-candi-on-accent hover:opacity-90 shadow-hygge',
        'primary-subtle': 'bg-candi-accent-subtle text-candi-accent-strong hover:opacity-80',
        'primary-soft': 'bg-candi-accent-soft text-candi-accent-strong hover:opacity-80',
        'primary-strong': 'bg-candi-accent-strong text-candi-on-accent hover:opacity-90 shadow-hygge',
        'primary-outline': 'border-2 border-candi-accent text-candi-accent hover:bg-candi-accent-subtle',

        secondary: 'bg-candi-secondary text-candi-on-secondary hover:opacity-90 shadow-hygge',
        'secondary-subtle': 'bg-candi-secondary-subtle text-candi-secondary-strong hover:opacity-80',
        'secondary-soft': 'bg-candi-secondary-soft text-candi-secondary-strong hover:opacity-80',
        'secondary-strong': 'bg-candi-secondary-strong text-candi-on-secondary hover:opacity-90 shadow-hygge',
        'secondary-outline': 'border-2 border-candi-secondary text-candi-secondary hover:bg-candi-secondary-subtle',

        success: 'bg-candi-success text-candi-on-success hover:opacity-90 shadow-hygge',
        'success-subtle': 'bg-candi-success-subtle text-candi-success-strong hover:opacity-80',
        'success-soft': 'bg-candi-success-soft text-candi-success-strong hover:opacity-80',
        'success-strong': 'bg-candi-success-strong text-candi-on-success hover:opacity-90 shadow-hygge',
        'success-outline': 'border-2 border-candi-success text-candi-success hover:bg-candi-success-subtle',

        error: 'bg-candi-error text-candi-on-error hover:opacity-90 shadow-hygge',
        'error-subtle': 'bg-candi-error-subtle text-candi-error-strong hover:opacity-80',
        'error-soft': 'bg-candi-error-soft text-candi-error-strong hover:opacity-80',
        'error-strong': 'bg-candi-error-strong text-candi-on-error hover:opacity-90 shadow-hygge',
        'error-outline': 'border-2 border-candi-error text-candi-error hover:bg-candi-error-subtle',

        warning: 'bg-candi-warning text-candi-on-warning hover:opacity-90 shadow-hygge',
        'warning-subtle': 'bg-candi-warning-subtle text-candi-warning-strong hover:opacity-80',
        'warning-soft': 'bg-candi-warning-soft text-candi-warning-strong hover:opacity-80',
        'warning-strong': 'bg-candi-warning-strong text-candi-on-warning hover:opacity-90 shadow-hygge',
        'warning-outline': 'border-2 border-candi-warning text-candi-warning hover:bg-candi-warning-subtle',

        info: 'bg-candi-info text-candi-on-info hover:opacity-90 shadow-hygge',
        'info-subtle': 'bg-candi-info-subtle text-candi-info-strong hover:opacity-80',
        'info-soft': 'bg-candi-info-soft text-candi-info-strong hover:opacity-80',
        'info-strong': 'bg-candi-info-strong text-candi-on-info hover:opacity-90 shadow-hygge',
        'info-outline': 'border-2 border-candi-info text-candi-info hover:bg-candi-info-subtle',

        outline: 'border-2 border-candi-border-strong text-candi-text hover:bg-candi-surface',
        ghost: 'text-candi-text hover:bg-candi-surface',
    }

    const sizes = {
        small: 'px-4 py-2 text-sm',
        medium: 'px-6 py-3 text-base',
        large: 'px-8 py-4 text-lg',
    }

    const disabledStyles = 'opacity-50 cursor-not-allowed'
    const widthStyles = fullWidth ? 'w-full' : ''

    const classes = [
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && disabledStyles,
        widthStyles,
        className,
    ].filter(Boolean).join(' ')

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
            {...props}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    className: PropTypes.string,
}
