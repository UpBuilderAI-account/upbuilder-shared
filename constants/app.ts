// ============================================================================
// APPLICATION CONSTANTS
// General config, defaults, and limits shared across Frontend, Backend, Plugin
// ============================================================================
// This file consolidates:
// - auth.ts: Authentication constants
// - platform.ts: Platform and framework defaults
// - network.ts: CDN URLs and placeholders
// - validation.ts: File size limits and MIME types
// - ui.ts: CSS validation limits and Webflow defaults
// ============================================================================

// ============================================================================
// AUTHENTICATION
// ============================================================================

/**
 * Fixed user ID for guest/anonymous users
 * Used consistently across all systems for unauthenticated access
 * Must be a valid UUID format for PostgreSQL compatibility
 */
export const GUEST_USER_ID = '00000000-0000-0000-0000-000000000000';

// ============================================================================
// PLATFORM & FRAMEWORK DEFAULTS
// ============================================================================

/**
 * Default export platform
 */
export const DEFAULT_PLATFORM = 'webflow';

/**
 * Default style framework
 */
export const DEFAULT_STYLE_FRAMEWORK = 'client-first';

/**
 * Default breakpoint values (in pixels)
 */
export const DEFAULT_BREAKPOINTS = {
  tablet: 991,
  mobileLandscape: 767,
  mobilePortrait: 479,
} as const;

// ============================================================================
// NETWORK
// ============================================================================

// ============================================================================
// FILE SIZE LIMITS
// ============================================================================

/**
 * JSON/URL-encoded payload limit (30MB)
 */
export const HTTP_PAYLOAD_LIMIT_MB = 30;

/**
 * WebSocket buffer size (50MB)
 */
export const WEBSOCKET_BUFFER_SIZE_MB = 50;

// ============================================================================
// MIME TYPES
// ============================================================================

/**
 * Content type mappings for file uploads and S3
 */
export const CONTENT_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.txt': 'text/plain',
  '.pdf': 'application/pdf',
  '.zip': 'application/zip',
  default: 'application/octet-stream',
} as const;

/**
 * Image file extensions (lowercase with dot)
 * Used for file type detection across frontend and backend
 */
export const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'] as const;

/**
 * Check if a filename has an image extension
 */
export function isImageFile(filename: string): boolean {
  const ext = filename.toLowerCase().slice(filename.lastIndexOf('.'));
  return IMAGE_EXTENSIONS.includes(ext as typeof IMAGE_EXTENSIONS[number]);
}

// ============================================================================
// PROCESSING LIMITS
// ============================================================================

/**
 * Maximum designs to process in parallel during export
 * Was 4, now 2 for better resource management
 */
export const MAX_PARALLEL_DESIGNS = 2;

/**
 * Maximum number of nodes allowed per export
 * Enforced in both plugin UI and backend
 */
export const MAX_NODES = 5000;

/**
 * Maximum number of images allowed per export
 * Enforced in both plugin UI and backend
 */
export const MAX_IMAGES = 2000;

/**
 * Maximum image dimension (width or height) in pixels
 */
export const MAX_IMAGE_DIMENSION = {
  free: 1920,
  pro: 7680,
} as const;

/**
 * Processing limits grouped by tier
 * Currently free and pro have same node/image limits
 */
export const PROCESSING_LIMITS = {
  free: {
    maxNodes: MAX_NODES,
    maxImages: MAX_IMAGES,
    maxDimension: MAX_IMAGE_DIMENSION.free,
  },
  pro: {
    maxNodes: MAX_NODES,
    maxImages: MAX_IMAGES,
    maxDimension: MAX_IMAGE_DIMENSION.pro,
  },
} as const;

// ============================================================================
// HIERARCHY DEPTH LIMITS
// ============================================================================

/**
 * Depth thresholds for progressive complexity checks
 * Controls when nodes get vectorized (converted to images) based on nesting depth
 *
 * - HARD_LIMIT (25): Absolute max - force vectorization, no exceptions
 * - VERY_DEEP (15): Aggressive vectorization for deeply nested content
 * - DEEP (8): Moderate vectorization for typical UI depth
 * - ERROR_RECOVERY (12): Threshold for error recovery scenarios
 */
export const DEPTH_LIMITS = {
  HARD_LIMIT: 25,
  VERY_DEEP: 15,
  DEEP: 8,
  ERROR_RECOVERY: 12,
} as const;

// ============================================================================
// COMPLEXITY THRESHOLDS
// ============================================================================

/**
 * Thresholds for determining when to vectorize complex nodes
 *
 * - VERY_DEEP_MIN_DESCENDANTS: Min descendants at level 15+ to trigger vectorization
 * - DEEP_MIN_DESCENDANTS: Min descendants at level 8+ to trigger vectorization
 * - COMPLEX_MIN_DESCENDANTS: Min descendants for complexity scoring
 * - MASK_PERCENTAGE_THRESHOLD: % of masked elements that triggers vectorization
 * - IMAGE_HEAVY_PERCENTAGE: % of image-heavy nodes that triggers vectorization
 * - BASE_COMPLEXITY_SCORE: Base threshold for complexity scoring
 */
export const COMPLEXITY_THRESHOLDS = {
  VERY_DEEP_MIN_DESCENDANTS: 3,
  DEEP_MIN_DESCENDANTS: 10,
  COMPLEX_MIN_DESCENDANTS: 15,
  MASK_PERCENTAGE_THRESHOLD: 70,
  IMAGE_HEAVY_PERCENTAGE: 70,
  BASE_COMPLEXITY_SCORE: 100,
} as const;

/**
 * Node types that are considered "image-heavy" and may trigger vectorization
 * These types typically require rasterization for accurate rendering
 */
export const IMAGE_HEAVY_TYPES = [
  'VECTOR',
  'RECTANGLE',
  'ELLIPSE',
  'STAR',
  'POLYGON',
  'BOOLEAN_OPERATION',
] as const;

/**
 * Words that indicate a CONTAINER/COLLECTION - should NOT vectorize
 * If the name contains any of these words, skip vectorization even if it matches a pattern
 *
 * This prevents false positives like:
 * - "logo grid" (container of logos)
 * - "icon gallery" (container of icons)
 * - "avatar list" (container of avatars)
 */
export const VECTORIZE_EXCLUSION_WORDS = [
  // ===========================================================================
  // LAYOUT CONTAINERS
  // ===========================================================================
  'grid', 'grids',
  'gallery', 'galleries',
  'list', 'lists', 'listing', 'listings',
  'row', 'rows',
  'column', 'columns', 'col', 'cols',
  'wrapper', 'wrappers', 'wrap',
  'container', 'containers',
  'section', 'sections',
  'stack', 'stacks',
  'flex', 'flexbox',
  'layout', 'layouts',
  'box', 'boxes',

  // ===========================================================================
  // COLLECTION/MULTIPLE ITEMS
  // ===========================================================================
  'collection', 'collections',
  'set', 'sets',
  'pack', 'packs',
  'bundle', 'bundles',
  'kit', 'kits',
  'library', 'libraries',
  'all',
  'multiple',
  'many',
  'array',
  'batch',

  // ===========================================================================
  // CAROUSEL/SLIDER CONTAINERS
  // ===========================================================================
  'carousel', 'carousels',
  'slider', 'sliders',
  'slideshow', 'slideshows',
  'swiper',
  'marquee',

  // ===========================================================================
  // NAVIGATION CONTAINERS
  // ===========================================================================
  'nav', 'navbar', 'navigation',
  'menu', 'menus',
  'sidebar', 'sidebars',
  'header', 'headers',
  'footer', 'footers',
  'toolbar', 'toolbars',
  'tabbar', 'tabs',
  'breadcrumb', 'breadcrumbs',
  'pagination',

  // ===========================================================================
  // CARD/ITEM CONTAINERS (PLURALS ONLY)
  // ===========================================================================
  'cards',
  'items',
  'tiles',
  'blocks',
  'panels',
  'widgets',
  'entries',
  'elements',

  // ===========================================================================
  // CONTENT AREAS
  // ===========================================================================
  'content', 'contents',
  'area', 'areas',
  'zone', 'zones',
  'region', 'regions',
  'body',
  'main',
  'page', 'pages',
  'view', 'views',
  'screen', 'screens',

  // ===========================================================================
  // FORM CONTAINERS
  // ===========================================================================
  'form', 'forms',
  'fieldset', 'fieldsets',
  'inputs',
  'fields',

  // ===========================================================================
  // TABLE CONTAINERS
  // ===========================================================================
  'table', 'tables',
  'thead', 'tbody', 'tfoot',
  'tr', 'td', 'th',
  'datagrid',
  'datatable',

  // ===========================================================================
  // MODAL/OVERLAY CONTAINERS
  // ===========================================================================
  'modal', 'modals',
  'popup', 'popups',
  'dialog', 'dialogs',
  'drawer', 'drawers',
  'dropdown', 'dropdowns',
  'tooltip', 'tooltips',
  'popover', 'popovers',
  'sheet', 'sheets',

  // ===========================================================================
  // FIGMA-SPECIFIC CONTAINERS
  // ===========================================================================
  'frame', 'frames',
  'artboard', 'artboards',
  'component-set',
  'variant', 'variants',
  'instance', 'instances',
  'auto-layout',
  'constraints',

  // ===========================================================================
  // REPEATER/LOOP PATTERNS
  // ===========================================================================
  'repeater', 'repeaters',
  'loop', 'loops',
  'foreach',
  'map',
  'iterator',
] as const;

/**
 * Name patterns for SINGULAR vector/image elements (case-insensitive)
 * These are matched as WHOLE WORDS using word boundary detection
 *
 * IMPORTANT:
 * - Only include SINGULAR forms (not plurals like "icons", "logos")
 * - Matching uses word boundaries: start/end, space, dash, underscore
 * - Patterns ending with '-' are treated as prefixes (icon library prefixes)
 *
 * Examples of matching behavior:
 * - "logo" matches: "logo", "company-logo", "logo_main", "Logo"
 * - "logo" does NOT match: "logos", "logo-grid", "logo gallery"
 * - "icon" matches: "icon", "close-icon", "icon_home"
 * - "icon" does NOT match: "icons", "icon-list", "icon row"
 */
export const VECTORIZE_NAME_PATTERNS = [
  // ===========================================================================
  // ICONS & LOGOS (SINGULAR ONLY)
  // ===========================================================================
  'icon',
  'ico',
  'logo',
  'logotype',
  'logomark',
  'wordmark',
  'symbol',
  'glyph',
  'emblem',
  'badge',
  'favicon',
  'appicon',
  'app-icon',
  'brandmark',
  'monogram',

  // ===========================================================================
  // GRAPHICS & ILLUSTRATIONS (SINGULAR)
  // ===========================================================================
  'graphic',
  'illustration',
  'illo',
  'artwork',
  'visual',
  'asset',
  'vector',
  'svg',
  'sprite',
  'clipart',
  'clip-art',
  'drawing',
  'sketch',
  'doodle',
  'scribble',

  // ===========================================================================
  // IMAGES & PHOTOS (SINGULAR)
  // ===========================================================================
  'image',
  'img',
  'picture',
  'pic',
  'photo',
  'photograph',
  'thumbnail',
  'thumb',
  'preview',
  'snapshot',
  'screenshot',
  'screencap',
  'capture',

  // ===========================================================================
  // DECORATIVE ELEMENTS (SINGULAR)
  // ===========================================================================
  'decoration',
  'decor',
  'ornament',
  'pattern',
  'flourish',
  'swirl',
  'curl',
  'divider',
  'separator',
  'spacer',
  'accent',
  'motif',
  'flair',
  'embellishment',
  'filigree',
  'border-graphic',
  'corner',
  'frame-decoration',

  // ===========================================================================
  // SHAPES & GEOMETRY (SINGULAR)
  // ===========================================================================
  'shape',
  'blob',
  'wave',
  'curve',
  'circle',
  'ring',
  'oval',
  'ellipse',
  'sphere',
  'square',
  'rectangle',
  'rect',
  'triangle',
  'diamond',
  'hexagon',
  'hex',
  'octagon',
  'polygon',
  'arrow',
  'arrowhead',
  'chevron',
  'caret',
  'star',
  'starfield',
  'asterisk',
  'sparkle',
  'burst',
  'heart',
  'cross',
  'plus',
  'minus',
  'x-mark',
  'line',
  'stroke',
  'dash',
  'dotted-line',
  'dot',
  'point',
  'bullet',
  'pip',
  'gradient-shape',
  'abstract',
  'geometric',

  // ===========================================================================
  // MASKS & EFFECTS (SINGULAR)
  // ===========================================================================
  'mask',
  'masked',
  'masking',
  'clip',
  'clipped',
  'clipping',
  'overlay',
  'blend',
  'gradient-overlay',
  'color-overlay',
  'shadow-shape',
  'glow',
  'blur-shape',
  'noise',
  'grain',
  'texture',

  // ===========================================================================
  // BACKGROUNDS (COMPOUND - SPECIFIC)
  // ===========================================================================
  'bg-graphic',
  'bg-shape',
  'bg-pattern',
  'bg-image',
  'bg-art',
  'bg-element',
  'backdrop',
  'background-art',
  'background-graphic',
  'background-shape',
  'background-element',
  'background-decoration',
  'hero-bg',
  'hero-image',
  'hero-graphic',
  'hero-art',
  'hero-visual',
  'section-bg',
  'footer-bg',
  'header-bg',
  'sidebar-bg',

  // ===========================================================================
  // NAVIGATION & UI CONTROLS (SINGULAR - SPECIFIC ICONS)
  // ===========================================================================
  'hamburger',
  'burger-menu',
  'menu-icon',
  'menu-toggle',
  'nav-icon',
  'close-icon',
  'close-btn',
  'x-icon',
  'x-button',
  'dismiss',
  'back-icon',
  'back-arrow',
  'next-icon',
  'next-arrow',
  'dropdown-icon',
  'dropdown-arrow',
  'select-arrow',
  'accordion-icon',
  'breadcrumb-separator',
  'pagination-dot',
  'stepper-icon',
  'tab-indicator',
  'scroll-indicator',
  'scroll-arrow',
  'scroll-to-top',
  'slider-handle',
  'slider-thumb',
  'range-thumb',
  'progress-indicator',
  'switch-toggle',
  'switch-thumb',
  'toggle-knob',

  // ===========================================================================
  // MEDIA CONTROLS (SINGULAR)
  // ===========================================================================
  'play-icon',
  'play-button',
  'pause-icon',
  'stop-icon',
  'volume-icon',
  'mute-icon',
  'fullscreen-icon',
  'settings-gear',

  // ===========================================================================
  // ACTION ICONS (SINGULAR - WITH -icon SUFFIX PREFERRED)
  // ===========================================================================
  'edit-icon',
  'pencil',
  'pen',
  'delete-icon',
  'trash-icon',
  'trash',
  'bin',
  'add-icon',
  'plus-icon',
  'copy-icon',
  'clipboard',
  'scissors',
  'save-icon',
  'floppy',
  'disk',
  'print-icon',
  'printer',
  'download-icon',
  'export-icon',
  'upload-icon',
  'import-icon',
  'share-icon',
  'link-icon',
  'chain',
  'external-link',
  'refresh-icon',
  'reload',
  'sync',
  'undo-icon',
  'redo-icon',
  'search-icon',
  'magnify',
  'filter-icon',
  'funnel',
  'sort-icon',
  'more-icon',
  'kebab',
  'meatball',
  'pin-icon',
  'paperclip',

  // ===========================================================================
  // E-COMMERCE (SINGULAR ICONS)
  // ===========================================================================
  'cart-icon',
  'shopping-cart',
  'basket',
  'shopping-bag',
  'wishlist-icon',
  'heart-icon',
  'bookmark',
  'price-tag',
  'gift-icon',
  'truck',
  'package',
  'barcode',
  'qr-code',

  // ===========================================================================
  // COMMUNICATION (SINGULAR ICONS)
  // ===========================================================================
  'email-icon',
  'mail-icon',
  'envelope',
  'message-icon',
  'chat-icon',
  'speech-bubble',
  'comment-icon',
  'phone-icon',
  'telephone',
  'video-icon',
  'camera',
  'webcam',
  'notification-icon',
  'bell-icon',
  'alert-bell',
  'megaphone',
  'bullhorn',
  'microphone',
  'mic',

  // ===========================================================================
  // USER & PROFILE (SINGULAR)
  // ===========================================================================
  'user-icon',
  'avatar',
  'placeholder-avatar',
  'default-avatar',
  'profile-icon',
  'profile-pic',
  'account-icon',
  'team-icon',
  'group-icon',
  'id-card',

  // ===========================================================================
  // STATUS & STATES (SINGULAR ICONS)
  // ===========================================================================
  'success-icon',
  'checkmark',
  'tick',
  'error-icon',
  'warning-icon',
  'info-icon',
  'question-icon',
  'help-icon',
  'alert-icon',
  'spinner',
  'loader',
  'progress-spinner',
  'circular-progress',

  // ===========================================================================
  // SECURITY (SINGULAR)
  // ===========================================================================
  'lock-icon',
  'padlock',
  'key-icon',
  'keyhole',
  'shield-icon',
  'fingerprint',
  'eye',
  'eye-off',

  // ===========================================================================
  // FILES & DOCUMENTS (SINGULAR ICONS)
  // ===========================================================================
  'file-icon',
  'document',
  'folder-icon',
  'pdf-icon',

  // ===========================================================================
  // LOCATION & MAPS (SINGULAR)
  // ===========================================================================
  'map-pin',
  'location-pin',
  'marker',
  'map-marker',
  'map-icon',
  'globe',
  'earth',
  'compass',
  'compass-icon',
  'location-icon',

  // ===========================================================================
  // TIME & DATE (SINGULAR ICONS)
  // ===========================================================================
  'clock-icon',
  'watch',
  'stopwatch',
  'timer-icon',
  'calendar-icon',
  'alarm-icon',

  // ===========================================================================
  // WEATHER (SINGULAR ICONS)
  // ===========================================================================
  'weather-icon',
  'sun-icon',
  'moon-icon',
  'cloud-icon',
  'rain-icon',
  'snow-icon',
  'snowflake',
  'lightning',
  'bolt',
  'thermometer',

  // ===========================================================================
  // FINANCE (SINGULAR ICONS)
  // ===========================================================================
  'dollar-icon',
  'money',
  'coin',
  'wallet-icon',
  'credit-card',
  'bank-icon',
  'piggy-bank',

  // ===========================================================================
  // TECHNOLOGY (SINGULAR ICONS)
  // ===========================================================================
  'code-icon',
  'terminal-icon',
  'api-icon',
  'database-icon',
  'server-icon',
  'wifi-icon',
  'bluetooth-icon',
  'chip',
  'cpu',
  'usb',
  'power-icon',
  'battery',
  'plug',
  'lightning-bolt',

  // ===========================================================================
  // SOCIAL MEDIA (SINGULAR - BRAND ICONS)
  // ===========================================================================
  'social-icon',
  'facebook',
  'fb',
  'twitter',
  'x-twitter',
  'instagram',
  'ig',
  'linkedin',
  'youtube',
  'tiktok',
  'pinterest',
  'snapchat',
  'reddit',
  'discord',
  'slack',
  'whatsapp',
  'telegram',
  'github',
  'dribbble',
  'behance',
  'spotify',

  // ===========================================================================
  // ICON LIBRARY PREFIXES (MATCH AS PREFIX)
  // These patterns end with '-' and are matched at start of name
  // ===========================================================================
  'fa-', 'fas-', 'far-', 'fab-', 'fal-', 'fad-',  // Font Awesome
  'mdi-', 'md-',                                   // Material Design Icons
  'feather-', 'fe-',                               // Feather Icons
  'heroicon-', 'hero-',                            // Heroicons
  'lucide-', 'lu-',                                // Lucide Icons
  'ri-',                                           // Remix Icons
  'bi-',                                           // Bootstrap Icons
  'ion-', 'ionic-',                                // Ionicons
  'tabler-', 'ti-',                                // Tabler Icons
  'phosphor-', 'ph-',                              // Phosphor Icons
  'radix-',                                        // Radix Icons
  'ant-', 'antd-',                                 // Ant Design Icons
  'eva-',                                          // Eva Icons
  'octicon-', 'octo-',                             // Octicons (GitHub)
  'boxicon-', 'bx-',                               // Boxicons
  'iconoir-',                                      // Iconoir
  'simple-', 'si-',                                // Simple Icons
  'carbon-',                                       // Carbon Icons (IBM)
  'fluent-',                                       // Fluent Icons (Microsoft)
  'clarity-',                                      // Clarity Icons (VMware)
  'prime-', 'pi-',                                 // PrimeIcons
  'jam-',                                          // Jam Icons
  'css-', 'cssgg-',                                // css.gg Icons
  'akar-',                                         // Akar Icons
  'iconify-',                                      // Iconify
  'uil-', 'uis-', 'uim-',                          // Unicons

  // ===========================================================================
  // STYLE PREFIXES (COMPOUND WITH DASH - MATCH AS PREFIX)
  // ===========================================================================
  'isometric-',
  'iso-',
  '3d-',
  'flat-',
  'outline-',
  'filled-',
  'solid-',
  'duotone-',
  'linear-',
  'light-',
  'regular-',
  'bold-',
  'thin-',
  'geo-',

  // ===========================================================================
  // MISCELLANEOUS (SINGULAR)
  // ===========================================================================
  'headshot',
  'mugshot',
  'stamp',
  'seal',
  'watermark',
  'qrcode',
  'signature',
  'autograph',
  'emoji',
  'emoticon',
  'smiley',
  'sticker',
  'ribbon',
  'banner-ribbon',
  'corner-ribbon',
  'confetti',
  'firework',
  'balloon',
  'trophy',
  'medal',
  'award',
  'prize',
  'crown',
  'certificate',
  'diploma',
  'cursor',
  'pointer',
  'drag-handle',
  'resize-handle',
  'grip-lines',
  'placeholder',
  'skeleton',
  'shimmer',
  'ghost',
  'pie-chart',
  'bar-chart',
  'line-chart',
  'donut',
  'ticket',
  'voucher',
  'key-visual',
  'kv',
  'mascot',
  'character',
  'figure',

  // ===========================================================================
  // FIGMA-SPECIFIC (HELPER LAYERS - SPECIAL PATTERNS)
  // ===========================================================================
  '_',        // underscore prefix (hidden/helper layers)
  '::',       // double colon (pseudo elements)
] as const;

// ============================================================================
// SCATTERED PATTERN DETECTION
// ============================================================================

/**
 * Thresholds for detecting scattered decorative patterns
 * Triggers vectorization when many small/rotated elements are found
 *
 * Common patterns this catches:
 * - Confetti/particle effects
 * - Scattered decorative dots/shapes
 * - Rotated icon patterns
 * - Abstract decorative backgrounds
 * - Floating elements with rotations
 */
export const SCATTERED_PATTERN_THRESHOLDS = {
  /** Minimum number of children to consider as a pattern */
  MIN_CHILDREN: 3,

  /** Maximum size (px) for an element to be considered "small" */
  SMALL_SIZE_PX: 64,

  /** % of small elements needed (with rotation) to trigger vectorization */
  SMALL_PERCENTAGE: 50,

  /** % of rotated elements needed (with small) to trigger vectorization */
  ROTATED_PERCENTAGE: 20,

  /** % of small elements alone that triggers vectorization */
  MANY_SMALL_PERCENTAGE: 70,

  /** % of rotated elements alone that triggers vectorization */
  MANY_ROTATED_PERCENTAGE: 40,

  /** Maximum size (px) for an element to be considered "medium" */
  MEDIUM_SIZE_PX: 128,

  /** % of medium-or-smaller elements that suggests decorative pattern */
  MEDIUM_OR_SMALL_PERCENTAGE: 60,
} as const;

// ============================================================================
// OVERLAPPING ELEMENTS DETECTION
// ============================================================================

/**
 * Thresholds for detecting overlapping/stacked decorative elements
 * Triggers vectorization when many elements significantly overlap
 *
 * Common patterns this catches:
 * - Composed vector graphics
 * - Layered decorative effects
 * - Stacked shape compositions
 * - Complex icon assemblies
 */
export const OVERLAPPING_THRESHOLDS = {
  /** Minimum number of children to check for overlapping */
  MIN_CHILDREN: 3,

  /** Minimum overlap area percentage to consider elements as overlapping */
  OVERLAP_AREA_PERCENTAGE: 50,

  /** % of children that must overlap with at least one sibling to trigger */
  OVERLAPPING_CHILDREN_PERCENTAGE: 60,
} as const;

// ============================================================================
// THIN LINE DETECTION
// ============================================================================

/**
 * Thresholds for detecting thin decorative lines/dividers
 * Triggers vectorization when many thin elements are found
 *
 * Common patterns this catches:
 * - Decorative dividers and separators
 * - Line-based patterns and grids
 * - Border decorations
 * - Underlines and strikethroughs
 */
export const THIN_LINE_THRESHOLDS = {
  /** Minimum number of children to check */
  MIN_CHILDREN: 2,

  /** Aspect ratio threshold (width/height or height/width > this = thin) */
  ASPECT_RATIO_THRESHOLD: 8,

  /** Maximum thickness in px for a line to be considered "thin" */
  MAX_THICKNESS_PX: 8,

  /** % of thin line elements that triggers vectorization */
  THIN_LINE_PERCENTAGE: 50,
} as const;

// ============================================================================
// LOW OPACITY DETECTION
// ============================================================================

/**
 * Thresholds for detecting low-opacity decorative groups
 * Triggers vectorization when many elements have reduced opacity
 *
 * Common patterns this catches:
 * - Overlay effects and fades
 * - Watermarks and background decorations
 * - Ghost elements and placeholders
 * - Layered transparency effects
 */
export const LOW_OPACITY_THRESHOLDS = {
  /** Minimum number of children to check */
  MIN_CHILDREN: 3,

  /** Opacity threshold below which element is considered "low opacity" */
  LOW_OPACITY_VALUE: 0.8,

  /** % of low-opacity elements that triggers vectorization */
  LOW_OPACITY_PERCENTAGE: 60,
} as const;

// ============================================================================
// DEFAULT/UNNAMED ELEMENT DETECTION
// ============================================================================

/**
 * Default Figma element names for SHAPE PRIMITIVES only (English and Spanish)
 *
 * IMPORTANT: This list should ONLY include primitive shape types, NOT containers!
 * - DO include: rectangle, ellipse, line, polygon, star, vector (shapes)
 * - DO NOT include: frame, group, component, instance (containers that often hold real content)
 *
 * The rationale is: if a container has many children with default SHAPE names
 * (like "Rectangle 1", "Ellipse 2"), it's likely decorative graphics.
 * But containers named "Frame 1", "Frame 2" often contain real content (logos, cards, etc.)
 *
 * Matches patterns like "Rectangle", "Rectangle 1", "Rectangulo 45", etc.
 */
export const DEFAULT_ELEMENT_NAMES = [
  // ===========================================================================
  // ENGLISH - Figma default SHAPE names (NOT containers)
  // ===========================================================================
  'rectangle', 'ellipse', 'line', 'polygon', 'star', 'vector',
  'union', 'subtract', 'intersect', 'exclude', // boolean operations (shape results)

  // ===========================================================================
  // SPANISH - Figma default SHAPE names (Espanol)
  // ===========================================================================
  'rectangulo',
  'elipse',
  'linea',
  'poligono',
  'estrella',
  'vector', // same in Spanish
  'union', // boolean: union
  'resta', 'sustraccion', // boolean: subtract
  'interseccion', // boolean: intersect
  'exclusion', // boolean: exclude
] as const;

/**
 * Thresholds for default/unnamed element detection
 * Triggers vectorization when many children have auto-generated names
 */
export const DEFAULT_NAME_THRESHOLDS = {
  /** Minimum number of children to check */
  MIN_CHILDREN: 3,

  /** % of children with default names that triggers vectorization */
  DEFAULT_NAME_PERCENTAGE: 70,
} as const;
