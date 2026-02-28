"use strict";
// ============================================================================
// WEBFLOW HIERARCHY CONSTRAINTS
// Single source of truth for all component placement rules
// Used by: element-validator.ts, prompts, and documentation
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.HIERARCHY_CHAINS = exports.WEBFLOW_CONSTRAINTS = void 0;
exports.getConstraints = getConstraints;
exports.getDisplayName = getDisplayName;
exports.requiresAncestor = requiresAncestor;
exports.forbidsDescendant = forbidsDescendant;
exports.hasStrictChildren = hasStrictChildren;
exports.getAllowedChildren = getAllowedChildren;
exports.isPinnedToParent = isPinnedToParent;
// -----------------------------------------------------------------------------
// Shared Constraint Arrays (reused across multiple components)
// -----------------------------------------------------------------------------
/** Forms cannot be nested inside each other */
const FORBID_INSIDE_FORMS = [
    { is: 'FormWrapper', rule: 'Forbid' },
    { is: 'SearchForm', rule: 'Forbid' },
];
/** Form elements forbidden inside FormForm */
const FORBID_INSIDE_FORM_FORM = [
    { is: 'FormForm', rule: 'Forbid' },
    { is: 'FormWrapper', rule: 'Forbid' },
    { is: 'SearchForm', rule: 'Forbid' },
];
/** Links cannot be nested inside other links */
const FORBID_LINK_DESCENDANTS = [
    { is: 'Link', rule: 'Forbid' },
    { is: 'LinkBlock', rule: 'Forbid' },
    { is: 'TextLink', rule: 'Forbid' },
    { is: 'TabsLink', rule: 'Forbid' },
    { is: 'NavbarLink', rule: 'Forbid' },
    { is: 'NavbarBrand', rule: 'Forbid' },
    { is: 'DropdownLink', rule: 'Forbid' },
    { is: 'LightboxWrapper', rule: 'Forbid' },
    { is: 'RichText', rule: 'Forbid' },
    { is: 'Video', rule: 'Forbid' },
    { is: 'FormWrapper', rule: 'Forbid' },
    { is: 'SearchForm', rule: 'Forbid' },
];
/** Form fields forbidden as descendants of FormCheckboxWrapper/FormRadioWrapper */
const FORBID_FORM_FIELD_DESCENDANTS = [
    { is: 'FormBlockLabel', rule: 'Forbid' },
    { is: 'FormButton', rule: 'Forbid' },
    { is: 'FormCheckboxWrapper', rule: 'Forbid' },
    { is: 'FormFileUploadWrapper', rule: 'Forbid' },
    { is: 'FormRadioWrapper', rule: 'Forbid' },
    { is: 'FormReCaptcha', rule: 'Forbid' },
    { is: 'FormSelect', rule: 'Forbid' },
    { is: 'FormTextarea', rule: 'Forbid' },
    { is: 'FormTextInput', rule: 'Forbid' },
];
// -----------------------------------------------------------------------------
// All Component Constraints
// -----------------------------------------------------------------------------
exports.WEBFLOW_CONSTRAINTS = {
    // ===========================================================================
    // LAYOUT GRID COMPONENTS
    // ===========================================================================
    Row: {
        displayName: 'Row',
        constraints: {
            children: [{ is: 'Column', rule: 'AtLeastOne' }]
        }
    },
    Column: {
        displayName: 'Column',
        constraints: {
            pinToParent: true,
            parent: [{ is: 'Row', rule: 'ExactlyOne' }]
        }
    },
    Grid: {
        displayName: 'Grid',
        constraints: {}
    },
    HFlex: {
        displayName: 'H Flex',
        constraints: {}
    },
    VFlex: {
        displayName: 'V Flex',
        constraints: {}
    },
    // ===========================================================================
    // BASIC COMPONENTS
    // ===========================================================================
    Block: {
        displayName: 'Div Block',
        constraints: {}
    },
    Section: {
        displayName: 'Section',
        constraints: {}
    },
    BlockContainer: {
        displayName: 'Container',
        constraints: {}
    },
    Link: {
        displayName: 'Link',
        constraints: {
            descendants: FORBID_LINK_DESCENDANTS
        }
    },
    LinkBlock: {
        displayName: 'Link Block',
        constraints: {
            descendants: FORBID_LINK_DESCENDANTS
        }
    },
    TextLink: {
        displayName: 'Text Link',
        constraints: {
            descendants: FORBID_LINK_DESCENDANTS
        }
    },
    Button: {
        displayName: 'Button',
        constraints: {
            descendants: FORBID_LINK_DESCENDANTS
        }
    },
    List: {
        displayName: 'List',
        constraints: {
            children: [{ is: 'ListItem', name: 'Non-List Item', rule: 'RequireOnly' }]
        }
    },
    ListItem: {
        displayName: 'List Item',
        constraints: {
            parent: [{ is: 'List', rule: 'ExactlyOne' }]
        }
    },
    Image: {
        displayName: 'Image',
        constraints: {}
    },
    Video: {
        displayName: 'Video',
        constraints: {}
    },
    Icon: {
        displayName: 'Icon',
        constraints: {}
    },
    HamburgerIcon: {
        displayName: 'Hamburger Icon',
        constraints: {}
    },
    HtmlEmbed: {
        displayName: 'HTML Embed',
        constraints: {}
    },
    LineBreak: {
        displayName: 'Line Break',
        constraints: {}
    },
    // ===========================================================================
    // TYPOGRAPHY COMPONENTS
    // ===========================================================================
    Heading: {
        displayName: 'Heading',
        constraints: {}
    },
    Paragraph: {
        displayName: 'Paragraph',
        constraints: {}
    },
    Span: {
        displayName: 'Span',
        constraints: {}
    },
    Blockquote: {
        displayName: 'Block Quote',
        constraints: {}
    },
    RichText: {
        displayName: 'Rich Text',
        constraints: {}
    },
    Figure: {
        displayName: 'Figure',
        constraints: {}
    },
    Figcaption: {
        displayName: 'Fig Caption',
        constraints: {}
    },
    // ===========================================================================
    // TEXT FORMATTING (inline elements for rich text)
    // Can be inside: Paragraph, Heading, Block (with data.text), Span, Link, or nested in each other
    // ===========================================================================
    Strong: {
        displayName: 'Strong',
        constraints: {}
    },
    Emphasized: {
        displayName: 'Emphasized',
        constraints: {}
    },
    Superscript: {
        displayName: 'Superscript',
        constraints: {}
    },
    Subscript: {
        displayName: 'Subscript',
        constraints: {}
    },
    InlineCode: {
        displayName: 'Inline Code',
        constraints: {}
    },
    Strikethrough: {
        displayName: 'Strikethrough',
        constraints: {}
    },
    Underline: {
        displayName: 'Underline',
        constraints: {}
    },
    // ===========================================================================
    // NAVBAR COMPONENTS
    // ===========================================================================
    NavbarWrapper: {
        displayName: 'Navbar',
        constraints: {
            descendants: [{ is: 'NavbarWrapper', rule: 'Forbid' }]
        }
    },
    NavbarBrand: {
        displayName: 'Brand',
        constraints: {
            descendants: FORBID_LINK_DESCENDANTS
        }
    },
    NavbarMenu: {
        displayName: 'Nav Menu',
        constraints: {
            ancestors: [{ is: 'NavbarWrapper', rule: 'ExactlyOne' }],
            descendants: [{ is: 'NavbarMenu', rule: 'Forbid' }]
        }
    },
    NavbarLink: {
        displayName: 'Nav Link',
        constraints: {
            ancestors: [{ is: 'NavbarWrapper', rule: 'ExactlyOne' }],
            descendants: FORBID_LINK_DESCENDANTS
        }
    },
    NavbarButton: {
        displayName: 'Menu Button',
        constraints: {
            ancestors: [{ is: 'NavbarWrapper', rule: 'ExactlyOne' }]
        }
    },
    // ===========================================================================
    // DROPDOWN COMPONENTS
    // ===========================================================================
    DropdownWrapper: {
        displayName: 'Dropdown',
        constraints: {
            wraps: ['DropdownToggle', 'DropdownList'],
            descendants: [{ is: 'DropdownWrapper', rule: 'Forbid' }]
        }
    },
    DropdownToggle: {
        displayName: 'Dropdown Toggle',
        constraints: {
            pinToParent: true,
            children: [{ is: 'Icon', rule: 'Forbid' }] // Use Image for chevron/arrow graphics, not Icon
        }
    },
    DropdownList: {
        displayName: 'Dropdown List',
        constraints: {
            pinToParent: true,
            ancestors: [{ is: 'DropdownWrapper', rule: 'AtLeastOne' }]
        }
    },
    DropdownLink: {
        displayName: 'Dropdown Link',
        constraints: {
            ancestors: [
                { is: 'DropdownWrapper', rule: 'AtLeastOne' },
                { is: 'DropdownList', rule: 'AtLeastOne' }
            ],
            descendants: FORBID_LINK_DESCENDANTS
        }
    },
    // ===========================================================================
    // TABS COMPONENTS
    // ===========================================================================
    TabsWrapper: {
        displayName: 'Tabs',
        constraints: {
            children: [{ is: ['TabsMenu', 'TabsContent'], name: 'Non-Tab Item', rule: 'RequireOnly' }],
            descendants: [{ is: 'TabsWrapper', rule: 'Forbid' }]
        }
    },
    TabsMenu: {
        displayName: 'Tabs Menu',
        constraints: {
            pinToParent: true,
            parent: [{ is: 'TabsWrapper', rule: 'ExactlyOne' }],
            children: [
                { is: 'TabsLink', name: 'Non-Tab-Link Item', rule: 'RequireOnly' },
                { is: 'TabsLink', rule: 'AtLeastOne' },
            ]
        }
    },
    TabsContent: {
        displayName: 'Tabs Content',
        constraints: {
            pinToParent: true,
            parent: [{ is: 'TabsWrapper', rule: 'ExactlyOne' }],
            children: [
                { is: 'TabsPane', name: 'Non-Tab-Pane Item', rule: 'RequireOnly' },
                { is: 'TabsPane', rule: 'AtLeastOne' },
            ]
        }
    },
    TabsLink: {
        displayName: 'Tab Link',
        constraints: {
            parent: [{ is: 'TabsMenu', rule: 'RequireOnly' }],
            descendants: FORBID_LINK_DESCENDANTS
        }
    },
    TabsPane: {
        displayName: 'Tab Pane',
        constraints: {
            parent: [{ is: 'TabsContent', rule: 'RequireOnly' }]
        }
    },
    // ===========================================================================
    // SWIPER SLIDER COMPONENTS - minimal constraints, library handles everything
    // ===========================================================================
    SwiperSlider: {
        displayName: 'Swiper Slider',
        constraints: {
            descendants: [{ is: 'SwiperSlider', rule: 'Forbid' }]
        }
    },
    SwiperSlide: {
        displayName: 'Swiper Slide',
        constraints: {
            ancestors: [{ is: 'SwiperSlider', rule: 'AtLeastOne' }]
        }
    },
    SwiperNavPrev: {
        displayName: 'Swiper Nav Prev',
        constraints: {}
    },
    SwiperNavNext: {
        displayName: 'Swiper Nav Next',
        constraints: {}
    },
    SwiperPagination: {
        displayName: 'Swiper Pagination',
        constraints: {}
    },
    SwiperScrollbar: {
        displayName: 'Swiper Scrollbar',
        constraints: {}
    },
    // ===========================================================================
    // FORM COMPONENTS
    // ===========================================================================
    FormWrapper: {
        displayName: 'Form Block',
        constraints: {
            descendants: [
                ...FORBID_INSIDE_FORMS,
                { is: 'FormWrapper', rule: 'Forbid' }
            ]
        }
    },
    FormForm: {
        displayName: 'Form',
        constraints: {
            pinToParent: true,
            ancestors: [{ is: 'FormWrapper', rule: 'AtLeastOne' }],
            descendants: [
                ...FORBID_INSIDE_FORM_FORM,
                { is: 'FormReCaptcha', rule: 'ZeroOrOne' }
            ]
        }
    },
    FormBlockLabel: {
        displayName: 'Label',
        constraints: {
            ancestors: [
                { is: ['FormForm', 'SearchForm'], name: 'Form', rule: 'ExactlyOne' }
            ]
        }
    },
    FormTextInput: {
        displayName: 'Text Field',
        constraints: {
            ancestors: [{ is: 'FormForm', rule: 'ExactlyOne' }]
        }
    },
    FormTextarea: {
        displayName: 'Text Area',
        constraints: {
            ancestors: [{ is: 'FormForm', rule: 'ExactlyOne' }]
        }
    },
    FormSelect: {
        displayName: 'Select',
        constraints: {
            ancestors: [{ is: 'FormForm', rule: 'ExactlyOne' }]
        }
    },
    FormButton: {
        displayName: 'Submit Button',
        constraints: {
            ancestors: [{ is: 'FormForm', rule: 'ExactlyOne' }]
        }
    },
    FormCheckboxWrapper: {
        displayName: 'Checkbox',
        constraints: {
            ancestors: [{ is: 'FormForm', rule: 'ExactlyOne' }],
            descendants: [
                ...FORBID_LINK_DESCENDANTS,
                ...FORBID_FORM_FIELD_DESCENDANTS,
            ]
        }
    },
    FormCheckboxInput: {
        displayName: 'Checkbox Input',
        constraints: {
            ancestors: [{ is: 'FormCheckboxWrapper', rule: 'ExactlyOne' }]
        }
    },
    FormRadioWrapper: {
        displayName: 'Radio Button',
        constraints: {
            ancestors: [{ is: 'FormForm', rule: 'ExactlyOne' }],
            descendants: [
                ...FORBID_LINK_DESCENDANTS,
                ...FORBID_FORM_FIELD_DESCENDANTS,
            ]
        }
    },
    FormRadioInput: {
        displayName: 'Radio Input',
        constraints: {
            ancestors: [{ is: 'FormRadioWrapper', rule: 'ExactlyOne' }]
        }
    },
    FormInlineLabel: {
        displayName: 'Inline Label',
        constraints: {
            pinToParent: true,
            ancestors: [
                { is: ['FormCheckboxWrapper', 'FormRadioWrapper'], rule: 'ExactlyOne' }
            ]
        }
    },
    FormSuccessMessage: {
        displayName: 'Success Message',
        constraints: {
            pinToParent: true,
            ancestors: [{ is: 'FormWrapper', rule: 'ExactlyOne' }]
        }
    },
    FormErrorMessage: {
        displayName: 'Error Message',
        constraints: {
            pinToParent: true,
            ancestors: [{ is: 'FormWrapper', rule: 'ExactlyOne' }]
        }
    },
    FormFileUploadWrapper: {
        displayName: 'File Upload',
        constraints: {
            wraps: ['FormFileUploadDefault', 'FormFileUploadUploading', 'FormFileUploadSuccess', 'FormFileUploadError'],
            ancestors: [{ is: 'FormForm', rule: 'ExactlyOne' }],
            descendants: [
                { is: 'FormTextInput', rule: 'Forbid' },
                { is: 'FormTextarea', rule: 'Forbid' },
                { is: 'FormSelect', rule: 'Forbid' },
                { is: 'FormRadioWrapper', rule: 'Forbid' },
                { is: 'FormCheckboxWrapper', rule: 'Forbid' },
                { is: 'FormButton', rule: 'Forbid' },
                { is: 'FormWrapper', rule: 'Forbid' },
                { is: 'FormFileUploadWrapper', rule: 'Forbid' },
                { is: 'FormReCaptcha', rule: 'Forbid' }
            ]
        }
    },
    FormFileUploadDefault: {
        displayName: 'File Upload Default State',
        constraints: {
            pinToParent: true,
            ancestors: [{ is: 'FormFileUploadWrapper', rule: 'ExactlyOne' }],
            descendants: [
                { is: 'FormFileUploadInput', rule: 'ExactlyOne' },
                { is: 'FormFileUploadLabel', rule: 'ExactlyOne' }
            ]
        }
    },
    FormFileUploadUploading: {
        displayName: 'File Upload Uploading State',
        constraints: {
            pinToParent: true,
            ancestors: [{ is: 'FormFileUploadWrapper', rule: 'ExactlyOne' }]
        }
    },
    FormFileUploadSuccess: {
        displayName: 'File Upload Success State',
        constraints: {
            pinToParent: true,
            ancestors: [{ is: 'FormFileUploadWrapper', rule: 'ExactlyOne' }]
        }
    },
    FormFileUploadError: {
        displayName: 'File Upload Error State',
        constraints: {
            pinToParent: true,
            ancestors: [{ is: 'FormFileUploadWrapper', rule: 'ExactlyOne' }],
            descendants: [
                { is: 'FormFileUploadErrorMsg', rule: 'ExactlyOne' }
            ]
        }
    },
    FormFileUploadInput: {
        displayName: 'File Upload Input',
        constraints: {
            ancestors: [{ is: 'FormFileUploadDefault', rule: 'ExactlyOne' }]
        }
    },
    FormFileUploadLabel: {
        displayName: 'File Upload Label',
        constraints: {
            ancestors: [{ is: 'FormFileUploadDefault', rule: 'ExactlyOne' }]
        }
    },
    FormFileUploadErrorMsg: {
        displayName: 'File Upload Error Message',
        constraints: {
            ancestors: [{ is: 'FormFileUploadError', rule: 'ExactlyOne' }]
        }
    },
    FormReCaptcha: {
        displayName: 'reCAPTCHA',
        constraints: {
            ancestors: [{ is: 'FormForm', rule: 'ExactlyOne' }]
        }
    },
    // ===========================================================================
    // SEARCH COMPONENTS
    // ===========================================================================
    SearchForm: {
        displayName: 'Search',
        constraints: {
            descendants: FORBID_INSIDE_FORMS
        }
    },
    SearchInput: {
        displayName: 'Search Input',
        constraints: {
            ancestors: [{ is: 'SearchForm', rule: 'ExactlyOne' }]
        }
    },
    SearchButton: {
        displayName: 'Search Button',
        constraints: {
            ancestors: [{ is: 'SearchForm', rule: 'ExactlyOne' }]
        }
    },
    // ===========================================================================
    // OTHER COMPONENTS
    // ===========================================================================
    LightboxWrapper: {
        displayName: 'Lightbox Link',
        constraints: {
            descendants: FORBID_LINK_DESCENDANTS
        }
    },
    MapWidget: {
        displayName: 'Map',
        constraints: {
            ancestors: [{ is: 'DynamoItem', rule: 'Forbid' }]
        }
    },
    CodeBlock: {
        displayName: 'Code Block',
        constraints: {
            // CodeBlock can only be inside RichText (content editor)
            ancestors: [{ is: 'RichText', rule: 'ExactlyOne' }]
        }
    },
    // ===========================================================================
    // BACKGROUND VIDEO COMPONENTS
    // ===========================================================================
    BackgroundVideoWrapper: {
        displayName: 'Background Video',
        constraints: {
            // BackgroundVideoPlayPauseButton is optional (ZeroOrOne), not required
            children: [{ is: 'BackgroundVideoPlayPauseButton', rule: 'ZeroOrOne' }],
            descendants: [{ is: 'BackgroundVideoWrapper', rule: 'Forbid' }]
        }
    },
    BackgroundVideoPlayPauseButton: {
        displayName: 'BG Video Button',
        constraints: {
            pinToParent: true,
            wraps: ['BackgroundVideoPlayPauseButtonPlaying', 'BackgroundVideoPlayPauseButtonPaused'],
            ancestors: [{ is: 'BackgroundVideoWrapper', rule: 'ExactlyOne' }],
            children: [
                { is: 'BackgroundVideoPlayPauseButtonPlaying', rule: 'ExactlyOne' },
                { is: 'BackgroundVideoPlayPauseButtonPaused', rule: 'ExactlyOne' }
            ]
        }
    },
    BackgroundVideoPlayPauseButtonPlaying: {
        displayName: 'BG Video Playing State',
        constraints: {
            pinToParent: true,
            ancestors: [{ is: 'BackgroundVideoPlayPauseButton', rule: 'ExactlyOne' }],
            descendants: [
                ...FORBID_LINK_DESCENDANTS,
                { is: 'BackgroundVideoWrapper', rule: 'Forbid' }
            ]
        }
    },
    BackgroundVideoPlayPauseButtonPaused: {
        displayName: 'BG Video Paused State',
        constraints: {
            pinToParent: true,
            ancestors: [{ is: 'BackgroundVideoPlayPauseButton', rule: 'ExactlyOne' }],
            descendants: [
                ...FORBID_LINK_DESCENDANTS,
                { is: 'BackgroundVideoWrapper', rule: 'Forbid' }
            ]
        }
    },
    // ===========================================================================
    // CMS COMPONENTS
    // ===========================================================================
    DynamoWrapper: {
        displayName: 'Collection List Wrapper',
        constraints: {
            children: [
                { is: ['DynamoList', 'DynamoEmpty'], name: 'Element', rule: 'RequireOnly' },
            ]
        }
    },
    DynamoList: {
        displayName: 'Collection List',
        constraints: {
            pinToParent: true,
            children: [{ is: 'DynamoItem', name: 'Element', rule: 'RequireOnly' }]
        }
    },
    DynamoItem: {
        displayName: 'Collection Item',
        constraints: {
            pinToParent: true,
        }
    },
    DynamoEmpty: {
        displayName: 'Empty State',
        constraints: {
            pinToParent: true,
            descendants: [{ is: 'DynamoWrapper', rule: 'Forbid' }]
        }
    },
};
// -----------------------------------------------------------------------------
// Helper Functions
// -----------------------------------------------------------------------------
/** Get constraints for a component type */
function getConstraints(type) {
    var _a;
    return ((_a = exports.WEBFLOW_CONSTRAINTS[type]) === null || _a === void 0 ? void 0 : _a.constraints) || {};
}
/** Get display name for a component type */
function getDisplayName(type) {
    var _a;
    return ((_a = exports.WEBFLOW_CONSTRAINTS[type]) === null || _a === void 0 ? void 0 : _a.displayName) || type;
}
/** Check if component requires a specific ancestor */
function requiresAncestor(type, ancestorType) {
    const constraints = getConstraints(type);
    if (!constraints.ancestors)
        return false;
    return constraints.ancestors.some(c => {
        const types = Array.isArray(c.is) ? c.is : [c.is];
        return types.includes(ancestorType) && (c.rule === 'AtLeastOne' || c.rule === 'ExactlyOne');
    });
}
/** Check if component forbids a specific descendant */
function forbidsDescendant(type, descendantType) {
    const constraints = getConstraints(type);
    if (!constraints.descendants)
        return false;
    return constraints.descendants.some(c => {
        const types = Array.isArray(c.is) ? c.is : [c.is];
        return types.includes(descendantType) && c.rule === 'Forbid';
    });
}
/** Check if component has strict children requirements */
function hasStrictChildren(type) {
    var _a;
    const constraints = getConstraints(type);
    return ((_a = constraints.children) === null || _a === void 0 ? void 0 : _a.some(c => c.rule === 'RequireOnly')) || false;
}
/** Get allowed child types for a component (if RequireOnly constraint exists) */
function getAllowedChildren(type) {
    var _a;
    const constraints = getConstraints(type);
    const strictChildren = (_a = constraints.children) === null || _a === void 0 ? void 0 : _a.find(c => c.rule === 'RequireOnly');
    if (!strictChildren)
        return null;
    return Array.isArray(strictChildren.is) ? strictChildren.is : [strictChildren.is];
}
/** Check if component must be pinned to parent */
function isPinnedToParent(type) {
    return getConstraints(type).pinToParent || false;
}
// -----------------------------------------------------------------------------
// Hierarchy Chains (common parent-child patterns)
// -----------------------------------------------------------------------------
exports.HIERARCHY_CHAINS = {
    navbar: ['NavbarWrapper', ['NavbarBrand', 'NavbarMenu', 'NavbarButton'], 'NavbarLink'],
    dropdown: ['DropdownWrapper', ['DropdownToggle', 'DropdownList'], 'DropdownLink'],
    tabs: ['TabsWrapper', ['TabsMenu', 'TabsContent'], ['TabsLink', 'TabsPane']],
    swiper: ['SwiperSlider', ['SwiperSlide', 'SwiperNavPrev', 'SwiperNavNext', 'SwiperPagination', 'SwiperScrollbar']],
    form: ['FormWrapper', 'FormForm', ['FormTextInput', 'FormTextarea', 'FormSelect', 'FormButton', 'FormBlockLabel', 'FormCheckboxWrapper', 'FormRadioWrapper']],
    checkbox: ['FormCheckboxWrapper', ['FormCheckboxInput', 'FormInlineLabel']],
    radio: ['FormRadioWrapper', ['FormRadioInput', 'FormInlineLabel']],
    fileUpload: ['FormFileUploadWrapper', ['FormFileUploadDefault', 'FormFileUploadUploading', 'FormFileUploadSuccess', 'FormFileUploadError']],
    list: ['List', 'ListItem'],
    search: ['SearchForm', ['SearchInput', 'SearchButton', 'FormBlockLabel']],
    cms: ['DynamoWrapper', ['DynamoList', 'DynamoEmpty'], 'DynamoItem'],
    row: ['Row', 'Column'],
    bgVideo: ['BackgroundVideoWrapper', 'BackgroundVideoPlayPauseButton', ['BackgroundVideoPlayPauseButtonPlaying', 'BackgroundVideoPlayPauseButtonPaused']],
};
