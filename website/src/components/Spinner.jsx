import PropTypes from 'prop-types'

/**
 * Spinner component for loading states
 */
export default function Spinner({
    size = 'medium',
    color = 'accent',
    className = '',
    ...props
}) {
    const sizes = {
        small: 'w-4 h-4 border-2',
        medium: 'w-8 h-8 border-2',
        large: 'w-12 h-12 border-3',
    }

    const colors = {
        accent: 'border-candi-accent border-t-transparent',
        secondary: 'border-candi-secondary border-t-transparent',
        white: 'border-white border-t-transparent',
        current: 'border-current border-t-transparent',
    }

    const classes = [
        'inline-block rounded-full animate-spin',
        sizes[size],
        colors[color],
        className,
    ].filter(Boolean).join(' ')

    return (
        <div
            className={classes}
            role="status"
            aria-label="Loading"
            {...props}
        >
            <span className="sr-only">Loading...</span>
        </div>
    )
}

Spinner.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    color: PropTypes.oneOf(['accent', 'secondary', 'white', 'current']),
    className: PropTypes.string,
}
