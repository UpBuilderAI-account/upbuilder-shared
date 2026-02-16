"use strict";
// ============================================================================
// WEBFLOW COMPONENT DEFINITIONS
// Single source of truth for all 65 Webflow component types
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMPONENT_COUNT = exports.COMPONENTS_BY_CATEGORY = exports.ALL_COMPONENT_TYPES = exports.WEBFLOW_COMPONENTS = void 0;
exports.getComponentDef = getComponentDef;
exports.isValidComponentType = isValidComponentType;
exports.getComponentsByCategory = getComponentsByCategory;
// -----------------------------------------------------------------------------
// All 65 Webflow Component Types
// -----------------------------------------------------------------------------
exports.WEBFLOW_COMPONENTS = {
    // ===========================================================================
    // LAYOUT GRID COMPONENTS (5)
    // ===========================================================================
    Row: {
        displayName: 'Row',
        tags: ['div'],
        isContainer: true,
        category: 'layout-grid',
        specialDataFields: ['grid'],
        description: 'Legacy 12-column grid row, contains Column children'
    },
    Column: {
        displayName: 'Column',
        tags: ['div'],
        isContainer: true,
        category: 'layout-grid',
        specialDataFields: ['grid'],
        description: 'Column inside Row, part of legacy grid system'
    },
    Grid: {
        displayName: 'Grid',
        tags: ['div'],
        isContainer: true,
        category: 'layout-grid',
        specialDataFields: ['grid'],
        description: 'CSS Grid layout container'
    },
    HFlex: {
        displayName: 'H Flex',
        tags: ['div'],
        isContainer: true,
        category: 'basic',
        specialDataFields: [],
        description: 'Horizontal flexbox container (Quick Stack horizontal)'
    },
    VFlex: {
        displayName: 'V Flex',
        tags: ['div'],
        isContainer: true,
        category: 'basic',
        specialDataFields: [],
        description: 'Vertical flexbox container (Quick Stack vertical)'
    },
    // ===========================================================================
    // BASIC COMPONENTS (14)
    // ===========================================================================
    Block: {
        displayName: 'Div Block',
        tags: ['div'],
        isContainer: true,
        category: 'basic',
        specialDataFields: ['text', 'devId', 'style'],
        description: 'Generic container element, the building block of layouts'
    },
    Section: {
        displayName: 'Section',
        tags: ['section', 'div'],
        isContainer: true,
        category: 'basic',
        specialDataFields: ['grid'],
        description: 'Page section container, typically direct child of body'
    },
    BlockContainer: {
        displayName: 'Container',
        tags: ['div'],
        isContainer: true,
        category: 'basic',
        specialDataFields: ['grid'],
        description: 'Centered container with max-width (Webflow Container element)'
    },
    Link: {
        displayName: 'Link',
        tags: ['a'],
        isContainer: true,
        category: 'basic',
        specialDataFields: ['button', 'block', 'link', 'eventIds'],
        description: 'Anchor link element'
    },
    LinkBlock: {
        displayName: 'Link Block',
        tags: ['a'],
        isContainer: true,
        category: 'basic',
        specialDataFields: ['link', 'eventIds'],
        description: 'Block-level link that can contain other elements'
    },
    TextLink: {
        displayName: 'Text Link',
        tags: ['a'],
        isContainer: true,
        category: 'basic',
        specialDataFields: ['link'],
        description: 'Inline text link'
    },
    Button: {
        displayName: 'Button',
        tags: ['a', 'button'],
        isContainer: true,
        category: 'basic',
        specialDataFields: ['button', 'link', 'eventIds'],
        description: 'Button element (renders as link with button styling)'
    },
    List: {
        displayName: 'List',
        tags: ['ul', 'ol'],
        isContainer: true,
        category: 'basic',
        specialDataFields: ['list'],
        description: 'Ordered or unordered list container'
    },
    ListItem: {
        displayName: 'List Item',
        tags: ['li'],
        isContainer: true,
        category: 'basic',
        specialDataFields: ['list', 'text'],
        description: 'List item, must be direct child of List'
    },
    Image: {
        displayName: 'Image',
        tags: ['img'],
        isContainer: false,
        category: 'media',
        specialDataFields: ['img', 'srcsetDisabled', 'sizes', 'style'],
        description: 'Image element'
    },
    Video: {
        displayName: 'Video',
        tags: ['div'],
        isContainer: false,
        category: 'media',
        specialDataFields: ['video', 'videoData'],
        description: 'Video embed element'
    },
    Icon: {
        displayName: 'Icon',
        tags: ['div'],
        isContainer: false,
        category: 'media',
        specialDataFields: ['widget'],
        description: 'Icon widget element'
    },
    HtmlEmbed: {
        displayName: 'HTML Embed',
        tags: ['div'],
        isContainer: false,
        category: 'media',
        specialDataFields: ['embed', 'insideRTE'],
        description: 'Custom HTML/SVG embed'
    },
    CodeBlock: {
        displayName: 'Code Block',
        tags: ['pre'],
        isContainer: false,
        category: 'media',
        specialDataFields: ['code', 'language', 'theme', 'lineNumbers'],
        description: 'Syntax-highlighted code block (inside RichText only)'
    },
    LineBreak: {
        displayName: 'Line Break',
        tags: ['br'],
        isContainer: false,
        category: 'basic',
        specialDataFields: ['sym'],
        description: 'Line break element'
    },
    // ===========================================================================
    // TYPOGRAPHY COMPONENTS (6)
    // ===========================================================================
    Heading: {
        displayName: 'Heading',
        tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        isContainer: true,
        category: 'typography',
        specialDataFields: ['tag'],
        description: 'Heading element (h1-h6)'
    },
    Paragraph: {
        displayName: 'Paragraph',
        tags: ['p'],
        isContainer: true,
        category: 'typography',
        specialDataFields: [],
        description: 'Paragraph text element'
    },
    Span: {
        displayName: 'Span',
        tags: ['span'],
        isContainer: true,
        category: 'typography',
        specialDataFields: [],
        description: 'Inline span element for text styling'
    },
    Blockquote: {
        displayName: 'Block Quote',
        tags: ['blockquote'],
        isContainer: true,
        category: 'typography',
        specialDataFields: [],
        description: 'Block quote element'
    },
    RichText: {
        displayName: 'Rich Text',
        tags: ['div'],
        isContainer: true,
        category: 'typography',
        specialDataFields: ['rich', 'slot'],
        description: 'Rich text block for CMS content'
    },
    Figure: {
        displayName: 'Figure',
        tags: ['figure'],
        isContainer: true,
        category: 'typography',
        specialDataFields: [],
        description: 'Figure element for images with captions'
    },
    Figcaption: {
        displayName: 'Fig Caption',
        tags: ['figcaption'],
        isContainer: true,
        category: 'typography',
        specialDataFields: [],
        description: 'Figure caption element'
    },
    // ===========================================================================
    // TEXT FORMATTING COMPONENTS (7)
    // ===========================================================================
    Strong: {
        displayName: 'Strong',
        tags: ['strong', 'b'],
        isContainer: true,
        category: 'text-formatting',
        specialDataFields: [],
        description: 'Bold/strong text, used inside rich text containers'
    },
    Emphasized: {
        displayName: 'Emphasized',
        tags: ['em', 'i'],
        isContainer: true,
        category: 'text-formatting',
        specialDataFields: [],
        description: 'Italic/emphasized text, used inside rich text containers'
    },
    Superscript: {
        displayName: 'Superscript',
        tags: ['sup'],
        isContainer: true,
        category: 'text-formatting',
        specialDataFields: [],
        description: 'Superscript text (x²), used inside rich text containers'
    },
    Subscript: {
        displayName: 'Subscript',
        tags: ['sub'],
        isContainer: true,
        category: 'text-formatting',
        specialDataFields: [],
        description: 'Subscript text (H₂O), used inside rich text containers'
    },
    InlineCode: {
        displayName: 'Inline Code',
        tags: ['code'],
        isContainer: true,
        category: 'text-formatting',
        specialDataFields: [],
        description: 'Inline code snippet, used inside rich text containers'
    },
    Strikethrough: {
        displayName: 'Strikethrough',
        tags: ['s', 'del'],
        isContainer: true,
        category: 'text-formatting',
        specialDataFields: [],
        description: 'Strikethrough text, used inside rich text containers'
    },
    Underline: {
        displayName: 'Underline',
        tags: ['u'],
        isContainer: true,
        category: 'text-formatting',
        specialDataFields: [],
        description: 'Underlined text, used inside rich text containers'
    },
    // ===========================================================================
    // NAVBAR COMPONENTS (6)
    // ===========================================================================
    NavbarWrapper: {
        displayName: 'Navbar',
        tags: ['div'],
        isContainer: true,
        category: 'navigation',
        specialDataFields: ['navbar'],
        description: 'Navbar wrapper, contains NavbarContainer'
    },
    NavbarContainer: {
        displayName: 'Container',
        tags: ['div'],
        isContainer: true,
        category: 'navigation',
        specialDataFields: ['navbar'],
        description: 'Navbar container, must be direct child of NavbarWrapper'
    },
    NavbarBrand: {
        displayName: 'Brand',
        tags: ['a'],
        isContainer: true,
        category: 'navigation',
        specialDataFields: ['navbar', 'link', 'eventIds'],
        description: 'Navbar brand/logo link'
    },
    NavbarMenu: {
        displayName: 'Nav Menu',
        tags: ['nav'],
        isContainer: true,
        category: 'navigation',
        specialDataFields: ['navbar'],
        description: 'Navbar menu container for nav links'
    },
    NavbarLink: {
        displayName: 'Nav Link',
        tags: ['a'],
        isContainer: true,
        category: 'navigation',
        specialDataFields: ['navbar', 'link', 'eventIds'],
        description: 'Navbar link, must be direct child of NavbarMenu'
    },
    NavbarButton: {
        displayName: 'Menu Button',
        tags: ['div'],
        isContainer: true,
        category: 'navigation',
        specialDataFields: ['navbar'],
        description: 'Mobile menu toggle button'
    },
    // ===========================================================================
    // DROPDOWN COMPONENTS (4)
    // ===========================================================================
    DropdownWrapper: {
        displayName: 'Dropdown',
        tags: ['div'],
        isContainer: true,
        category: 'dropdown',
        specialDataFields: ['dropdown'],
        description: 'Dropdown wrapper container'
    },
    DropdownToggle: {
        displayName: 'Dropdown Toggle',
        tags: ['div'],
        isContainer: true,
        category: 'dropdown',
        specialDataFields: ['dropdown'],
        description: 'Dropdown toggle button, must be direct child of DropdownWrapper'
    },
    DropdownList: {
        displayName: 'Dropdown List',
        tags: ['nav'],
        isContainer: true,
        category: 'dropdown',
        specialDataFields: ['dropdown'],
        description: 'Dropdown list container, must be direct child of DropdownWrapper'
    },
    DropdownLink: {
        displayName: 'Dropdown Link',
        tags: ['a'],
        isContainer: true,
        category: 'dropdown',
        specialDataFields: ['dropdown', 'link', 'eventIds'],
        description: 'Dropdown menu link, must be direct child of DropdownList'
    },
    // ===========================================================================
    // TABS COMPONENTS (5)
    // ===========================================================================
    TabsWrapper: {
        displayName: 'Tabs',
        tags: ['div'],
        isContainer: true,
        category: 'tabs',
        specialDataFields: ['tabs'],
        description: 'Tabs wrapper, contains TabsMenu and TabsContent'
    },
    TabsMenu: {
        displayName: 'Tabs Menu',
        tags: ['div'],
        isContainer: true,
        category: 'tabs',
        specialDataFields: ['tabs'],
        description: 'Tabs menu container, must be direct child of TabsWrapper'
    },
    TabsContent: {
        displayName: 'Tabs Content',
        tags: ['div'],
        isContainer: true,
        category: 'tabs',
        specialDataFields: ['tabs'],
        description: 'Tabs content container, must be direct child of TabsWrapper'
    },
    TabsLink: {
        displayName: 'Tab Link',
        tags: ['a'],
        isContainer: true,
        category: 'tabs',
        specialDataFields: ['tabs', 'block'],
        description: 'Tab link/button, must be direct child of TabsMenu'
    },
    TabsPane: {
        displayName: 'Tab Pane',
        tags: ['div'],
        isContainer: true,
        category: 'tabs',
        specialDataFields: ['tabs'],
        description: 'Tab content pane, must be direct child of TabsContent'
    },
    // ===========================================================================
    // SLIDER COMPONENTS (5)
    // ===========================================================================
    SliderWrapper: {
        displayName: 'Slider',
        tags: ['div'],
        isContainer: true,
        category: 'slider',
        specialDataFields: ['slider'],
        description: 'Slider/carousel wrapper'
    },
    SliderMask: {
        displayName: 'Mask',
        tags: ['div'],
        isContainer: true,
        category: 'slider',
        specialDataFields: ['slider'],
        description: 'Slider mask/viewport, must be direct child of SliderWrapper'
    },
    SliderSlide: {
        displayName: 'Slide',
        tags: ['div'],
        isContainer: true,
        category: 'slider',
        specialDataFields: ['slider'],
        description: 'Individual slide, must be direct child of SliderMask'
    },
    SliderArrow: {
        displayName: 'Slider Arrow',
        tags: ['div'],
        isContainer: true,
        category: 'slider',
        specialDataFields: ['slider'],
        description: 'Navigation arrow, must be direct child of SliderWrapper'
    },
    SliderNav: {
        displayName: 'Slide Nav',
        tags: ['div'],
        isContainer: false,
        category: 'slider',
        specialDataFields: ['slider'],
        description: 'Slide indicator dots, must be direct child of SliderWrapper'
    },
    // ===========================================================================
    // FORM COMPONENTS (17)
    // ===========================================================================
    FormWrapper: {
        displayName: 'Form Block',
        tags: ['div'],
        isContainer: true,
        category: 'form',
        specialDataFields: ['form'],
        description: 'Form wrapper, contains FormForm and messages'
    },
    FormForm: {
        displayName: 'Form',
        tags: ['form'],
        isContainer: true,
        category: 'form',
        specialDataFields: ['form', 'Source'],
        description: 'Form element, must be inside FormWrapper'
    },
    FormBlockLabel: {
        displayName: 'Label',
        tags: ['label'],
        isContainer: true,
        category: 'form',
        specialDataFields: ['form'],
        description: 'Form field label'
    },
    FormTextInput: {
        displayName: 'Text Field',
        tags: ['input'],
        isContainer: false,
        category: 'form',
        specialDataFields: ['form'],
        description: 'Text input field, must be direct child of FormForm'
    },
    FormTextarea: {
        displayName: 'Text Area',
        tags: ['textarea'],
        isContainer: false,
        category: 'form',
        specialDataFields: ['form'],
        description: 'Textarea field, must be direct child of FormForm'
    },
    FormSelect: {
        displayName: 'Select',
        tags: ['select'],
        isContainer: false,
        category: 'form',
        specialDataFields: ['form'],
        description: 'Select dropdown, must be direct child of FormForm'
    },
    FormButton: {
        displayName: 'Submit Button',
        tags: ['input'],
        isContainer: false,
        category: 'form',
        specialDataFields: ['form', 'eventIds'],
        description: 'Form submit button'
    },
    FormCheckboxWrapper: {
        displayName: 'Checkbox',
        tags: ['div'],
        isContainer: true,
        category: 'form',
        specialDataFields: ['form'],
        description: 'Checkbox wrapper, contains input and label'
    },
    FormCheckboxInput: {
        displayName: 'Checkbox Input',
        tags: ['input'],
        isContainer: false,
        category: 'form',
        specialDataFields: ['form', 'inputType'],
        description: 'Checkbox input, must be inside FormCheckboxWrapper'
    },
    FormRadioWrapper: {
        displayName: 'Radio Button',
        tags: ['div'],
        isContainer: true,
        category: 'form',
        specialDataFields: ['form'],
        description: 'Radio button wrapper, contains input and label'
    },
    FormRadioInput: {
        displayName: 'Radio Input',
        tags: ['input'],
        isContainer: false,
        category: 'form',
        specialDataFields: ['form', 'inputType'],
        description: 'Radio input, must be inside FormRadioWrapper'
    },
    FormInlineLabel: {
        displayName: 'Inline Label',
        tags: ['label'],
        isContainer: true,
        category: 'form',
        specialDataFields: ['form'],
        description: 'Inline label for checkbox/radio'
    },
    FormSuccessMessage: {
        displayName: 'Success Message',
        tags: ['div'],
        isContainer: true,
        category: 'form',
        specialDataFields: ['form'],
        description: 'Form success message, must be inside FormWrapper'
    },
    FormErrorMessage: {
        displayName: 'Error Message',
        tags: ['div'],
        isContainer: true,
        category: 'form',
        specialDataFields: ['form'],
        description: 'Form error message, must be inside FormWrapper'
    },
    FormFileUploadWrapper: {
        displayName: 'File Upload',
        tags: ['div'],
        isContainer: true,
        category: 'form',
        specialDataFields: ['form'],
        description: 'File upload wrapper with states'
    },
    FormFileUploadDefault: {
        displayName: 'File Upload Default State',
        tags: ['div'],
        isContainer: true,
        category: 'form',
        specialDataFields: ['form'],
        description: 'Default state of file upload'
    },
    FormFileUploadUploading: {
        displayName: 'File Upload Uploading State',
        tags: ['div'],
        isContainer: true,
        category: 'form',
        specialDataFields: ['form'],
        description: 'Uploading state of file upload'
    },
    FormFileUploadSuccess: {
        displayName: 'File Upload Success State',
        tags: ['div'],
        isContainer: true,
        category: 'form',
        specialDataFields: ['form'],
        description: 'Success state of file upload'
    },
    FormFileUploadError: {
        displayName: 'File Upload Error State',
        tags: ['div'],
        isContainer: true,
        category: 'form',
        specialDataFields: ['form'],
        description: 'Error state of file upload'
    },
    FormFileUploadInput: {
        displayName: 'File Upload Input',
        tags: ['input'],
        isContainer: false,
        category: 'form',
        specialDataFields: ['form'],
        description: 'File input element'
    },
    FormFileUploadLabel: {
        displayName: 'File Upload Label',
        tags: ['label'],
        isContainer: true,
        category: 'form',
        specialDataFields: ['form'],
        description: 'File upload label/button'
    },
    FormFileUploadErrorMsg: {
        displayName: 'File Upload Error Message',
        tags: ['div'],
        isContainer: true,
        category: 'form',
        specialDataFields: ['form'],
        description: 'File upload error message text'
    },
    FormReCaptcha: {
        displayName: 'reCAPTCHA',
        tags: ['div'],
        isContainer: false,
        category: 'form',
        specialDataFields: ['form'],
        description: 'reCAPTCHA widget'
    },
    // ===========================================================================
    // SEARCH COMPONENTS (3)
    // ===========================================================================
    SearchForm: {
        displayName: 'Search',
        tags: ['form'],
        isContainer: true,
        category: 'search',
        specialDataFields: ['search'],
        description: 'Search form wrapper'
    },
    SearchInput: {
        displayName: 'Search Input',
        tags: ['input'],
        isContainer: false,
        category: 'search',
        specialDataFields: ['search'],
        description: 'Search text input'
    },
    SearchButton: {
        displayName: 'Search Button',
        tags: ['input'],
        isContainer: false,
        category: 'search',
        specialDataFields: ['search'],
        description: 'Search submit button'
    },
    // ===========================================================================
    // LIGHTBOX COMPONENT (1)
    // ===========================================================================
    LightboxWrapper: {
        displayName: 'Lightbox Link',
        tags: ['a'],
        isContainer: true,
        category: 'media',
        specialDataFields: ['lightbox', 'link'],
        description: 'Lightbox trigger link'
    },
    // ===========================================================================
    // MAP COMPONENT (1)
    // ===========================================================================
    MapWidget: {
        displayName: 'Map',
        tags: ['div'],
        isContainer: false,
        category: 'media',
        specialDataFields: ['widget'],
        description: 'Google Maps embed'
    },
    // ===========================================================================
    // BACKGROUND VIDEO COMPONENTS (4)
    // ===========================================================================
    BackgroundVideoWrapper: {
        displayName: 'Background Video',
        tags: ['div'],
        isContainer: true,
        category: 'video',
        specialDataFields: ['bgvideo', 'attr'],
        description: 'Background video container with autoplay support'
    },
    BackgroundVideoPlayPauseButton: {
        displayName: 'BG Video Button',
        tags: ['div'],
        isContainer: true,
        category: 'video',
        specialDataFields: ['attr'],
        description: 'Play/pause toggle button for background video'
    },
    BackgroundVideoPlayPauseButtonPlaying: {
        displayName: 'BG Video Playing State',
        tags: ['div'],
        isContainer: true,
        category: 'video',
        specialDataFields: [],
        description: 'State shown when video is playing (pause icon)'
    },
    BackgroundVideoPlayPauseButtonPaused: {
        displayName: 'BG Video Paused State',
        tags: ['div'],
        isContainer: true,
        category: 'video',
        specialDataFields: [],
        description: 'State shown when video is paused (play icon)'
    },
    // ===========================================================================
    // CMS COMPONENTS (4)
    // ===========================================================================
    DynamoWrapper: {
        displayName: 'Collection List Wrapper',
        tags: ['div'],
        isContainer: true,
        category: 'cms',
        specialDataFields: ['dyn'],
        description: 'Outer wrapper for CMS collection list, contains DynamoList and DynamoEmpty',
    },
    DynamoList: {
        displayName: 'Collection List',
        tags: ['div'],
        isContainer: true,
        category: 'cms',
        specialDataFields: ['dyn'],
        description: 'CMS collection list, contains DynamoItem elements',
    },
    DynamoItem: {
        displayName: 'Collection Item',
        tags: ['div'],
        isContainer: true,
        category: 'cms',
        specialDataFields: ['dyn'],
        description: 'Repeating item template inside collection list',
    },
    DynamoEmpty: {
        displayName: 'Empty State',
        tags: ['div'],
        isContainer: true,
        category: 'cms',
        specialDataFields: ['dyn'],
        description: 'Fallback content when collection is empty',
    },
};
/** Array of all component type names */
exports.ALL_COMPONENT_TYPES = Object.keys(exports.WEBFLOW_COMPONENTS);
/** Get component definition by type */
function getComponentDef(type) {
    return exports.WEBFLOW_COMPONENTS[type];
}
/** Check if a string is a valid component type */
function isValidComponentType(type) {
    return type in exports.WEBFLOW_COMPONENTS;
}
// -----------------------------------------------------------------------------
// Category Groupings
// -----------------------------------------------------------------------------
/** Get all components in a category */
function getComponentsByCategory(category) {
    return exports.ALL_COMPONENT_TYPES.filter(type => exports.WEBFLOW_COMPONENTS[type].category === category);
}
/** Pre-computed category groups */
exports.COMPONENTS_BY_CATEGORY = {
    basic: getComponentsByCategory('basic'),
    typography: getComponentsByCategory('typography'),
    'text-formatting': getComponentsByCategory('text-formatting'),
    navigation: getComponentsByCategory('navigation'),
    dropdown: getComponentsByCategory('dropdown'),
    tabs: getComponentsByCategory('tabs'),
    slider: getComponentsByCategory('slider'),
    form: getComponentsByCategory('form'),
    search: getComponentsByCategory('search'),
    media: getComponentsByCategory('media'),
    cms: getComponentsByCategory('cms'),
    'layout-grid': getComponentsByCategory('layout-grid'),
    video: getComponentsByCategory('video'),
};
/** Count of components */
exports.COMPONENT_COUNT = exports.ALL_COMPONENT_TYPES.length;
