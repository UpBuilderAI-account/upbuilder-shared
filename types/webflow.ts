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
