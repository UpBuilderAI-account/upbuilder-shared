/**
 * Fixing Stage Types
 * Uses rebuild-only approach (full structure replacement)
 *
 * NOTE: RebuildStructureNode and RebuildStyleDefinition are defined in
 * edit-operations.ts as they're used by the ReplaceSectionOp and
 * AddStyleObjectsBatchOp operation types.
 */

import type { RebuildStructureNode, RebuildStyleDefinition } from './edit-operations';

// ============================================================================
// SECTION TYPES
// ============================================================================

export interface FixingSection {
  id: string;
  name: string;
  nodeId: string;
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  isGlobal: boolean;
  status: 'pending' | 'in_progress' | 'complete';
}

export interface FixingStartRequest {
  projectId: string;
  designId: string;
  sections: FixingSection[];
}

// ============================================================================
// REBUILD REQUEST/RESPONSE TYPES
// ============================================================================

/** Request to rebuild a section */
export interface SectionRebuildRequest {
  projectId: string;
  designId: string;
  sectionId: string;
  sectionName: string;
  /** Existing styles from the project (for reuse matching) */
  existingStyles: Array<{
    id: string;
    combo: string;
    mainCss: string;
  }>;
  /** Screenshots for comparison */
  figmaScreenshot: string;
  builtScreenshot: string;
}

/** Response from section rebuild */
export interface SectionRebuildResponse {
  projectId: string;
  designId: string;
  sectionId: string;
  /** AI's analysis of what was wrong */
  analysis: string;
  /** Full structure for this section (replace existing nodes) */
  structure: RebuildStructureNode[];
  /** New styles to add (styles that don't exist yet) */
  newStyles: RebuildStyleDefinition[];
  /** Validation result */
  validation: {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };
}
