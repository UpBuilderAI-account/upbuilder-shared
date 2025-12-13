// ============================================================================
// AI RESPONSE MARKERS
// Shared constants for AI prompt/response block markers
// Used by prompt generators and response parsers
// ============================================================================

/**
 * AI response block markers
 * These markers define the boundaries of structured content in AI responses
 *
 * IMPORTANT: Keep prompt generators and parsers in sync by using these constants
 */
export const AI_MARKERS = {
  /**
   * Structure block - Webflow element hierarchy
   */
  STRUCTURE: {
    START: 'BEGIN STRUCTURE',
    END: 'END STRUCTURE',
  },

  /**
   * Styles block - CSS/Webflow style definitions
   */
  STYLES: {
    START: 'BEGIN STYLES',
    END: 'END STYLES',
  },

  /**
   * Interactions block - Webflow interactions/animations
   */
  INTERACTIONS: {
    START: 'BEGIN INTERACTIONS',
    END: 'END INTERACTIONS',
  },

  /**
   * Attributes block - HTML/accessibility attributes
   */
  ATTRIBUTES: {
    START: 'BEGIN ATTRIBUTES',
    END: 'END ATTRIBUTES',
  },

  /**
   * JavaScript block - Custom JS code
   */
  JAVASCRIPT: {
    START: 'BEGIN JAVASCRIPT',
    END: 'END JAVASCRIPT',
  },

  /**
   * HTML block - Raw HTML content
   */
  HTML: {
    START: 'BEGIN HTML',
    END: 'END HTML',
  },

  /**
   * CSS block - Raw CSS content
   */
  CSS: {
    START: 'BEGIN CSS',
    END: 'END CSS',
  },

  /**
   * Analysis block - AI analysis/reasoning
   */
  ANALYSIS: {
    START: 'BEGIN ANALYSIS',
    END: 'END ANALYSIS',
  },

  /**
   * JSON block - Structured JSON data
   */
  JSON: {
    START: 'BEGIN JSON',
    END: 'END JSON',
  },
} as const;

/**
 * AI stream patterns for real-time parsing
 * These are regex patterns for detecting specific content during streaming
 * (Separate from block markers which have START/END pairs)
 */
export const AI_STREAM_PATTERNS = {
  /**
   * Progress marker - Section build progress updates
   * Format: Progress: XX%
   * Used for real-time progress tracking in stream parser
   */
  PROGRESS: /Progress:\s*(\d+)%/g,
} as const;

/**
 * Type for block names
 */
export type AIBlockName = keyof typeof AI_MARKERS;

/**
 * Helper function to get marker pair for a block
 */
export function getMarkers(blockName: AIBlockName): { start: string; end: string } {
  return {
    start: AI_MARKERS[blockName].START,
    end: AI_MARKERS[blockName].END,
  };
}

/**
 * Helper function to wrap content in markers
 */
export function wrapInMarkers(blockName: AIBlockName, content: string): string {
  const { start, end } = getMarkers(blockName);
  return `${start}\n${content}\n${end}`;
}

/**
 * Helper function to create regex pattern for extracting block content
 */
export function createBlockRegex(blockName: AIBlockName): RegExp {
  const { start, end } = getMarkers(blockName);
  // Escape special regex characters and create pattern
  const escStart = start.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escEnd = end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`${escStart}\\s*\\n([\\s\\S]*?)\\n${escEnd}`, 'i');
}

// ============================================================================
// AI JSON KEYS
// Shared constants for JSON field names in AI responses
// Used by parsers to validate expected fields
// ============================================================================

/**
 * JSON field names used in AI responses
 * Keep parsers and prompts in sync by using these constants
 */
export const AI_JSON_KEYS = {
  // Section detection
  SECTIONS: 'sections',

  // Composites analysis
  COMPOSITES_ANALYSIS: 'composites_analysis',
  SUMMARY: 'summary',

  // Code generation
  HTML: 'html',
  CSS: 'css',
  JS: 'js',

  // Structure
  NAME: 'name',
  ELEMENTS: 'elements',

  // Style guide
  STYLING_GUIDELINES: 'styling_guidelines',
} as const;

export type AIJsonKey = keyof typeof AI_JSON_KEYS;
