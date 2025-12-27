import { forwardRef } from 'react'
import PropTypes from 'prop-types'

/**
 * Select component for dropdown selections
 */
const Select = forwardRef(({
    label,
    id,
    options,
    placeholder,
    value,
    onChange,
    error,
    helperText,
    required = false,
    disabled = false,
    fullWidth = false,
    className = '',
    ...props
}, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`

    const baseStyles = 'px-4 py-3 rounded-soft border transition-colors focus:outline-none focus:ring-2 focus:ring-candi-accent focus:ring-opacity-50 appearance-none bg-no-repeat bg-right pr-10'
    const errorStyles = error
        ? 'border-candi-error bg-candi-error-subtle'
        : 'border-candi-border bg-candi-surface hover:border-candi-border-strong'
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''
    const widthStyles = fullWidth ? 'w-full' : ''

    const classes = [
        baseStyles,
        errorStyles,
        disabledStyles,
        widthStyles,
        className,
    ].filter(Boolean).join(' ')

    return (
        <div className={fullWidth ? 'w-full' : ''}>
            {label && (
                <label
                    htmlFor={selectId}
                    className="block text-sm font-medium mb-2 text-candi-text"
                >
                    {label}
                    {required && <span className="text-candi-error ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                <select
                    ref={ref}
                    id={selectId}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    className={classes}
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.75rem center',
                        backgroundSize: '1.5em 1.5em',
                    }}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value} disabled={option.disabled}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            {(error || helperText) && (
                <p className={`text-sm mt-2 ${error ? 'text-candi-error' : 'text-candi-subtle'}`}>
                    {error || helperText}
                </p>
            )}
        </div>
    )
})

Select.displayName = 'Select'

Select.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            disabled: PropTypes.bool,
        })
    ).isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    helperText: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    className: PropTypes.string,
}

export default Select
