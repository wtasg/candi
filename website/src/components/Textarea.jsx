import { forwardRef } from 'react'
import PropTypes from 'prop-types'

/**
 * Textarea component with label and validation
 */
const Textarea = forwardRef(({
    label,
    id,
    placeholder,
    value,
    onChange,
    error,
    helperText,
    rows = 4,
    required = false,
    disabled = false,
    fullWidth = false,
    resize = 'vertical',
    className = '',
    ...props
}, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`

    const baseStyles = 'px-4 py-3 rounded-soft border transition-colors focus:outline-none focus:ring-2 focus:ring-candi-accent focus:ring-opacity-50'
    const errorStyles = error
        ? 'border-candi-error bg-candi-error-subtle'
        : 'border-candi-border bg-candi-surface hover:border-candi-border-strong'
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''
    const widthStyles = fullWidth ? 'w-full' : ''
    const resizeStyles = {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
    }

    const classes = [
        baseStyles,
        errorStyles,
        disabledStyles,
        widthStyles,
        resizeStyles[resize],
        className,
    ].filter(Boolean).join(' ')

    return (
        <div className={fullWidth ? 'w-full' : ''}>
            {label && (
                <label
                    htmlFor={textareaId}
                    className="block text-sm font-medium mb-2 text-candi-text"
                >
                    {label}
                    {required && <span className="text-candi-error ml-1">*</span>}
                </label>
            )}
            <textarea
                ref={ref}
                id={textareaId}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                rows={rows}
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

Textarea.displayName = 'Textarea'

Textarea.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    helperText: PropTypes.string,
    rows: PropTypes.number,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    resize: PropTypes.oneOf(['none', 'vertical', 'horizontal', 'both']),
    className: PropTypes.string,
}

export default Textarea
