import PropTypes from 'prop-types'

/**
 * Skeleton component for loading placeholders
 */
export default function Skeleton({
    variant = 'text',
    width,
    height,
    className = '',
    ...props
}) {
    const baseStyles = 'bg-candi-surface animate-pulse rounded-soft'

    const variants = {
        text: 'h-4',
        title: 'h-8',
        circle: 'rounded-full',
        rectangle: 'rounded-softer',
    }

    const variantClass = variants[variant] || variants.text
    const widthStyle = width ? { width } : {}
    const heightStyle = height ? { height } : {}
    const style = { ...widthStyle, ...heightStyle }

    const classes = [
        baseStyles,
        variantClass,
        !width && 'w-full',
        className,
    ].filter(Boolean).join(' ')

    return (
        <div
            className={classes}
            style={style}
            {...props}
        />
    )
}

Skeleton.propTypes = {
    variant: PropTypes.oneOf(['text', 'title', 'circle', 'rectangle']),
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string,
}

/**
 * Composite skeleton components for common patterns
 */
export function SkeletonCard() {
    return (
        <div className="bg-candi-elevated border border-candi-border rounded-softer p-6">
            <Skeleton variant="circle" width="48px" height="48px" className="mb-4" />
            <Skeleton variant="title" className="mb-2" width="60%" />
            <Skeleton variant="text" className="mb-2" />
            <Skeleton variant="text" width="80%" />
        </div>
    )
}

export function SkeletonList({ count = 3 }) {
    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                    <Skeleton variant="circle" width="40px" height="40px" />
                    <div className="flex-1 space-y-2">
                        <Skeleton variant="text" width="40%" />
                        <Skeleton variant="text" width="60%" />
                    </div>
                </div>
            ))}
        </div>
    )
}

SkeletonList.propTypes = {
    count: PropTypes.number,
}
