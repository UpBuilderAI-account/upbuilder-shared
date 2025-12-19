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

export type WebflowComponentType =
  | WebflowBasicComponent
  | WebflowNavComponent
  | WebflowFormComponent;

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
  forms: ['FormWrapper', 'FormForm', 'FormTextInput', 'FormTextarea', 'FormButton', 'FormBlockLabel', 'FormInlineLabel', 'FormCheckboxWrapper', 'FormCheckboxInput', 'FormRadioWrapper', 'FormRadioInput', 'FormSelect', 'FormSuccessMessage', 'FormErrorMessage']
} as const;

// Pre-formatted string for prompts
export const WEBFLOW_COMPONENT_TYPES_FOR_PROMPT = `Basic: ${WEBFLOW_COMPONENT_TYPES_LIST.basic.join(', ')}
Navigation: ${WEBFLOW_COMPONENT_TYPES_LIST.navigation.join(', ')}
Forms: ${WEBFLOW_COMPONENT_TYPES_LIST.forms.join(', ')}`;

// -----------------------------------------------------------------------------
// Hierarchy Documentation for Prompts
// Single source of truth - used by Phase 2 and Phase 3 prompts
// -----------------------------------------------------------------------------

export const WEBFLOW_NAVBAR_HIERARCHY_DOCS = `## ⚠️ CRITICAL: NAVBAR HIERARCHY - IMPORT WILL FAIL IF VIOLATED

**Webflow navbar has STRICT parent-child requirements. Breaking these causes "can only be pasted in" errors.**

### CORRECT Navbar Structure:
\`\`\`
NavbarWrapper (parent: Section or Block)
  └── NavbarContainer (DIRECT child - NO BLOCKS IN BETWEEN!)
      ├── NavbarBrand (DIRECT child)
      ├── NavbarMenu (DIRECT child)
      │   └── NavbarLink (DIRECT children - NO BLOCKS! NO WRAPPERS!)
      └── NavbarButton (DIRECT child)
\`\`\`

### ✅ CORRECT Example:
\`\`\`
id: "nav_wrapper" | compType: "NavbarWrapper" | parent: "nav_section" | collapse: "medium"
id: "nav_container" | compType: "NavbarContainer" | parent: "nav_wrapper"
id: "nav_brand" | compType: "NavbarBrand" | parent: "nav_container"
id: "nav_menu" | compType: "NavbarMenu" | parent: "nav_container"
id: "nav_link_1" | compType: "NavbarLink" | parent: "nav_menu"  ← parent is NavbarMenu!
id: "nav_link_2" | compType: "NavbarLink" | parent: "nav_menu"  ← parent is NavbarMenu!
id: "nav_button" | compType: "NavbarButton" | parent: "nav_container"
\`\`\`

### ❌ WRONG - NavbarLinks inside Blocks (CAUSES ERROR):
\`\`\`
id: "nav_menu" | compType: "NavbarMenu" | parent: "nav_container"
id: "nav_item_1" | compType: "Block" | parent: "nav_menu"         ← WRONG: Block in menu
id: "nav_link_1" | compType: "NavbarLink" | parent: "nav_item_1"  ← WRONG: Link in Block!
\`\`\`
**This causes: "NavbarLink can only be pasted in NavbarMenu"**

### ❌ WRONG - Using Links instead of NavbarLinks:
\`\`\`
id: "nav_menu" | compType: "NavbarMenu" | parent: "nav_container"
id: "nav_link_1" | compType: "Link" | parent: "nav_menu"  ← WRONG: Use NavbarLink not Link!
\`\`\`

### Key Rules:
1. **NavbarLink** → MUST be DIRECT child of **NavbarMenu** (NOT inside Blocks/wrappers!)
2. **NavbarContainer** → MUST be DIRECT child of **NavbarWrapper**
3. **NavbarBrand/Menu/Button** → MUST be DIRECT children of **NavbarContainer**
4. **Don't wrap nav items** → If HTML has nav-item divs, SKIP them - put NavbarLink directly in NavbarMenu`;

export const WEBFLOW_FORM_HIERARCHY_DOCS = `## ⚠️ CRITICAL: FORM HIERARCHY - IMPORT WILL FAIL IF VIOLATED

**Form inputs have STRICT placement rules. "Text Field can only be pasted in a Form" errors happen when violated.**

### Required Structure:
\`\`\`
FormWrapper (must wrap entire form)
├── FormForm (all inputs go DIRECTLY here - not in nested Blocks!)
│   ├── FormBlockLabel
│   ├── FormTextInput (DIRECT child of FormForm!)
│   ├── FormTextarea (DIRECT child of FormForm!)
│   ├── FormSelect (DIRECT child of FormForm!)
│   ├── FormCheckboxWrapper (for checkboxes)
│   │   ├── FormCheckboxInput
│   │   └── Span (label text)
│   ├── FormRadioWrapper (for radios)
│   │   ├── FormRadioInput
│   │   └── Span (label text)
│   └── FormButton
├── FormSuccessMessage
└── FormErrorMessage
\`\`\`

### ✅ CORRECT Form Example:
\`\`\`
id: "form_wrapper" | compType: "FormWrapper" | parent: "section"
id: "form_form" | compType: "FormForm" | parent: "form_wrapper"
id: "form_label_1" | compType: "FormBlockLabel" | parent: "form_form"
id: "form_input_1" | compType: "FormTextInput" | parent: "form_form"  ← parent is FormForm!
id: "form_label_2" | compType: "FormBlockLabel" | parent: "form_form"
id: "form_input_2" | compType: "FormTextInput" | parent: "form_form"  ← parent is FormForm!
id: "form_submit" | compType: "FormButton" | parent: "form_form"
\`\`\`

### ❌ WRONG - Inputs in Blocks (CAUSES ERROR):
\`\`\`
id: "form_form" | compType: "FormForm" | parent: "form_wrapper"
id: "field_group" | compType: "Block" | parent: "form_form"        ← WRONG: Block wrapper
id: "input_1" | compType: "FormTextInput" | parent: "field_group"  ← WRONG: Input in Block!
\`\`\`
**This causes: "Text Field can only be pasted in a Form"**

### ❌ WRONG - Inputs outside FormWrapper:
\`\`\`
id: "search_box" | compType: "Block" | parent: "header"
id: "search_input" | compType: "FormTextInput" | parent: "search_box"  ← WRONG: No FormWrapper!
\`\`\`
**For search inputs, wrap in FormWrapper/FormForm or use plain HTML input via Block.**

### Key Rules:
1. **FormTextInput/Textarea/Select** → MUST be DIRECT children of **FormForm** (NOT in Blocks!)
2. **FormForm** → MUST be inside **FormWrapper**
3. **FormCheckboxInput** → MUST be inside **FormCheckboxWrapper**
4. **FormRadioInput** → MUST be inside **FormRadioWrapper**
5. **Don't wrap form fields in Blocks** → If HTML has field-group divs, SKIP them`;

export const WEBFLOW_DROPDOWN_HIERARCHY_DOCS = `## Dropdown Hierarchy

### Required Structure:
\`\`\`
DropdownWrapper (child of NavbarMenu or standalone)
├── DropdownToggle (DIRECT child)
└── DropdownList (DIRECT child)
    └── DropdownLink (DIRECT children - NOT in Blocks!)
\`\`\`

### Key Rules:
1. **DropdownToggle** → MUST be DIRECT child of DropdownWrapper
2. **DropdownList** → MUST be DIRECT child of DropdownWrapper
3. **DropdownLink** → MUST be DIRECT children of DropdownList (NOT in Blocks!)
4. **Don't wrap dropdown items in Blocks** → If HTML has dropdown-item divs, SKIP them`;

export const WEBFLOW_HIERARCHY_VALIDATION_CHECKLIST = `### ⚠️ VALIDATION CHECKLIST (CHECK BEFORE OUTPUT):

**Navbar - MUST verify:**
- [ ] NavbarLinks are DIRECT children of NavbarMenu (NOT wrapped in Blocks!)
- [ ] NavbarContainer is DIRECT child of NavbarWrapper
- [ ] NavbarBrand/Menu/Button are DIRECT children of NavbarContainer
- [ ] If HTML has nav-item divs wrapping links, those divs are SKIPPED

**Dropdowns - MUST verify:**
- [ ] DropdownToggle is DIRECT child of DropdownWrapper
- [ ] DropdownList is DIRECT child of DropdownWrapper
- [ ] DropdownLinks are DIRECT children of DropdownList (NOT wrapped in Blocks!)
- [ ] If HTML has dropdown-item divs wrapping links, those divs are SKIPPED

**Forms - MUST verify:**
- [ ] FormTextInput/Textarea/Select are DIRECT children of FormForm (NOT in Blocks!)
- [ ] FormForm is inside FormWrapper
- [ ] FormCheckboxInput is inside FormCheckboxWrapper
- [ ] FormRadioInput is inside FormRadioWrapper
- [ ] If HTML has field-group divs wrapping inputs, those divs are SKIPPED`;
