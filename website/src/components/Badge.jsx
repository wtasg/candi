import PropTypes from 'prop-types'

/**
 * Badge component for labels and status indicators
 */
export default function Badge({
    children,
    variant = 'default',
    size = 'medium',
    className = '',
    ...props
}) {
    const baseStyles = 'inline-flex items-center gap-1 font-medium rounded-full'

    const variants = {
        default: 'bg-candi-surface text-candi-text border border-candi-border',
        accent: 'bg-candi-accent-subtle text-candi-accent',
        secondary: 'bg-candi-secondary-subtle text-candi-secondary',
        success: 'bg-candi-success-subtle text-candi-success',
        error: 'bg-candi-error-subtle text-candi-error',
        warning: 'bg-candi-warning-subtle text-candi-warning',
        info: 'bg-candi-info-subtle text-candi-info',
    }

    const sizes = {
        small: 'px-2 py-0.5 text-xs',
        medium: 'px-3 py-1 text-sm',
        large: 'px-4 py-1.5 text-base',
    }

    const classes = [
        baseStyles,
        variants[variant],
        sizes[size],
        className,
    ].filter(Boolean).join(' ')

    return (
        <span className={classes} {...props}>
            {children}
        </span>
    )
}

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['default', 'accent', 'secondary', 'success', 'error', 'warning', 'info']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    className: PropTypes.string,
}
