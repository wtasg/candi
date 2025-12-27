import { forwardRef } from 'react'
import PropTypes from 'prop-types'

/**
 * Checkbox component with label
 */
const Checkbox = forwardRef(({
    label,
    id,
    checked,
    onChange,
    disabled = false,
    error,
    className = '',
    ...props
}, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

    return (
        <div className={className}>
            <div className="flex items-start gap-3">
                <div className="flex items-center h-6">
                    <input
                        ref={ref}
                        id={checkboxId}
                        type="checkbox"
                        checked={checked}
                        onChange={onChange}
                        disabled={disabled}
                        className="w-5 h-5 rounded border-candi-border text-candi-accent focus:ring-2 focus:ring-candi-accent focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        {...props}
                    />
                </div>
                {label && (
                    <label
                        htmlFor={checkboxId}
                        className={`text-sm select-none ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        {label}
                    </label>
                )}
            </div>
            {error && (
                <p className="text-sm text-candi-error mt-2">{error}</p>
            )}
        </div>
    )
})

Checkbox.displayName = 'Checkbox'

Checkbox.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    className: PropTypes.string,
}

export default Checkbox
