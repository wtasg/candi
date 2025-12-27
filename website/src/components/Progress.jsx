import PropTypes from 'prop-types'

/**
 * Progress bar component
 */
export default function Progress({
    value,
    max = 100,
    size = 'medium',
    color = 'accent',
    showLabel = false,
    label,
    className = '',
    ...props
}) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    const sizes = {
        small: 'h-1',
        medium: 'h-2',
        large: 'h-3',
    }

    const colors = {
        accent: 'bg-candi-accent',
        secondary: 'bg-candi-secondary',
        success: 'bg-candi-success',
        warning: 'bg-candi-warning',
        error: 'bg-candi-error',
    }

    return (
        <div className={className} {...props}>
            {(showLabel || label) && (
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-candi-text">
                        {label || 'Progress'}
                    </span>
                    <span className="text-sm text-candi-subtle">
                        {Math.round(percentage)}%
                    </span>
                </div>
            )}
            <div className={`w-full bg-candi-surface rounded-full overflow-hidden ${sizes[size]}`}>
                <div
                    className={`${colors[color]} ${sizes[size]} rounded-full transition-all duration-300 ease-out`}
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={value}
                    aria-valuemin={0}
                    aria-valuemax={max}
                />
            </div>
        </div>
    )
}

Progress.propTypes = {
    value: PropTypes.number.isRequired,
    max: PropTypes.number,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    color: PropTypes.oneOf(['accent', 'secondary', 'success', 'warning', 'error']),
    showLabel: PropTypes.bool,
    label: PropTypes.string,
    className: PropTypes.string,
}
