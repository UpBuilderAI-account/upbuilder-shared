export type WebflowBasicComponent = 'Block' | 'Section' | 'Heading' | 'Paragraph' | 'Image' | 'Link' | 'Button' | 'List' | 'ListItem' | 'Icon';
export type WebflowNavComponent = 'NavbarWrapper' | 'NavbarContainer' | 'NavbarBrand' | 'NavbarMenu' | 'NavbarLink' | 'NavbarButton' | 'DropdownWrapper' | 'DropdownToggle' | 'DropdownList' | 'DropdownLink';
export type WebflowFormComponent = 'FormWrapper' | 'FormForm' | 'FormTextInput' | 'FormTextarea' | 'FormButton' | 'FormBlockLabel' | 'FormInlineLabel' | 'FormCheckboxWrapper' | 'FormCheckboxInput' | 'FormRadioWrapper' | 'FormRadioInput' | 'FormSelect' | 'FormSuccessMessage' | 'FormErrorMessage';
export type WebflowSliderComponent = 'SliderContainer' | 'SliderWrapper' | 'SliderSlide' | 'SliderNavigation' | 'SliderArrowPrev' | 'SliderArrowNext' | 'SliderPagination';
export type WebflowComponentType = WebflowBasicComponent | WebflowNavComponent | WebflowFormComponent | WebflowSliderComponent;
export type WebflowBreakpoint = 'main' | 'medium' | 'small' | 'tiny';
export type WebflowStateVariant = 'hover' | 'focus' | 'active' | 'checked' | 'disabled' | 'current' | 'pressed';
export declare const WEBFLOW_BREAKPOINTS: WebflowBreakpoint[];
export declare const WEBFLOW_RESPONSIVE_BREAKPOINTS: Exclude<WebflowBreakpoint, 'main'>[];
export declare const WEBFLOW_STATE_VARIANTS: WebflowStateVariant[];
export declare const NAVBAR_VALIDATION_CLASSES: {
    readonly backgroundWrapper: "navigationwrapper-bg";
    readonly containerLayout: "navigationbar_container";
};
export declare const WEBFLOW_COMPONENT_TYPES_LIST: {
    readonly basic: readonly ["Block", "Section", "Heading", "Paragraph", "Image", "Link", "Button", "List", "ListItem", "Icon"];
    readonly navigation: readonly ["NavbarWrapper", "NavbarContainer", "NavbarBrand", "NavbarMenu", "NavbarLink", "NavbarButton", "DropdownWrapper", "DropdownToggle", "DropdownList", "DropdownLink"];
    readonly forms: readonly ["FormWrapper", "FormForm", "FormTextInput", "FormTextarea", "FormButton", "FormBlockLabel", "FormInlineLabel", "FormCheckboxWrapper", "FormCheckboxInput", "FormRadioWrapper", "FormRadioInput", "FormSelect", "FormSuccessMessage", "FormErrorMessage"];
    readonly sliders: readonly ["SliderContainer", "SliderWrapper", "SliderSlide", "SliderNavigation", "SliderArrowPrev", "SliderArrowNext", "SliderPagination"];
};
export declare const WEBFLOW_COMPONENT_TYPES_FOR_PROMPT: string;
//# sourceMappingURL=webflow.d.ts.map