/**
 * Computed style properties extracted from a rendered element via getComputedStyle()
 */
export interface ComputedElementProps {
    /** data-element-id value from the rendered HTML */
    elementId: string;
    /** Element bounding rect from getBoundingClientRect() */
    boundingRect: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /** Resolved CSS properties from getComputedStyle() */
    computed: {
        color: string;
        backgroundColor: string;
        fontSize: string;
        fontFamily: string;
        fontWeight: string;
        fontStyle: string;
        lineHeight: string;
        letterSpacing: string;
        textDecoration: string;
        textTransform: string;
        textAlign: string;
        paddingTop: string;
        paddingRight: string;
        paddingBottom: string;
        paddingLeft: string;
        marginTop: string;
        marginRight: string;
        marginBottom: string;
        marginLeft: string;
        borderWidth: string;
        borderColor: string;
        borderStyle: string;
        borderRadius: string;
        boxShadow: string;
        opacity: string;
        overflow: string;
        display: string;
        flexDirection: string;
        justifyContent: string;
        alignItems: string;
        gap: string;
        width: string;
        height: string;
    };
}
/**
 * Server → Frontend: Send rendered HTML/CSS for browser rendering
 */
export interface SectionRenderPayload {
    sectionId: string;
    attempt: number;
    /** Complete HTML from convertSectionToHtml() */
    html: string;
    /** Complete CSS from convertSectionToHtml() */
    css: string;
    /** Section viewport width */
    width: number;
    /** Google Fonts @import + @font-face rules (already included in css, but separated for preloading) */
    fontCss: string;
    /** S3 base URL for resolving image assets */
    assetsBaseUrl: string;
    /** data-element-id values to extract computed properties for */
    elementIds: string[];
    /** Timestamp when the render request was created (for stale render detection) */
    timestamp?: number;
}
/**
 * Frontend → Server: Computed properties from browser rendering
 */
export interface SectionComputedPayload {
    sectionId: string;
    attempt: number;
    /** Computed properties for each element */
    elements: ComputedElementProps[];
    /** Total rendered height of the section */
    totalHeight: number;
    /** Viewport width used for rendering */
    viewportWidth: number;
}
/**
 * Server → Frontend: Section passed QA, show in live preview
 */
export interface SectionQAPassedPayload {
    sectionId: string;
    /** Final HTML for live preview display */
    html: string;
    /** Final CSS for live preview display */
    css: string;
    /** QA accuracy score 0-100 */
    accuracy: number;
}
/**
 * Server → Frontend: QA result for each attempt (both pass and fail)
 * Used by the filmstrip UI to show per-attempt thumbnails with status
 */
export interface SectionQAResultPayload {
    sectionId: string;
    sectionName: string;
    attempt: number;
    passed: boolean;
    /** QA accuracy score 0-100 (even partial score for failures) */
    accuracy: number;
    /** Judge findings summary (for failed attempts) */
    findings?: string;
    /** HTML for this attempt's thumbnail rendering */
    html: string;
    /** CSS for this attempt's thumbnail rendering */
    css: string;
    /** Font CSS for thumbnail rendering */
    fontCss?: string;
}
//# sourceMappingURL=section-render.d.ts.map