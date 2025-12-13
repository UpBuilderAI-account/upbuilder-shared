"use strict";
// ============================================================================
// WEBFLOW EXPORT TYPES
// Shared types and constants for Webflow structure conversion
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEBFLOW_COMPONENT_TYPES_FOR_PROMPT = exports.WEBFLOW_COMPONENT_TYPES_LIST = exports.NAVBAR_VALIDATION_CLASSES = exports.WEBFLOW_STATE_VARIANTS = exports.WEBFLOW_RESPONSIVE_BREAKPOINTS = exports.WEBFLOW_BREAKPOINTS = void 0;
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
