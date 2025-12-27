import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

/**
 * Breadcrumb navigation component
 */
export default function Breadcrumb({
    items,
    separator = '/',
    className = '',
    ...props
}) {
    return (
        <nav aria-label="Breadcrumb" className={className} {...props}>
            <ol className="flex items-center gap-2 text-sm">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1

                    return (
                        <li key={item.path || index} className="flex items-center gap-2">
                            {isLast ? (
                                <span className="text-candi-text font-medium">
                                    {item.label}
                                </span>
                            ) : (
                                <>
                                    <Link
                                        to={item.path}
                                        className="text-candi-subtle hover:text-candi-accent transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                    <span className="text-candi-subtle" aria-hidden="true">
                                        {separator}
                                    </span>
                                </>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

Breadcrumb.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            path: PropTypes.string,
        })
    ).isRequired,
    separator: PropTypes.string,
    className: PropTypes.string,
}
