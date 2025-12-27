import { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * Tabs component for organizing content
 */
export default function Tabs({
    tabs,
    defaultTab,
    onChange,
    className = '',
    ...props
}) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

    const handleTabChange = (tabId) => {
        setActiveTab(tabId)
        if (onChange) onChange(tabId)
    }

    const activeContent = tabs.find(tab => tab.id === activeTab)?.content

    return (
        <div className={className} {...props}>
            <div className="border-b border-candi-border">
                <div className="flex gap-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`px-6 py-3 font-medium transition-colors relative ${activeTab === tab.id
                                    ? 'text-candi-accent'
                                    : 'text-candi-subtle hover:text-candi-text'
                                }`}
                            disabled={tab.disabled}
                        >
                            {tab.icon && <span className="mr-2">{tab.icon}</span>}
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-candi-accent"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
            <div className="py-6">
                {activeContent}
            </div>
        </div>
    )
}

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            icon: PropTypes.node,
            content: PropTypes.node.isRequired,
            disabled: PropTypes.bool,
        })
    ).isRequired,
    defaultTab: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
}
