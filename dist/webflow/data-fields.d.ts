export interface CommonDataFields {
    /** HTML tag override */
    tag?: string;
    /** Contains text node */
    text?: boolean;
    /** Devlink runtime props */
    devlink?: {
        runtimeProps: Record<string, unknown>;
        slot: string;
    };
    /** Display name in editor */
    displayName?: string;
    /** HTML attributes (id, aria-*, etc.) */
    attr?: {
        id?: string;
        [key: string]: string | undefined;
    };
    /** Custom attributes array */
    xattr?: Array<{
        name: string;
        value: string;
    }>;
    /** Search indexing settings */
    search?: {
        exclude: boolean;
    };
    /** Visibility conditions */
    visibility?: {
        conditions: unknown[];
    };
}
export interface NavbarWrapperData {
    type: 'wrapper';
    /** Animation easing for menu open */
    easing?: string;
    /** Animation easing for menu close */
    easing2?: string;
    /** Animation duration in ms */
    duration?: number;
    /** Track document height */
    docHeight?: boolean;
    /** Prevent scroll when open */
    noScroll?: boolean;
    /** Animation type: 'default' | 'over-left' | 'over-right' */
    animation?: string;
    /** Collapse breakpoint: 'medium' | 'small' | 'none' */
    collapse?: 'medium' | 'small' | 'none';
}
export interface NavbarContainerData {
    type: 'container';
}
export interface NavbarBrandData {
    type: 'brand';
}
export interface NavbarMenuData {
    type: 'menu';
}
export interface NavbarLinkData {
    type: 'link';
}
export interface NavbarButtonData {
    type: 'button';
}
export type NavbarDataType = NavbarWrapperData | NavbarContainerData | NavbarBrandData | NavbarMenuData | NavbarLinkData | NavbarButtonData;
export interface DropdownWrapperData {
    type: 'wrapper';
}
export interface DropdownToggleData {
    type: 'toggle';
}
export interface DropdownListData {
    type: 'list';
}
export interface DropdownLinkData {
    type: 'link';
}
export type DropdownDataType = DropdownWrapperData | DropdownToggleData | DropdownListData | DropdownLinkData;
export interface TabsWrapperData {
    type: 'wrapper';
    /** Current active tab name */
    current?: string;
    /** Animation easing */
    easing?: string;
    /** Fade in duration ms */
    fadeIn?: number;
    /** Fade out duration ms */
    fadeOut?: number;
}
export interface TabsMenuData {
    type: 'menu';
}
export interface TabsContentData {
    type: 'content';
}
export interface TabsLinkData {
    type: 'link';
}
export interface TabsPaneData {
    type: 'pane';
}
export type TabsDataType = TabsWrapperData | TabsMenuData | TabsContentData | TabsLinkData | TabsPaneData;
export interface SliderWrapperData {
    /** Animation type: 'slide' | 'fade' | 'both' */
    animation?: 'slide' | 'fade' | 'both';
    /** Animation easing function */
    easing?: string;
    /** Transition duration in ms */
    duration?: number;
    /** Loop infinitely */
    infinite?: boolean;
    /** Disable touch/swipe */
    disableSwipe?: boolean;
    /** Auto-advance settings */
    autoplay?: {
        active: boolean;
        delay?: number;
        stopOnHover?: boolean;
    };
}
export interface SliderMaskData {
    type: 'slides';
}
export interface SliderSlideData {
    type: 'slide';
}
export interface SliderArrowData {
    /** Direction: 'left' | 'right' */
    dir: 'left' | 'right';
}
export interface SliderNavData {
    type: 'nav';
}
export type SliderDataType = SliderWrapperData | SliderMaskData | SliderSlideData | SliderArrowData | SliderNavData;
export interface FormWrapperData {
    type: 'wrapper';
}
export interface FormFormData {
    type: 'form';
    /** Form name */
    name?: string;
    /** Redirect URL after submit */
    redirect?: string;
    /** Custom action URL */
    action?: string;
}
export interface FormTextInputData {
    /** Field name */
    name: string;
    type: 'input';
    /** Input type: 'text' | 'email' | 'password' | 'tel' | 'number' */
    inputType?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Is required */
    required?: boolean;
    /** Is password page field */
    passwordPage?: boolean;
}
export interface FormTextareaData {
    name: string;
    type: 'textarea';
    placeholder?: string;
    required?: boolean;
}
export interface FormSelectData {
    name: string;
    type?: 'select';
    /** Options array */
    opts?: Array<{
        t: string;
        v: string;
    }>;
    required?: boolean;
}
export interface FormButtonData {
    type: 'button';
    /** Button text override */
    value?: string;
    /** Wait text during submission */
    waitText?: string;
}
export interface FormLabelData {
    type: 'label';
    /** Associated field name */
    for?: string;
    passwordPage?: boolean;
}
export interface FormCheckboxWrapperData {
    type: 'checkbox';
}
export interface FormCheckboxInputData {
    type: 'checkbox-input';
    name: string;
    /** Checked by default */
    checked?: boolean;
}
export interface FormRadioWrapperData {
    type: 'radio';
}
export interface FormRadioInputData {
    type: 'radio-input';
    name: string;
    value?: string;
    checked?: boolean;
}
export interface FormInlineLabelData {
    type: 'checkbox-label' | 'radio-label';
}
export interface FormSuccessMessageData {
    type: 'msg-done';
}
export interface FormErrorMessageData {
    type: 'msg-fail';
}
export interface FormFileUploadWrapperData {
    type: 'file-upload';
}
export type FormDataType = FormWrapperData | FormFormData | FormTextInputData | FormTextareaData | FormSelectData | FormButtonData | FormLabelData | FormCheckboxWrapperData | FormCheckboxInputData | FormRadioWrapperData | FormRadioInputData | FormInlineLabelData | FormSuccessMessageData | FormErrorMessageData | FormFileUploadWrapperData;
export interface LinkData {
    /** Link mode */
    mode?: 'external' | 'internal' | 'email' | 'phone' | 'section';
    /** URL for external links */
    url?: string;
    /** Page ID for internal links */
    pageId?: string;
    /** Section ID for section links */
    sectionId?: string;
    /** Open in new tab */
    target?: '_blank' | '_self';
    /** Preload hint */
    preload?: 'prefetch' | 'prerender';
}
export interface ImageData {
    /** Asset ID reference */
    id?: string;
    /** Internal Webflow asset ID */
    _id?: string;
}
export interface EmbedData {
    meta: {
        /** Raw HTML content */
        html: string;
        /** Wrapped in div */
        div?: boolean;
        /** Contains script */
        script?: boolean;
        /** Can be compiled */
        compilable?: boolean;
        /** Contains iframe */
        iframe?: boolean;
    };
}
export interface IconWidgetData {
    type: 'icon';
    /** Icon identifier */
    icon: string;
}
export interface GridData {
    type?: 'section' | 'row' | 'col' | string;
    /** Column widths per breakpoint */
    cols?: {
        main?: string;
        medium?: string;
        small?: string;
        tiny?: string;
    };
}
export interface ListData {
    type: 'list' | 'item';
    /** Show list bullets/numbers */
    unstyled?: boolean;
}
export interface SearchData {
    exclude?: boolean;
}
export interface RichTextData {
    rich: boolean;
    slot?: string;
}
export declare const DEFAULT_DATA_FIELDS: {
    readonly navbar: {
        readonly wrapper: NavbarWrapperData;
        readonly container: NavbarContainerData;
        readonly brand: NavbarBrandData;
        readonly menu: NavbarMenuData;
        readonly link: NavbarLinkData;
        readonly button: NavbarButtonData;
    };
    readonly dropdown: {
        readonly wrapper: DropdownWrapperData;
        readonly toggle: DropdownToggleData;
        readonly list: DropdownListData;
        readonly link: DropdownLinkData;
    };
    readonly tabs: {
        readonly wrapper: TabsWrapperData;
        readonly menu: TabsMenuData;
        readonly content: TabsContentData;
        readonly link: TabsLinkData;
        readonly pane: TabsPaneData;
    };
    readonly slider: {
        readonly wrapper: SliderWrapperData;
        readonly mask: SliderMaskData;
        readonly slide: SliderSlideData;
        readonly arrowLeft: SliderArrowData;
        readonly arrowRight: SliderArrowData;
        readonly nav: SliderNavData;
    };
    readonly form: {
        readonly wrapper: FormWrapperData;
        readonly form: FormFormData;
        readonly button: FormButtonData;
        readonly label: FormLabelData;
        readonly successMessage: FormSuccessMessageData;
        readonly errorMessage: FormErrorMessageData;
        readonly checkbox: FormCheckboxWrapperData;
        readonly checkboxInput: FormCheckboxInputData;
        readonly checkboxLabel: FormInlineLabelData;
        readonly radio: FormRadioWrapperData;
        readonly radioInput: FormRadioInputData;
        readonly radioLabel: FormInlineLabelData;
    };
    readonly link: {
        readonly external: LinkData;
        readonly internal: LinkData;
        readonly section: LinkData;
        readonly email: LinkData;
        readonly phone: LinkData;
    };
    readonly list: {
        readonly unordered: ListData;
        readonly ordered: ListData;
        readonly item: ListData;
    };
    readonly grid: {
        readonly section: GridData;
        readonly row: GridData;
        readonly column: GridData;
    };
    readonly icon: {
        readonly dropdownToggle: IconWidgetData;
        readonly navbarMenu: IconWidgetData;
        readonly sliderLeft: IconWidgetData;
        readonly sliderRight: IconWidgetData;
    };
};
/** Create a link data object */
export declare function createLinkData(url: string, options?: Partial<LinkData>): {
    link: LinkData;
};
/** Create form input data */
export declare function createFormInputData(name: string, type?: string): {
    form: FormTextInputData;
};
/** Create form textarea data */
export declare function createFormTextareaData(name: string): {
    form: FormTextareaData;
};
/** Create embed data for SVG/HTML */
export declare function createEmbedData(html: string): {
    embed: EmbedData;
};
//# sourceMappingURL=data-fields.d.ts.map