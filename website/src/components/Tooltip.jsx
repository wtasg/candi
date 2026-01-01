import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

/**
 * Tooltip component for showing additional information on hover
 */
export default function Tooltip({
    children,
    content,
    position = 'top',
    delay = 200,
    className = '',
    ...props
}) {
    const [visible, setVisible] = useState(false)
    const [coords, setCoords] = useState({ x: 0, y: 0 })
    const timeoutRef = useRef(null)
    const triggerRef = useRef(null)
    const tooltipRef = useRef(null)

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    const showTooltip = () => {
        timeoutRef.current = setTimeout(() => {
            if (triggerRef.current) {
                const rect = triggerRef.current.getBoundingClientRect()
                setCoords({ x: rect.left + rect.width / 2, y: rect.top })
                setVisible(true)
            }
        }, delay)
    }

    const hideTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        setVisible(false)
    }

    const positions = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    }

    return (
        <div className="relative inline-block" {...props}>
            <div
                ref={triggerRef}
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
                onFocus={showTooltip}
                onBlur={hideTooltip}
            >
                {children}
            </div>
            {visible && (
                <div
                    ref={tooltipRef}
                    className={`absolute z-50 px-3 py-2 text-sm text-candi-inverse-text bg-candi-inverse-surface rounded-soft shadow-hygge whitespace-nowrap ${positions[position]} ${className}`}
                    role="tooltip"
                >
                    {content}
                    <div
                        className={`absolute w-2 h-2 bg-candi-inverse-surface transform rotate-45 ${position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' :
                            position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' :
                                position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2' :
                                    'left-[-4px] top-1/2 -translate-y-1/2'
                            }`}
                    ></div>
                </div>
            )}
        </div>
    )
}

Tooltip.propTypes = {
    children: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    delay: PropTypes.number,
    className: PropTypes.string,
}
