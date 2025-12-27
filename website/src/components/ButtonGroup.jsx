import PropTypes from 'prop-types'

/**
 * ButtonGroup component for grouping related buttons
 */
export default function ButtonGroup({
  children,
  orientation = 'horizontal',
  spacing = 'none',
  className = '',
  ...props
}) {
  const orientations = {
    horizontal: 'flex-row',
    vertical: 'flex-col',
  }

  const spacings = {
    none: orientation === 'horizontal' ? '[&>*]:rounded-none [&>*:first-child]:rounded-l-soft [&>*:last-child]:rounded-r-soft [&>*:not(:last-child)]:border-r-0' : '[&>*]:rounded-none [&>*:first-child]:rounded-t-soft [&>*:last-child]:rounded-b-soft [&>*:not(:last-child)]:border-b-0',
    small: orientation === 'horizontal' ? 'gap-1' : 'gap-1',
    medium: orientation === 'horizontal' ? 'gap-2' : 'gap-2',
    large: orientation === 'horizontal' ? 'gap-4' : 'gap-4',
  }

  const classes = [
    'inline-flex',
    orientations[orientation],
    spacings[spacing],
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} role="group" {...props}>
      {children}
    </div>
  )
}

ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  spacing: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  className: PropTypes.string,
}
