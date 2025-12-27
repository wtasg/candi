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
        primary: 'bg-candi-accent text-white hover:opacity-90 shadow-hygge',
        secondary: 'bg-candi-secondary text-white hover:opacity-90 shadow-hygge',
        outline: 'border-2 border-candi-border-strong text-candi-text hover:bg-candi-surface',
        ghost: 'text-candi-text hover:bg-candi-surface',
        success: 'bg-candi-success text-white hover:opacity-90 shadow-hygge',
        error: 'bg-candi-error text-white hover:opacity-90 shadow-hygge',
        warning: 'bg-candi-warning text-white hover:opacity-90 shadow-hygge',
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
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'success', 'error', 'warning']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    className: PropTypes.string,
}
