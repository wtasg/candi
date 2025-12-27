import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

/**
 * ButtonWithOptions component - A button with a dropdown menu
 */
export default function ButtonWithOptions({
  children,
  options = [],
  showSearch = false,
  searchPlaceholder = 'Search...',
  variant = 'primary',
  size = 'medium',
  align = 'left',
  className = '',
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef(null)
  const searchInputRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        setSearchTerm('')
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)

      // Focus search input if enabled
      if (showSearch && searchInputRef.current) {
        setTimeout(() => searchInputRef.current?.focus(), 100)
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, showSearch])

  const handleOptionClick = (option) => {
    if (option.onClick) {
      option.onClick()
    }
    if (!option.keepOpen) {
      setIsOpen(false)
      setSearchTerm('')
    }
  }

  const filteredOptions = searchTerm
    ? options.filter((option) => {
      if (option.divider) return true
      return option.label?.toLowerCase().includes(searchTerm.toLowerCase())
    })
    : options

  const alignments = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  }

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef} {...props}>
      <div className="flex items-center gap-0">
        <Button
          variant={variant}
          size={size}
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-r-none border-r-0"
        >
          {children}
        </Button>
        <Button
          variant={variant}
          size={size}
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-l-none px-3"
          aria-label="Open options"
        >
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
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
        </Button>
      </div>

      {isOpen && (
        <div
          className={`absolute mt-2 ${alignments[align]} z-50 min-w-[250px] bg-candi-elevated border border-candi-border rounded-softer shadow-hygge overflow-hidden`}
        >
          {showSearch && (
            <div className="p-3 border-b border-candi-border">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full px-3 py-2 pl-9 rounded-soft border border-candi-border bg-candi-surface text-sm focus:outline-none focus:ring-2 focus:ring-candi-accent focus:ring-opacity-50"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-candi-subtle"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          )}

          <div className="py-2 max-h-[300px] overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-candi-subtle text-center">
                No options found
              </div>
            ) : (
              filteredOptions.map((option, index) => {
                if (option.divider) {
                  return <div key={index} className="h-px bg-candi-border my-2" />
                }

                if (option.type === 'button') {
                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      disabled={option.disabled}
                      className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 transition-colors ${option.disabled
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-candi-surface'
                        } ${option.danger ? 'text-candi-error' : 'text-candi-text'}`}
                    >
                      {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                      <span className="flex-1">{option.label}</span>
                      {option.badge && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-candi-accent-subtle text-candi-accent">
                          {option.badge}
                        </span>
                      )}
                      {option.shortcut && (
                        <span className="text-xs text-candi-subtle">{option.shortcut}</span>
                      )}
                    </button>
                  )
                }

                if (option.type === 'custom') {
                  return (
                    <div key={index} className="px-4 py-2">
                      {option.content}
                    </div>
                  )
                }

                return null
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}

ButtonWithOptions.propTypes = {
  children: PropTypes.node.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['button', 'custom']),
      label: PropTypes.string,
      icon: PropTypes.node,
      onClick: PropTypes.func,
      disabled: PropTypes.bool,
      danger: PropTypes.bool,
      badge: PropTypes.string,
      shortcut: PropTypes.string,
      divider: PropTypes.bool,
      keepOpen: PropTypes.bool,
      content: PropTypes.node,
    })
  ),
  showSearch: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'success', 'error', 'warning']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  align: PropTypes.oneOf(['left', 'right', 'center']),
  className: PropTypes.string,
}
