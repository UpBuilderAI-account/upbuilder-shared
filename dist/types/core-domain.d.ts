/**
 * User subscription tiers
 * basic: Free tier (2 exports/month, 1 design/project)
 * pro: $9.99/mo (50 exports/month, 2 designs/project)
 * max: $19.99/mo (100 exports/month, 20 designs/project)
 */
export type SubscriptionTier = 'basic' | 'pro' | 'max';
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
    readKey: string;
    writeKey: string;
}
/**
 * Plugin OAuth token polling response
 * Returned when plugin polls for authentication completion
 */
export interface PluginAuthTokenResponse {
    status: 'pending' | 'complete' | 'expired';
    token?: string;
    user?: User;
    error?: string;
}
export type ProjectStatus = 'idle' | 'analyze_design' | 'images_export' | 'export_config' | 'load' | 'plan' | 'section_bounding' | 'build_styles' | 'build_sections' | 'assembly' | 'convert_to_platform' | 'summary' | 'customize' | 'complete' | 'failed';
/**
 * Type-safe constants for ProjectStatus
 */
export declare const PROJECT_STATUS: {
    readonly IDLE: ProjectStatus;
    readonly ANALYZE_DESIGN: ProjectStatus;
    readonly IMAGES_EXPORT: ProjectStatus;
    readonly EXPORT_CONFIG: ProjectStatus;
    readonly LOAD: ProjectStatus;
    readonly PLAN: ProjectStatus;
    readonly SECTION_BOUNDING: ProjectStatus;
    readonly BUILD_STYLES: ProjectStatus;
    readonly BUILD_SECTIONS: ProjectStatus;
    readonly ASSEMBLY: ProjectStatus;
    readonly CONVERT_TO_PLATFORM: ProjectStatus;
    readonly SUMMARY: ProjectStatus;
    readonly CUSTOMIZE: ProjectStatus;
    readonly COMPLETE: ProjectStatus;
    readonly FAILED: ProjectStatus;
};
/**
 * Check if a project status represents an active processing stage
 */
export declare function isProcessingStage(status: ProjectStatus): boolean;
/**
 * Get the next status in the workflow sequence
 * @param status Current status
 * @param platform Optional platform - if provided, skips platform-specific stages
 * @param quickMode Optional - if true, skips customize stage
 * @param _enableAIAssistant Deprecated - all stages always run now
 */
export declare function getNextStatus(status: ProjectStatus, platform?: Platform, quickMode?: boolean, _enableAIAssistant?: boolean): ProjectStatus | null;
/**
 * Check if user action is required after this stage completes
 */
export declare function requiresUserActionAfter(status: ProjectStatus): boolean;
export type Platform = 'webflow';
export type StyleFramework = 'client-first';
/**
 * Stages to skip for each platform
 * Bricks/Elementor skip stylesheet generation (sections are self-contained)
 */
export declare const SKIPPED_STAGES: Partial<Record<Platform, ProjectStatus[]>>;
/**
 * Stages to skip in Quick mode (faster export with defaults)
 * Currently empty - all stages run, customize is always shown
 */
export declare const QUICK_MODE_SKIPPED_STAGES: ProjectStatus[];
/**
 * Stages to skip when AI assistant is disabled
 * NOTE: Disabled - all stages always run now
 */
export declare const AI_DISABLED_SKIPPED_STAGES: ProjectStatus[];
/**
 * Platforms that use per-section CSS (in addition to global stylesheet)
 * All platforms now show section CSS in the customizer
 */
export declare const USES_SECTION_CSS: Partial<Record<Platform, boolean>>;
/**
 * Check if a stage should be skipped for a given platform
 */
export declare function shouldSkipStage(platform: Platform, status: ProjectStatus): boolean;
export interface Breakpoints {
    tablet: number;
    mobile: number;
}
/**
 * CSS generation options for professional styling
 */
export interface CSSOptions {
    useRemFontSizes?: boolean;
    useUnitlessLineHeight?: boolean;
    respectMotionPreferences?: boolean;
    useLogicalProperties?: boolean;
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
    globalSections?: GlobalSection[];
    styleGuideHTML?: string;
    progress_log?: ProgressLogEntry[];
    error_message?: string;
    customFonts?: Array<{
        family: string;
        weights: string[];
        styles: string[];
    }>;
    /**
     * @deprecated LEGACY - No longer populated or used.
     * The current XSCP workflow stores section codes in the Section SQL table.
     * Kept for backward compatibility with old projects only.
     */
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
    /**
     * @deprecated LEGACY - No longer populated or used.
     * Stylesheets are stored in S3 (global-styles.json).
     * Kept for backward compatibility with old projects only.
     */
    consolidatedCSS?: string;
    /**
     * @deprecated LEGACY - No longer populated or used.
     * Global JS is no longer used in XSCP workflow.
     * Kept for backward compatibility with old projects only.
     */
    consolidatedJS?: string;
    exportConfig?: import('./workflow').ExportConfig;
    assetUploadStatus?: {
        complete: boolean;
        uploaded: number;
        total: number;
        failed: number;
    };
    planConversation?: {
        content: string;
        chatHistory?: Array<{
            role: 'assistant' | 'user';
            content: string;
            timestamp?: number;
        }>;
        config?: any;
        confirmed?: boolean;
        confirmedAt?: number;
        generatedAt: number;
        structuredPlan?: import('./plan').StructuredPlan | null;
        proposedDesignNames?: Array<{
            index: number;
            originalName: string;
            proposedName: string;
            type: string;
        }>;
        buildData?: {
            designs: Array<{
                id: string;
                originalName: string;
                name: string;
                type: string;
                sections: Array<{
                    name: string;
                    type: string;
                    elementIds: string[];
                }>;
            }>;
            interactivePatterns: Array<{
                type: string;
                location: string;
                details: string;
            }>;
            classStrategy: {
                utilityClasses: string[];
                componentClasses: string[];
                modifierClasses: string[];
            };
        };
        blocks?: any;
    };
    buildSectionsState?: import('./workflow').BuildSectionsState;
    buildStylesState?: import('./workflow').BuildStylesState;
    assemblyResult?: {
        structures: Record<string, string>;
        styles: string;
        completedAt: number;
    };
    styleMetrics?: {
        totalStyles: number;
        reusedStyles: number;
        newStyles: number;
        reusedStyleNames: string[];
        newStyleNames: string[];
        sourceProjectName?: string;
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
export declare const SECTION_STAGE: {
    readonly DETECT: SectionStage;
    readonly BUILD: SectionStage;
    readonly EXPORT: SectionStage;
};
/**
 * Type-safe constants for StageStatus
 */
export declare const STAGE_STATUS: {
    readonly PENDING: StageStatus;
    readonly RUNNING: StageStatus;
    readonly COMPLETE: StageStatus;
    readonly FAILED: StageStatus;
    readonly SKIPPED: StageStatus;
};
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
export declare const createDefaultStageStatus: () => SectionStageStatus;
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
    code?: SectionCode;
    globalSectionId?: string | null;
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
    variant: string;
    name: string;
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
export declare const DESIGN_STATUS: {
    readonly PENDING: DesignStatus;
    readonly RUNNING: DesignStatus;
    readonly COMPLETE: DesignStatus;
    readonly FAILED: DesignStatus;
};
/**
 * Design processing status - tracks whether design is queued for processing
 * Used to implement tier-based processing limits (Basic: 1 design, Pro: 10 designs)
 */
export type DesignProcessingStatus = 'pending' | 'queued' | 'processing' | 'complete' | 'failed';
/**
 * Type-safe constants for DesignProcessingStatus
 */
export declare const DESIGN_PROCESSING_STATUS: {
    readonly PENDING: DesignProcessingStatus;
    readonly QUEUED: DesignProcessingStatus;
    readonly PROCESSING: DesignProcessingStatus;
    readonly COMPLETE: DesignProcessingStatus;
    readonly FAILED: DesignProcessingStatus;
};
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
    featured_img_url?: string | null;
    designs?: Design[];
    description?: string | null;
    figma_url?: string | null;
    github_repo?: string | null;
    github_synced_at?: string | null;
    current_expansion_version?: number;
    expansion_count?: number;
}
/**
 * Export type/format
 * Only includes currently implemented export types
 */
export type ExportType = 'zip' | 'webflow';
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
    current_expansion_version?: number;
    expansion_count?: number;
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
    big_preview_dimensions?: {
        width: number;
        height: number;
    };
    /** AI representation: Element list with extracted CSS values (font-size, colors, dimensions) */
    html_list?: string | null;
    /** AI representation: HTML-like hierarchy with auto-layout hints from Figma */
    figma_mockup?: string | null;
    status?: string;
    width?: number;
    height?: number;
    metadata?: Record<string, any>;
}
//# sourceMappingURL=core-domain.d.ts.map