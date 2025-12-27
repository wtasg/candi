import { forwardRef } from 'react'
import PropTypes from 'prop-types'

/**
 * Input component with label and validation states
 */
const Input = forwardRef(({
    label,
    id,
    type = 'text',
    placeholder,
    error,
    helperText,
    required = false,
    disabled = false,
    fullWidth = false,
    className = '',
    ...props
}, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    const baseStyles = 'px-4 py-3 rounded-soft border transition-colors focus:outline-none focus:ring-2 focus:ring-candi-accent focus:ring-opacity-50'
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
                    htmlFor={inputId}
                    className="block text-sm font-medium mb-2 text-candi-text"
                >
                    {label}
                    {required && <span className="text-candi-error ml-1">*</span>}
                </label>
            )}
            <input
                ref={ref}
                id={inputId}
                type={type}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={classes}
                {...props}
            />
            {(error || helperText) && (
                <p className={`text-sm mt-2 ${error ? 'text-candi-error' : 'text-candi-subtle'}`}>
                    {error || helperText}
                </p>
            )}
        </div>
    )
})

Input.displayName = 'Input'

Input.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    helperText: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    className: PropTypes.string,
}

export default Input
