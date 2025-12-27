import PropTypes from 'prop-types'

/**
 * Avatar component for user profile pictures
 */
export default function Avatar({
    src,
    alt = 'Avatar',
    size = 'medium',
    fallback,
    status,
    className = '',
    ...props
}) {
    const sizes = {
        small: 'w-8 h-8 text-xs',
        medium: 'w-12 h-12 text-sm',
        large: 'w-16 h-16 text-base',
        xlarge: 'w-24 h-24 text-xl',
    }

    const statusColors = {
        online: 'bg-candi-success',
        offline: 'bg-candi-subtle',
        busy: 'bg-candi-error',
        away: 'bg-candi-warning',
    }

    const statusSizes = {
        small: 'w-2 h-2',
        medium: 'w-3 h-3',
        large: 'w-4 h-4',
        xlarge: 'w-5 h-5',
    }

    const baseStyles = 'rounded-full overflow-hidden flex items-center justify-center bg-candi-surface text-candi-text font-medium'
    const classes = [baseStyles, sizes[size], className].filter(Boolean).join(' ')

    const getInitials = (name) => {
        if (!name) return '?'
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <div className="relative inline-block" {...props}>
            {src ? (
                <img src={src} alt={alt} className={classes} />
            ) : (
                <div className={classes}>
                    {fallback ? getInitials(fallback) : '?'}
                </div>
            )}
            {status && (
                <div
                    className={`absolute bottom-0 right-0 ${statusSizes[size]} ${statusColors[status]} rounded-full border-2 border-candi-bg`}
                    aria-label={`Status: ${status}`}
                />
            )}
        </div>
    )
}

Avatar.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    fallback: PropTypes.string,
    status: PropTypes.oneOf(['online', 'offline', 'busy', 'away']),
    className: PropTypes.string,
}

/**
 * Avatar Group component for displaying multiple avatars
 */
export function AvatarGroup({ avatars, max = 3, size = 'medium', className = '' }) {
    const displayedAvatars = avatars.slice(0, max)
    const remainingCount = avatars.length - max

    return (
        <div className={`flex -space-x-2 ${className}`}>
            {displayedAvatars.map((avatar, index) => (
                <div key={index} className="ring-2 ring-candi-bg rounded-full">
                    <Avatar {...avatar} size={size} />
                </div>
            ))}
            {remainingCount > 0 && (
                <div className="ring-2 ring-candi-bg rounded-full">
                    <Avatar size={size} fallback={`+${remainingCount}`} />
                </div>
            )}
        </div>
    )
}

AvatarGroup.propTypes = {
    avatars: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string,
            alt: PropTypes.string,
            fallback: PropTypes.string,
        })
    ).isRequired,
    max: PropTypes.number,
    size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    className: PropTypes.string,
}
