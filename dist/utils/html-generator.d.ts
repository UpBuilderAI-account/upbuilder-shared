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
}
/**
 * CSS Reset - Modern, minimal reset for consistent rendering
 * Based on Josh Comeau's CSS Reset
 */
export declare const CSS_RESET = "/* CSS Reset */\n*, *::before, *::after {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nhtml {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\nbody {\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;\n  line-height: 1.5;\n  min-height: 100vh;\n}\n\nimg, picture, video, canvas, svg {\n  display: block;\n  max-width: 100%;\n}\n\ninput, button, textarea, select {\n  font: inherit;\n}\n\np, h1, h2, h3, h4, h5, h6 {\n  overflow-wrap: break-word;\n}";
/**
 * Generate a complete HTML document with consistent structure
 * This is the single source of truth for HTML boilerplate generation
 */
export declare function generateHTMLDocument(options: HTMLBoilerplateOptions): string;
/**
 * Generate HTML document for preview (simplified, no extra scripts)
 */
export declare function generatePreviewHTML(options: {
    html: string;
    css?: string;
    js?: string;
}): string;
//# sourceMappingURL=html-generator.d.ts.map