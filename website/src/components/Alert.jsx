import { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * Alert component for notifications and messages
 */
export default function Alert({
    children,
    title,
    variant = 'info',
    dismissible = false,
    onDismiss,
    className = '',
    ...props
}) {
    const [visible, setVisible] = useState(true)

    const handleDismiss = () => {
        setVisible(false)
        if (onDismiss) onDismiss()
    }

    if (!visible) return null

    const baseStyles = 'p-4 rounded-softer border flex gap-3'

    const variants = {
        info: 'bg-candi-info-subtle border-candi-info text-candi-text',
        success: 'bg-candi-success-subtle border-candi-success text-candi-text',
        warning: 'bg-candi-warning-subtle border-candi-warning text-candi-text',
        error: 'bg-candi-error-subtle border-candi-error text-candi-text',
    }

    const icons = {
        info: (
            <svg className="w-5 h-5 text-candi-info flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        success: (
            <svg className="w-5 h-5 text-candi-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        warning: (
            <svg className="w-5 h-5 text-candi-warning flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        error: (
            <svg className="w-5 h-5 text-candi-error flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    }

    const classes = [baseStyles, variants[variant], className].filter(Boolean).join(' ')

    return (
        <div className={classes} role="alert" {...props}>
            {icons[variant]}
            <div className="flex-1">
                {title && <div className="font-semibold mb-1">{title}</div>}
                <div className="text-sm">{children}</div>
            </div>
            {dismissible && (
                <button
                    onClick={handleDismiss}
                    className="text-candi-subtle hover:text-candi-text transition-colors flex-shrink-0"
                    aria-label="Dismiss"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    )
}

Alert.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
    dismissible: PropTypes.bool,
    onDismiss: PropTypes.func,
    className: PropTypes.string,
}
