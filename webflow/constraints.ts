// ============================================================================
// WEBFLOW HIERARCHY CONSTRAINTS
// Single source of truth for all component placement rules
// Used by: element-validator.ts, prompts, and documentation
// ============================================================================

import type { WebflowComponentType } from './components';

// -----------------------------------------------------------------------------
// Constraint Rule Types
// -----------------------------------------------------------------------------

export type ConstraintRule = 'AtLeastOne' | 'ExactlyOne' | 'ZeroOrOne' | 'Forbid' | 'RequireOnly';

export interface ConstraintDef {
  /** Component types this rule applies to */
  is: WebflowComponentType | WebflowComponentType[];
  /** The constraint rule */
  rule: ConstraintRule;
  /** Optional custom name for error messages */
  name?: string;
}

export interface ComponentConstraints {
  /** Ancestor constraints (element must be inside these) */
  ancestors?: ConstraintDef[];
  /** Descendant constraints (element cannot contain these) */
  descendants?: ConstraintDef[];
  /** Direct children constraints */
  children?: ConstraintDef[];
  /** Direct parent constraints */
  parent?: ConstraintDef[];
  /** Whether element must be pinned to parent (cannot be moved) */
  pinToParent?: boolean;
  /** Components this element wraps (structural children) */
  wraps?: WebflowComponentType[];
}

export interface ComponentConstraintEntry {
  displayName: string;
  constraints: ComponentConstraints;
}

// -----------------------------------------------------------------------------
// Shared Constraint Arrays (reused across multiple components)
// -----------------------------------------------------------------------------

/** Forms cannot be nested inside each other */
const FORBID_INSIDE_FORMS: ConstraintDef[] = [
  { is: 'FormWrapper', rule: 'Forbid' },
  { is: 'SearchForm', rule: 'Forbid' },
];

/** Form elements forbidden inside FormForm */
const FORBID_INSIDE_FORM_FORM: ConstraintDef[] = [
  { is: 'FormForm', rule: 'Forbid' },
  { is: 'FormWrapper', rule: 'Forbid' },
  { is: 'SearchForm', rule: 'Forbid' },
];

/** Links cannot be nested inside other links */
const FORBID_LINK_DESCENDANTS: ConstraintDef[] = [
  { is: 'Link', rule: 'Forbid' },
  { is: 'LinkBlock', rule: 'Forbid' },
  { is: 'TextLink', rule: 'Forbid' },
  { is: 'TabsLink', rule: 'Forbid' },
  { is: 'NavbarLink', rule: 'Forbid' },
  { is: 'NavbarBrand', rule: 'Forbid' },
  { is: 'DropdownLink', rule: 'Forbid' },
  { is: 'LightboxWrapper', rule: 'Forbid' },
  { is: 'RichText', rule: 'Forbid' },
  { is: 'Video', rule: 'Forbid' },
];

// -----------------------------------------------------------------------------
// All Component Constraints
// -----------------------------------------------------------------------------

export const WEBFLOW_CONSTRAINTS: Record<WebflowComponentType, ComponentConstraintEntry> = {
  // ===========================================================================
  // BASIC COMPONENTS
  // ===========================================================================
  Block: {
    displayName: 'Div Block',
    constraints: {}
  },
  Section: {
    displayName: 'Section',
    constraints: {}
  },
  Container: {
    displayName: 'Container',
    constraints: {}
  },
  Link: {
    displayName: 'Link',
    constraints: {
      descendants: FORBID_LINK_DESCENDANTS
    }
  },
  LinkBlock: {
    displayName: 'Link Block',
    constraints: {
      descendants: FORBID_LINK_DESCENDANTS
    }
  },
  TextLink: {
    displayName: 'Text Link',
    constraints: {
      descendants: FORBID_LINK_DESCENDANTS
    }
  },
  Button: {
    displayName: 'Button',
    constraints: {
      descendants: FORBID_LINK_DESCENDANTS
    }
  },
  List: {
    displayName: 'List',
    constraints: {
      children: [{ is: 'ListItem', name: 'Non-List Item', rule: 'RequireOnly' }]
    }
  },
  ListItem: {
    displayName: 'List Item',
    constraints: {
      ancestors: [{ is: 'List', rule: 'AtLeastOne' }]
    }
  },
  Image: {
    displayName: 'Image',
    constraints: {}
  },
  Video: {
    displayName: 'Video',
    constraints: {}
  },
  Icon: {
    displayName: 'Icon',
    constraints: {}
  },
  HtmlEmbed: {
    displayName: 'HTML Embed',
    constraints: {}
  },
  LineBreak: {
    displayName: 'Line Break',
    constraints: {}
  },

  // ===========================================================================
  // TYPOGRAPHY COMPONENTS
  // ===========================================================================
  Heading: {
    displayName: 'Heading',
    constraints: {}
  },
  Paragraph: {
    displayName: 'Paragraph',
    constraints: {}
  },
  Span: {
    displayName: 'Span',
    constraints: {}
  },
  Blockquote: {
    displayName: 'Block Quote',
    constraints: {}
  },
  RichText: {
    displayName: 'Rich Text',
    constraints: {}
  },
  Figure: {
    displayName: 'Figure',
    constraints: {}
  },
  Figcaption: {
    displayName: 'Fig Caption',
    constraints: {}
  },

  // ===========================================================================
  // TEXT FORMATTING (must be inside Paragraph)
  // ===========================================================================
  Strong: {
    displayName: 'Strong',
    constraints: {
      ancestors: [{ is: 'Paragraph', rule: 'AtLeastOne' }]
    }
  },
  Emphasized: {
    displayName: 'Emphasized',
    constraints: {
      ancestors: [{ is: 'Paragraph', rule: 'AtLeastOne' }]
    }
  },
  Superscript: {
    displayName: 'Superscript',
    constraints: {
      ancestors: [{ is: 'Paragraph', rule: 'AtLeastOne' }]
    }
  },
  Subscript: {
    displayName: 'Subscript',
    constraints: {
      ancestors: [{ is: 'Paragraph', rule: 'AtLeastOne' }]
    }
  },

  // ===========================================================================
  // LAYOUT COMPONENTS
  // ===========================================================================
  Layout: {
    displayName: 'Layout',
    constraints: {
      children: [{ is: 'Cell', name: 'Non-Cell Item', rule: 'RequireOnly' }]
    }
  },
  Cell: {
    displayName: 'Cell',
    constraints: {
      pinToParent: true,
      parent: [{ is: 'Layout', rule: 'ExactlyOne' }],
      ancestors: [{ is: 'Layout', rule: 'AtLeastOne' }]
    }
  },
  Grid: {
    displayName: 'Grid',
    constraints: {}
  },
  Row: {
    displayName: 'Columns',
    constraints: {
      children: [{ is: 'Column', name: 'Non-Column Item', rule: 'RequireOnly' }]
    }
  },
  Column: {
    displayName: 'Column',
    constraints: {
      ancestors: [{ is: 'Row', rule: 'AtLeastOne' }]
    }
  },

  // ===========================================================================
  // NAVBAR COMPONENTS
  // ===========================================================================
  NavbarWrapper: {
    displayName: 'Navbar',
    constraints: {
      descendants: [{ is: 'NavbarWrapper', rule: 'Forbid' }]
    }
  },
  NavbarContainer: {
    displayName: 'Container',
    constraints: {
      pinToParent: true,
      ancestors: [{ is: 'NavbarWrapper', rule: 'AtLeastOne' }]
    }
  },
  NavbarBrand: {
    displayName: 'Brand',
    constraints: {
      ancestors: [{ is: 'NavbarWrapper', rule: 'AtLeastOne' }],
      descendants: FORBID_LINK_DESCENDANTS
    }
  },
  NavbarMenu: {
    displayName: 'Nav Menu',
    constraints: {
      ancestors: [{ is: 'NavbarWrapper', rule: 'AtLeastOne' }],
      descendants: [{ is: 'NavbarMenu', rule: 'Forbid' }]
    }
  },
  NavbarLink: {
    displayName: 'Nav Link',
    constraints: {
      ancestors: [{ is: 'NavbarWrapper', rule: 'AtLeastOne' }],
      descendants: FORBID_LINK_DESCENDANTS
    }
  },
  NavbarButton: {
    displayName: 'Menu Button',
    constraints: {
      pinToParent: true,
      ancestors: [{ is: 'NavbarWrapper', rule: 'AtLeastOne' }]
    }
  },

  // ===========================================================================
  // DROPDOWN COMPONENTS
  // ===========================================================================
  DropdownWrapper: {
    displayName: 'Dropdown',
    constraints: {
      wraps: ['DropdownToggle', 'DropdownList'],
      descendants: [{ is: 'DropdownWrapper', rule: 'Forbid' }]
    }
  },
  DropdownToggle: {
    displayName: 'Dropdown Toggle',
    constraints: {
      pinToParent: true,
      ancestors: [{ is: 'DropdownWrapper', rule: 'AtLeastOne' }]
    }
  },
  DropdownList: {
    displayName: 'Dropdown List',
    constraints: {
      pinToParent: true,
      ancestors: [{ is: 'DropdownWrapper', rule: 'AtLeastOne' }]
    }
  },
  DropdownLink: {
    displayName: 'Dropdown Link',
    constraints: {
      ancestors: [
        { is: 'DropdownWrapper', rule: 'AtLeastOne' },
        { is: 'DropdownList', rule: 'AtLeastOne' }
      ],
      descendants: FORBID_LINK_DESCENDANTS
    }
  },

  // ===========================================================================
  // TABS COMPONENTS
  // ===========================================================================
  TabsWrapper: {
    displayName: 'Tabs',
    constraints: {
      children: [{ is: ['TabsMenu', 'TabsContent'] as WebflowComponentType[], name: 'Non-Tab Item', rule: 'RequireOnly' }],
      descendants: [{ is: 'TabsWrapper', rule: 'Forbid' }]
    }
  },
  TabsMenu: {
    displayName: 'Tabs Menu',
    constraints: {
      pinToParent: true,
      ancestors: [{ is: 'TabsWrapper', rule: 'ExactlyOne' }]
    }
  },
  TabsContent: {
    displayName: 'Tabs Content',
    constraints: {
      pinToParent: true,
      ancestors: [{ is: 'TabsWrapper', rule: 'ExactlyOne' }]
    }
  },
  TabsLink: {
    displayName: 'Tab Link',
    constraints: {
      ancestors: [{ is: 'TabsWrapper', rule: 'ExactlyOne' }]
    }
  },
  TabsPane: {
    displayName: 'Tab Pane',
    constraints: {
      ancestors: [{ is: 'TabsWrapper', rule: 'ExactlyOne' }]
    }
  },

  // ===========================================================================
  // SLIDER COMPONENTS
  // ===========================================================================
  SliderWrapper: {
    displayName: 'Slider',
    constraints: {
      descendants: [{ is: 'SliderWrapper', rule: 'Forbid' }]
    }
  },
  SliderMask: {
    displayName: 'Mask',
    constraints: {
      pinToParent: true,
      ancestors: [{ is: 'SliderWrapper', rule: 'ExactlyOne' }]
    }
  },
  SliderSlide: {
    displayName: 'Slide',
    constraints: {
      pinToParent: true,
      ancestors: [{ is: 'SliderWrapper', rule: 'AtLeastOne' }]
    }
  },
  SliderArrow: {
    displayName: 'Slider Arrow',
    constraints: {
      pinToParent: true,
      ancestors: [{ is: 'SliderWrapper', rule: 'ExactlyOne' }]
    }
  },
  SliderNav: {
    displayName: 'Slide Nav',
    constraints: {
      pinToParent: true,
      ancestors: [{ is: 'SliderWrapper', rule: 'ExactlyOne' }]
    }
  },

  // ===========================================================================
  // FORM COMPONENTS
  // ===========================================================================
  FormWrapper: {
    displayName: 'Form Block',
    constraints: {
      descendants: [
        ...FORBID_INSIDE_FORMS,
        { is: 'FormWrapper', rule: 'Forbid' }
      ]
    }
  },
  FormForm: {
    displayName: 'Form',
    constraints: {
      pinToParent: true,
      ancestors: [{ is: 'FormWrapper', rule: 'AtLeastOne' }],
      descendants: [
        ...FORBID_INSIDE_FORM_FORM,
        { is: 'FormReCaptcha', rule: 'ZeroOrOne' }
      ]
    }
  },
  FormBlockLabel: {
    displayName: 'Label',
    constraints: {
      pinToParent: true
    }
  },
  FormTextInput: {
    displayName: 'Text Field',
    constraints: {
      ancestors: [{ is: 'FormForm', rule: 'ExactlyOne' }]
    }
  },
  FormTextarea: {
    displayName: 'Text Area',
    constraints: {
      ancestors: [{ is: 'FormForm', rule: 'ExactlyOne' }]
    }
  },
  FormSelect: {
    displayName: 'Select',
    constraints: {
      ancestors: [{ is: 'FormForm', rule: 'ExactlyOne' }]
    }
  },
  FormButton: {
    displayName: 'Submit Button',
    constraints: {
      ancestors: [{ is: 'FormForm', rule: 'ExactlyOne' }]
    }
  },
  FormCheckboxWrapper: {
    displayName: 'Checkbox',
    constraints: {
      ancestors: [{ is: 'FormForm', rule: 'ExactlyOne' }]
    }
  },
  FormCheckboxInput: {
    displayName: 'Checkbox Input',
    constraints: {
      ancestors: [{ is: 'FormCheckboxWrapper', rule: 'ExactlyOne' }]
    }
  },
  FormRadioWrapper: {
    displayName: 'Radio Button',
    constraints: {
      ancestors: [{ is: 'FormForm', rule: 'ExactlyOne' }]
    }
  },
  FormRadioInput: {
    displayName: 'Radio Input',
    constraints: {
      ancestors: [{ is: 'FormRadioWrapper', rule: 'ExactlyOne' }]
    }
  },
  FormInlineLabel: {
    displayName: 'Inline Label',
    constraints: {
      pinToParent: true
    }
  },
  FormSuccessMessage: {
    displayName: 'Success Message',
    constraints: {
      pinToParent: true,
      ancestors: [{ is: 'FormWrapper', rule: 'ExactlyOne' }]
    }
  },
  FormErrorMessage: {
    displayName: 'Error Message',
    constraints: {
      pinToParent: true,
      ancestors: [{ is: 'FormWrapper', rule: 'ExactlyOne' }]
    }
  },
  FormFileUploadWrapper: {
    displayName: 'File Upload',
    constraints: {
      wraps: ['FormFileUploadDefault', 'FormFileUploadUploading', 'FormFileUploadSuccess', 'FormFileUploadError'],
      ancestors: [{ is: 'FormForm', rule: 'ExactlyOne' }],
      descendants: [
        { is: 'FormTextInput', rule: 'Forbid' },
        { is: 'FormTextarea', rule: 'Forbid' },
        { is: 'FormSelect', rule: 'Forbid' },
        { is: 'FormRadioWrapper', rule: 'Forbid' },
        { is: 'FormCheckboxWrapper', rule: 'Forbid' },
        { is: 'FormButton', rule: 'Forbid' },
        { is: 'FormWrapper', rule: 'Forbid' },
        { is: 'FormFileUploadWrapper', rule: 'Forbid' },
        { is: 'FormReCaptcha', rule: 'Forbid' }
      ]
    }
  },
  FormFileUploadDefault: {
    displayName: 'File Upload Default State',
    constraints: {
      pinToParent: true,
      ancestors: [{ is: 'FormFileUploadWrapper', rule: 'ExactlyOne' }],
      descendants: [
        { is: 'FormFileUploadInput', rule: 'ExactlyOne' },
        { is: 'FormFileUploadLabel', rule: 'ExactlyOne' }
      ]
    }
  },
  FormFileUploadUploading: {
    displayName: 'File Upload Uploading State',
    constraints: {
      pinToParent: true,
      ancestors: [{ is: 'FormFileUploadWrapper', rule: 'ExactlyOne' }]
    }
  },
  FormFileUploadSuccess: {
    displayName: 'File Upload Success State',
    constraints: {
      pinToParent: true,
      ancestors: [{ is: 'FormFileUploadWrapper', rule: 'ExactlyOne' }]
    }
  },
  FormFileUploadError: {
    displayName: 'File Upload Error State',
    constraints: {
      pinToParent: true,
      ancestors: [{ is: 'FormFileUploadWrapper', rule: 'ExactlyOne' }],
      descendants: [
        { is: 'FormFileUploadErrorMsg', rule: 'ExactlyOne' }
      ]
    }
  },
  FormFileUploadInput: {
    displayName: 'File Upload Input',
    constraints: {
      ancestors: [{ is: 'FormFileUploadDefault', rule: 'ExactlyOne' }]
    }
  },
  FormFileUploadLabel: {
    displayName: 'File Upload Label',
    constraints: {
      ancestors: [{ is: 'FormFileUploadDefault', rule: 'ExactlyOne' }]
    }
  },
  FormFileUploadErrorMsg: {
    displayName: 'File Upload Error Message',
    constraints: {
      ancestors: [{ is: 'FormFileUploadError', rule: 'ExactlyOne' }]
    }
  },
  FormReCaptcha: {
    displayName: 'reCAPTCHA',
    constraints: {
      ancestors: [{ is: 'FormForm', rule: 'ExactlyOne' }]
    }
  },

  // ===========================================================================
  // SEARCH COMPONENTS
  // ===========================================================================
  SearchForm: {
    displayName: 'Search',
    constraints: {
      descendants: FORBID_INSIDE_FORMS
    }
  },
  SearchInput: {
    displayName: 'Search Input',
    constraints: {
      ancestors: [{ is: 'SearchForm', rule: 'ExactlyOne' }]
    }
  },
  SearchButton: {
    displayName: 'Search Button',
    constraints: {
      ancestors: [{ is: 'SearchForm', rule: 'ExactlyOne' }]
    }
  },

  // ===========================================================================
  // OTHER COMPONENTS
  // ===========================================================================
  LightboxWrapper: {
    displayName: 'Lightbox Link',
    constraints: {
      descendants: FORBID_LINK_DESCENDANTS
    }
  },
  Map: {
    displayName: 'Map',
    constraints: {}
  },
  Embed: {
    displayName: 'Embed',
    constraints: {}
  },
};

// -----------------------------------------------------------------------------
// Helper Functions
// -----------------------------------------------------------------------------

/** Get constraints for a component type */
export function getConstraints(type: WebflowComponentType): ComponentConstraints {
  return WEBFLOW_CONSTRAINTS[type]?.constraints || {};
}

/** Get display name for a component type */
export function getDisplayName(type: WebflowComponentType): string {
  return WEBFLOW_CONSTRAINTS[type]?.displayName || type;
}

/** Check if component requires a specific ancestor */
export function requiresAncestor(type: WebflowComponentType, ancestorType: WebflowComponentType): boolean {
  const constraints = getConstraints(type);
  if (!constraints.ancestors) return false;

  return constraints.ancestors.some(c => {
    const types = Array.isArray(c.is) ? c.is : [c.is];
    return types.includes(ancestorType) && (c.rule === 'AtLeastOne' || c.rule === 'ExactlyOne');
  });
}

/** Check if component forbids a specific descendant */
export function forbidsDescendant(type: WebflowComponentType, descendantType: WebflowComponentType): boolean {
  const constraints = getConstraints(type);
  if (!constraints.descendants) return false;

  return constraints.descendants.some(c => {
    const types = Array.isArray(c.is) ? c.is : [c.is];
    return types.includes(descendantType) && c.rule === 'Forbid';
  });
}

/** Check if component has strict children requirements */
export function hasStrictChildren(type: WebflowComponentType): boolean {
  const constraints = getConstraints(type);
  return constraints.children?.some(c => c.rule === 'RequireOnly') || false;
}

/** Get allowed child types for a component (if RequireOnly constraint exists) */
export function getAllowedChildren(type: WebflowComponentType): WebflowComponentType[] | null {
  const constraints = getConstraints(type);
  const strictChildren = constraints.children?.find(c => c.rule === 'RequireOnly');
  if (!strictChildren) return null;

  return Array.isArray(strictChildren.is) ? strictChildren.is : [strictChildren.is];
}

/** Check if component must be pinned to parent */
export function isPinnedToParent(type: WebflowComponentType): boolean {
  return getConstraints(type).pinToParent || false;
}

// -----------------------------------------------------------------------------
// Hierarchy Chains (common parent-child patterns)
// -----------------------------------------------------------------------------

export const HIERARCHY_CHAINS = {
  navbar: ['NavbarWrapper', 'NavbarContainer', ['NavbarBrand', 'NavbarMenu', 'NavbarButton'], 'NavbarLink'],
  dropdown: ['DropdownWrapper', ['DropdownToggle', 'DropdownList'], 'DropdownLink'],
  tabs: ['TabsWrapper', ['TabsMenu', 'TabsContent'], ['TabsLink', 'TabsPane']],
  slider: ['SliderWrapper', ['SliderMask', 'SliderArrow', 'SliderNav'], 'SliderSlide'],
  form: ['FormWrapper', 'FormForm', ['FormTextInput', 'FormTextarea', 'FormSelect', 'FormButton', 'FormBlockLabel', 'FormCheckboxWrapper', 'FormRadioWrapper']],
  checkbox: ['FormCheckboxWrapper', ['FormCheckboxInput', 'FormInlineLabel']],
  radio: ['FormRadioWrapper', ['FormRadioInput', 'FormInlineLabel']],
  fileUpload: ['FormFileUploadWrapper', ['FormFileUploadDefault', 'FormFileUploadUploading', 'FormFileUploadSuccess', 'FormFileUploadError']],
  list: ['List', 'ListItem'],
  layout: ['Layout', 'Cell'],
  row: ['Row', 'Column'],
  search: ['SearchForm', ['SearchInput', 'SearchButton', 'FormBlockLabel']],
} as const;
