// ============================================================================
// WEBFLOW MODULE
// Single source of truth for all Webflow component definitions, constraints,
// data fields, breakpoints, mappings, and documentation
// ============================================================================

// -----------------------------------------------------------------------------
// Components
// All 55+ Webflow component type definitions
// -----------------------------------------------------------------------------
export {
  // Types
  type WebflowComponentDef,
  type ComponentCategory,
  type WebflowComponentType,

  // Main definitions
  WEBFLOW_COMPONENTS,
  ALL_COMPONENT_TYPES,
  COMPONENTS_BY_CATEGORY,
  COMPONENT_COUNT,

  // Helpers
  getComponentDef,
  isValidComponentType,
  getComponentsByCategory,
} from './components';

// -----------------------------------------------------------------------------
// Constraints
// Hierarchy rules and validation constraints
// -----------------------------------------------------------------------------
export {
  // Types
  type ConstraintRule,
  type ConstraintDef,
  type ComponentConstraints,
  type ComponentConstraintEntry,

  // Main definitions
  WEBFLOW_CONSTRAINTS,
  HIERARCHY_CHAINS,

  // Helpers
  getConstraints,
  getDisplayName,
  requiresAncestor,
  forbidsDescendant,
  hasStrictChildren,
  getAllowedChildren,
  isPinnedToParent,
} from './constraints';

// -----------------------------------------------------------------------------
// Data Fields
// Component-specific data field specifications
// -----------------------------------------------------------------------------
export {
  // Common types
  type CommonDataFields,

  // Navbar types
  type NavbarWrapperData,
  type NavbarContainerData,
  type NavbarBrandData,
  type NavbarMenuData,
  type NavbarLinkData,
  type NavbarButtonData,
  type NavbarDataType,

  // Dropdown types
  type DropdownWrapperData,
  type DropdownToggleData,
  type DropdownListData,
  type DropdownLinkData,
  type DropdownDataType,

  // Tabs types
  type TabsWrapperData,
  type TabsMenuData,
  type TabsContentData,
  type TabsLinkData,
  type TabsPaneData,
  type TabsDataType,

  // Slider types
  type SliderWrapperData,
  type SliderMaskData,
  type SliderSlideData,
  type SliderArrowData,
  type SliderNavData,
  type SliderDataType,

  // Form types
  type FormWrapperData,
  type FormFormData,
  type FormTextInputData,
  type FormTextareaData,
  type FormSelectData,
  type FormButtonData,
  type FormLabelData,
  type FormCheckboxWrapperData,
  type FormCheckboxInputData,
  type FormRadioWrapperData,
  type FormRadioInputData,
  type FormInlineLabelData,
  type FormSuccessMessageData,
  type FormErrorMessageData,
  type FormFileUploadWrapperData,
  type FormDataType,

  // Other types
  type LinkData,
  type ImageData,
  type EmbedData,
  type IconWidgetData,
  type GridData,
  type ListData,
  type SearchData,
  type RichTextData,

  // Default values
  DEFAULT_DATA_FIELDS,

  // Helpers
  createLinkData,
  createFormInputData,
  createFormTextareaData,
  createEmbedData,
} from './data-fields';

// -----------------------------------------------------------------------------
// Breakpoints & States
// Responsive breakpoints and pseudo-state definitions
// -----------------------------------------------------------------------------
export {
  // Types
  type BreakpointDef,
  type BreakpointKey,
  type BreakpointVariantKey,
  type StateDef,
  type StateKey,
  type StateVariantSuffix,
  type WebflowStyleVariantKey,

  // Breakpoint definitions
  BREAKPOINTS,
  BREAKPOINT_KEYS,
  LARGER_BREAKPOINTS,
  SMALLER_BREAKPOINTS,
  RESPONSIVE_BREAKPOINTS,
  BREAKPOINT_VARIANT_KEYS,

  // State definitions
  PSEUDO_STATES,
  STATE_KEYS,
  INTERACTIVE_STATES,
  FORM_STATES,
  LINK_STATES,
  STATE_VARIANT_SUFFIXES,

  // Style registry fields
  STYLE_REGISTRY_FIELDS,

  // Helpers
  getBreakpoint,
  getState,
  breakpointToVariantKey,
  stateToVariantSuffix,
  getVariantKey,
  isLargerBreakpoint,
  isSmallerBreakpoint,
  getBreakpointsCascadeOrder,
  getMediaQuery,

  // Documentation generators
  generateBreakpointDocsForPrompt,
  generateStateDocsForPrompt,

  // Pre-built documentation constants
  BREAKPOINT_DOCS,
  STATE_DOCS,
  STYLE_REGISTRY_FORMAT_DOCS,
  DESKTOP_ONLY_WARNING,
} from './breakpoints';

// -----------------------------------------------------------------------------
// Mappings
// HTML tag to component type mappings
// -----------------------------------------------------------------------------
export {
  // Types
  type MappingContext,

  // Mappings
  HTML_TAG_TO_COMPONENT,
  CLASS_PATTERNS,

  // Helpers
  getComponentType,
  getDefaultTag,
  getXSCPType,
  matchesClassPattern,
} from './mappings';

// -----------------------------------------------------------------------------
// Prompt Documentation
// Pre-built documentation strings for AI prompts
// -----------------------------------------------------------------------------
export {
  // Generators
  generateComponentListForPrompt,
  generateComponentTableForPrompt,
  generateNavbarHierarchyDocs,
  generateDropdownHierarchyDocs,
  generateTabsHierarchyDocs,
  generateSliderHierarchyDocs,
  generateFormHierarchyDocs,
  generateLayoutHierarchyDocs,
  generateHtmlEmbedDocs,
  generateValidationChecklist,
  generateAllHierarchyDocs,
  generateCompletePromptDocs,
  generateCompactHierarchyRules,
  generateMinimalComponentList,

  // Pre-built strings
  COMPLETE_PROMPT_DOCS,
  ALL_HIERARCHY_DOCS,
  COMPACT_HIERARCHY_RULES,
  COMPONENT_LIST,
  COMPONENT_TABLE,
  VALIDATION_CHECKLIST,
  NAVBAR_HIERARCHY_DOCS,
  DROPDOWN_HIERARCHY_DOCS,
  TABS_HIERARCHY_DOCS,
  SLIDER_HIERARCHY_DOCS,
  FORM_HIERARCHY_DOCS,
  LAYOUT_HIERARCHY_DOCS,
  HTML_EMBED_DOCS,
} from './prompt-docs';
