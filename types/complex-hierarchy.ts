// ============================================================================
// COMPLEX HIERARCHY DETECTION TYPES
// Types for the plugin's complex hierarchy review panel
// ============================================================================

/**
 * Reasons why a node was detected as needing vectorization
 */
export type ComplexityReason =
  | 'hard_limit'        // Level 25+ depth
  | 'name_pattern'      // Icon/logo/illustration name pattern
  | 'scattered'         // Confetti/particles pattern
  | 'overlapping'       // Composed graphics with overlapping layers
  | 'thin_lines'        // Decorative line patterns
  | 'low_opacity'       // Transparent overlay elements
  | 'default_names'     // Auto-named elements (Rectangle 1, etc)
  | 'very_deep'         // Level 15+ with descendants
  | 'deep'              // Level 8+ with descendants
  | 'complexity_score'  // High complexity score
  | 'shape_composition'; // All children are shapes (icons made of vectors)

/**
 * Confidence level for detection
 * - confident: Designer explicitly named/structured as graphic
 * - likely: Pattern-based detection, usually correct
 * - needs_review: No clear intent, user should verify
 */
export type ConfidenceLevel = 'confident' | 'likely' | 'needs_review';

/**
 * Get confidence level from detection reason
 */
export function getConfidenceFromReason(reason: ComplexityReason): ConfidenceLevel {
  switch (reason) {
    // Confident - Designer explicitly named/structured
    case 'name_pattern':
    case 'shape_composition':
      return 'confident';
    // Needs Review - No clear intent (auto-named elements)
    case 'default_names':
      return 'needs_review';
    // Likely - Pattern-based detection (all other cases)
    default:
      return 'likely';
  }
}

/**
 * Result from shouldTreatAsVector with reason
 */
export interface VectorizationResult {
  shouldVectorize: boolean;
  reason?: ComplexityReason;
  details?: string; // Additional context (e.g., "15 small elements")
}

/**
 * A detected complex hierarchy that will be converted to an image
 */
export interface ComplexHierarchyDetection {
  nodeId: string;
  nodeName: string;
  parentName: string;
  reason: ComplexityReason;
  reasonText: string;      // User-friendly description
  confidence: ConfidenceLevel; // How confident we are this is a graphic
  level: number;
  descendantCount: number;
  bounds: {
    width: number;
    height: number;
  };
  thumbnailUrl?: string;   // base64 small preview
  isApproved: boolean;     // default based on confidence level
  // Deduplication info
  duplicateCount?: number;      // Number of visually identical graphics (1 = unique)
  duplicateNodeIds?: string[];  // All node IDs in this duplicate group (including self)
}

/**
 * Get user-friendly display text for a complexity reason
 */
export function getReasonDisplayText(reason: ComplexityReason, details?: string): string {
  switch (reason) {
    case 'hard_limit':
      return 'Very deep nesting (25+ levels)';
    case 'name_pattern':
      return `Name suggests graphic${details ? ` (${details})` : ''}`;
    case 'scattered':
      return `Scattered elements${details ? ` (${details})` : ''}`;
    case 'overlapping':
      return `Overlapping layers${details ? ` (${details})` : ''}`;
    case 'thin_lines':
      return 'Decorative line pattern';
    case 'low_opacity':
      return 'Transparent overlay elements';
    case 'default_names':
      return 'Auto-named elements (Rectangle 1, etc)';
    case 'very_deep':
      return `Deeply nested${details ? ` (${details})` : ''}`;
    case 'deep':
      return `Nested structure${details ? ` (${details})` : ''}`;
    case 'complexity_score':
      return `Complex composition${details ? ` (score: ${details})` : ''}`;
    case 'shape_composition':
      return `Shape composition${details ? ` (${details})` : ''}`;
    default:
      return 'Complex element';
  }
}
