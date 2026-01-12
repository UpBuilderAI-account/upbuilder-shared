// ============================================================================
// WEBFLOW PROMPT DOCUMENTATION GENERATORS
// Generates documentation strings for AI prompts
// Single source of truth - all prompts import from here
// ============================================================================

import { WEBFLOW_COMPONENTS, COMPONENTS_BY_CATEGORY } from './components';
import { generateBreakpointDocsForPrompt, generateStateDocsForPrompt } from './breakpoints';

// -----------------------------------------------------------------------------
// Component List Documentation
// -----------------------------------------------------------------------------

/**
 * Generate a formatted list of all component types for prompts
 */
export function generateComponentListForPrompt(): string {
  const categories = [
    { key: 'basic', name: 'Basic' },
    { key: 'typography', name: 'Typography' },
    { key: 'text-formatting', name: 'Text Formatting' },
    { key: 'navigation', name: 'Navigation' },
    { key: 'dropdown', name: 'Dropdown' },
    { key: 'tabs', name: 'Tabs' },
    { key: 'slider', name: 'Slider' },
    { key: 'form', name: 'Forms' },
    { key: 'search', name: 'Search' },
    { key: 'media', name: 'Media' },
  ] as const;

  const lines: string[] = ['## Valid compType Values\n'];

  for (const { key, name } of categories) {
    const components = COMPONENTS_BY_CATEGORY[key as keyof typeof COMPONENTS_BY_CATEGORY];
    if (components && components.length > 0) {
      lines.push(`**${name}:** ${components.join(', ')}`);
    }
  }

  return lines.join('\n');
}

/**
 * Generate a table of components with their tags
 */
export function generateComponentTableForPrompt(): string {
  const lines: string[] = [
    '## Component Types Reference\n',
    '| compType | HTML Tag | Description |',
    '|----------|----------|-------------|',
  ];

  for (const [type, def] of Object.entries(WEBFLOW_COMPONENTS)) {
    const tags = def.tags.join('/');
    lines.push(`| ${type} | ${tags} | ${def.description} |`);
  }

  return lines.join('\n');
}

// -----------------------------------------------------------------------------
// Hierarchy Documentation
// -----------------------------------------------------------------------------

/**
 * Generate navbar hierarchy documentation for prompts
 */
export function generateNavbarHierarchyDocs(): string {
  return `## CRITICAL: NAVBAR HIERARCHY

**Webflow navbar has STRICT parent-child requirements. Breaking these causes import errors.**

### Required Structure:
\`\`\`
NavbarWrapper (parent: Section or Block) [collapse: "medium"]
└── NavbarContainer (DIRECT child - NO BLOCKS IN BETWEEN!)
    ├── NavbarBrand (DIRECT child)
    ├── NavbarMenu (DIRECT child)
    │   └── NavbarLink (DIRECT children - NO BLOCKS!)
    └── NavbarButton (DIRECT child)
\`\`\`

### CORRECT Example:
\`\`\`
id: "nav_wrapper" | compType: "NavbarWrapper" | parent: "section" | collapse: "medium"
id: "nav_container" | compType: "NavbarContainer" | parent: "nav_wrapper"
id: "nav_brand" | compType: "NavbarBrand" | parent: "nav_container"
id: "nav_menu" | compType: "NavbarMenu" | parent: "nav_container"
id: "nav_link_1" | compType: "NavbarLink" | parent: "nav_menu"
id: "nav_link_2" | compType: "NavbarLink" | parent: "nav_menu"
id: "nav_button" | compType: "NavbarButton" | parent: "nav_container"
\`\`\`

### WRONG (CAUSES ERROR):
\`\`\`
id: "nav_menu" | compType: "NavbarMenu" | parent: "nav_container"
id: "nav_item_1" | compType: "Block" | parent: "nav_menu"       ← WRONG
id: "nav_link_1" | compType: "NavbarLink" | parent: "nav_item_1" ← WRONG
\`\`\`
**Error: "NavbarLink can only be pasted in NavbarMenu"**

### Key Rules:
1. **NavbarLink** → DIRECT child of **NavbarMenu** (NOT in Blocks!)
2. **NavbarContainer** → DIRECT child of **NavbarWrapper**
3. **NavbarBrand/Menu/Button** → DIRECT children of **NavbarContainer**
4. Skip wrapper divs - put NavbarLink directly in NavbarMenu`;
}

/**
 * Generate dropdown hierarchy documentation
 */
export function generateDropdownHierarchyDocs(): string {
  return `## CRITICAL: DROPDOWN HIERARCHY

### Required Structure:
\`\`\`
DropdownWrapper (inside NavbarMenu, List, or standalone)
├── DropdownToggle (DIRECT child, pinned)
│   ├── Block (optional text wrapper)
│   └── Icon (dropdown arrow)
└── DropdownList (DIRECT child, pinned)
    └── DropdownLink (DIRECT children - NO BLOCKS!)
\`\`\`

### CORRECT Example:
\`\`\`
id: "dropdown" | compType: "DropdownWrapper" | parent: "nav_menu"
id: "dropdown_toggle" | compType: "DropdownToggle" | parent: "dropdown"
id: "dropdown_text" | compType: "Block" | parent: "dropdown_toggle"
id: "dropdown_icon" | compType: "Icon" | parent: "dropdown_toggle"
id: "dropdown_list" | compType: "DropdownList" | parent: "dropdown"
id: "dropdown_link_1" | compType: "DropdownLink" | parent: "dropdown_list"
id: "dropdown_link_2" | compType: "DropdownLink" | parent: "dropdown_list"
\`\`\`

### Key Rules:
1. **DropdownToggle** → DIRECT child of **DropdownWrapper** (pinned)
2. **DropdownList** → DIRECT child of **DropdownWrapper** (pinned)
3. **DropdownLink** → DIRECT children of **DropdownList** (NO Blocks!)`;
}

/**
 * Generate tabs hierarchy documentation
 */
export function generateTabsHierarchyDocs(): string {
  return `## CRITICAL: TABS HIERARCHY

### Required Structure:
\`\`\`
TabsWrapper
├── TabsMenu (DIRECT child, pinned, exactly one)
│   └── TabsLink (tab buttons)
│       └── Block (optional content)
└── TabsContent (DIRECT child, pinned, exactly one)
    └── TabsPane (tab panels, one per TabsLink)
        └── [any content]
\`\`\`

### CORRECT Example:
\`\`\`
id: "tabs" | compType: "TabsWrapper" | parent: "section"
id: "tabs_menu" | compType: "TabsMenu" | parent: "tabs"
id: "tab_link_1" | compType: "TabsLink" | parent: "tabs_menu"
id: "tab_link_2" | compType: "TabsLink" | parent: "tabs_menu"
id: "tabs_content" | compType: "TabsContent" | parent: "tabs"
id: "tab_pane_1" | compType: "TabsPane" | parent: "tabs_content"
id: "tab_pane_2" | compType: "TabsPane" | parent: "tabs_content"
\`\`\`

### Key Rules:
1. **TabsMenu** → exactly ONE, DIRECT child of **TabsWrapper** (pinned)
2. **TabsContent** → exactly ONE, DIRECT child of **TabsWrapper** (pinned)
3. **TabsLink** → children of **TabsMenu**
4. **TabsPane** → children of **TabsContent**
5. Number of TabsPane MUST match number of TabsLink`;
}

/**
 * Generate slider hierarchy documentation
 */
export function generateSliderHierarchyDocs(): string {
  return `## CRITICAL: SLIDER HIERARCHY

### Required Structure:
\`\`\`
SliderWrapper
├── SliderMask (DIRECT child, pinned, exactly one)
│   └── SliderSlide (slides, pinned)
│       └── [any content]
├── SliderArrow (DIRECT child, pinned) [slider.dir: "left"]
│   └── Icon or Block
├── SliderArrow (DIRECT child, pinned) [slider.dir: "right"]
│   └── Icon or Block
└── SliderNav (DIRECT child, pinned, exactly one)
\`\`\`

### CORRECT Example:
\`\`\`
id: "slider" | compType: "SliderWrapper" | parent: "section"
id: "slider_mask" | compType: "SliderMask" | parent: "slider"
id: "slide_1" | compType: "SliderSlide" | parent: "slider_mask"
id: "slide_2" | compType: "SliderSlide" | parent: "slider_mask"
id: "slider_arrow_left" | compType: "SliderArrow" | parent: "slider"
id: "slider_arrow_right" | compType: "SliderArrow" | parent: "slider"
id: "slider_nav" | compType: "SliderNav" | parent: "slider"
\`\`\`

### Key Rules:
1. **SliderMask** → exactly ONE, DIRECT child of **SliderWrapper** (pinned)
2. **SliderSlide** → children of **SliderMask** (pinned)
3. **SliderArrow** → DIRECT children of **SliderWrapper** (pinned)
4. **SliderNav** → exactly ONE, DIRECT child of **SliderWrapper** (pinned)`;
}

/**
 * Generate form hierarchy documentation
 */
export function generateFormHierarchyDocs(): string {
  return `## CRITICAL: FORM HIERARCHY

**Form inputs have STRICT placement rules. "Text Field can only be pasted in a Form" errors happen when violated.**

### Required Structure:
\`\`\`
FormWrapper (must wrap entire form)
├── FormForm (all inputs go DIRECTLY here)
│   ├── FormBlockLabel
│   ├── FormTextInput (DIRECT child!)
│   ├── FormTextarea (DIRECT child!)
│   ├── FormSelect (DIRECT child!)
│   ├── FormCheckboxWrapper
│   │   ├── FormCheckboxInput
│   │   └── FormInlineLabel
│   ├── FormRadioWrapper
│   │   ├── FormRadioInput
│   │   └── FormInlineLabel
│   └── FormButton
├── FormSuccessMessage (DIRECT child of FormWrapper, pinned)
└── FormErrorMessage (DIRECT child of FormWrapper, pinned)
\`\`\`

### CORRECT Example:
\`\`\`
id: "form_wrapper" | compType: "FormWrapper" | parent: "section"
id: "form_form" | compType: "FormForm" | parent: "form_wrapper"
id: "label_1" | compType: "FormBlockLabel" | parent: "form_form"
id: "input_1" | compType: "FormTextInput" | parent: "form_form"
id: "label_2" | compType: "FormBlockLabel" | parent: "form_form"
id: "textarea_1" | compType: "FormTextarea" | parent: "form_form"
id: "submit" | compType: "FormButton" | parent: "form_form"
id: "success" | compType: "FormSuccessMessage" | parent: "form_wrapper"
id: "error" | compType: "FormErrorMessage" | parent: "form_wrapper"
\`\`\`

### WRONG (CAUSES ERROR):
\`\`\`
id: "form_form" | compType: "FormForm" | parent: "form_wrapper"
id: "field_group" | compType: "Block" | parent: "form_form"      ← WRONG
id: "input_1" | compType: "FormTextInput" | parent: "field_group" ← WRONG
\`\`\`
**Error: "Text Field can only be pasted in a Form"**

### Key Rules:
1. **FormTextInput/Textarea/Select** → DIRECT children of **FormForm** (NOT in Blocks!)
2. **FormForm** → MUST be inside **FormWrapper**
3. **FormCheckboxInput** → inside **FormCheckboxWrapper**
4. **FormRadioInput** → inside **FormRadioWrapper**
5. **FormSuccessMessage/ErrorMessage** → DIRECT children of **FormWrapper** (pinned)
6. Skip field-group wrapper divs`;
}


/**
 * Generate HTML embed documentation
 */
export function generateHtmlEmbedDocs(): string {
  return `## HtmlEmbed Component (SVGs and Custom HTML)

Use HtmlEmbed for inline SVG icons or custom HTML that can't be represented with standard components.

### Format:
\`\`\`
id: "[id]" | compType: "HtmlEmbed" | parent: "[parent]" | styles: [...] | html: "<svg>...</svg>"
\`\`\`

### Example - Arrow Icon:
\`\`\`
id: "arrow_icon" | compType: "HtmlEmbed" | parent: "button" | styles: [] | html: "<svg width='24' height='24' viewBox='0 0 24 24' fill='none'><path d='M5 12h14M12 5l7 7-7 7' stroke='currentColor' stroke-width='2'/></svg>"
\`\`\`

### Key Rules:
1. **html** attribute is REQUIRED
2. Use **single quotes** inside SVG (outer uses double)
3. Use **currentColor** for fills/strokes to inherit color
4. Keep SVGs simple - remove unnecessary attributes`;
}

// -----------------------------------------------------------------------------
// Combined Documentation
// -----------------------------------------------------------------------------

/**
 * Generate complete validation checklist for prompts
 */
export function generateValidationChecklist(): string {
  return `## VALIDATION CHECKLIST (CHECK BEFORE OUTPUT)

### Navbar:
- [ ] NavbarLinks are DIRECT children of NavbarMenu (NOT in Blocks!)
- [ ] NavbarContainer is DIRECT child of NavbarWrapper
- [ ] NavbarBrand/Menu/Button are DIRECT children of NavbarContainer
- [ ] NavbarWrapper has collapse: "medium" attribute

### Dropdowns:
- [ ] DropdownToggle is DIRECT child of DropdownWrapper
- [ ] DropdownList is DIRECT child of DropdownWrapper
- [ ] DropdownLinks are DIRECT children of DropdownList (NOT in Blocks!)

### Tabs:
- [ ] TabsMenu is DIRECT child of TabsWrapper (exactly one)
- [ ] TabsContent is DIRECT child of TabsWrapper (exactly one)
- [ ] TabsLink count matches TabsPane count

### Slider:
- [ ] SliderMask is DIRECT child of SliderWrapper (exactly one)
- [ ] SliderSlide elements are inside SliderMask
- [ ] SliderArrow/SliderNav are DIRECT children of SliderWrapper

### Forms:
- [ ] FormTextInput/Textarea/Select are DIRECT children of FormForm (NOT in Blocks!)
- [ ] FormForm is inside FormWrapper
- [ ] FormCheckboxInput is inside FormCheckboxWrapper
- [ ] FormRadioInput is inside FormRadioWrapper
- [ ] FormSuccessMessage/ErrorMessage are in FormWrapper (NOT in FormForm)

### Lists:
- [ ] List only contains ListItem children
- [ ] ListItem is inside List`;
}

/**
 * Generate all hierarchy documentation combined
 */
export function generateAllHierarchyDocs(): string {
  return [
    '# WEBFLOW STRUCTURE HIERARCHY RULES\n',
    '**CRITICAL: Violating these rules causes Webflow import errors!**\n',
    generateNavbarHierarchyDocs(),
    '',
    generateDropdownHierarchyDocs(),
    '',
    generateTabsHierarchyDocs(),
    '',
    generateSliderHierarchyDocs(),
    '',
    generateFormHierarchyDocs(),
    '',
    generateHtmlEmbedDocs(),
    '',
    generateValidationChecklist(),
  ].join('\n');
}

/**
 * Generate complete prompt documentation (all sections)
 */
export function generateCompletePromptDocs(): string {
  return [
    generateComponentListForPrompt(),
    '',
    generateBreakpointDocsForPrompt(),
    '',
    generateStateDocsForPrompt(),
    '',
    generateAllHierarchyDocs(),
  ].join('\n');
}

// -----------------------------------------------------------------------------
// Compact Documentation (for token-limited prompts)
// -----------------------------------------------------------------------------

/**
 * Generate compact hierarchy rules (shorter version)
 */
export function generateCompactHierarchyRules(): string {
  return `## HIERARCHY RULES (CRITICAL)

**Navbar:** NavbarWrapper → NavbarContainer → NavbarBrand/NavbarMenu/NavbarButton
- NavbarLink must be DIRECT child of NavbarMenu (NO Blocks!)

**Dropdown:** DropdownWrapper → DropdownToggle + DropdownList → DropdownLink
- DropdownLink must be DIRECT child of DropdownList (NO Blocks!)

**Tabs:** TabsWrapper → TabsMenu + TabsContent
- TabsMenu contains TabsLink, TabsContent contains TabsPane

**Slider:** SliderWrapper → SliderMask + SliderArrow + SliderNav
- SliderMask contains SliderSlide

**Form:** FormWrapper → FormForm → FormTextInput/Textarea/Select/Button
- Inputs MUST be DIRECT children of FormForm (NOT in Blocks!)
- FormSuccessMessage/ErrorMessage in FormWrapper (NOT FormForm)

**List:** List → ListItem only`;
}

/**
 * Generate minimal component list (most common only)
 */
export function generateMinimalComponentList(): string {
  return `## Component Types

**Basic:** Block, Section, Link, Button, Image, List, ListItem, HtmlEmbed
**Typography:** Heading, Paragraph, Span, Blockquote
**Navbar:** NavbarWrapper, NavbarContainer, NavbarBrand, NavbarMenu, NavbarLink, NavbarButton
**Dropdown:** DropdownWrapper, DropdownToggle, DropdownList, DropdownLink
**Tabs:** TabsWrapper, TabsMenu, TabsContent, TabsLink, TabsPane
**Slider:** SliderWrapper, SliderMask, SliderSlide, SliderArrow, SliderNav
**Form:** FormWrapper, FormForm, FormTextInput, FormTextarea, FormSelect, FormButton, FormBlockLabel, FormCheckboxWrapper, FormCheckboxInput, FormRadioWrapper, FormRadioInput, FormInlineLabel, FormSuccessMessage, FormErrorMessage`;
}

// -----------------------------------------------------------------------------
// Export Pre-built Documentation Strings
// -----------------------------------------------------------------------------

/** Pre-built complete documentation */
export const COMPLETE_PROMPT_DOCS = generateCompletePromptDocs();

/** Pre-built hierarchy documentation */
export const ALL_HIERARCHY_DOCS = generateAllHierarchyDocs();

/** Pre-built compact rules */
export const COMPACT_HIERARCHY_RULES = generateCompactHierarchyRules();

/** Pre-built component list */
export const COMPONENT_LIST = generateComponentListForPrompt();

/** Pre-built component table */
export const COMPONENT_TABLE = generateComponentTableForPrompt();

/** Pre-built validation checklist */
export const VALIDATION_CHECKLIST = generateValidationChecklist();

// Individual hierarchy docs (for selective inclusion)
export const NAVBAR_HIERARCHY_DOCS = generateNavbarHierarchyDocs();
export const DROPDOWN_HIERARCHY_DOCS = generateDropdownHierarchyDocs();
export const TABS_HIERARCHY_DOCS = generateTabsHierarchyDocs();
export const SLIDER_HIERARCHY_DOCS = generateSliderHierarchyDocs();
export const FORM_HIERARCHY_DOCS = generateFormHierarchyDocs();
export const HTML_EMBED_DOCS = generateHtmlEmbedDocs();
