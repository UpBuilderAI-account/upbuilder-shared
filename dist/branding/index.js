"use strict";
// ============================================================================
// UPBUILDER UI BRANDING SYSTEM
// Dark theme with green accent - Centralized design tokens
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.tailwindThemeExtension = exports.backdropBlur = exports.transitionDuration = exports.keyframes = exports.animation = exports.boxShadow = exports.borderRadius = exports.spacing = exports.fontSize = exports.fontFamily = exports.colors = exports.semanticColors = exports.trafficLights = exports.syntaxColors = exports.accentColors = exports.borderColors = exports.textColors = exports.grayColors = exports.surfaceColors = exports.brandColors = void 0;
/**
 * Primary Colors (Green - Brand Accent)
 */
exports.brandColors = {
    green: {
        400: '#4ade80', // Hover states, selected text
        500: '#22c55e', // Primary buttons, progress bars, checkmarks, active states
        900: 'rgba(20,83,45,0.3)', // Selected item backgrounds
    },
};
/**
 * Surface Colors (Improved Contrast Dark Theme)
 * Larger jumps between layers for better visual hierarchy
 */
exports.surfaceColors = {
    base: '#0f0f10', // Main app background, sidebar
    DEFAULT: '#18181b', // Build screen background
    elevated: '#1f1f23', // Elevated surfaces
    card: '#27272a', // Cards, design cards, pills
    input: '#303033', // Progress bar track, inputs
    hover: '#3a3a3d', // Hover states
    active: '#454548', // Active/selected states
};
/**
 * Gray Scale
 */
exports.grayColors = {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
};
/**
 * Text Colors (Dark Theme)
 */
exports.textColors = {
    primary: '#ffffff', // Headings, important labels
    secondary: '#e4e4e7', // Tree item labels (gray-200)
    tertiary: '#d4d4d8', // Body text, descriptions (gray-300)
    muted: '#a1a1aa', // Section headers (gray-400)
    disabled: '#71717a', // Placeholders, inactive items (gray-500)
    subtle: '#52525b', // Tree connectors, icons (gray-600)
};
/**
 * Border Colors
 */
exports.borderColors = {
    DEFAULT: 'rgba(39,39,42,0.6)', // Main dividers, section borders (gray-800/60)
    subtle: 'rgba(63,63,70,0.5)', // Card borders (gray-700/50)
    line: '#3f3f46', // Tree lines, input borders (gray-700)
    unfilled: '#52525b', // Unfilled dot outlines (gray-600)
    alt: '#71717a', // Alternate dot outlines (gray-500)
    active: '#22c55e', // Active/success borders (green-500)
    badge: 'rgba(34,197,94,0.25)', // Badge borders (green-500/25)
    glow: 'rgba(34,197,94,0.3)', // Progress bar glow border (green-500/30)
};
/**
 * Accent/Brand Colors
 */
exports.accentColors = {
    webflow: {
        blue: '#4353FF', // Export to Webflow button
        blueHover: '#5465FF', // Webflow button hover
    },
    github: {
        bg: '#ffffff', // Edit on GitHub button
    },
};
/**
 * Code Syntax Highlighting Colors
 */
exports.syntaxColors = {
    selector: '#c084fc', // CSS selectors, tags (purple-400)
    property: '#60a5fa', // Properties, attributes (blue-400)
    value: '#facc15', // Values, strings (yellow-400)
    special: '#f472b6', // Special values (pink-400)
    comment: '#71717a', // Comments (gray-500)
};
/**
 * macOS Traffic Lights
 */
exports.trafficLights = {
    red: '#ff5f57',
    yellow: '#febc2e',
    green: '#28c840',
};
/**
 * Semantic Colors
 */
exports.semanticColors = {
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
};
/**
 * Complete color palette for Tailwind
 */
exports.colors = Object.assign(Object.assign({ brand: exports.brandColors, surface: exports.surfaceColors, text: exports.textColors, border: exports.borderColors, accent: exports.accentColors, syntax: exports.syntaxColors, traffic: exports.trafficLights }, exports.semanticColors), { gray: exports.grayColors, green: {
        400: '#4ade80',
        500: '#22c55e',
        900: '#14532d',
    }, webflow: {
        blue: '#4353FF',
        'blue-hover': '#5465FF',
    } });
/**
 * Font Families
 */
exports.fontFamily = {
    mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
    sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
};
/**
 * Font Sizes
 */
exports.fontSize = {
    '2xs': ['0.625rem', { lineHeight: '0.875rem' }], // 10px for badges
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
};
/**
 * Spacing Scale
 */
exports.spacing = {
    '0.5': '0.125rem',
    '1': '0.25rem',
    '1.5': '0.375rem',
    '2': '0.5rem',
    '2.5': '0.625rem',
    '3': '0.75rem',
    '3.5': '0.875rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '7': '1.75rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
};
/**
 * Border Radius
 */
exports.borderRadius = {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
};
/**
 * Box Shadows (Green Glow Theme)
 */
exports.boxShadow = {
    'glow-sm': '0 0 8px rgba(34,197,94,0.8)',
    glow: '0 0 10px rgba(34,197,94,0.15)',
    'glow-md': '0 0 15px rgba(34,197,94,0.6)',
    'glow-lg': '0 0 20px rgba(34,197,94,0.3)',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    none: 'none',
};
/**
 * Animations
 */
exports.animation = {
    'fade-in': 'fadeIn 0.15s ease-in',
    'fade-out': 'fadeOut 0.15s ease-out',
    'slide-up': 'slideUp 0.2s ease-out',
    'slide-down': 'slideDown 0.2s ease-out',
    'scale-in': 'scaleIn 0.15s ease-out',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    spin: 'spin 1s linear infinite',
};
/**
 * Animation Keyframes
 */
exports.keyframes = {
    fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
    },
    fadeOut: {
        '0%': { opacity: '1' },
        '100%': { opacity: '0' },
    },
    slideUp: {
        '0%': { transform: 'translateY(8px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    slideDown: {
        '0%': { transform: 'translateY(-8px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    scaleIn: {
        '0%': { transform: 'scale(0.97)', opacity: '0' },
        '100%': { transform: 'scale(1)', opacity: '1' },
    },
    pulse: {
        '0%, 100%': { opacity: '1' },
        '50%': { opacity: '0.5' },
    },
    spin: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
    },
};
/**
 * Transition Durations
 */
exports.transitionDuration = {
    '150': '150ms',
    '200': '200ms',
    '300': '300ms',
    fast: '150ms',
    DEFAULT: '200ms',
    slow: '300ms',
};
/**
 * Backdrop Blur
 */
exports.backdropBlur = {
    xs: '2px',
    sm: '4px',
    DEFAULT: '8px',
    md: '12px',
    lg: '16px',
};
/**
 * Complete Tailwind Theme Extension
 * Use this to extend your Tailwind config
 */
exports.tailwindThemeExtension = {
    colors: exports.colors,
    fontFamily: exports.fontFamily,
    fontSize: exports.fontSize,
    spacing: exports.spacing,
    borderRadius: exports.borderRadius,
    boxShadow: exports.boxShadow,
    animation: exports.animation,
    keyframes: exports.keyframes,
    transitionDuration: exports.transitionDuration,
    backdropBlur: exports.backdropBlur,
};
/**
 * Default export for convenience
 */
exports.default = exports.tailwindThemeExtension;
