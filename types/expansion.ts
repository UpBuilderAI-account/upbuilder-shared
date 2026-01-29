// ============================================================================
// EXPANSION TYPES
// Version history and smart expansion mode types
// ============================================================================

import type { StyleDefinition } from './workflow';

/**
 * Expansion history entry - tracks each version of the project
 */
export interface ExpansionEntry {
  /** Version number (1, 2, 3, ...) */
  version: number;
  /** When this version was created */
  timestamp: number;
  /** What triggered this version */
  trigger: 'initial' | 'expand' | 'rebuild' | 'restore';

  /** Design IDs in this version */
  designIds: string[];
  /** Design names in this version */
  designNames: string[];

  /** What changed in this version (for expand trigger) */
  changes?: {
    designsAdded: Array<{ id: string; name: string }>;
    designsRemoved: Array<{ id: string; name: string }>;
    sectionsAdded: string[];
    stylesAdded: string[];
    colorsAdded: string[];
  };

  /** AI-generated summary of this expansion */
  summary: string;

  /** S3 path to version snapshot */
  snapshotPath: string;
}

/**
 * Version manifest stored in S3 for each version
 */
export interface VersionManifest {
  version: number;
  projectId: string;
  createdAt: number;
  trigger: ExpansionEntry['trigger'];

  designs: Array<{
    id: string;
    name: string;
    sectionsCount: number;
  }>;

  styleCount: number;
  summary: string;
}

/**
 * Expansion context passed to workflow stages
 * Provides information about what's new vs existing
 */
export interface ExpansionContext {
  /** Whether this is an expansion (adding to existing project) */
  isExpansion: boolean;
  /** Previous version number (0 if first build) */
  previousVersion: number;
  /** Design IDs being added in this expansion */
  newDesignIds: string[];
  /** Design IDs that already exist */
  existingDesignIds: string[];
  /** Full existing designs from state (passed through to avoid re-reading) */
  existingDesigns?: Array<{ id: string; name: string; status?: string; sections?: any[] }>;
  /** Existing styles from previous version */
  existingStyles: StyleDefinition[];
  /** Full expansion history for context */
  expansionHistory: ExpansionEntry[];
  /** Formatted history summary for AI prompts */
  historyContext?: string;
}

/**
 * Parameters for finalizing an expansion
 */
export interface FinalizeExpansionParams {
  newDesign: { id: string; name: string };
  sectionsAdded: string[];
  stylesAdded: StyleDefinition[];
  allStyles: StyleDefinition[];
  allDesigns: Array<{ id: string; name: string }>;
}

/**
 * Parameters for creating a version snapshot
 */
export interface CreateSnapshotParams {
  version: number;
  trigger: ExpansionEntry['trigger'];
  designs: Array<{ id: string; name: string }>;
  styles: StyleDefinition[];
  summary: string;
  changes?: ExpansionEntry['changes'];
}

/**
 * Result of parsing expansion styles response
 */
export interface ExpansionStylesResult {
  /** Style IDs that will be reused from existing */
  reusedStyles: string[];
  /** New styles created for this expansion */
  newStyles: StyleDefinition[];
}
