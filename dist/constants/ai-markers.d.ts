/**
 * AI response block markers
 * These markers define the boundaries of structured content in AI responses
 *
 * IMPORTANT: Keep prompt generators and parsers in sync by using these constants
 */
export declare const AI_MARKERS: {
    /**
     * Structure block - Webflow element hierarchy
     */
    readonly STRUCTURE: {
        readonly START: "BEGIN STRUCTURE";
        readonly END: "END STRUCTURE";
    };
    /**
     * Styles block - CSS/Webflow style definitions
     */
    readonly STYLES: {
        readonly START: "BEGIN STYLES";
        readonly END: "END STYLES";
    };
    /**
     * Interactions block - Webflow interactions/animations
     */
    readonly INTERACTIONS: {
        readonly START: "BEGIN INTERACTIONS";
        readonly END: "END INTERACTIONS";
    };
    /**
     * Attributes block - HTML/accessibility attributes
     */
    readonly ATTRIBUTES: {
        readonly START: "BEGIN ATTRIBUTES";
        readonly END: "END ATTRIBUTES";
    };
    /**
     * JavaScript block - Custom JS code
     */
    readonly JAVASCRIPT: {
        readonly START: "BEGIN JAVASCRIPT";
        readonly END: "END JAVASCRIPT";
    };
    /**
     * HTML block - Raw HTML content
     */
    readonly HTML: {
        readonly START: "BEGIN HTML";
        readonly END: "END HTML";
    };
    /**
     * CSS block - Raw CSS content
     */
    readonly CSS: {
        readonly START: "BEGIN CSS";
        readonly END: "END CSS";
    };
    /**
     * Analysis block - AI analysis/reasoning
     */
    readonly ANALYSIS: {
        readonly START: "BEGIN ANALYSIS";
        readonly END: "END ANALYSIS";
    };
    /**
     * JSON block - Structured JSON data
     */
    readonly JSON: {
        readonly START: "BEGIN JSON";
        readonly END: "END JSON";
    };
};
/**
 * AI stream patterns for real-time parsing
 * These are regex patterns for detecting specific content during streaming
 * (Separate from block markers which have START/END pairs)
 */
export declare const AI_STREAM_PATTERNS: {
    /**
     * Progress marker - Section build progress updates
     * Format: Progress: XX%
     * Used for real-time progress tracking in stream parser
     */
    readonly PROGRESS: RegExp;
};
/**
 * Type for block names
 */
export type AIBlockName = keyof typeof AI_MARKERS;
/**
 * Helper function to get marker pair for a block
 */
export declare function getMarkers(blockName: AIBlockName): {
    start: string;
    end: string;
};
/**
 * Helper function to wrap content in markers
 */
export declare function wrapInMarkers(blockName: AIBlockName, content: string): string;
/**
 * Helper function to create regex pattern for extracting block content
 */
export declare function createBlockRegex(blockName: AIBlockName): RegExp;
/**
 * JSON field names used in AI responses
 * Keep parsers and prompts in sync by using these constants
 */
export declare const AI_JSON_KEYS: {
    readonly SECTIONS: "sections";
    readonly COMPOSITES_ANALYSIS: "composites_analysis";
    readonly SUMMARY: "summary";
    readonly HTML: "html";
    readonly CSS: "css";
    readonly JS: "js";
    readonly NAME: "name";
    readonly ELEMENTS: "elements";
    readonly STYLING_GUIDELINES: "styling_guidelines";
};
export type AIJsonKey = keyof typeof AI_JSON_KEYS;
//# sourceMappingURL=ai-markers.d.ts.map