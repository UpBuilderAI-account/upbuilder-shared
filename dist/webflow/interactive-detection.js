"use strict";
// ============================================================================
// INTERACTIVE COMPONENT DETECTION
// Pattern recognition for converting static designs to interactive Webflow components
// Used by: section-builder prompts, AI guidance
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.INTERACTIVE_PATTERN_DOCS_COMPACT = exports.INTERACTIVE_PATTERN_DOCS = exports.INTERACTIVE_PATTERNS = void 0;
exports.detectInteractivePattern = detectInteractivePattern;
exports.getInteractivePattern = getInteractivePattern;
exports.generateInteractivePatternDocs = generateInteractivePatternDocs;
// =============================================================================
// INTERACTIVE PATTERNS
// =============================================================================
exports.INTERACTIVE_PATTERNS = [
    // ---------------------------------------------------------------------------
    // SLIDER / CAROUSEL
    // ---------------------------------------------------------------------------
    {
        name: 'Slider',
        description: 'Carousel or slideshow with navigation arrows and/or pagination dots',
        indicators: [
            'Left/right navigation arrows',
            'Multiple similar content items in a row',
            'Pagination dots below content',
            'Overflow hidden container with slides',
            'Content that appears to slide or rotate',
        ],
        keywords: [
            'carousel', 'slider', 'slideshow', 'rotator',
            'previous', 'next', 'prev', 'arrow', 'caret',
            'slide', 'swipe', 'pagination', 'dots',
            'gallery', 'testimonial slider', 'image slider',
        ],
        structure: {
            root: 'SliderWrapper',
            children: [
                {
                    type: 'SliderMask',
                    role: 'Contains all slides (overflow hidden)',
                    children: [
                        { type: 'SliderSlide', role: 'Each content item becomes a slide' },
                    ],
                },
                { type: 'SliderArrow', role: 'Left arrow navigation', optional: false },
                { type: 'SliderArrow', role: 'Right arrow navigation', optional: false },
                { type: 'SliderNav', role: 'Pagination dots', optional: true },
            ],
        },
    },
    // ---------------------------------------------------------------------------
    // TABS
    // ---------------------------------------------------------------------------
    {
        name: 'Tabs',
        description: 'Tabbed content with clickable tab headers that show/hide content panels',
        indicators: [
            'Multiple clickable headers/buttons in a row',
            'One content area that changes based on selection',
            'Visual indicator of active/selected state',
            'Horizontal or vertical tab navigation',
        ],
        keywords: [
            'tab', 'tabs', 'panel', 'pane',
            'toggle', 'switch', 'selector',
            'active', 'selected', 'current',
        ],
        structure: {
            root: 'TabsWrapper',
            children: [
                {
                    type: 'TabsMenu',
                    role: 'Container for tab buttons',
                    children: [
                        { type: 'TabsLink', role: 'Each clickable tab header' },
                    ],
                },
                {
                    type: 'TabsContent',
                    role: 'Container for tab panels',
                    children: [
                        { type: 'TabsPane', role: 'Content shown when tab is active' },
                    ],
                },
            ],
        },
    },
    // ---------------------------------------------------------------------------
    // DROPDOWN
    // ---------------------------------------------------------------------------
    {
        name: 'Dropdown',
        description: 'Clickable trigger that reveals a list of options or menu items',
        indicators: [
            'Button/link with dropdown arrow icon',
            'Hidden menu that appears on click/hover',
            'List of navigation links or options',
            'Chevron or caret pointing down',
        ],
        keywords: [
            'dropdown', 'drop-down', 'menu', 'submenu',
            'expand', 'collapse', 'toggle',
            'chevron', 'caret', 'arrow down',
            'options', 'select',
        ],
        structure: {
            root: 'DropdownWrapper',
            children: [
                { type: 'DropdownToggle', role: 'Clickable trigger button/link' },
                {
                    type: 'DropdownList',
                    role: 'Container for dropdown items',
                    children: [
                        { type: 'DropdownLink', role: 'Each menu item/link' },
                    ],
                },
            ],
        },
    },
    // ---------------------------------------------------------------------------
    // NAVBAR
    // ---------------------------------------------------------------------------
    {
        name: 'Navbar',
        description: 'Navigation header with logo, menu items, and mobile hamburger menu',
        indicators: [
            'Fixed/sticky header at top of page',
            'Logo on left, navigation links on right',
            'Hamburger menu icon for mobile',
            'Multiple navigation links in a row',
        ],
        keywords: [
            'navbar', 'nav', 'navigation', 'header',
            'menu', 'hamburger', 'mobile menu',
            'logo', 'brand', 'nav link',
        ],
        structure: {
            root: 'NavbarWrapper',
            children: [
                {
                    type: 'NavbarContainer',
                    role: 'Main navbar container',
                    children: [
                        { type: 'NavbarBrand', role: 'Logo/brand link' },
                        {
                            type: 'NavbarMenu',
                            role: 'Navigation menu (collapsible on mobile)',
                            children: [
                                { type: 'NavbarLink', role: 'Each navigation link' },
                                { type: 'NavbarButton', role: 'CTA button', optional: true },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    // ---------------------------------------------------------------------------
    // ACCORDION / FAQ
    // ---------------------------------------------------------------------------
    {
        name: 'Accordion',
        description: 'Expandable/collapsible content sections, often used for FAQs',
        indicators: [
            'Multiple question/answer or header/content pairs',
            'Plus/minus or chevron icons indicating expand/collapse',
            'Content that shows/hides on click',
            'Stacked expandable sections',
        ],
        keywords: [
            'accordion', 'faq', 'expand', 'collapse',
            'plus', 'minus', 'toggle', 'question',
            'answer', 'collapsible', 'expandable',
        ],
        structure: {
            root: 'Block', // Webflow doesn't have native accordion, use interactions
            children: [
                {
                    type: 'Block',
                    role: 'Accordion item wrapper',
                    children: [
                        { type: 'Block', role: 'Header/trigger (clickable)' },
                        { type: 'Block', role: 'Content (show/hide with interaction)' },
                    ],
                },
            ],
        },
    },
    // ---------------------------------------------------------------------------
    // LIGHTBOX / MODAL
    // ---------------------------------------------------------------------------
    {
        name: 'Lightbox',
        description: 'Image or content that opens in a fullscreen overlay when clicked',
        indicators: [
            'Thumbnail images that enlarge on click',
            'Gallery grid with clickable images',
            'Zoom/expand icon on images',
            'Image gallery with lightbox behavior',
        ],
        keywords: [
            'lightbox', 'modal', 'popup', 'overlay',
            'zoom', 'enlarge', 'fullscreen',
            'gallery', 'thumbnail', 'expand image',
        ],
        structure: {
            root: 'LightboxWrapper',
            children: [
                { type: 'Image', role: 'Thumbnail/trigger image' },
            ],
        },
    },
    // ---------------------------------------------------------------------------
    // FORM
    // ---------------------------------------------------------------------------
    {
        name: 'Form',
        description: 'Input form with fields, labels, and submit button',
        indicators: [
            'Text input fields',
            'Labels above or beside inputs',
            'Submit button',
            'Form validation messages',
            'Textarea, select dropdowns, checkboxes, radio buttons',
        ],
        keywords: [
            'form', 'input', 'submit', 'contact',
            'email', 'name', 'message', 'subscribe',
            'newsletter', 'sign up', 'register', 'login',
        ],
        structure: {
            root: 'FormWrapper',
            children: [
                {
                    type: 'FormForm',
                    role: 'Form element container',
                    children: [
                        { type: 'FormBlockLabel', role: 'Field label' },
                        { type: 'FormTextInput', role: 'Text input field' },
                        { type: 'FormTextarea', role: 'Multi-line text input', optional: true },
                        { type: 'FormSelect', role: 'Dropdown select', optional: true },
                        { type: 'FormButton', role: 'Submit button' },
                    ],
                },
                { type: 'FormSuccessMessage', role: 'Success state message' },
                { type: 'FormErrorMessage', role: 'Error state message' },
            ],
        },
    },
];
// =============================================================================
// DETECTION HELPERS
// =============================================================================
/**
 * Check if element names/alt text suggest an interactive pattern
 */
function detectInteractivePattern(elementNames, altTexts) {
    const allText = [...elementNames, ...altTexts]
        .join(' ')
        .toLowerCase();
    for (const pattern of exports.INTERACTIVE_PATTERNS) {
        const matchCount = pattern.keywords.filter(keyword => allText.includes(keyword.toLowerCase())).length;
        // Require at least 2 keyword matches for confidence
        if (matchCount >= 2) {
            return pattern;
        }
    }
    return null;
}
/**
 * Get pattern by name
 */
function getInteractivePattern(name) {
    return exports.INTERACTIVE_PATTERNS.find(p => p.name.toLowerCase() === name.toLowerCase()) || null;
}
/**
 * Generate prompt documentation for all interactive patterns
 */
function generateInteractivePatternDocs() {
    const lines = [
        '## Interactive Component Detection',
        '',
        'When building sections, recognize these patterns and use the correct Webflow components:',
        '',
    ];
    for (const pattern of exports.INTERACTIVE_PATTERNS) {
        lines.push(`### ${pattern.name}`);
        lines.push('');
        lines.push(`**${pattern.description}**`);
        lines.push('');
        lines.push('**Visual indicators:**');
        for (const indicator of pattern.indicators) {
            lines.push(`- ${indicator}`);
        }
        lines.push('');
        lines.push('**Keywords to look for:** ' + pattern.keywords.slice(0, 8).join(', '));
        lines.push('');
        lines.push('**Use this structure:**');
        lines.push('```');
        lines.push(formatStructure(pattern.structure, 0));
        lines.push('```');
        lines.push('');
    }
    return lines.join('\n');
}
/**
 * Format structure tree for documentation
 */
function formatStructure(structure, indent) {
    const prefix = '  '.repeat(indent);
    const lines = [`${prefix}${structure.root}`];
    for (const child of structure.children) {
        const optional = child.optional ? ' (optional)' : '';
        lines.push(`${prefix}  └── ${child.type}${optional} - ${child.role}`);
        if (child.children) {
            for (const grandchild of child.children) {
                const gOptional = grandchild.optional ? ' (optional)' : '';
                lines.push(`${prefix}      └── ${grandchild.type}${gOptional} - ${grandchild.role}`);
            }
        }
    }
    return lines.join('\n');
}
// =============================================================================
// PRE-BUILT DOCUMENTATION
// =============================================================================
exports.INTERACTIVE_PATTERN_DOCS = generateInteractivePatternDocs();
// Compact version for token-limited prompts
exports.INTERACTIVE_PATTERN_DOCS_COMPACT = `
## Interactive Component Detection

**Slider/Carousel** - Use when you see: left/right arrows + multiple similar items + pagination dots
→ SliderWrapper > SliderMask > SliderSlide + SliderArrow (x2) + SliderNav

**Tabs** - Use when you see: clickable headers + content that switches
→ TabsWrapper > TabsMenu > TabsLink + TabsContent > TabsPane

**Dropdown** - Use when you see: trigger button + hidden menu list
→ DropdownWrapper > DropdownToggle + DropdownList > DropdownLink

**Navbar** - Use when you see: logo + nav links + hamburger menu
→ NavbarWrapper > NavbarContainer > NavbarBrand + NavbarMenu > NavbarLink

**Lightbox** - Use when you see: thumbnails that enlarge on click
→ LightboxWrapper > Image

**Form** - Use when you see: input fields + submit button
→ FormWrapper > FormForm > FormTextInput/Textarea/Select + FormButton
`;
