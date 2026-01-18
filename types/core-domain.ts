// ============================================================================
// CORE DOMAIN TYPES
// Consolidated business logic and database entity types
// ============================================================================
// This file consolidates:
// - project.ts: Project, Design, Section types and status enums
// - auth.ts: User, authentication, and session types
// - export.ts: Export configuration and operation types
// ============================================================================

// ============================================================================
// AUTHENTICATION TYPES
// User, auth data, and session management types
// ============================================================================

/**
 * User subscription tiers
 * basic: Free tier
 * pro: $9.99/mo - full features + GitHub sync
 * NOTE: Plus tier has been removed
 */
export type SubscriptionTier = 'basic' | 'pro';

/**
 * User account data
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string | null;
  role?: 'user' | 'admin';
  created_at: string;
  subscription?: {
    tier: SubscriptionTier;
    exportsRemaining?: number;
    features?: string[];
  };
}

/**
 * Authentication response from server
 */
export interface AuthResponse {
  user: User;
  token: string;
  expiresAt?: string;
}

/**
 * Authentication status
 */
export interface AuthStatus {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

/**
 * Plugin OAuth key generation response
 * Used by Figma plugin to initiate OAuth flow
 */
export interface PluginAuthKeysResponse {
  readKey: string;  // Key used to poll for auth completion
  writeKey: string; // Key used in OAuth URL for user identification
}

/**
 * Plugin OAuth token polling response
 * Returned when plugin polls for authentication completion
 */
export interface PluginAuthTokenResponse {
  status: 'pending' | 'complete' | 'expired';
  token?: string;     // JWT token when status is 'complete'
  user?: User;        // User data when status is 'complete'
  error?: string;     // Error message if authentication failed
}

// ============================================================================
// PROJECT TYPES
// Project data structures, status, and design information
// ============================================================================

export type ProjectStatus =
  | 'idle'
  | 'export_config'      // First stage - configure export options
  | 'load'
  | 'convert_to_platform' // Unified build: AI generates ALL styles + structure per design
  | 'customize'          // Preview Webflow structure + export modal
  | 'complete'
  | 'failed';

/**
 * Type-safe constants for ProjectStatus
 */
export const PROJECT_STATUS = {
  IDLE: 'idle' as ProjectStatus,
  EXPORT_CONFIG: 'export_config' as ProjectStatus,
  LOAD: 'load' as ProjectStatus,
  CONVERT_TO_PLATFORM: 'convert_to_platform' as ProjectStatus,
  CUSTOMIZE: 'customize' as ProjectStatus,
  COMPLETE: 'complete' as ProjectStatus,
  FAILED: 'failed' as ProjectStatus,
} as const;

/**
 * Check if a project status represents an active processing stage
 */
export function isProcessingStage(status: ProjectStatus): boolean {
  const processingStages: ProjectStatus[] = [
    'load',
    'convert_to_platform',
  ];
  return processingStages.includes(status);
}

/**
 * Get the next status in the workflow sequence
 * @param status Current status
 * @param platform Optional platform - if provided, skips platform-specific stages
 * @param quickMode Optional - if true, skips customize stage
 */
export function getNextStatus(status: ProjectStatus, platform?: Platform, quickMode?: boolean): ProjectStatus | null {
  const transitions: Record<ProjectStatus, ProjectStatus | null> = {
    idle: 'export_config',
    export_config: 'load',
    load: 'convert_to_platform',
    convert_to_platform: 'customize',
    customize: 'complete',
    complete: null,
    failed: null,
  };

  let next = transitions[status] ?? null;

  // Skip stages based on platform configuration
  if (platform && next) {
    const skipped = SKIPPED_STAGES[platform] || [];
    while (next && skipped.includes(next)) {
      next = transitions[next];
    }
  }

  // Skip stages for quick mode
  if (quickMode && next) {
    while (next && QUICK_MODE_SKIPPED_STAGES.includes(next)) {
      next = transitions[next];
    }
  }

  return next;
}

/**
 * Check if user action is required after this stage completes
 */
export function requiresUserActionAfter(status: ProjectStatus): boolean {
  // These stages require user action to proceed
  return status === 'export_config' || status === 'customize';
}

// Bricks and Elementor commented out - only Webflow available for now
export type Platform = 'webflow'; // | 'bricks' | 'elementor';
export type StyleFramework = 'client-first' | 'bem-lite' | 'tailwind' | 'bootstrap' | 'vanilla' | 'inline';

// =============================================================================
// PLATFORM-SPECIFIC STAGE CONFIGURATION
// =============================================================================

/**
 * Stages to skip for each platform
 * Bricks/Elementor skip stylesheet generation (sections are self-contained)
 */
export const SKIPPED_STAGES: Partial<Record<Platform, ProjectStatus[]>> = {
  webflow: [],
  // bricks: ['generate_styles'],
  // elementor: ['generate_styles'],
};

/**
 * Stages to skip in Quick mode (faster export with defaults)
 * Currently empty - all stages run, customize is always shown
 */
export const QUICK_MODE_SKIPPED_STAGES: ProjectStatus[] = [];

/**
 * Platforms that use per-section CSS (in addition to global stylesheet)
 * All platforms now show section CSS in the customizer
 */
export const USES_SECTION_CSS: Partial<Record<Platform, boolean>> = {
  webflow: true,
  // bricks: true,
  // elementor: true,
};

/**
 * Check if a stage should be skipped for a given platform
 */
export function shouldSkipStage(platform: Platform, status: ProjectStatus): boolean {
  const skipped = SKIPPED_STAGES[platform] || [];
  return skipped.includes(status);
}

export interface Breakpoints {
  tablet: number;
  mobile: number;
}

/**
 * CSS generation options for professional styling
 */
export interface CSSOptions {
  useRemFontSizes?: boolean;      // Use rem instead of px for font sizes (accessibility)
  useUnitlessLineHeight?: boolean; // Use unitless values like 1.5 instead of 24px
  respectMotionPreferences?: boolean; // Include prefers-reduced-motion rules
  useLogicalProperties?: boolean;  // Use margin-inline instead of margin-left (RTL support)
}

export interface StylesheetConfig {
  generateMethod: 'scratch' | 'existing_site';
  existingSiteUrl?: string;
  cssOptions?: CSSOptions;
}


/**
 * Progress log entry with timestamp
 */
export interface ProgressLogEntry {
  stage: string;
  message: string;
  timestamp: number;
}

/**
 * Project state - stored in database JSONB column.
 * Contains ONLY what the UI needs to render (metadata).
 * Heavy data lives in S3 (stylesheet, globalJS) and SQL tables (section codes).
 */
export interface ProjectState {
  designs: Design[];

  // Global sections - hydrated from GlobalSection table for frontend display
  globalSections?: GlobalSection[];

  // Style guide HTML (small, kept in state)
  styleGuideHTML?: string;

  // Progress log - batched writes, keeps last 100 entries
  progress_log?: ProgressLogEntry[];

  // Error tracking
  error_message?: string;

  // Custom fonts detected during Webflow export (need manual import in Webflow)
  customFonts?: Array<{ family: string; weights: string[]; styles: string[] }>;

  // Assembled designs (consolidated HTML/CSS/JS from build stage)
  assembledDesigns?: Array<{
    id: string;
    designId: string;
    name: string;
    html: string;
    css: string;
    js: string;
    sectionCount: number;
    createdAt: string;
  }>;

  // Export config (set from plugin, skips export_config stage in workflow)
  exportConfig?: import('./workflow').ExportConfig;

  // Asset upload status (for Webflow CDN upload progress)
  assetUploadStatus?: {
    complete: boolean;
    uploaded: number;
    total: number;
    failed: number;
  };
}

export interface SectionCode {
  html: string;
  css: string;
  js?: string;
}

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

/**
 * Stage status - status for a single processing stage
 * pending: not yet processed
 * running: currently being processed
 * complete: successfully processed
 * failed: processing failed
 * skipped: stage was skipped (e.g., section disabled)
 */
export type StageStatus = 'pending' | 'running' | 'complete' | 'failed' | 'skipped';

/**
 * Section stage types - the stages a section goes through
 */
export type SectionStage = 'detect' | 'build' | 'export';

/**
 * Type-safe constants for SectionStage
 */
export const SECTION_STAGE = {
  DETECT: 'detect' as SectionStage,
  BUILD: 'build' as SectionStage,
  EXPORT: 'export' as SectionStage,
} as const;

/**
 * Type-safe constants for StageStatus
 */
export const STAGE_STATUS = {
  PENDING: 'pending' as StageStatus,
  RUNNING: 'running' as StageStatus,
  COMPLETE: 'complete' as StageStatus,
  FAILED: 'failed' as StageStatus,
  SKIPPED: 'skipped' as StageStatus,
} as const;

/**
 * Section stage status - tracks status per processing stage
 * This allows the UI to show which stage each section is in
 * Example: { detect: 'complete', build: 'running', export: 'pending' }
 */
export interface SectionStageStatus {
  detect: StageStatus;
  build: StageStatus;
  export: StageStatus;
}

/**
 * Helper to create default stage status (all pending)
 */
export const createDefaultStageStatus = (): SectionStageStatus => ({
  detect: 'pending',
  build: 'pending',
  export: 'pending',
});

/**
 * Section interface - simplified
 * If globalSectionId is null = unique section
 * If globalSectionId is set = linked to GlobalSection (code lives in GlobalSection table)
 */
export interface Section {
  id: string;
  name: string;
  elementIds: string[];
  bounds?: Bounds;
  order?: number;
  enabled?: boolean;

  /**
   * Per-stage status tracking
   * Tracks status for each processing stage: detect, build, export
   */
  stageStatus: SectionStageStatus;

  // Code (empty if globalSectionId is set - code lives in GlobalSection)
  code?: SectionCode;

  // If null = unique section. If set = linked to GlobalSection
  globalSectionId?: string | null;

  // Display variant key for UI (e.g., "header_v1", "footer_v2")
  globalVariant?: string;
}

/**
 * GlobalSection type - section type classification
 */
export type GlobalSectionType = 'HEADER' | 'FOOTER' | 'NAVIGATION' | 'BASIC';

/**
 * GlobalSection interface - reusable section across designs
 * Code lives here, individual Sections link to this via globalSectionId
 */
export interface GlobalSection {
  id: string;
  projectId: string;
  variant: string;        // e.g., "header_v1", "footer_v2"
  name: string;           // Display name, e.g., "Header"
  type: GlobalSectionType;

  /**
   * Per-stage status tracking
   * Tracks status for each processing stage: detect, build, export
   */
  stageStatus: SectionStageStatus;

  code?: SectionCode;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Design status - simple for card overlay
 */
export type DesignStatus = 'pending' | 'running' | 'complete' | 'failed';

/**
 * Type-safe constants for DesignStatus
 */
export const DESIGN_STATUS = {
  PENDING: 'pending' as DesignStatus,
  RUNNING: 'running' as DesignStatus,
  COMPLETE: 'complete' as DesignStatus,
  FAILED: 'failed' as DesignStatus,
} as const;

/**
 * Design processing status - tracks whether design is queued for processing
 * Used to implement tier-based processing limits (Basic: 1 design, Pro: 10 designs)
 */
export type DesignProcessingStatus =
  | 'pending'          // Just created, not yet in workflow
  | 'queued'           // Ready to be processed
  | 'processing'       // Currently in workflow
  | 'complete'         // Finished processing
  | 'failed';          // Processing failed

/**
 * Type-safe constants for DesignProcessingStatus
 */
export const DESIGN_PROCESSING_STATUS = {
  PENDING: 'pending' as DesignProcessingStatus,
  QUEUED: 'queued' as DesignProcessingStatus,
  PROCESSING: 'processing' as DesignProcessingStatus,
  COMPLETE: 'complete' as DesignProcessingStatus,
  FAILED: 'failed' as DesignProcessingStatus,
} as const;

/**
 * Design interface - simplified
 */
export interface Design {
  id: string;
  name: string;
  status: DesignStatus;
  featured_img_url?: string;
  sections?: Section[];
  dimensions?: Dimensions;
  /** Image filenames uploaded during load stage */
  images?: string[];
  /** Google AI Files API URI for the design screenshot (used in AI prompts) */
  googleAiScreenshotUri?: string;
}

export interface Project {
  id: string;
  user_id: string;
  project_name: string;
  status: ProjectStatus;
  platform: Platform;
  style_framework: StyleFramework;
  breakpoints: Breakpoints;
  state: ProjectState;
  created_at: string;
  updated_at: string;
  // Optional fields populated by API responses
  featured_img_url?: string | null;
  designs?: Design[]; // Top-level designs array (for list/detail API responses)
  description?: string | null;
  figma_url?: string | null;
  // GitHub integration
  github_repo?: string | null;
  github_synced_at?: string | null;
}

// ============================================================================
// EXPORT TYPES
// Code export and generation types
// ============================================================================

/**
 * Export type/format
 * Only includes currently implemented export types
 */
export type ExportType = 'zip' | 'webflow'; // | 'bricks';

/**
 * Export options for code generation
 */
export interface ExportOptions {
  type: ExportType;
  platform?: Platform;
  includeAssets?: boolean;
  customCode?: {
    header?: string;
    body?: string;
  };
}

/**
 * Export data payload for requests
 */
export interface ExportPayload {
  projectId: string;
  options: ExportOptions;
}

/**
 * Export job status tracking (for dashboard/history)
 */
export type ExportJobStatus = 'pending' | 'processing' | 'completed' | 'failed';

/**
 * Export job record (for dashboard export history)
 * Moved from frontend/src/types/index.ts
 */
export interface ExportJob {
  id: string;
  projectId: string;
  userId: string;
  platform: Platform;
  status: ExportJobStatus;
  progress: number;
  downloadUrl: string | null;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Operation metadata for tracking
 */
export interface OperationMetadata {
  framework?: string;
  startedAt?: Date;
  completedAt?: Date;
  error?: string;
  userId?: string;
  cancelledAt?: Date;
}

// ============================================================================
// DATABASE ENTITY TYPES
// Interface definitions for database entities (TypeORM-agnostic)
// ============================================================================

/**
 * Project entity interface
 * Represents the structure of a project in the database
 * TypeORM entities should implement this interface
 */
export interface ProjectEntity {
  id: string;
  user_id: string;
  project_name: string;
  featured_img_url?: string;
  status: ProjectStatus;
  operation_type?: string;
  platform?: Platform;
  style_framework?: StyleFramework;
  breakpoints?: Breakpoints;
  operation_metadata?: {
    framework?: string;
    startedAt?: Date;
    completedAt?: Date;
    error?: string;
    userId?: string;
    cancelledAt?: Date;
    transferHistory?: Array<{
      fromUserId: string;
      toUserId: string;
      transferredAt: string;
    }>;
  };
  operation_started_at?: Date;
  state?: ProjectState;
  created_at: Date;
  updated_at: Date;
}

/**
 * Design entity interface (Database Layer)
 * Represents the structure of a design/frame in the database
 * TypeORM entities should implement this interface
 *
 * Note: This is the DATABASE entity, not the runtime Design type.
 * Runtime workflow state (status, loaded, sections) is stored in Project.state.designs[]
 * which uses the Design interface above
 */
/**
 * Font source types for tracking where fonts are loaded from
 */
export type FontSource = 'google' | 's3' | 'not_found';

/**
 * Individual font info stored in database
 */
export interface DesignFontInfo {
  family: string;
  weights: number[];
  source: FontSource;
  /** S3 URLs if source is 's3', Google Fonts URL if source is 'google' */
  urls?: string[];
}

/**
 * Fonts metadata stored per design
 */
export interface DesignFonts {
  /** List of all fonts used in this design */
  fonts: DesignFontInfo[];
  /** Timestamp when fonts were discovered */
  discoveredAt: string;
  /** Total count of unique font families */
  totalFamilies: number;
  /** Count by source */
  bySource: {
    google: number;
    s3: number;
    notFound: number;
  };
}

export interface DesignEntity {
  id: string;
  project_id: string;
  name: string;
  sort_order?: number;
  created_at: Date;
  featured_img_url?: string;

  /** Fonts used in this design with their sources */
  fonts?: DesignFonts | null;

  /** Processing status - tracks if design is queued, pending upgrade, or processed */
  processing_status?: DesignProcessingStatus;

  /** Big preview URL (8K max) stored in S3 for frontend access during auto-fix phase */
  big_preview_url?: string;

  /** Big preview dimensions for coordinate scaling */
  big_preview_dimensions?: { width: number; height: number };

  // Legacy fields - NOT stored in DB, exist only in Project.state.designs[]
  // These are here only for type compatibility during database queries
  status?: string;
  width?: number;
  height?: number;
  metadata?: Record<string, any>;
}
