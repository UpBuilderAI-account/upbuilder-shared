import type { ProjectStatus, Platform, StyleFramework } from './core-domain';
/**
 * Stage = active processing stages (excludes idle, complete, failed)
 * Derived from ProjectStatus for single source of truth
 */
export type Stage = Exclude<ProjectStatus, 'idle' | 'complete' | 'failed'>;
/** Progress: -1 = failed, 0 = pending, 1-99 = running, 100 = complete */
export type Progress = number;
export type { Platform };
/**
 * AI model for section building and analysis
 * - flash: Gemini Flash (faster, cheaper, good for well-structured designs)
 * - pro: Gemini Pro (more capable, better for complex designs)
 */
export type AIModel = 'flash' | 'pro';
/**
 * Export preset for quick configuration
 * - quality: Pro model + full image analysis (best results)
 * - fast: Flash model + basic analysis (faster, cheaper)
 * - unstyled: Structure only, no CSS styles (fastest, for custom styling)
 */
export type ExportPreset = 'quality' | 'fast' | 'unstyled';
export interface WorkflowSection {
    id: string;
    name: string;
    progress: Progress;
    isGlobal?: boolean;
    variant?: string;
}
/**
 * Export step for design-level or global export progress
 * Progress: 0=pending, 1-99=running, 100=complete, -1=failed
 */
export interface ExportStep {
    id: string;
    label: string;
    progress: Progress;
    message?: string;
    /** Nested sections for steps like global_sections that process multiple items */
    sections?: {
        id: string;
        name: string;
        progress: Progress;
    }[];
}
export interface WorkflowDesign {
    id: string;
    name: string;
    progress: Progress;
    featuredImgUrl?: string;
    sections?: WorkflowSection[];
    steps?: ExportStep[];
}
export interface WorkflowStage {
    stage: Stage;
    progress: Progress;
    message?: string;
    designs?: WorkflowDesign[];
    exportSteps?: ExportStep[];
    /** If true, this is a retry - frontend should allow progress to decrease */
    retry?: boolean;
    /** Estimated remaining time in milliseconds (export stage only) */
    estimatedRemainingMs?: number;
    /** Timestamp when export stage started (for elapsed time calculation) */
    exportStartedAt?: number;
    /** Assembly progress tracking (build stage only) */
    assemblyProgress?: AssemblyProgress;
}
/**
 * Early asset upload progress (runs in background during Stages 2-4)
 * Separate from assemblyProgress because it spans multiple stages
 */
export interface EarlyAssetUploadProgress {
    status: 'pending' | 'running' | 'complete' | 'failed';
    uploaded: number;
    total: number;
}
export interface WorkflowStages {
    projectId: string;
    projectName: string;
    platform: Platform;
    currentStage: number;
    stages: WorkflowStage[];
    /** Early asset upload progress (runs in background during load stage) */
    earlyAssetUpload?: EarlyAssetUploadProgress;
}
export interface WorkflowError {
    stage: Stage;
    message: string;
}
export interface EditorSection {
    id: string;
    name: string;
    html: string;
    css: string;
    js?: string;
    globalId?: string;
}
export interface EditorDesign {
    id: string;
    name: string;
    sections: EditorSection[];
}
export interface EditorGlobal {
    id: string;
    name: string;
    variant: string;
    html: string;
    css?: string;
    js?: string;
}
export interface EditorAsset {
    name: string;
    url: string;
}
export interface WorkflowEditor {
    stylesheet: string;
    globalJS?: string;
    assets: EditorAsset[];
    globals: EditorGlobal[];
    designs: EditorDesign[];
    /** When true, editor is in view-only mode (superadmin viewing past customize stage) */
    readOnly?: boolean;
}
/**
 * Export mode: quick uses defaults, custom allows full configuration
 */
export type ExportMode = 'quick' | 'custom';
/**
 * Custom spacing scale values (rem units)
 * Simplified 5-size scale for clarity
 */
export interface SpacingScale {
    small?: string;
    medium?: string;
    large?: string;
    xlarge?: string;
    xxlarge?: string;
}
/**
 * Stylesheet configuration (part of ExportConfig)
 * Controls CSS generation options
 */
export interface StylesheetConfig {
    /** Style framework to use */
    framework: StyleFramework;
    /** Use rem units for font sizes */
    useRemFontSizes: boolean;
    /** Use unitless line-height values */
    useUnitlessLineHeight: boolean;
    /** Generate spacing utilities (margin-*, padding-*, spacer-*) */
    generateSpacing: boolean;
    /** Generate typography utilities (text-size-*, text-weight-*, heading-style-*, etc.) */
    generateTypography: boolean;
    /** Generate color utilities (text-color-*, background-color-*) */
    generateColors: boolean;
    /** Generate button classes (.button, .button.is-*) */
    generateButtons: boolean;
    /** Generate visibility utilities (hide, hide-tablet, etc.) */
    generateVisibility: boolean;
    /** Generate max-width utilities */
    generateMaxWidth: boolean;
    /** Generate border/radius utilities */
    generateBorders: boolean;
    /** Generate shadow utilities */
    generateShadows: boolean;
    /** Generate icon sizing utilities */
    generateIcons: boolean;
    /** Generate aspect ratio utilities */
    generateAspectRatios: boolean;
    /** Generate overflow utilities */
    generateOverflow: boolean;
    /** Generate z-index utilities */
    generateZIndex: boolean;
    /** Generate pointer-events utilities */
    generatePointerEvents: boolean;
    /** Custom spacing scale (overrides defaults) */
    spacingScale?: SpacingScale;
}
/**
 * Responsive configuration (part of ExportConfig)
 * Controls responsive breakpoint CSS generation
 */
export interface ResponsiveConfig {
    /**
     * Enable responsive styles for Webflow breakpoints:
     * - Desktop: Base styles (default)
     * - Tablet: 991px and below
     * - Mobile Landscape: 767px and below
     * - Mobile Portrait: 478px and below
     */
    enableResponsive: boolean;
}
/**
 * Granular component toggles for interactive elements
 */
export interface ComponentsConfig {
    /** NavbarWrapper, NavbarMenu, NavbarButton, etc. */
    navbar: boolean;
    /** FormWrapper, FormForm, FormTextInput, etc. */
    forms: boolean;
    /** TabsWrapper, TabsMenu, TabsLink, TabsPane */
    tabs: boolean;
    /** SliderWrapper, SliderMask, SliderSlide, SliderArrow */
    sliders: boolean;
    /** Video, BackgroundVideoWrapper */
    videos: boolean;
}
export declare const DEFAULT_COMPONENTS_CONFIG: ComponentsConfig;
/**
 * Interactivity configuration (part of ExportConfig)
 * Controls CSS transitions and hover effects
 */
export interface InteractivityConfig {
    /**
     * Enable CSS transitions and hover effects:
     * - Smooth hover states on buttons, links, cards
     * - CSS transition properties
     * - :hover, :focus, :active state changes
     */
    enableTransitions: boolean;
    /**
     * @deprecated Use `components` instead for granular control
     * Enable interactive components (tabs, sliders, dropdowns, carousels)
     * If false, forces static layouts only - no interactive patterns
     */
    enableInteractiveComponents?: boolean;
    /**
     * Granular control over which interactive component types to enable
     * Each component type can be individually toggled
     */
    components?: ComponentsConfig;
}
/**
 * Image export configuration (part of ExportConfig)
 * Controls image format and maximum dimensions for exported images
 */
export interface ImageConfig {
    /** S3 storage format: 'webp' (default) or 'png' */
    format: 'webp' | 'png';
    /** Max dimension in pixels for exported images */
    maxDimension: number;
}
export declare const DEFAULT_IMAGE_CONFIG: ImageConfig;
export declare const IMAGE_DIMENSION_PRESETS: readonly [{
    readonly label: "Low (1024px)";
    readonly value: 1024;
}, {
    readonly label: "Medium (1280px)";
    readonly value: 1280;
}, {
    readonly label: "Standard (1920px)";
    readonly value: 1920;
}, {
    readonly label: "High (2560px)";
    readonly value: 2560;
}, {
    readonly label: "Ultra (3840px)";
    readonly value: 3840;
}];
/**
 * CSS unit types for unit conversion
 */
export type CSSUnitType = 'px' | 'rem' | 'em' | 'unitless';
/**
 * Units configuration for CSS output
 * Controls how pixel values from Figma are converted to different CSS units
 */
export interface UnitsConfig {
    /** Base font size in pixels for rem/em calculations (default: 16) */
    baseFontSize: number;
    /** Unit for font-size properties */
    fontSize: CSSUnitType;
    /** Unit for line-height (unitless recommended for accessibility) */
    lineHeight: CSSUnitType;
    /** Unit for letter-spacing (em recommended to scale with font) */
    letterSpacing: CSSUnitType;
    /** Unit for margin, padding, gap */
    spacing: CSSUnitType;
    /** Unit for border-radius */
    borderRadius: CSSUnitType;
}
export declare const DEFAULT_UNITS_CONFIG: UnitsConfig;
/** Preset: Scalable units (rem-based, Client-First convention) */
export declare const SCALABLE_UNITS_CONFIG: UnitsConfig;
export type UnitsPreset = 'figma' | 'scalable' | 'custom';
/**
 * Navbar collapse breakpoint options
 */
export type NavbarCollapseBreakpoint = 'medium' | 'small' | 'none';
/**
 * Navbar mobile menu animation style
 */
export type NavbarAnimation = 'default' | 'over-left' | 'over-right';
/**
 * Navbar configuration for mobile menu and dropdown behavior
 */
export interface NavbarConfig {
    /** Breakpoint for mobile menu collapse: medium (991px), small (767px), or none */
    collapseAt: NavbarCollapseBreakpoint;
    /** Mobile menu animation style */
    animation: NavbarAnimation;
    /** Animation duration in milliseconds */
    animationDuration: number;
    /** Dropdown trigger: hover (desktop default) or click only */
    dropdownHover: boolean;
    /** Dropdown hover delay in milliseconds */
    dropdownDelay: number;
}
export declare const DEFAULT_NAVBAR_CONFIG: NavbarConfig;
/**
 * Complete export configuration
 * Sent from frontend to backend during export_config stage
 */
export interface ExportConfig {
    mode: ExportMode;
    stylesheet: StylesheetConfig;
    responsive: ResponsiveConfig;
    interactivity: InteractivityConfig;
    /** Custom AI instructions for guiding design decisions (optional) */
    customInstructions?: string;
    /**
     * Enable AI assistant (planning + auto-fixing phases)
     * When enabled, AI analyzes the design, creates a plan, and auto-fixes visual issues
     * When disabled, skips plan and fixing stages for faster export
     * Default: true (enabled)
     */
    enableAIAssistant?: boolean;
    /**
     * @deprecated Use enableAIAssistant instead
     */
    enablePlanning?: boolean;
    /**
     * Enable CMS collection generation
     * When enabled, AI detects repeating content patterns and generates CMS schemas
     * Webflow-only — skipped for other platforms
     * Default: false (disabled)
     */
    enableCms?: boolean;
    /** Enable Figma design variables export (color variables → Webflow variables) */
    enableVariables?: boolean;
    /** Image export configuration (format + max dimensions) */
    imageConfig?: ImageConfig;
    /** Units configuration for CSS output (px to rem/em conversion) */
    unitsConfig?: UnitsConfig;
    /** Navbar configuration for mobile menu and dropdown behavior */
    navbarConfig?: NavbarConfig;
    /**
     * Webflow-specific configuration
     * When set, synced styles from the Webflow site will be merged with AI-generated styles
     */
    webflow?: {
        /** The Webflow site ID to use for synced styles */
        siteId: string;
        /** Whether to use synced styles from this site (default: true if siteId is set) */
        useSyncedStyles?: boolean;
    };
    /**
     * UpBuilder-specific configuration
     * When set, styles from an existing UpBuilder project will be reused
     */
    upbuilder?: {
        /** The source project ID to reuse styles from */
        projectId: string;
        /** The source design ID (optional, for reference) */
        designId?: string;
        /** Whether to reuse styles from this project (default: true if projectId is set) */
        reuseStyles?: boolean;
    };
    /**
     * AI model for section building and analysis
     * - flash: Gemini Flash (faster, cheaper, good for well-structured designs)
     * - pro: Gemini Pro (more capable, better for complex designs)
     */
    aiModel?: AIModel;
    /**
     * Skip all image analysis features:
     * - Image review (AI scan phase suggestions)
     * - Image deduplication
     * - AI image naming/tagging
     * When true, uses sanitized Figma layer names instead
     */
    skipImageAnalysis?: boolean;
    /**
     * Skip all CSS styling generation (unstyled preset)
     * When true:
     * - Skips build_styles stage entirely
     * - Elements have no className/styles
     * - Skips Puppeteer QA (no styles to validate)
     * - Produces HTML skeleton without CSS
     * Use for custom styling workflows where user adds their own classes
     */
    skipStyling?: boolean;
    /**
     * @deprecated Use aiModel instead
     * Fast Mode - optimized for well-structured Figma files with high auto layout coverage
     * When enabled:
     * - Uses Gemini Flash instead of Pro for all AI calls (faster, cheaper)
     * - Skips AI image naming (uses sanitized Figma node names instead)
     * - Best results when design has ≥85% auto layout coverage
     * Default: false
     */
    fastMode?: boolean;
    /**
     * @deprecated Use skipImageAnalysis instead
     * Skip AI image naming - use sanitized Figma layer names instead of AI descriptions
     * Auto-enabled when fastMode is true, but can be toggled independently
     */
    skipImageTagging?: boolean;
    /**
     * Auto layout coverage percentage (0-100)
     * Calculated by plugin during frame selection
     * Used to determine if fast mode is recommended
     */
    autoLayoutCoverage?: number;
}
/**
 * Default stylesheet configuration
 */
export declare const DEFAULT_STYLESHEET_CONFIG: StylesheetConfig;
/**
 * Default responsive configuration
 */
export declare const DEFAULT_RESPONSIVE_CONFIG: ResponsiveConfig;
/**
 * Default interactivity configuration
 */
export declare const DEFAULT_INTERACTIVITY_CONFIG: InteractivityConfig;
/**
 * Quick mode interactivity
 */
export declare const QUICK_INTERACTIVITY_CONFIG: InteractivityConfig;
/**
 * Quick export config - uses defaults, skips stylesheet review, no animations
 */
export declare const QUICK_EXPORT_CONFIG: ExportConfig;
/**
 * Default export config - custom mode selected by default
 */
export declare const DEFAULT_EXPORT_CONFIG: ExportConfig;
export interface CustomSectionCode {
    html?: string;
    css?: string;
    js?: string;
}
export interface CustomizeData {
    action: 'save' | 'cancel';
    sectionCustomizations?: Record<string, {
        code: CustomSectionCode;
    }>;
}
/** Section info from AI analysis with bounding box for screenshot cropping */
export interface ExportSectionData {
    id: string;
    name: string;
    type: string;
    elementIds: string[];
    bounds?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}
export interface ExportDesignData {
    id: string;
    name: string;
    sections: ExportSectionData[];
    xscpUrl: string;
    /** @deprecated Use WorkflowExportComplete.globalJsUrl instead */
    jsBodyUrl?: string;
    /** @deprecated Use WorkflowExportComplete.globalJs instead */
    jsBody?: string;
    nodeCount: number;
    styleCount: number;
    isLocked?: boolean;
}
/** Custom font info with weights and styles */
export interface CustomFontInfo {
    family: string;
    weights: string[];
    styles: string[];
}
export interface WorkflowExportComplete {
    projectId: string;
    platform: Platform;
    designs: ExportDesignData[];
    isPro?: boolean;
    /** Custom fonts that need to be added to Webflow project before pasting (Webflow only) */
    customFonts?: CustomFontInfo[];
    /** Global JavaScript for entire project (Webflow only) - add to Project Settings > Custom Code */
    globalJs?: string;
    /** S3 URL for global JavaScript file (Webflow only) */
    globalJsUrl?: string;
}
export interface WorkflowCommand {
    projectId: string;
    action: 'start' | 'cancel' | 'next' | 'resume' | 'reprocess_load' | 'reprocess_convert_to_platform' | 'reprocess_customize' | 'reprocess_customize_fast' | 'quick_rebuild' | 'rerun_from_stage';
    retry?: boolean;
    /** Export configuration from export_config stage */
    exportConfig?: ExportConfig;
    /** Stage to rerun from (dev-only, used with rerun_from_stage action) */
    stageToRunFrom?: string;
}
/**
 * Request to save edited code from the customizer
 */
export interface CodeSaveRequest {
    projectId: string;
    changes: CodeChange[];
}
/**
 * A single code change to save
 */
export interface CodeChange {
    /** Type of item being saved */
    type: 'section' | 'globalSection' | 'stylesheet' | 'globalScript';
    /** Section or GlobalSection ID (not needed for stylesheet/globalScript) */
    id?: string;
    /** Design ID (for sections only, used for logging) */
    designId?: string;
    /** The code to save */
    code: {
        html?: string;
        css?: string;
        js?: string;
    };
}
/**
 * Result of a code save operation
 */
export interface CodeSaveResult {
    success: boolean;
    savedCount: number;
    errors?: Array<{
        type: string;
        id?: string;
        message: string;
    }>;
}
export type RenameTargetType = 'design' | 'section' | 'globalSection';
export interface RenameRequest {
    projectId: string;
    type: RenameTargetType;
    id: string;
    name: string;
}
export interface RenameResult {
    success: boolean;
    error?: string;
}
export type BackgroundJobStatus = 'pending' | 'running' | 'complete' | 'failed';
/**
 * Background job progress during export_config stage
 * load runs in background while user configures
 */
export interface WorkflowBackgroundProgress {
    projectId: string;
    load: BackgroundJobStatus;
    /** Number of designs loaded (after load completes) */
    designCount?: number;
    /** Error message if any job failed */
    error?: string;
}
export interface ServerToClientWorkflowEvents {
    'workflow:stage': (data: WorkflowStage) => void;
    'workflow:stages': (data: WorkflowStages) => void;
    'workflow:error': (data: WorkflowError) => void;
    'workflow:editor': (data: WorkflowEditor) => void;
    'workflow:export_complete': (data: WorkflowExportComplete) => void;
    'workflow:renamed': (data: {
        type: RenameTargetType;
        id: string;
        name: string;
    }) => void;
    'workflow:background_progress': (data: WorkflowBackgroundProgress) => void;
}
export interface ClientToServerWorkflowEvents {
    'workflow:command': (data: WorkflowCommand, cb: (ok: boolean, cancelResult?: {
        wasExpansion: boolean;
        restoredVersion: number;
    }) => void) => void;
    'workflow:save_code': (data: CodeSaveRequest, cb: (result: CodeSaveResult) => void) => void;
    'workflow:rename': (data: RenameRequest, cb: (result: RenameResult) => void) => void;
}
/**
 * Design build status with validation step (streamlined workflow)
 * Each design goes through: Build (unified AI) -> XSCP -> Validate
 */
export interface AssemblyDesign {
    id: string;
    name: string;
    /** Build step: unified AI call that outputs styles + structure */
    status: 'pending' | 'running' | 'complete' | 'failed';
    progress: Progress;
    /** Validation step: runs after build completes */
    validation?: {
        status: 'pending' | 'running' | 'complete' | 'failed';
        progress: Progress;
        message?: string;
    };
}
/**
 * Asset upload progress (runs in background during conversion)
 */
export interface AssetUploadProgress {
    status: 'pending' | 'running' | 'complete' | 'failed';
    progress: Progress;
    uploaded: number;
    total: number;
}
/** Build phase for 2-step progress UI */
export type BuildPhase = 'analyzing' | 'building';
/**
 * Assembly progress tracking (streamlined: just designs + asset upload)
 */
export interface AssemblyProgress {
    /** Asset upload runs in background during entire conversion */
    assetUpload?: AssetUploadProgress;
    /** Designs being built (unified build -> XSCP -> validate) */
    designs: AssemblyDesign[];
    /** Current build phase for 3-step progress UI */
    buildPhase?: BuildPhase;
}
/**
 * Assembled design output (result of build stage)
 */
export interface AssembledDesign {
    id: string;
    designId: string;
    name: string;
    html: string;
    css: string;
    js: string;
    sectionCount: number;
    createdAt: string;
}
/**
 * Style definition for build-styles and build-sections output
 * Represents a single CSS class with breakpoint and state variants
 */
export interface StyleDefinition {
    /** Class ID/name (e.g., "padding-global", "button", "abc_hero_grid") */
    id: string;
    /** Combo indicator: "" = base class, "&" = combo modifier */
    comb: '' | '&';
    /** Desktop CSS properties */
    main: string;
    /** Tablet CSS (≤991px) */
    medium?: string;
    /** Mobile portrait CSS (≤478px) */
    tiny?: string;
    /** Hover state CSS */
    hover?: string;
    /** Focus state CSS */
    focus?: string;
    /** Active/pressed state CSS */
    active?: string;
    /** Original Webflow style ID (for synced styles - preserves ID on import) */
    webflowStyleId?: string;
}
/** Inter-section gap analysis for a single gap */
export interface InterSectionGapAnalysis {
    topSectionName: string;
    bottomSectionName: string;
    gapPx: number;
    /** Classification: 'normal', 'touching', 'overlap', 'large_gap' */
    classification: 'normal' | 'touching' | 'overlap' | 'large_gap';
    /** Guidance for the AI on how to handle this gap */
    guidance: string;
}
/** Spacing analysis for a single design */
export interface DesignSpacingAnalysis {
    designId: string;
    designName: string;
    gaps: InterSectionGapAnalysis[];
}
/**
 * Build styles stage state
 * Stores the base style system created before build-sections
 */
export interface BuildStylesState {
    /** All base styles (utilities, typography, buttons, etc.) */
    styles: StyleDefinition[];
    /** Raw AI output for debugging */
    rawOutput: string;
    /** Timestamp when completed */
    completedAt: number;
    /** Pre-computed inter-section spacing analysis for all designs */
    spacingAnalysis?: DesignSpacingAnalysis[];
}
/**
 * Section type classification for bounding
 * Flexible string - AI can use any descriptive type (navbar, hero, cta, pricing, testimonials, etc.)
 */
export type SectionType = string;
/**
 * Global section verdict from plan stage analysis
 * IDENTICAL = same across all designs (reuse one)
 * HAS_VARIANTS = visual differences exist (build each variant once)
 */
export type GlobalVerdict = 'IDENTICAL' | 'HAS_VARIANTS';
/**
 * Bounded section from AI analysis
 * Contains bounding box + section tree from design
 */
export interface BoundedSection {
    id: string;
    name: string;
    type: SectionType;
    bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /**
     * Content-only bounds excluding decorative/overflow elements.
     * Used for spacing analysis and QA height checks where decorative elements
     * (brush strokes, background textures) inflate the full bounding box.
     * Falls back to `bounds` when not set.
     */
    contentBounds?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /**
     * htmlIds of decorative/overflow elements identified by the AI builder.
     * These are excluded from content height calculations.
     */
    decorativeElementIds?: string[];
    /** Figma auto-layout padding on section root frame. Null if not auto-layout. */
    figmaPadding?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    /** Padding measured from child positions (absolute children excluded). */
    measuredPadding?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    elementIds: string[];
    isGlobal: boolean;
    order: number;
    /** Design ID this section belongs to */
    designId: string;
    /** Google File Manager URI for section screenshot (set by section bounding stage) */
    screenshotUri?: string;
    /**
     * Human-readable display name for the section (used in Layers panel and XSCP meta.displayName)
     * Format: Capitalized, concise. For global sections: "Navbar v1", "Footer v2". For non-global: "Hero", "Features".
     */
    displayName?: string;
    /** Global verdict from plan stage (IDENTICAL or HAS_VARIANTS) */
    globalVerdict?: GlobalVerdict;
    /**
     * Variant identifier for HAS_VARIANTS globals
     * e.g., "navbar_light", "navbar_dark", "team_v1", "team_v2"
     * Sections with same variant share one AI call in build_sections
     */
    variant?: string;
    /**
     * List of design IDs where this section (or its variant) is used
     * For IDENTICAL globals: all designs using this exact section
     * For HAS_VARIANTS: all designs using this specific variant
     */
    usedInDesigns?: string[];
    /**
     * If true, this is the "primary" instance that will be analyzed
     * Other sections with same variant will copy from this one
     */
    isPrimaryInstance?: boolean;
    /**
     * Reference to the primary section ID if this is a duplicate
     * Used to copy analysis results after build_sections
     */
    primarySectionId?: string;
    /**
     * True if this navbar's bounds overlap the section below it (typically the hero).
     * When set, the section root needs position: absolute to float over the hero content.
     */
    isOverlayNavbar?: boolean;
    /**
     * Elements from OTHER sections that appear in this section's screenshot crop area.
     * Used to warn build-sections AI to skip these elements — they belong to other sections
     * but are visually present due to overlapping backgrounds or overflow.
     */
    screenshotIntruders?: Array<{
        elementId: string;
        fromSection: string;
        htmlLine: string;
    }>;
}
/**
 * Analysis result for a single section
 */
export interface SectionAnalysis {
    sectionId: string;
    sectionName: string;
    designId: string;
    analysis: {
        layout: string;
        colors: string[];
        typography: string;
        elements: string[];
        suggestedClasses: string[];
    };
    /** Raw AI output in the specified format (STRUCTURE + NEW_STYLES) */
    rawOutput: string;
    /** New styles created by this section (parsed from NEW_STYLES block) */
    newStyles?: StyleDefinition[];
    /** Timestamp when analysis completed */
    completedAt: number;
}
/**
 * Build sections stage state stored in project
 */
export interface BuildSectionsState {
    /** All bounded sections across all designs */
    sections: BoundedSection[];
    /** Completed section analyses */
    analyses: SectionAnalysis[];
    /** All new styles from all sections (merged from each section's newStyles) */
    allNewStyles: StyleDefinition[];
    /** Index of current section being analyzed */
    currentSectionIndex: number;
    /** Whether the build sections stage is complete */
    complete: boolean;
    /** CMS schema generated during section_bounding (for build_sections to consume) */
    cmsSchema?: import('./cms').CMSSchema;
}
export interface BuildSectionsEvents {
    /** Backend → Frontend: Request screenshot for a section */
    'build_sections:request_screenshot': {
        projectId: string;
        sectionId: string;
        bounds: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        designId: string;
        /** S3 URL for the big preview image (for frontend cropping) */
        bigPreviewUrl?: string;
        /** Dimensions of the big preview image */
        bigPreviewDimensions?: {
            width: number;
            height: number;
        };
        /** Original Figma frame dimensions (bounds are relative to this) */
        designDimensions?: {
            width: number;
            height: number;
        };
    };
    /** Frontend → Backend: Screenshot captured */
    'build_sections:screenshot_ready': {
        projectId: string;
        sectionId: string;
        screenshot: string;
    };
    /** Backend → Frontend: AI analysis streaming */
    'build_sections:analysis_stream': {
        projectId: string;
        sectionId: string;
        chunk: string;
        done: boolean;
    };
    /** Backend → Frontend: Section analysis complete */
    'build_sections:section_complete': {
        projectId: string;
        sectionId: string;
        analysis: SectionAnalysis;
    };
    /** Backend → Frontend: All sections analyzed */
    'build_sections:all_complete': {
        projectId: string;
        sections: SectionAnalysis[];
    };
}
export interface SectionBoundingEvents {
    'section_bounding:start': {
        projectId: string;
    };
    'section_bounding:progress': {
        projectId: string;
        percent: number;
        message: string;
    };
    'section_bounding:result': {
        projectId: string;
        sections: BoundedSection[];
    };
    'section_bounding:error': {
        projectId: string;
        error: string;
    };
}
export interface AssemblyEvents {
    'assembly:start': {
        projectId: string;
    };
    'assembly:progress': {
        projectId: string;
        percent: number;
        message: string;
    };
    'assembly:stream': {
        projectId: string;
        chunk: string;
        done: boolean;
    };
    'assembly:complete': {
        projectId: string;
        /** Structure blocks per design (D1, D2, etc.) */
        structures: Record<string, string>;
        /** Combined ALL_STYLES */
        styles: string;
    };
    'assembly:error': {
        projectId: string;
        error: string;
    };
}
/**
 * Per-design progress for AI image analysis during pre-export scan
 */
export interface AIAnalysisDesignProgress {
    designId: string;
    designName: string;
    status: 'pending' | 'analyzing' | 'complete' | 'failed';
    /** Number of graphics detected that need review */
    detectionCount?: number;
}
/**
 * Full AI analysis progress state
 */
export interface AIAnalysisProgress {
    totalDesigns: number;
    completedDesigns: number;
    designs: AIAnalysisDesignProgress[];
}
/**
 * Socket event payload for AI analysis progress updates
 */
export interface AIAnalysisProgressEvent {
    projectId: string;
    designId: string;
    designName: string;
    status: 'pending' | 'analyzing' | 'complete' | 'failed';
    detectionCount?: number;
}
export declare const isPending: (p: Progress) => boolean;
export declare const isRunning: (p: Progress) => boolean;
export declare const isComplete: (p: Progress) => boolean;
export declare const isFailed: (p: Progress) => boolean;
export declare const STAGE_ORDER: Stage[];
export declare const STAGE_LABELS: Record<Stage, string>;
/**
 * Get the stage order for a specific platform
 * Currently all platforms use the same stage order
 */
export declare function getStageOrderForPlatform(_platform: string): Stage[];
/**
 * Types of tier limit violations
 */
export type TierViolationType = 'export_limit' | 'design_limit' | 'quality_mode' | 'ai_image_detection';
/**
 * A single tier limit violation
 */
export interface TierViolation {
    type: TierViolationType;
    message: string;
    currentValue: number | boolean;
    allowedValue: number | boolean;
    /** If true, user can continue with automatic downgrade */
    canContinueWithDowngrade: boolean;
    /** Description of the downgrade action (e.g., "Continue with Fast mode") */
    downgradeAction?: string;
}
/**
 * Result of tier validation check
 */
export interface TierValidationResult {
    valid: boolean;
    violations: TierViolation[];
    usage: {
        exportsThisMonth: number;
        exportsLimit: number;
        exportsRemaining: number;
        resetsAt: string;
    };
}
/**
 * Extended workflow start request with tier validation support
 */
export interface WorkflowStartWithValidation {
    projectId: string;
    exportConfig?: ExportConfig;
    /** If true, automatically apply downgrades for soft violations */
    forceDowngrade?: boolean;
}
/**
 * Response from workflow start with validation
 */
export interface WorkflowStartValidationResponse {
    success: boolean;
    error?: string;
    /** True if validation failed and user must choose an action */
    requiresValidation?: boolean;
    /** True if user must upgrade (hard block like export limit) */
    requiresUpgrade?: boolean;
    /** Validation details when requiresValidation is true */
    validation?: TierValidationResult;
}
//# sourceMappingURL=workflow.d.ts.map