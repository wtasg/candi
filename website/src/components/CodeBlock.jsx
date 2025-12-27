import { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * CodeBlock component for displaying code with copy functionality
 */
export default function CodeBlock({
  code,
  language = 'jsx',
  showLineNumbers = false,
  title,
  className = '',
  ...props
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const lines = code.split('\n')

  return (
    <div className={`relative group ${className}`} {...props}>
      {title && (
        <div className="bg-candi-surface border border-candi-border border-b-0 px-4 py-2 rounded-t-softer flex items-center justify-between">
          <span className="text-sm font-medium text-candi-text">{title}</span>
          <span className="text-xs text-candi-subtle uppercase">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre
          className={`bg-candi-elevated border border-candi-border p-4 overflow-x-auto text-sm ${title ? 'rounded-b-softer' : 'rounded-softer'
            }`}
        >
          <code className="text-candi-text font-mono">
            {showLineNumbers ? (
              <div className="flex">
                <div className="select-none text-candi-subtle pr-4 border-r border-candi-border mr-4">
                  {lines.map((_, index) => (
                    <div key={index}>{index + 1}</div>
                  ))}
                </div>
                <div className="flex-1">{code}</div>
              </div>
            ) : (
              code
            )}
          </code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded-soft bg-candi-surface hover:bg-candi-bg border border-candi-border opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Copy code"
        >
          {copied ? (
            <svg className="w-4 h-4 text-candi-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-candi-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

CodeBlock.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string,
  showLineNumbers: PropTypes.bool,
  title: PropTypes.string,
  className: PropTypes.string,
}
