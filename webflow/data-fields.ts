// ============================================================================
// WEBFLOW DATA FIELDS
// Component-specific data field specifications
// Used for: generating correct XSCP node data, validation, prompts
// ============================================================================

// -----------------------------------------------------------------------------
// Common Data Fields (shared by most components)
// -----------------------------------------------------------------------------

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
  xattr?: Array<{ name: string; value: string }>;
  /** Search indexing settings */
  search?: {
    exclude: boolean;
  };
  /** Visibility conditions */
  visibility?: {
    conditions: unknown[];
  };
}

// -----------------------------------------------------------------------------
// Navbar Data Fields
// -----------------------------------------------------------------------------

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

export type NavbarDataType =
  | NavbarWrapperData
  | NavbarContainerData
  | NavbarBrandData
  | NavbarMenuData
  | NavbarLinkData
  | NavbarButtonData;

// -----------------------------------------------------------------------------
// Dropdown Data Fields
// -----------------------------------------------------------------------------

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

export type DropdownDataType =
  | DropdownWrapperData
  | DropdownToggleData
  | DropdownListData
  | DropdownLinkData;

// -----------------------------------------------------------------------------
// Tabs Data Fields
// -----------------------------------------------------------------------------

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

export type TabsDataType =
  | TabsWrapperData
  | TabsMenuData
  | TabsContentData
  | TabsLinkData
  | TabsPaneData;

// -----------------------------------------------------------------------------
// Slider Data Fields
// -----------------------------------------------------------------------------

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

export type SliderDataType =
  | SliderWrapperData
  | SliderMaskData
  | SliderSlideData
  | SliderArrowData
  | SliderNavData;

// -----------------------------------------------------------------------------
// Form Data Fields
// -----------------------------------------------------------------------------

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
  opts?: Array<{ t: string; v: string }>;
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

export type FormDataType =
  | FormWrapperData
  | FormFormData
  | FormTextInputData
  | FormTextareaData
  | FormSelectData
  | FormButtonData
  | FormLabelData
  | FormCheckboxWrapperData
  | FormCheckboxInputData
  | FormRadioWrapperData
  | FormRadioInputData
  | FormInlineLabelData
  | FormSuccessMessageData
  | FormErrorMessageData
  | FormFileUploadWrapperData;

// -----------------------------------------------------------------------------
// Link Data Fields
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// Image Data Fields
// -----------------------------------------------------------------------------

export interface ImageData {
  /** Asset ID reference */
  id?: string;
  /** Internal Webflow asset ID */
  _id?: string;
}

// -----------------------------------------------------------------------------
// Embed Data Fields
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// Icon Data Fields
// -----------------------------------------------------------------------------

export interface IconWidgetData {
  type: 'icon';
  /** Icon identifier */
  icon: string;
}

// -----------------------------------------------------------------------------
// Grid Data Fields
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// List Data Fields
// -----------------------------------------------------------------------------

export interface ListData {
  type: 'list' | 'item';
  /** Show list bullets/numbers */
  unstyled?: boolean;
}

// -----------------------------------------------------------------------------
// Search Data Fields
// -----------------------------------------------------------------------------

export interface SearchData {
  exclude?: boolean;
}

// -----------------------------------------------------------------------------
// RichText Data Fields
// -----------------------------------------------------------------------------

export interface RichTextData {
  rich: boolean;
  slot?: string;
}

// -----------------------------------------------------------------------------
// Default Data Field Values
// These are used when creating new nodes
// -----------------------------------------------------------------------------

export const DEFAULT_DATA_FIELDS = {
  navbar: {
    wrapper: {
      type: 'wrapper',
      easing: 'ease',
      easing2: 'ease',
      duration: 400,
      docHeight: false,
      noScroll: false,
      animation: 'default',
      collapse: 'medium',
    } as NavbarWrapperData,
    container: { type: 'container' } as NavbarContainerData,
    brand: { type: 'brand' } as NavbarBrandData,
    menu: { type: 'menu' } as NavbarMenuData,
    link: { type: 'link' } as NavbarLinkData,
    button: { type: 'button' } as NavbarButtonData,
  },

  dropdown: {
    wrapper: { type: 'wrapper' } as DropdownWrapperData,
    toggle: { type: 'toggle' } as DropdownToggleData,
    list: { type: 'list' } as DropdownListData,
    link: { type: 'link' } as DropdownLinkData,
  },

  tabs: {
    wrapper: {
      type: 'wrapper',
      current: 'Tab 1',
      easing: 'ease',
      fadeIn: 300,
      fadeOut: 100,
    } as TabsWrapperData,
    menu: { type: 'menu' } as TabsMenuData,
    content: { type: 'content' } as TabsContentData,
    link: { type: 'link' } as TabsLinkData,
    pane: { type: 'pane' } as TabsPaneData,
  },

  slider: {
    wrapper: {
      animation: 'slide',
      easing: 'ease',
      duration: 500,
      infinite: true,
      disableSwipe: false,
      autoplay: { active: false },
    } as SliderWrapperData,
    mask: { type: 'slides' } as SliderMaskData,
    slide: { type: 'slide' } as SliderSlideData,
    arrowLeft: { dir: 'left' } as SliderArrowData,
    arrowRight: { dir: 'right' } as SliderArrowData,
    nav: { type: 'nav' } as SliderNavData,
  },

  form: {
    wrapper: { type: 'wrapper' } as FormWrapperData,
    form: { type: 'form', name: 'Form' } as FormFormData,
    button: { type: 'button' } as FormButtonData,
    label: { type: 'label' } as FormLabelData,
    successMessage: { type: 'msg-done' } as FormSuccessMessageData,
    errorMessage: { type: 'msg-fail' } as FormErrorMessageData,
    checkbox: { type: 'checkbox' } as FormCheckboxWrapperData,
    checkboxInput: { type: 'checkbox-input', name: 'Checkbox' } as FormCheckboxInputData,
    checkboxLabel: { type: 'checkbox-label' } as FormInlineLabelData,
    radio: { type: 'radio' } as FormRadioWrapperData,
    radioInput: { type: 'radio-input', name: 'Radio', value: '' } as FormRadioInputData,
    radioLabel: { type: 'radio-label' } as FormInlineLabelData,
  },

  link: {
    external: { mode: 'external', url: '#' } as LinkData,
    internal: { mode: 'internal' } as LinkData,
    section: { mode: 'section' } as LinkData,
    email: { mode: 'email' } as LinkData,
    phone: { mode: 'phone' } as LinkData,
  },

  list: {
    unordered: { type: 'list', unstyled: false } as ListData,
    ordered: { type: 'list', unstyled: false } as ListData,
    item: { type: 'item' } as ListData,
  },

  grid: {
    section: { type: 'section' } as GridData,
    row: { type: 'row', cols: { main: '6|6', medium: '', small: '', tiny: '' } } as GridData,
    column: { type: 'col' } as GridData,
  },

  icon: {
    dropdownToggle: { type: 'icon', icon: 'dropdown-toggle' } as IconWidgetData,
    navbarMenu: { type: 'icon', icon: 'nav-menu' } as IconWidgetData,
    sliderLeft: { type: 'icon', icon: 'slider-left' } as IconWidgetData,
    sliderRight: { type: 'icon', icon: 'slider-right' } as IconWidgetData,
  },
} as const;

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

/** Create a link data object */
export function createLinkData(url: string, options?: Partial<LinkData>): { link: LinkData } {
  return {
    link: {
      mode: 'external',
      url,
      ...options,
    },
  };
}

/** Create form input data */
export function createFormInputData(name: string, type: string = 'text'): { form: FormTextInputData } {
  return {
    form: {
      name,
      type: 'input',
      inputType: type,
      passwordPage: false,
    },
  };
}

/** Create form textarea data */
export function createFormTextareaData(name: string): { form: FormTextareaData } {
  return {
    form: {
      name,
      type: 'textarea',
    },
  };
}

/** Create embed data for SVG/HTML */
export function createEmbedData(html: string): { embed: EmbedData } {
  return {
    embed: {
      meta: {
        html,
        div: true,
        script: false,
        compilable: false,
        iframe: false,
      },
    },
  };
}
