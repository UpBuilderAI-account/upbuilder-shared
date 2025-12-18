"use strict";
// ============================================================================
// WEBFLOW EXPORT TYPES
// Shared types and constants for Webflow structure conversion
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEBFLOW_HIERARCHY_VALIDATION_CHECKLIST = exports.WEBFLOW_SLIDER_HIERARCHY_DOCS = exports.WEBFLOW_FORM_HIERARCHY_DOCS = exports.WEBFLOW_NAVBAR_HIERARCHY_DOCS = exports.WEBFLOW_COMPONENT_TYPES_FOR_PROMPT = exports.WEBFLOW_COMPONENT_TYPES_LIST = exports.NAVBAR_VALIDATION_CLASSES = exports.WEBFLOW_STATE_VARIANTS = exports.WEBFLOW_RESPONSIVE_BREAKPOINTS = exports.WEBFLOW_BREAKPOINTS = void 0;
// Runtime arrays for iteration
exports.WEBFLOW_BREAKPOINTS = ['main', 'medium', 'small', 'tiny'];
exports.WEBFLOW_RESPONSIVE_BREAKPOINTS = ['medium', 'small', 'tiny'];
exports.WEBFLOW_STATE_VARIANTS = [
    'hover',
    'focus',
    'active',
    'checked',
    'disabled',
    'current',
    'pressed'
];
// -----------------------------------------------------------------------------
// Validation Classes
// -----------------------------------------------------------------------------
exports.NAVBAR_VALIDATION_CLASSES = {
    backgroundWrapper: 'navigationwrapper-bg',
    containerLayout: 'navigationbar_container'
};
// -----------------------------------------------------------------------------
// Prompt Generation Helpers
// -----------------------------------------------------------------------------
exports.WEBFLOW_COMPONENT_TYPES_LIST = {
    basic: ['Block', 'Section', 'Heading', 'Paragraph', 'Image', 'Link', 'Button', 'List', 'ListItem', 'Icon'],
    navigation: ['NavbarWrapper', 'NavbarContainer', 'NavbarBrand', 'NavbarMenu', 'NavbarLink', 'NavbarButton', 'DropdownWrapper', 'DropdownToggle', 'DropdownList', 'DropdownLink'],
    forms: ['FormWrapper', 'FormForm', 'FormTextInput', 'FormTextarea', 'FormButton', 'FormBlockLabel', 'FormInlineLabel', 'FormCheckboxWrapper', 'FormCheckboxInput', 'FormRadioWrapper', 'FormRadioInput', 'FormSelect', 'FormSuccessMessage', 'FormErrorMessage'],
    sliders: ['SliderContainer', 'SliderWrapper', 'SliderSlide', 'SliderNavigation', 'SliderArrowPrev', 'SliderArrowNext', 'SliderPagination']
};
// Pre-formatted string for prompts
exports.WEBFLOW_COMPONENT_TYPES_FOR_PROMPT = `Basic: ${exports.WEBFLOW_COMPONENT_TYPES_LIST.basic.join(', ')}
Navigation: ${exports.WEBFLOW_COMPONENT_TYPES_LIST.navigation.join(', ')}
Forms: ${exports.WEBFLOW_COMPONENT_TYPES_LIST.forms.join(', ')}
Sliders: ${exports.WEBFLOW_COMPONENT_TYPES_LIST.sliders.join(', ')}`;
// -----------------------------------------------------------------------------
// Hierarchy Documentation for Prompts
// Single source of truth - used by Phase 2 and Phase 3 prompts
// -----------------------------------------------------------------------------
exports.WEBFLOW_NAVBAR_HIERARCHY_DOCS = `## ⚠️ CRITICAL: NAVBAR HIERARCHY

**Webflow navbar has STRICT parent-child requirements. Breaking these causes import errors.**

### CORRECT Navbar Structure:
\`\`\`
NavbarWrapper (parent: Section or Block)
  └── NavbarContainer (DIRECT child - NO BLOCKS IN BETWEEN!)
      ├── NavbarBrand (DIRECT child)
      ├── NavbarMenu (DIRECT child)
      │   └── NavbarLink (DIRECT children - NO BLOCKS!)
      └── NavbarButton (DIRECT child)
\`\`\`

### ✅ CORRECT Example:
\`\`\`
id: "nav_section" | compType: "Section" | parent: "BODY"
id: "nav_wrapper" | compType: "NavbarWrapper" | parent: "nav_section" | collapse: "medium"
id: "nav_container" | compType: "NavbarContainer" | parent: "nav_wrapper"
id: "nav_brand" | compType: "NavbarBrand" | parent: "nav_container"
id: "nav_menu" | compType: "NavbarMenu" | parent: "nav_container"
id: "nav_link_1" | compType: "NavbarLink" | parent: "nav_menu"
id: "nav_button" | compType: "NavbarButton" | parent: "nav_container"
\`\`\`

### ❌ WRONG Examples:
- Block between NavbarWrapper and NavbarContainer → BREAKS IMPORT
- NavbarLinks inside Blocks instead of direct NavbarMenu children → BREAKS IMPORT
- Multiple NavbarWrappers nested → BREAKS IMPORT

### Key Rules:
1. **NavbarContainer** → MUST be DIRECT child of **NavbarWrapper**
2. **NavbarBrand/Menu/Button** → MUST be DIRECT children of **NavbarContainer**
3. **NavbarLink** → MUST be DIRECT child of **NavbarMenu**
4. **ONE NavbarWrapper** per navbar - never nest`;
exports.WEBFLOW_FORM_HIERARCHY_DOCS = `## Form Hierarchy

### Required Structure:
\`\`\`
FormWrapper
├── FormForm
│   ├── FormBlockLabel + FormTextInput (pairs)
│   ├── FormCheckboxWrapper (for checkboxes)
│   │   ├── FormCheckboxInput
│   │   └── Span (label text)
│   ├── FormRadioWrapper (for radios)
│   │   ├── FormRadioInput
│   │   └── Span (label text)
│   ├── FormTextarea
│   └── FormButton
├── FormSuccessMessage
└── FormErrorMessage
\`\`\`

### Key Rules:
1. **FormCheckboxInput** → MUST be inside **FormCheckboxWrapper**
2. **FormRadioInput** → MUST be inside **FormRadioWrapper**
3. **Wrapper tag** → Use \`tag: "label"\` for checkbox/radio wrappers
4. **Label text** → Goes as sibling **Span** inside wrapper
5. **NEVER** nest FormWrapper inside FormWrapper`;
exports.WEBFLOW_SLIDER_HIERARCHY_DOCS = `## Slider Hierarchy

### Required Structure:
\`\`\`
SliderContainer
├── SliderWrapper
│   └── SliderSlide (multiple)
├── SliderNavigation
│   ├── SliderArrowPrev
│   └── SliderArrowNext
└── SliderPagination
\`\`\`

### Key Rules:
1. **NEVER** nest SliderContainer inside SliderContainer
2. **NEVER** put SliderWrapper outside of SliderContainer
3. **NEVER** put Block between SliderContainer and SliderWrapper`;
exports.WEBFLOW_HIERARCHY_VALIDATION_CHECKLIST = `### Validation Checklist:
- [ ] NavbarContainer is DIRECT child of NavbarWrapper (NO BLOCKS BETWEEN)
- [ ] NavbarBrand/Menu/Button are DIRECT children of NavbarContainer
- [ ] NavbarLinks are DIRECT children of NavbarMenu (NOT inside Blocks)
- [ ] Only ONE NavbarWrapper per navbar
- [ ] FormCheckboxInput is inside FormCheckboxWrapper
- [ ] FormRadioInput is inside FormRadioWrapper
- [ ] Checkbox/Radio wrappers contain Span for label text`;
