/**
 * Fixed user ID for guest/anonymous users
 * Used consistently across all systems for unauthenticated access
 */
export declare const GUEST_USER_ID = "guest-user-fixed-id";
/**
 * Default export platform
 */
export declare const DEFAULT_PLATFORM = "webflow";
/**
 * Default style framework
 */
export declare const DEFAULT_STYLE_FRAMEWORK = "client-first";
/**
 * Default breakpoint values (in pixels)
 */
export declare const DEFAULT_BREAKPOINTS: {
    readonly tablet: 991;
    readonly mobileLandscape: 767;
    readonly mobilePortrait: 479;
};
/**
 * JSON/URL-encoded payload limit (30MB)
 */
export declare const HTTP_PAYLOAD_LIMIT_MB = 30;
/**
 * WebSocket buffer size (50MB)
 */
export declare const WEBSOCKET_BUFFER_SIZE_MB = 50;
/**
 * Content type mappings for file uploads and S3
 */
export declare const CONTENT_TYPES: {
    readonly '.html': "text/html";
    readonly '.css': "text/css";
    readonly '.js': "application/javascript";
    readonly '.json': "application/json";
    readonly '.png': "image/png";
    readonly '.jpg': "image/jpeg";
    readonly '.jpeg': "image/jpeg";
    readonly '.gif': "image/gif";
    readonly '.svg': "image/svg+xml";
    readonly '.webp': "image/webp";
    readonly '.txt': "text/plain";
    readonly '.pdf': "application/pdf";
    readonly '.zip': "application/zip";
    readonly default: "application/octet-stream";
};
/**
 * Image file extensions (lowercase with dot)
 * Used for file type detection across frontend and backend
 */
export declare const IMAGE_EXTENSIONS: readonly [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"];
/**
 * Check if a filename has an image extension
 */
export declare function isImageFile(filename: string): boolean;
/**
 * Maximum designs to process in parallel during export
 * Was 4, now 2 for better resource management
 */
export declare const MAX_PARALLEL_DESIGNS = 2;
/**
 * Maximum number of nodes allowed per export
 * Enforced in both plugin UI and backend
 */
export declare const MAX_NODES = 5000;
/**
 * Maximum number of images allowed per export
 * Enforced in both plugin UI and backend
 */
export declare const MAX_IMAGES = 2000;
/**
 * Maximum image dimension (width or height) in pixels
 */
export declare const MAX_IMAGE_DIMENSION: {
    readonly free: 1920;
    readonly pro: 7680;
};
/**
 * Processing limits grouped by tier
 * Currently free and pro have same node/image limits
 */
export declare const PROCESSING_LIMITS: {
    readonly free: {
        readonly maxNodes: 5000;
        readonly maxImages: 2000;
        readonly maxDimension: 1920;
    };
    readonly pro: {
        readonly maxNodes: 5000;
        readonly maxImages: 2000;
        readonly maxDimension: 7680;
    };
};
/**
 * Depth thresholds for progressive complexity checks
 * Controls when nodes get vectorized (converted to images) based on nesting depth
 *
 * - HARD_LIMIT (25): Absolute max - force vectorization, no exceptions
 * - VERY_DEEP (15): Aggressive vectorization for deeply nested content
 * - DEEP (8): Moderate vectorization for typical UI depth
 * - ERROR_RECOVERY (12): Threshold for error recovery scenarios
 */
export declare const DEPTH_LIMITS: {
    readonly HARD_LIMIT: 25;
    readonly VERY_DEEP: 15;
    readonly DEEP: 8;
    readonly ERROR_RECOVERY: 12;
};
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
export declare const COMPLEXITY_THRESHOLDS: {
    readonly VERY_DEEP_MIN_DESCENDANTS: 3;
    readonly DEEP_MIN_DESCENDANTS: 10;
    readonly COMPLEX_MIN_DESCENDANTS: 15;
    readonly MASK_PERCENTAGE_THRESHOLD: 70;
    readonly IMAGE_HEAVY_PERCENTAGE: 70;
    readonly BASE_COMPLEXITY_SCORE: 100;
};
/**
 * Node types that are considered "image-heavy" and may trigger vectorization
 * These types typically require rasterization for accurate rendering
 */
export declare const IMAGE_HEAVY_TYPES: readonly ["VECTOR", "RECTANGLE", "ELLIPSE", "STAR", "POLYGON", "BOOLEAN_OPERATION"];
/**
 * Words that indicate a CONTAINER/COLLECTION - should NOT vectorize
 * If the name contains any of these words, skip vectorization even if it matches a pattern
 *
 * This prevents false positives like:
 * - "logo grid" (container of logos)
 * - "icon gallery" (container of icons)
 * - "avatar list" (container of avatars)
 */
export declare const VECTORIZE_EXCLUSION_WORDS: readonly ["grid", "grids", "gallery", "galleries", "list", "lists", "listing", "listings", "row", "rows", "column", "columns", "col", "cols", "wrapper", "wrappers", "wrap", "container", "containers", "section", "sections", "stack", "stacks", "flex", "flexbox", "layout", "layouts", "box", "boxes", "collection", "collections", "set", "sets", "pack", "packs", "bundle", "bundles", "kit", "kits", "library", "libraries", "all", "multiple", "many", "array", "batch", "carousel", "carousels", "slider", "sliders", "slideshow", "slideshows", "swiper", "marquee", "nav", "navbar", "navigation", "menu", "menus", "sidebar", "sidebars", "header", "headers", "footer", "footers", "toolbar", "toolbars", "tabbar", "tabs", "breadcrumb", "breadcrumbs", "pagination", "cards", "items", "tiles", "blocks", "panels", "widgets", "entries", "elements", "content", "contents", "area", "areas", "zone", "zones", "region", "regions", "body", "main", "page", "pages", "view", "views", "screen", "screens", "form", "forms", "fieldset", "fieldsets", "inputs", "fields", "table", "tables", "thead", "tbody", "tfoot", "tr", "td", "th", "datagrid", "datatable", "modal", "modals", "popup", "popups", "dialog", "dialogs", "drawer", "drawers", "dropdown", "dropdowns", "tooltip", "tooltips", "popover", "popovers", "sheet", "sheets", "frame", "frames", "artboard", "artboards", "component-set", "variant", "variants", "instance", "instances", "auto-layout", "constraints", "repeater", "repeaters", "loop", "loops", "foreach", "map", "iterator"];
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
export declare const VECTORIZE_NAME_PATTERNS: readonly ["icon", "ico", "logo", "logotype", "logomark", "wordmark", "symbol", "glyph", "emblem", "badge", "favicon", "appicon", "app-icon", "brandmark", "monogram", "graphic", "illustration", "illo", "artwork", "visual", "asset", "vector", "svg", "sprite", "clipart", "clip-art", "drawing", "sketch", "doodle", "scribble", "image", "img", "picture", "pic", "photo", "photograph", "thumbnail", "thumb", "preview", "snapshot", "screenshot", "screencap", "capture", "decoration", "decor", "ornament", "pattern", "flourish", "swirl", "curl", "divider", "separator", "spacer", "accent", "motif", "flair", "embellishment", "filigree", "border-graphic", "corner", "frame-decoration", "shape", "blob", "wave", "curve", "circle", "ring", "oval", "ellipse", "sphere", "square", "rectangle", "rect", "triangle", "diamond", "hexagon", "hex", "octagon", "polygon", "arrow", "arrowhead", "chevron", "caret", "star", "starfield", "asterisk", "sparkle", "burst", "heart", "cross", "plus", "minus", "x-mark", "line", "stroke", "dash", "dotted-line", "dot", "point", "bullet", "pip", "gradient-shape", "abstract", "geometric", "mask", "masked", "masking", "clip", "clipped", "clipping", "overlay", "blend", "gradient-overlay", "color-overlay", "shadow-shape", "glow", "blur-shape", "noise", "grain", "texture", "bg-graphic", "bg-shape", "bg-pattern", "bg-image", "bg-art", "bg-element", "backdrop", "background-art", "background-graphic", "background-shape", "background-element", "background-decoration", "hero-bg", "hero-image", "hero-graphic", "hero-art", "hero-visual", "section-bg", "footer-bg", "header-bg", "sidebar-bg", "hamburger", "burger-menu", "menu-icon", "menu-toggle", "nav-icon", "close-icon", "close-btn", "x-icon", "x-button", "dismiss", "back-icon", "back-arrow", "next-icon", "next-arrow", "dropdown-icon", "dropdown-arrow", "select-arrow", "accordion-icon", "breadcrumb-separator", "pagination-dot", "stepper-icon", "tab-indicator", "scroll-indicator", "scroll-arrow", "scroll-to-top", "slider-handle", "slider-thumb", "range-thumb", "progress-indicator", "switch-toggle", "switch-thumb", "toggle-knob", "play-icon", "play-button", "pause-icon", "stop-icon", "volume-icon", "mute-icon", "fullscreen-icon", "settings-gear", "edit-icon", "pencil", "pen", "delete-icon", "trash-icon", "trash", "bin", "add-icon", "plus-icon", "copy-icon", "clipboard", "scissors", "save-icon", "floppy", "disk", "print-icon", "printer", "download-icon", "export-icon", "upload-icon", "import-icon", "share-icon", "link-icon", "chain", "external-link", "refresh-icon", "reload", "sync", "undo-icon", "redo-icon", "search-icon", "magnify", "filter-icon", "funnel", "sort-icon", "more-icon", "kebab", "meatball", "pin-icon", "paperclip", "cart-icon", "shopping-cart", "basket", "shopping-bag", "wishlist-icon", "heart-icon", "bookmark", "price-tag", "gift-icon", "truck", "package", "barcode", "qr-code", "email-icon", "mail-icon", "envelope", "message-icon", "chat-icon", "speech-bubble", "comment-icon", "phone-icon", "telephone", "video-icon", "camera", "webcam", "notification-icon", "bell-icon", "alert-bell", "megaphone", "bullhorn", "microphone", "mic", "user-icon", "avatar", "placeholder-avatar", "default-avatar", "profile-icon", "profile-pic", "account-icon", "team-icon", "group-icon", "id-card", "success-icon", "checkmark", "tick", "error-icon", "warning-icon", "info-icon", "question-icon", "help-icon", "alert-icon", "spinner", "loader", "progress-spinner", "circular-progress", "lock-icon", "padlock", "key-icon", "keyhole", "shield-icon", "fingerprint", "eye", "eye-off", "file-icon", "document", "folder-icon", "pdf-icon", "map-pin", "location-pin", "marker", "map-marker", "map-icon", "globe", "earth", "compass", "compass-icon", "location-icon", "clock-icon", "watch", "stopwatch", "timer-icon", "calendar-icon", "alarm-icon", "weather-icon", "sun-icon", "moon-icon", "cloud-icon", "rain-icon", "snow-icon", "snowflake", "lightning", "bolt", "thermometer", "dollar-icon", "money", "coin", "wallet-icon", "credit-card", "bank-icon", "piggy-bank", "code-icon", "terminal-icon", "api-icon", "database-icon", "server-icon", "wifi-icon", "bluetooth-icon", "chip", "cpu", "usb", "power-icon", "battery", "plug", "lightning-bolt", "social-icon", "facebook", "fb", "twitter", "x-twitter", "instagram", "ig", "linkedin", "youtube", "tiktok", "pinterest", "snapchat", "reddit", "discord", "slack", "whatsapp", "telegram", "github", "dribbble", "behance", "spotify", "fa-", "fas-", "far-", "fab-", "fal-", "fad-", "mdi-", "md-", "feather-", "fe-", "heroicon-", "hero-", "lucide-", "lu-", "ri-", "bi-", "ion-", "ionic-", "tabler-", "ti-", "phosphor-", "ph-", "radix-", "ant-", "antd-", "eva-", "octicon-", "octo-", "boxicon-", "bx-", "iconoir-", "simple-", "si-", "carbon-", "fluent-", "clarity-", "prime-", "pi-", "jam-", "css-", "cssgg-", "akar-", "iconify-", "uil-", "uis-", "uim-", "isometric-", "iso-", "3d-", "flat-", "outline-", "filled-", "solid-", "duotone-", "linear-", "light-", "regular-", "bold-", "thin-", "geo-", "headshot", "mugshot", "stamp", "seal", "watermark", "qrcode", "signature", "autograph", "emoji", "emoticon", "smiley", "sticker", "ribbon", "banner-ribbon", "corner-ribbon", "confetti", "firework", "balloon", "trophy", "medal", "award", "prize", "crown", "certificate", "diploma", "cursor", "pointer", "drag-handle", "resize-handle", "grip-lines", "placeholder", "skeleton", "shimmer", "ghost", "pie-chart", "bar-chart", "line-chart", "donut", "ticket", "voucher", "key-visual", "kv", "mascot", "character", "figure", "_", "::"];
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
export declare const SCATTERED_PATTERN_THRESHOLDS: {
    /** Minimum number of children to consider as a pattern */
    readonly MIN_CHILDREN: 3;
    /** Maximum size (px) for an element to be considered "small" */
    readonly SMALL_SIZE_PX: 64;
    /** % of small elements needed (with rotation) to trigger vectorization */
    readonly SMALL_PERCENTAGE: 50;
    /** % of rotated elements needed (with small) to trigger vectorization */
    readonly ROTATED_PERCENTAGE: 20;
    /** % of small elements alone that triggers vectorization */
    readonly MANY_SMALL_PERCENTAGE: 70;
    /** % of rotated elements alone that triggers vectorization */
    readonly MANY_ROTATED_PERCENTAGE: 40;
    /** Maximum size (px) for an element to be considered "medium" */
    readonly MEDIUM_SIZE_PX: 128;
    /** % of medium-or-smaller elements that suggests decorative pattern */
    readonly MEDIUM_OR_SMALL_PERCENTAGE: 60;
};
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
export declare const OVERLAPPING_THRESHOLDS: {
    /** Minimum number of children to check for overlapping */
    readonly MIN_CHILDREN: 3;
    /** Minimum overlap area percentage to consider elements as overlapping */
    readonly OVERLAP_AREA_PERCENTAGE: 50;
    /** % of children that must overlap with at least one sibling to trigger */
    readonly OVERLAPPING_CHILDREN_PERCENTAGE: 60;
};
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
export declare const THIN_LINE_THRESHOLDS: {
    /** Minimum number of children to check */
    readonly MIN_CHILDREN: 2;
    /** Aspect ratio threshold (width/height or height/width > this = thin) */
    readonly ASPECT_RATIO_THRESHOLD: 8;
    /** Maximum thickness in px for a line to be considered "thin" */
    readonly MAX_THICKNESS_PX: 8;
    /** % of thin line elements that triggers vectorization */
    readonly THIN_LINE_PERCENTAGE: 50;
};
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
export declare const LOW_OPACITY_THRESHOLDS: {
    /** Minimum number of children to check */
    readonly MIN_CHILDREN: 3;
    /** Opacity threshold below which element is considered "low opacity" */
    readonly LOW_OPACITY_VALUE: 0.8;
    /** % of low-opacity elements that triggers vectorization */
    readonly LOW_OPACITY_PERCENTAGE: 60;
};
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
export declare const DEFAULT_ELEMENT_NAMES: readonly ["rectangle", "ellipse", "line", "polygon", "star", "vector", "union", "subtract", "intersect", "exclude", "rectangulo", "elipse", "linea", "poligono", "estrella", "vector", "union", "resta", "sustraccion", "interseccion", "exclusion"];
/**
 * Thresholds for default/unnamed element detection
 * Triggers vectorization when many children have auto-generated names
 */
export declare const DEFAULT_NAME_THRESHOLDS: {
    /** Minimum number of children to check */
    readonly MIN_CHILDREN: 3;
    /** % of children with default names that triggers vectorization */
    readonly DEFAULT_NAME_PERCENTAGE: 70;
};
//# sourceMappingURL=app.d.ts.map