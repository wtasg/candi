/**
 * Naming Convention Utilities
 *
 * Converts between internal camelCase and external kebab-case,
 * and provides marker-based template replacement.
 */

/**
 * Converts a camelCase string to kebab-case.
 *
 * @example
 * toKebab('warningSubtle')  // → 'warning-subtle'
 * toKebab('borderStrong')   // → 'border-strong'
 * toKebab('syntaxKeyword')  // → 'syntax-keyword'
 */
export function toKebab(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Replaces content between two marker comments in a string.
 * Used for template-based CSS/config file generation.
 *
 * @param content - The full file content
 * @param startMarker - Opening marker comment (e.g. "/* @tokens-start *\/")
 * @param endMarker - Closing marker comment (e.g. "/* @tokens-end *\/")
 * @param replacement - Content to insert between the markers
 * @returns Updated content, or original if markers not found
 */
export function replaceBetween(
    content: string,
    startMarker: string,
    endMarker: string,
    replacement: string
): string {
    const startIdx = content.indexOf(startMarker);
    const endIdx = content.indexOf(endMarker);
    if (startIdx === -1 || endIdx === -1) {
        return content;
    }
    return (
        content.substring(0, startIdx + startMarker.length) +
        '\n' +
        replacement +
        '    ' +
        content.substring(endIdx)
    );
}
