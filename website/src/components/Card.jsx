import PropTypes from 'prop-types'

/**
 * Card component for containing content
 */
export default function Card({
    children,
    title,
    icon,
    footer,
    variant = 'elevated',
    padding = 'normal',
    className = '',
    ...props
}) {
    const baseStyles = 'border border-candi-border rounded-softer'

    const variants = {
        elevated: 'bg-candi-elevated shadow-hygge',
        surface: 'bg-candi-surface',
        flat: 'bg-candi-bg',
    }

    const paddings = {
        none: '',
        small: 'p-4',
        normal: 'p-6',
        large: 'p-8',
    }

    const classes = [
        baseStyles,
        variants[variant],
        paddings[padding],
        className,
    ].filter(Boolean).join(' ')

    return (
        <div className={classes} {...props}>
            {(icon || title) && (
                <div className="mb-4">
                    {icon && (
                        <div className="w-12 h-12 rounded-soft bg-candi-accent-subtle flex items-center justify-center mb-4">
                            {icon}
                        </div>
                    )}
                    {title && <h3 className="text-lg font-semibold">{title}</h3>}
                </div>
            )}
            <div className="text-candi-text">{children}</div>
            {footer && (
                <div className="mt-4 pt-4 border-t border-candi-border">
                    {footer}
                </div>
            )}
        </div>
    )
}

Card.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    icon: PropTypes.node,
    footer: PropTypes.node,
    variant: PropTypes.oneOf(['elevated', 'surface', 'flat']),
    padding: PropTypes.oneOf(['none', 'small', 'normal', 'large']),
    className: PropTypes.string,
}
