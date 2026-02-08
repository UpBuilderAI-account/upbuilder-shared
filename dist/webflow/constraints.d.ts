import type { WebflowComponentType } from './components';
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
export declare const WEBFLOW_CONSTRAINTS: Record<WebflowComponentType, ComponentConstraintEntry>;
/** Get constraints for a component type */
export declare function getConstraints(type: WebflowComponentType): ComponentConstraints;
/** Get display name for a component type */
export declare function getDisplayName(type: WebflowComponentType): string;
/** Check if component requires a specific ancestor */
export declare function requiresAncestor(type: WebflowComponentType, ancestorType: WebflowComponentType): boolean;
/** Check if component forbids a specific descendant */
export declare function forbidsDescendant(type: WebflowComponentType, descendantType: WebflowComponentType): boolean;
/** Check if component has strict children requirements */
export declare function hasStrictChildren(type: WebflowComponentType): boolean;
/** Get allowed child types for a component (if RequireOnly constraint exists) */
export declare function getAllowedChildren(type: WebflowComponentType): WebflowComponentType[] | null;
/** Check if component must be pinned to parent */
export declare function isPinnedToParent(type: WebflowComponentType): boolean;
export declare const HIERARCHY_CHAINS: {
    readonly navbar: readonly ["NavbarWrapper", readonly ["NavbarBrand", "NavbarMenu", "NavbarButton"], "NavbarLink"];
    readonly dropdown: readonly ["DropdownWrapper", readonly ["DropdownToggle", "DropdownList"], "DropdownLink"];
    readonly tabs: readonly ["TabsWrapper", readonly ["TabsMenu", "TabsContent"], readonly ["TabsLink", "TabsPane"]];
    readonly slider: readonly ["SliderWrapper", readonly ["SliderMask", "SliderArrow", "SliderNav"], "SliderSlide"];
    readonly form: readonly ["FormWrapper", "FormForm", readonly ["FormTextInput", "FormTextarea", "FormSelect", "FormButton", "FormBlockLabel", "FormCheckboxWrapper", "FormRadioWrapper"]];
    readonly checkbox: readonly ["FormCheckboxWrapper", readonly ["FormCheckboxInput", "FormInlineLabel"]];
    readonly radio: readonly ["FormRadioWrapper", readonly ["FormRadioInput", "FormInlineLabel"]];
    readonly fileUpload: readonly ["FormFileUploadWrapper", readonly ["FormFileUploadDefault", "FormFileUploadUploading", "FormFileUploadSuccess", "FormFileUploadError"]];
    readonly list: readonly ["List", "ListItem"];
    readonly search: readonly ["SearchForm", readonly ["SearchInput", "SearchButton", "FormBlockLabel"]];
    readonly cms: readonly ["DynamoWrapper", readonly ["DynamoList", "DynamoEmpty"], "DynamoItem"];
};
//# sourceMappingURL=constraints.d.ts.map