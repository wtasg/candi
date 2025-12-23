/**
 * Scandinavian Theme for Tailwind CSS
 *
 * Nordic/Scandinavian design inspired by Hygge & Lagom principles.
 *
 * @example
 * // In tailwind.config.js
 * const { theme, plugin } = require('@wtasnorg/candi');
 *
 * module.exports = {
 *   theme: { extend: theme },
 *   plugins: [plugin],
 * };
 */

const theme = require('./theme');
const plugin = require('./plugin');

module.exports = { theme, plugin };
module.exports.theme = theme;
module.exports.plugin = plugin;
module.exports.default = { theme, plugin };
