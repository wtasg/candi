import PropTypes from 'prop-types'

/**
 * Divider component for visual separation
 */
export default function Divider({
    orientation = 'horizontal',
    spacing = 'medium',
    label,
    className = '',
    ...props
}) {
    const spacings = {
        none: '',
        small: orientation === 'horizontal' ? 'my-2' : 'mx-2',
        medium: orientation === 'horizontal' ? 'my-4' : 'mx-4',
        large: orientation === 'horizontal' ? 'my-8' : 'mx-8',
    }

    if (orientation === 'vertical') {
        return (
            <div className={`w-px bg-candi-border ${spacings[spacing]} ${className}`} {...props} />
        )
    }

    if (label) {
        return (
            <div className={`flex items-center ${spacings[spacing]} ${className}`} {...props}>
                <div className="flex-1 h-px bg-candi-border"></div>
                <span className="px-4 text-sm text-candi-subtle">{label}</span>
                <div className="flex-1 h-px bg-candi-border"></div>
            </div>
        )
    }

    return (
        <div className={`h-px bg-candi-border ${spacings[spacing]} ${className}`} {...props} />
    )
}

Divider.propTypes = {
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    spacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    label: PropTypes.string,
    className: PropTypes.string,
}
