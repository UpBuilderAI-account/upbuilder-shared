// ============================================================================
// WEBFLOW EXPORT TYPES
// Shared types and constants for Webflow structure conversion
// ============================================================================

// -----------------------------------------------------------------------------
// Component Types
// -----------------------------------------------------------------------------

export type WebflowBasicComponent =
  | 'Block'
  | 'Section'
  | 'Heading'
  | 'Paragraph'
  | 'Image'
  | 'Link'
  | 'Button'
  | 'List'
  | 'ListItem'
  | 'Icon';

export type WebflowNavComponent =
  | 'NavbarWrapper'
  | 'NavbarContainer'
  | 'NavbarBrand'
  | 'NavbarMenu'
  | 'NavbarLink'
  | 'NavbarButton'
  | 'DropdownWrapper'
  | 'DropdownToggle'
  | 'DropdownList'
  | 'DropdownLink';

export type WebflowFormComponent =
  | 'FormWrapper'
  | 'FormForm'
  | 'FormTextInput'
  | 'FormTextarea'
  | 'FormButton'
  | 'FormBlockLabel'
  | 'FormInlineLabel'
  | 'FormCheckboxWrapper'
  | 'FormCheckboxInput'
  | 'FormRadioWrapper'
  | 'FormRadioInput'
  | 'FormSelect'
  | 'FormSuccessMessage'
  | 'FormErrorMessage';

export type WebflowSliderComponent =
  | 'SliderContainer'
  | 'SliderWrapper'
  | 'SliderSlide'
  | 'SliderNavigation'
  | 'SliderArrowPrev'
  | 'SliderArrowNext'
  | 'SliderPagination';

export type WebflowComponentType =
  | WebflowBasicComponent
  | WebflowNavComponent
  | WebflowFormComponent
  | WebflowSliderComponent;

// -----------------------------------------------------------------------------
// Breakpoints & States
// -----------------------------------------------------------------------------

export type WebflowBreakpoint = 'main' | 'medium' | 'small' | 'tiny';

export type WebflowStateVariant =
  | 'hover'
  | 'focus'
  | 'active'
  | 'checked'
  | 'disabled'
  | 'current'
  | 'pressed';

// Runtime arrays for iteration
export const WEBFLOW_BREAKPOINTS: WebflowBreakpoint[] = ['main', 'medium', 'small', 'tiny'];
export const WEBFLOW_RESPONSIVE_BREAKPOINTS: Exclude<WebflowBreakpoint, 'main'>[] = ['medium', 'small', 'tiny'];
export const WEBFLOW_STATE_VARIANTS: WebflowStateVariant[] = [
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

export const NAVBAR_VALIDATION_CLASSES = {
  backgroundWrapper: 'navigationwrapper-bg',
  containerLayout: 'navigationbar_container'
} as const;

// -----------------------------------------------------------------------------
// Prompt Generation Helpers
// -----------------------------------------------------------------------------

export const WEBFLOW_COMPONENT_TYPES_LIST = {
  basic: ['Block', 'Section', 'Heading', 'Paragraph', 'Image', 'Link', 'Button', 'List', 'ListItem', 'Icon'],
  navigation: ['NavbarWrapper', 'NavbarContainer', 'NavbarBrand', 'NavbarMenu', 'NavbarLink', 'NavbarButton', 'DropdownWrapper', 'DropdownToggle', 'DropdownList', 'DropdownLink'],
  forms: ['FormWrapper', 'FormForm', 'FormTextInput', 'FormTextarea', 'FormButton', 'FormBlockLabel', 'FormInlineLabel', 'FormCheckboxWrapper', 'FormCheckboxInput', 'FormRadioWrapper', 'FormRadioInput', 'FormSelect', 'FormSuccessMessage', 'FormErrorMessage'],
  sliders: ['SliderContainer', 'SliderWrapper', 'SliderSlide', 'SliderNavigation', 'SliderArrowPrev', 'SliderArrowNext', 'SliderPagination']
} as const;

// Pre-formatted string for prompts
export const WEBFLOW_COMPONENT_TYPES_FOR_PROMPT = `Basic: ${WEBFLOW_COMPONENT_TYPES_LIST.basic.join(', ')}
Navigation: ${WEBFLOW_COMPONENT_TYPES_LIST.navigation.join(', ')}
Forms: ${WEBFLOW_COMPONENT_TYPES_LIST.forms.join(', ')}
Sliders: ${WEBFLOW_COMPONENT_TYPES_LIST.sliders.join(', ')}`;

// -----------------------------------------------------------------------------
// Hierarchy Documentation for Prompts
// Single source of truth - used by Phase 2 and Phase 3 prompts
// -----------------------------------------------------------------------------

export const WEBFLOW_NAVBAR_HIERARCHY_DOCS = `## ⚠️ CRITICAL: NAVBAR HIERARCHY

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

export const WEBFLOW_FORM_HIERARCHY_DOCS = `## Form Hierarchy

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

export const WEBFLOW_SLIDER_HIERARCHY_DOCS = `## Slider Hierarchy

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

export const WEBFLOW_HIERARCHY_VALIDATION_CHECKLIST = `### Validation Checklist:
- [ ] NavbarContainer is DIRECT child of NavbarWrapper (NO BLOCKS BETWEEN)
- [ ] NavbarBrand/Menu/Button are DIRECT children of NavbarContainer
- [ ] NavbarLinks are DIRECT children of NavbarMenu (NOT inside Blocks)
- [ ] Only ONE NavbarWrapper per navbar
- [ ] FormCheckboxInput is inside FormCheckboxWrapper
- [ ] FormRadioInput is inside FormRadioWrapper
- [ ] Checkbox/Radio wrappers contain Span for label text`;
