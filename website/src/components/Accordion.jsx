import { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * Accordion component for collapsible content sections
 */
export default function Accordion({
    items,
    allowMultiple = false,
    defaultOpen = [],
    className = '',
    ...props
}) {
    const [openItems, setOpenItems] = useState(new Set(defaultOpen))

    const toggleItem = (id) => {
        setOpenItems(prev => {
            const newSet = new Set(allowMultiple ? prev : [])
            if (prev.has(id)) {
                newSet.delete(id)
            } else {
                newSet.add(id)
            }
            return newSet
        })
    }

    return (
        <div className={`space-y-2 ${className}`} {...props}>
            {items.map((item) => {
                const isOpen = openItems.has(item.id)

                return (
                    <div
                        key={item.id}
                        className="border border-candi-border rounded-softer overflow-hidden bg-candi-elevated"
                    >
                        <button
                            onClick={() => toggleItem(item.id)}
                            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-candi-surface transition-colors"
                            aria-expanded={isOpen}
                        >
                            <span className="font-medium text-candi-text">
                                {item.title}
                            </span>
                            <svg
                                className={`w-5 h-5 text-candi-subtle transition-transform ${isOpen ? 'rotate-180' : ''
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        {isOpen && (
                            <div className="px-6 py-4 border-t border-candi-border text-candi-text">
                                {item.content}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

Accordion.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            content: PropTypes.node.isRequired,
        })
    ).isRequired,
    allowMultiple: PropTypes.bool,
    defaultOpen: PropTypes.arrayOf(PropTypes.string),
    className: PropTypes.string,
}
