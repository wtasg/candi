import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

/**
 * Dropdown menu component
 */
export default function Dropdown({
    trigger,
    items,
    align = 'left',
    className = '',
    ...props
}) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            document.addEventListener('keydown', handleEscape)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen])

    const handleItemClick = (item) => {
        if (item.onClick) {
            item.onClick()
        }
        if (!item.keepOpen) {
            setIsOpen(false)
        }
    }

    const alignments = {
        left: 'left-0',
        right: 'right-0',
        center: 'left-1/2 -translate-x-1/2',
    }

    return (
        <div className={`relative inline-block ${className}`} ref={dropdownRef} {...props}>
            <div onClick={() => setIsOpen(!isOpen)}>
                {trigger}
            </div>

            {isOpen && (
                <div
                    className={`absolute mt-2 ${alignments[align]} z-50 min-w-[200px] bg-candi-elevated border border-candi-border rounded-softer shadow-hygge py-2`}
                >
                    {items.map((item, index) => {
                        if (item.divider) {
                            return <div key={index} className="h-px bg-candi-border my-2" />
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleItemClick(item)}
                                disabled={item.disabled}
                                className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 transition-colors ${item.disabled
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:bg-candi-surface text-candi-text'
                                    } ${item.danger ? 'text-candi-error' : ''}`}
                            >
                                {item.icon && <span>{item.icon}</span>}
                                <span className="flex-1">{item.label}</span>
                                {item.shortcut && (
                                    <span className="text-xs text-candi-subtle">{item.shortcut}</span>
                                )}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

Dropdown.propTypes = {
    trigger: PropTypes.node.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            icon: PropTypes.node,
            onClick: PropTypes.func,
            disabled: PropTypes.bool,
            danger: PropTypes.bool,
            shortcut: PropTypes.string,
            divider: PropTypes.bool,
            keepOpen: PropTypes.bool,
        })
    ).isRequired,
    align: PropTypes.oneOf(['left', 'right', 'center']),
    className: PropTypes.string,
}
