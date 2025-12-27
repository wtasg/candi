import { forwardRef } from 'react'
import PropTypes from 'prop-types'

/**
 * Switch/Toggle component
 */
const Switch = forwardRef(({
    label,
    id,
    checked,
    onChange,
    disabled = false,
    size = 'medium',
    className = '',
    ...props
}, ref) => {
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`

    const sizes = {
        small: {
            track: 'w-8 h-4',
            thumb: 'w-3 h-3',
            translate: 'translate-x-4',
        },
        medium: {
            track: 'w-11 h-6',
            thumb: 'w-5 h-5',
            translate: 'translate-x-5',
        },
        large: {
            track: 'w-14 h-7',
            thumb: 'w-6 h-6',
            translate: 'translate-x-7',
        },
    }

    const sizeConfig = sizes[size]

    const handleClick = () => {
        if (!disabled && onChange) {
            onChange({ target: { checked: !checked } })
        }
    }

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <button
                ref={ref}
                id={switchId}
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={handleClick}
                disabled={disabled}
                className={`relative inline-flex items-center ${sizeConfig.track} rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-candi-accent focus:ring-opacity-50 ${checked ? 'bg-candi-accent' : 'bg-candi-surface border-2 border-candi-border'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                {...props}
            >
                <span
                    className={`inline-block ${sizeConfig.thumb} rounded-full bg-white transition-transform ${checked ? sizeConfig.translate : 'translate-x-0.5'
                        }`}
                />
            </button>
            {label && (
                <label
                    htmlFor={switchId}
                    className={`text-sm select-none ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={handleClick}
                >
                    {label}
                </label>
            )}
        </div>
    )
})

Switch.displayName = 'Switch'

Switch.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    className: PropTypes.string,
}

export default Switch
