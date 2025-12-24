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
  level: number;
  descendantCount: number;
  bounds: {
    width: number;
    height: number;
  };
  thumbnailUrl?: string;   // base64 small preview
  isApproved: boolean;     // default true - user can uncheck to exclude
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
