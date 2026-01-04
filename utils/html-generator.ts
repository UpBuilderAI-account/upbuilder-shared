// ============================================================================
// HTML GENERATOR - Shared HTML Boilerplate
// Single source of truth for HTML document structure
// Used by both frontend preview and backend export
// ============================================================================

export interface HTMLBoilerplateOptions {
  /** Document title */
  title?: string;
  /** HTML body content */
  body: string;
  /** CSS styles to embed */
  css?: string;
  /** JavaScript to embed */
  js?: string;
  /** Google Fonts URL (e.g., from generateGoogleFontsUrl) */
  googleFontsUrl?: string;
  /** Additional <head> content (scripts, meta tags, etc.) */
  headExtra?: string;
  /** Include CSS reset styles (default: true) */
  includeReset?: boolean;
  /** Include AOS (Animate On Scroll) library CDN links */
  enableAnimations?: boolean;
}

/**
 * CSS Reset - Modern, minimal reset for consistent rendering
 * Based on Josh Comeau's CSS Reset
 */
export const CSS_RESET = `/* CSS Reset */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.5;
  min-height: 100vh;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}`;

// AOS (Animate On Scroll) CDN URLs
const AOS_CSS_CDN = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
const AOS_JS_CDN = 'https://unpkg.com/aos@2.3.1/dist/aos.js';

/**
 * Generate a complete HTML document with consistent structure
 * This is the single source of truth for HTML boilerplate generation
 */
export function generateHTMLDocument(options: HTMLBoilerplateOptions): string {
  const {
    title = 'Generated Design',
    body,
    css = '',
    js = '',
    googleFontsUrl = '',
    headExtra = '',
    includeReset = true,
    enableAnimations = false
  } = options;

  // Build head content
  const headParts: string[] = [
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    `  <title>${escapeHtml(title)}</title>`
  ];

  // Google Fonts import
  if (googleFontsUrl) {
    headParts.push(`  <link href="${googleFontsUrl}" rel="stylesheet">`);
  }

  // AOS CSS (before custom styles so they can override if needed)
  if (enableAnimations) {
    headParts.push(`  <link href="${AOS_CSS_CDN}" rel="stylesheet">`);
  }

  // CSS Reset + Custom CSS
  const cssContent = includeReset ? `${CSS_RESET}\n\n${css}` : css;
  if (cssContent.trim()) {
    headParts.push(`  <style>\n${cssContent}\n  </style>`);
  }

  // Extra head content (scripts, etc.)
  if (headExtra.trim()) {
    headParts.push(headExtra);
  }

  // Build body content
  let bodyContent = body;

  // Add custom JS if provided
  if (js.trim()) {
    bodyContent += `\n  <script>\n${js}\n  </script>`;
  }

  // Add AOS library and initialization
  if (enableAnimations) {
    bodyContent += `\n  <script src="${AOS_JS_CDN}"></script>`;
    bodyContent += `\n  <script>AOS.init({ duration: 800, once: true, offset: 100 });</script>`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
${headParts.join('\n')}
</head>
<body>
${bodyContent}
</body>
</html>`;
}

/**
 * Generate HTML document for preview (simplified, no extra scripts)
 */
export function generatePreviewHTML(options: {
  html: string;
  css?: string;
  js?: string;
}): string {
  return generateHTMLDocument({
    title: 'Section Preview',
    body: `  ${options.html}`,
    css: options.css,
    js: options.js,
    includeReset: true
  });
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (char) => map[char] || char);
}
