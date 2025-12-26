/**
 * Candi Design System - Tailwind CSS v4
 *
 * Entry point for Tailwind v4 users.
 * This module exports the path to the v4 theme CSS file.
 *
 * @example
 * // In your CSS file:
 * @import "tailwindcss";
 * @import "@wtasnorg/candi/v4";
 */

const path = require('path');

module.exports = {
    /**
     * Path to the v4 theme CSS file
     */
    themePath: path.resolve(__dirname, 'theme.css'),
};
