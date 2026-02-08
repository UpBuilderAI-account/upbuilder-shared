export interface WebflowComponentDef {
    /** Display name shown in Webflow UI */
    readonly displayName: string;
    /** HTML tag(s) this component renders as */
    readonly tags: readonly string[];
    /** Whether this component can have children */
    readonly isContainer: boolean;
    /** Component category for organization */
    readonly category: ComponentCategory;
    /** Special data fields this component uses (beyond common fields) */
    readonly specialDataFields: readonly string[];
    /** Brief description for documentation */
    readonly description: string;
}
export type ComponentCategory = 'basic' | 'typography' | 'navigation' | 'dropdown' | 'tabs' | 'slider' | 'form' | 'search' | 'media' | 'text-formatting' | 'cms';
export declare const WEBFLOW_COMPONENTS: {
    readonly Block: {
        readonly displayName: "Div Block";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "basic";
        readonly specialDataFields: readonly ["text", "devId", "style"];
        readonly description: "Generic container element, the building block of layouts";
    };
    readonly Section: {
        readonly displayName: "Section";
        readonly tags: readonly ["section", "div"];
        readonly isContainer: true;
        readonly category: "basic";
        readonly specialDataFields: readonly ["grid"];
        readonly description: "Page section container, typically direct child of body";
    };
    readonly BlockContainer: {
        readonly displayName: "Container";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "basic";
        readonly specialDataFields: readonly ["grid"];
        readonly description: "Centered container with max-width (Webflow Container element)";
    };
    readonly Link: {
        readonly displayName: "Link";
        readonly tags: readonly ["a"];
        readonly isContainer: true;
        readonly category: "basic";
        readonly specialDataFields: readonly ["button", "block", "link", "eventIds"];
        readonly description: "Anchor link element";
    };
    readonly LinkBlock: {
        readonly displayName: "Link Block";
        readonly tags: readonly ["a"];
        readonly isContainer: true;
        readonly category: "basic";
        readonly specialDataFields: readonly ["link", "eventIds"];
        readonly description: "Block-level link that can contain other elements";
    };
    readonly TextLink: {
        readonly displayName: "Text Link";
        readonly tags: readonly ["a"];
        readonly isContainer: true;
        readonly category: "basic";
        readonly specialDataFields: readonly ["link"];
        readonly description: "Inline text link";
    };
    readonly Button: {
        readonly displayName: "Button";
        readonly tags: readonly ["a", "button"];
        readonly isContainer: true;
        readonly category: "basic";
        readonly specialDataFields: readonly ["button", "link", "eventIds"];
        readonly description: "Button element (renders as link with button styling)";
    };
    readonly List: {
        readonly displayName: "List";
        readonly tags: readonly ["ul", "ol"];
        readonly isContainer: true;
        readonly category: "basic";
        readonly specialDataFields: readonly ["list"];
        readonly description: "Ordered or unordered list container";
    };
    readonly ListItem: {
        readonly displayName: "List Item";
        readonly tags: readonly ["li"];
        readonly isContainer: true;
        readonly category: "basic";
        readonly specialDataFields: readonly ["list", "text"];
        readonly description: "List item, must be direct child of List";
    };
    readonly Image: {
        readonly displayName: "Image";
        readonly tags: readonly ["img"];
        readonly isContainer: false;
        readonly category: "media";
        readonly specialDataFields: readonly ["img", "srcsetDisabled", "sizes", "style"];
        readonly description: "Image element";
    };
    readonly Video: {
        readonly displayName: "Video";
        readonly tags: readonly ["div"];
        readonly isContainer: false;
        readonly category: "media";
        readonly specialDataFields: readonly ["video", "videoData"];
        readonly description: "Video embed element";
    };
    readonly Icon: {
        readonly displayName: "Icon";
        readonly tags: readonly ["div"];
        readonly isContainer: false;
        readonly category: "media";
        readonly specialDataFields: readonly ["widget"];
        readonly description: "Icon widget element";
    };
    readonly HtmlEmbed: {
        readonly displayName: "HTML Embed";
        readonly tags: readonly ["div"];
        readonly isContainer: false;
        readonly category: "media";
        readonly specialDataFields: readonly ["embed", "insideRTE"];
        readonly description: "Custom HTML/SVG embed";
    };
    readonly LineBreak: {
        readonly displayName: "Line Break";
        readonly tags: readonly ["br"];
        readonly isContainer: false;
        readonly category: "basic";
        readonly specialDataFields: readonly ["sym"];
        readonly description: "Line break element";
    };
    readonly Heading: {
        readonly displayName: "Heading";
        readonly tags: readonly ["h1", "h2", "h3", "h4", "h5", "h6"];
        readonly isContainer: true;
        readonly category: "typography";
        readonly specialDataFields: readonly ["tag"];
        readonly description: "Heading element (h1-h6)";
    };
    readonly Paragraph: {
        readonly displayName: "Paragraph";
        readonly tags: readonly ["p"];
        readonly isContainer: true;
        readonly category: "typography";
        readonly specialDataFields: readonly [];
        readonly description: "Paragraph text element";
    };
    readonly Span: {
        readonly displayName: "Span";
        readonly tags: readonly ["span"];
        readonly isContainer: true;
        readonly category: "typography";
        readonly specialDataFields: readonly [];
        readonly description: "Inline span element for text styling";
    };
    readonly Blockquote: {
        readonly displayName: "Block Quote";
        readonly tags: readonly ["blockquote"];
        readonly isContainer: true;
        readonly category: "typography";
        readonly specialDataFields: readonly [];
        readonly description: "Block quote element";
    };
    readonly RichText: {
        readonly displayName: "Rich Text";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "typography";
        readonly specialDataFields: readonly ["rich", "slot"];
        readonly description: "Rich text block for CMS content";
    };
    readonly Figure: {
        readonly displayName: "Figure";
        readonly tags: readonly ["figure"];
        readonly isContainer: true;
        readonly category: "typography";
        readonly specialDataFields: readonly [];
        readonly description: "Figure element for images with captions";
    };
    readonly Figcaption: {
        readonly displayName: "Fig Caption";
        readonly tags: readonly ["figcaption"];
        readonly isContainer: true;
        readonly category: "typography";
        readonly specialDataFields: readonly [];
        readonly description: "Figure caption element";
    };
    readonly Strong: {
        readonly displayName: "Strong";
        readonly tags: readonly ["strong", "b"];
        readonly isContainer: true;
        readonly category: "text-formatting";
        readonly specialDataFields: readonly [];
        readonly description: "Bold/strong text, used inside rich text containers";
    };
    readonly Emphasized: {
        readonly displayName: "Emphasized";
        readonly tags: readonly ["em", "i"];
        readonly isContainer: true;
        readonly category: "text-formatting";
        readonly specialDataFields: readonly [];
        readonly description: "Italic/emphasized text, used inside rich text containers";
    };
    readonly Superscript: {
        readonly displayName: "Superscript";
        readonly tags: readonly ["sup"];
        readonly isContainer: true;
        readonly category: "text-formatting";
        readonly specialDataFields: readonly [];
        readonly description: "Superscript text (x²), used inside rich text containers";
    };
    readonly Subscript: {
        readonly displayName: "Subscript";
        readonly tags: readonly ["sub"];
        readonly isContainer: true;
        readonly category: "text-formatting";
        readonly specialDataFields: readonly [];
        readonly description: "Subscript text (H₂O), used inside rich text containers";
    };
    readonly InlineCode: {
        readonly displayName: "Inline Code";
        readonly tags: readonly ["code"];
        readonly isContainer: true;
        readonly category: "text-formatting";
        readonly specialDataFields: readonly [];
        readonly description: "Inline code snippet, used inside rich text containers";
    };
    readonly Strikethrough: {
        readonly displayName: "Strikethrough";
        readonly tags: readonly ["s", "del"];
        readonly isContainer: true;
        readonly category: "text-formatting";
        readonly specialDataFields: readonly [];
        readonly description: "Strikethrough text, used inside rich text containers";
    };
    readonly Underline: {
        readonly displayName: "Underline";
        readonly tags: readonly ["u"];
        readonly isContainer: true;
        readonly category: "text-formatting";
        readonly specialDataFields: readonly [];
        readonly description: "Underlined text, used inside rich text containers";
    };
    readonly NavbarWrapper: {
        readonly displayName: "Navbar";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "navigation";
        readonly specialDataFields: readonly ["navbar"];
        readonly description: "Navbar wrapper, contains NavbarContainer";
    };
    readonly NavbarContainer: {
        readonly displayName: "Container";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "navigation";
        readonly specialDataFields: readonly ["navbar"];
        readonly description: "Navbar container, must be direct child of NavbarWrapper";
    };
    readonly NavbarBrand: {
        readonly displayName: "Brand";
        readonly tags: readonly ["a"];
        readonly isContainer: true;
        readonly category: "navigation";
        readonly specialDataFields: readonly ["navbar", "link", "eventIds"];
        readonly description: "Navbar brand/logo link";
    };
    readonly NavbarMenu: {
        readonly displayName: "Nav Menu";
        readonly tags: readonly ["nav"];
        readonly isContainer: true;
        readonly category: "navigation";
        readonly specialDataFields: readonly ["navbar"];
        readonly description: "Navbar menu container for nav links";
    };
    readonly NavbarLink: {
        readonly displayName: "Nav Link";
        readonly tags: readonly ["a"];
        readonly isContainer: true;
        readonly category: "navigation";
        readonly specialDataFields: readonly ["navbar", "link", "eventIds"];
        readonly description: "Navbar link, must be direct child of NavbarMenu";
    };
    readonly NavbarButton: {
        readonly displayName: "Menu Button";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "navigation";
        readonly specialDataFields: readonly ["navbar"];
        readonly description: "Mobile menu toggle button";
    };
    readonly DropdownWrapper: {
        readonly displayName: "Dropdown";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "dropdown";
        readonly specialDataFields: readonly ["dropdown"];
        readonly description: "Dropdown wrapper container";
    };
    readonly DropdownToggle: {
        readonly displayName: "Dropdown Toggle";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "dropdown";
        readonly specialDataFields: readonly ["dropdown"];
        readonly description: "Dropdown toggle button, must be direct child of DropdownWrapper";
    };
    readonly DropdownList: {
        readonly displayName: "Dropdown List";
        readonly tags: readonly ["nav"];
        readonly isContainer: true;
        readonly category: "dropdown";
        readonly specialDataFields: readonly ["dropdown"];
        readonly description: "Dropdown list container, must be direct child of DropdownWrapper";
    };
    readonly DropdownLink: {
        readonly displayName: "Dropdown Link";
        readonly tags: readonly ["a"];
        readonly isContainer: true;
        readonly category: "dropdown";
        readonly specialDataFields: readonly ["dropdown", "link", "eventIds"];
        readonly description: "Dropdown menu link, must be direct child of DropdownList";
    };
    readonly TabsWrapper: {
        readonly displayName: "Tabs";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "tabs";
        readonly specialDataFields: readonly ["tabs"];
        readonly description: "Tabs wrapper, contains TabsMenu and TabsContent";
    };
    readonly TabsMenu: {
        readonly displayName: "Tabs Menu";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "tabs";
        readonly specialDataFields: readonly ["tabs"];
        readonly description: "Tabs menu container, must be direct child of TabsWrapper";
    };
    readonly TabsContent: {
        readonly displayName: "Tabs Content";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "tabs";
        readonly specialDataFields: readonly ["tabs"];
        readonly description: "Tabs content container, must be direct child of TabsWrapper";
    };
    readonly TabsLink: {
        readonly displayName: "Tab Link";
        readonly tags: readonly ["a"];
        readonly isContainer: true;
        readonly category: "tabs";
        readonly specialDataFields: readonly ["tabs", "block"];
        readonly description: "Tab link/button, must be direct child of TabsMenu";
    };
    readonly TabsPane: {
        readonly displayName: "Tab Pane";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "tabs";
        readonly specialDataFields: readonly ["tabs"];
        readonly description: "Tab content pane, must be direct child of TabsContent";
    };
    readonly SliderWrapper: {
        readonly displayName: "Slider";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "slider";
        readonly specialDataFields: readonly ["slider"];
        readonly description: "Slider/carousel wrapper";
    };
    readonly SliderMask: {
        readonly displayName: "Mask";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "slider";
        readonly specialDataFields: readonly ["slider"];
        readonly description: "Slider mask/viewport, must be direct child of SliderWrapper";
    };
    readonly SliderSlide: {
        readonly displayName: "Slide";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "slider";
        readonly specialDataFields: readonly ["slider"];
        readonly description: "Individual slide, must be direct child of SliderMask";
    };
    readonly SliderArrow: {
        readonly displayName: "Slider Arrow";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "slider";
        readonly specialDataFields: readonly ["slider"];
        readonly description: "Navigation arrow, must be direct child of SliderWrapper";
    };
    readonly SliderNav: {
        readonly displayName: "Slide Nav";
        readonly tags: readonly ["div"];
        readonly isContainer: false;
        readonly category: "slider";
        readonly specialDataFields: readonly ["slider"];
        readonly description: "Slide indicator dots, must be direct child of SliderWrapper";
    };
    readonly FormWrapper: {
        readonly displayName: "Form Block";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "form";
        readonly specialDataFields: readonly ["form"];
        readonly description: "Form wrapper, contains FormForm and messages";
    };
    readonly FormForm: {
        readonly displayName: "Form";
        readonly tags: readonly ["form"];
        readonly isContainer: true;
        readonly category: "form";
        readonly specialDataFields: readonly ["form", "Source"];
        readonly description: "Form element, must be inside FormWrapper";
    };
    readonly FormBlockLabel: {
        readonly displayName: "Label";
        readonly tags: readonly ["label"];
        readonly isContainer: true;
        readonly category: "form";
        readonly specialDataFields: readonly ["form"];
        readonly description: "Form field label";
    };
    readonly FormTextInput: {
        readonly displayName: "Text Field";
        readonly tags: readonly ["input"];
        readonly isContainer: false;
        readonly category: "form";
        readonly specialDataFields: readonly ["form"];
        readonly description: "Text input field, must be direct child of FormForm";
    };
    readonly FormTextarea: {
        readonly displayName: "Text Area";
        readonly tags: readonly ["textarea"];
        readonly isContainer: false;
        readonly category: "form";
        readonly specialDataFields: readonly ["form"];
        readonly description: "Textarea field, must be direct child of FormForm";
    };
    readonly FormSelect: {
        readonly displayName: "Select";
        readonly tags: readonly ["select"];
        readonly isContainer: false;
        readonly category: "form";
        readonly specialDataFields: readonly ["form"];
        readonly description: "Select dropdown, must be direct child of FormForm";
    };
    readonly FormButton: {
        readonly displayName: "Submit Button";
        readonly tags: readonly ["input"];
        readonly isContainer: false;
        readonly category: "form";
        readonly specialDataFields: readonly ["form", "eventIds"];
        readonly description: "Form submit button";
    };
    readonly FormCheckboxWrapper: {
        readonly displayName: "Checkbox";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "form";
        readonly specialDataFields: readonly ["form"];
        readonly description: "Checkbox wrapper, contains input and label";
    };
    readonly FormCheckboxInput: {
        readonly displayName: "Checkbox Input";
        readonly tags: readonly ["input"];
        readonly isContainer: false;
        readonly category: "form";
        readonly specialDataFields: readonly ["form", "inputType"];
        readonly description: "Checkbox input, must be inside FormCheckboxWrapper";
    };
    readonly FormRadioWrapper: {
        readonly displayName: "Radio Button";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "form";
        readonly specialDataFields: readonly ["form"];
        readonly description: "Radio button wrapper, contains input and label";
    };
    readonly FormRadioInput: {
        readonly displayName: "Radio Input";
        readonly tags: readonly ["input"];
        readonly isContainer: false;
        readonly category: "form";
        readonly specialDataFields: readonly ["form", "inputType"];
        readonly description: "Radio input, must be inside FormRadioWrapper";
    };
    readonly FormInlineLabel: {
        readonly displayName: "Inline Label";
        readonly tags: readonly ["label"];
        readonly isContainer: true;
        readonly category: "form";
        readonly specialDataFields: readonly ["form"];
        readonly description: "Inline label for checkbox/radio";
    };
    readonly FormSuccessMessage: {
        readonly displayName: "Success Message";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "form";
        readonly specialDataFields: readonly ["form"];
        readonly description: "Form success message, must be inside FormWrapper";
    };
    readonly FormErrorMessage: {
        readonly displayName: "Error Message";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "form";
        readonly specialDataFields: readonly ["form"];
        readonly description: "Form error message, must be inside FormWrapper";
    };
    readonly FormFileUploadWrapper: {
        readonly displayName: "File Upload";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "form";
        readonly specialDataFields: readonly ["form"];
        readonly description: "File upload wrapper with states";
    };
    readonly FormFileUploadDefault: {
        readonly displayName: "File Upload Default State";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "form";
        readonly specialDataFields: readonly ["form"];
        readonly description: "Default state of file upload";
    };
    readonly FormFileUploadUploading: {
        readonly displayName: "File Upload Uploading State";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "form";
        readonly specialDataFields: readonly ["form"];
        readonly description: "Uploading state of file upload";
    };
    readonly FormFileUploadSuccess: {
        readonly displayName: "File Upload Success State";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "form";
        readonly specialDataFields: readonly ["form"];
        readonly description: "Success state of file upload";
    };
    readonly FormFileUploadError: {
        readonly displayName: "File Upload Error State";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "form";
        readonly specialDataFields: readonly ["form"];
        readonly description: "Error state of file upload";
    };
    readonly FormFileUploadInput: {
        readonly displayName: "File Upload Input";
        readonly tags: readonly ["input"];
        readonly isContainer: false;
        readonly category: "form";
        readonly specialDataFields: readonly ["form"];
        readonly description: "File input element";
    };
    readonly FormFileUploadLabel: {
        readonly displayName: "File Upload Label";
        readonly tags: readonly ["label"];
        readonly isContainer: true;
        readonly category: "form";
        readonly specialDataFields: readonly ["form"];
        readonly description: "File upload label/button";
    };
    readonly FormFileUploadErrorMsg: {
        readonly displayName: "File Upload Error Message";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "form";
        readonly specialDataFields: readonly ["form"];
        readonly description: "File upload error message text";
    };
    readonly FormReCaptcha: {
        readonly displayName: "reCAPTCHA";
        readonly tags: readonly ["div"];
        readonly isContainer: false;
        readonly category: "form";
        readonly specialDataFields: readonly ["form"];
        readonly description: "reCAPTCHA widget";
    };
    readonly SearchForm: {
        readonly displayName: "Search";
        readonly tags: readonly ["form"];
        readonly isContainer: true;
        readonly category: "search";
        readonly specialDataFields: readonly ["search"];
        readonly description: "Search form wrapper";
    };
    readonly SearchInput: {
        readonly displayName: "Search Input";
        readonly tags: readonly ["input"];
        readonly isContainer: false;
        readonly category: "search";
        readonly specialDataFields: readonly ["search"];
        readonly description: "Search text input";
    };
    readonly SearchButton: {
        readonly displayName: "Search Button";
        readonly tags: readonly ["input"];
        readonly isContainer: false;
        readonly category: "search";
        readonly specialDataFields: readonly ["search"];
        readonly description: "Search submit button";
    };
    readonly LightboxWrapper: {
        readonly displayName: "Lightbox Link";
        readonly tags: readonly ["a"];
        readonly isContainer: true;
        readonly category: "media";
        readonly specialDataFields: readonly ["lightbox", "link"];
        readonly description: "Lightbox trigger link";
    };
    readonly Map: {
        readonly displayName: "Map";
        readonly tags: readonly ["div"];
        readonly isContainer: false;
        readonly category: "media";
        readonly specialDataFields: readonly ["widget"];
        readonly description: "Google Maps embed";
    };
    readonly Embed: {
        readonly displayName: "Embed";
        readonly tags: readonly ["div"];
        readonly isContainer: false;
        readonly category: "media";
        readonly specialDataFields: readonly ["embed"];
        readonly description: "Generic embed element";
    };
    readonly DynamoList: {
        readonly displayName: "Collection List";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "cms";
        readonly specialDataFields: readonly ["dyn"];
        readonly description: "CMS collection list wrapper";
    };
    readonly DynamoItem: {
        readonly displayName: "Collection Item";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "cms";
        readonly specialDataFields: readonly ["dyn"];
        readonly description: "Repeating item template inside collection list";
    };
    readonly DynamoEmpty: {
        readonly displayName: "Empty State";
        readonly tags: readonly ["div"];
        readonly isContainer: true;
        readonly category: "cms";
        readonly specialDataFields: readonly ["dyn"];
        readonly description: "Fallback content when collection is empty";
    };
};
/** All valid Webflow component type names */
export type WebflowComponentType = keyof typeof WEBFLOW_COMPONENTS;
/** Array of all component type names */
export declare const ALL_COMPONENT_TYPES: WebflowComponentType[];
/** Get component definition by type */
export declare function getComponentDef(type: WebflowComponentType): WebflowComponentDef;
/** Check if a string is a valid component type */
export declare function isValidComponentType(type: string): type is WebflowComponentType;
/** Get all components in a category */
export declare function getComponentsByCategory(category: ComponentCategory): WebflowComponentType[];
/** Pre-computed category groups */
export declare const COMPONENTS_BY_CATEGORY: {
    readonly basic: ("RichText" | "Image" | "Video" | "Link" | "Section" | "Button" | "List" | "Icon" | "Heading" | "Paragraph" | "Span" | "Figure" | "Strong" | "Emphasized" | "Superscript" | "Subscript" | "Strikethrough" | "Underline" | "Map" | "Embed" | "Block" | "BlockContainer" | "LinkBlock" | "TextLink" | "ListItem" | "HtmlEmbed" | "LineBreak" | "Blockquote" | "Figcaption" | "InlineCode" | "NavbarWrapper" | "NavbarContainer" | "NavbarBrand" | "NavbarMenu" | "NavbarLink" | "NavbarButton" | "DropdownWrapper" | "DropdownToggle" | "DropdownList" | "DropdownLink" | "TabsWrapper" | "TabsMenu" | "TabsContent" | "TabsLink" | "TabsPane" | "SliderWrapper" | "SliderMask" | "SliderSlide" | "SliderArrow" | "SliderNav" | "FormWrapper" | "FormForm" | "FormBlockLabel" | "FormTextInput" | "FormTextarea" | "FormSelect" | "FormButton" | "FormCheckboxWrapper" | "FormCheckboxInput" | "FormRadioWrapper" | "FormRadioInput" | "FormInlineLabel" | "FormSuccessMessage" | "FormErrorMessage" | "FormFileUploadWrapper" | "FormFileUploadDefault" | "FormFileUploadUploading" | "FormFileUploadSuccess" | "FormFileUploadError" | "FormFileUploadInput" | "FormFileUploadLabel" | "FormFileUploadErrorMsg" | "FormReCaptcha" | "SearchForm" | "SearchInput" | "SearchButton" | "LightboxWrapper" | "DynamoList" | "DynamoItem" | "DynamoEmpty")[];
    readonly typography: ("RichText" | "Image" | "Video" | "Link" | "Section" | "Button" | "List" | "Icon" | "Heading" | "Paragraph" | "Span" | "Figure" | "Strong" | "Emphasized" | "Superscript" | "Subscript" | "Strikethrough" | "Underline" | "Map" | "Embed" | "Block" | "BlockContainer" | "LinkBlock" | "TextLink" | "ListItem" | "HtmlEmbed" | "LineBreak" | "Blockquote" | "Figcaption" | "InlineCode" | "NavbarWrapper" | "NavbarContainer" | "NavbarBrand" | "NavbarMenu" | "NavbarLink" | "NavbarButton" | "DropdownWrapper" | "DropdownToggle" | "DropdownList" | "DropdownLink" | "TabsWrapper" | "TabsMenu" | "TabsContent" | "TabsLink" | "TabsPane" | "SliderWrapper" | "SliderMask" | "SliderSlide" | "SliderArrow" | "SliderNav" | "FormWrapper" | "FormForm" | "FormBlockLabel" | "FormTextInput" | "FormTextarea" | "FormSelect" | "FormButton" | "FormCheckboxWrapper" | "FormCheckboxInput" | "FormRadioWrapper" | "FormRadioInput" | "FormInlineLabel" | "FormSuccessMessage" | "FormErrorMessage" | "FormFileUploadWrapper" | "FormFileUploadDefault" | "FormFileUploadUploading" | "FormFileUploadSuccess" | "FormFileUploadError" | "FormFileUploadInput" | "FormFileUploadLabel" | "FormFileUploadErrorMsg" | "FormReCaptcha" | "SearchForm" | "SearchInput" | "SearchButton" | "LightboxWrapper" | "DynamoList" | "DynamoItem" | "DynamoEmpty")[];
    readonly 'text-formatting': ("RichText" | "Image" | "Video" | "Link" | "Section" | "Button" | "List" | "Icon" | "Heading" | "Paragraph" | "Span" | "Figure" | "Strong" | "Emphasized" | "Superscript" | "Subscript" | "Strikethrough" | "Underline" | "Map" | "Embed" | "Block" | "BlockContainer" | "LinkBlock" | "TextLink" | "ListItem" | "HtmlEmbed" | "LineBreak" | "Blockquote" | "Figcaption" | "InlineCode" | "NavbarWrapper" | "NavbarContainer" | "NavbarBrand" | "NavbarMenu" | "NavbarLink" | "NavbarButton" | "DropdownWrapper" | "DropdownToggle" | "DropdownList" | "DropdownLink" | "TabsWrapper" | "TabsMenu" | "TabsContent" | "TabsLink" | "TabsPane" | "SliderWrapper" | "SliderMask" | "SliderSlide" | "SliderArrow" | "SliderNav" | "FormWrapper" | "FormForm" | "FormBlockLabel" | "FormTextInput" | "FormTextarea" | "FormSelect" | "FormButton" | "FormCheckboxWrapper" | "FormCheckboxInput" | "FormRadioWrapper" | "FormRadioInput" | "FormInlineLabel" | "FormSuccessMessage" | "FormErrorMessage" | "FormFileUploadWrapper" | "FormFileUploadDefault" | "FormFileUploadUploading" | "FormFileUploadSuccess" | "FormFileUploadError" | "FormFileUploadInput" | "FormFileUploadLabel" | "FormFileUploadErrorMsg" | "FormReCaptcha" | "SearchForm" | "SearchInput" | "SearchButton" | "LightboxWrapper" | "DynamoList" | "DynamoItem" | "DynamoEmpty")[];
    readonly navigation: ("RichText" | "Image" | "Video" | "Link" | "Section" | "Button" | "List" | "Icon" | "Heading" | "Paragraph" | "Span" | "Figure" | "Strong" | "Emphasized" | "Superscript" | "Subscript" | "Strikethrough" | "Underline" | "Map" | "Embed" | "Block" | "BlockContainer" | "LinkBlock" | "TextLink" | "ListItem" | "HtmlEmbed" | "LineBreak" | "Blockquote" | "Figcaption" | "InlineCode" | "NavbarWrapper" | "NavbarContainer" | "NavbarBrand" | "NavbarMenu" | "NavbarLink" | "NavbarButton" | "DropdownWrapper" | "DropdownToggle" | "DropdownList" | "DropdownLink" | "TabsWrapper" | "TabsMenu" | "TabsContent" | "TabsLink" | "TabsPane" | "SliderWrapper" | "SliderMask" | "SliderSlide" | "SliderArrow" | "SliderNav" | "FormWrapper" | "FormForm" | "FormBlockLabel" | "FormTextInput" | "FormTextarea" | "FormSelect" | "FormButton" | "FormCheckboxWrapper" | "FormCheckboxInput" | "FormRadioWrapper" | "FormRadioInput" | "FormInlineLabel" | "FormSuccessMessage" | "FormErrorMessage" | "FormFileUploadWrapper" | "FormFileUploadDefault" | "FormFileUploadUploading" | "FormFileUploadSuccess" | "FormFileUploadError" | "FormFileUploadInput" | "FormFileUploadLabel" | "FormFileUploadErrorMsg" | "FormReCaptcha" | "SearchForm" | "SearchInput" | "SearchButton" | "LightboxWrapper" | "DynamoList" | "DynamoItem" | "DynamoEmpty")[];
    readonly dropdown: ("RichText" | "Image" | "Video" | "Link" | "Section" | "Button" | "List" | "Icon" | "Heading" | "Paragraph" | "Span" | "Figure" | "Strong" | "Emphasized" | "Superscript" | "Subscript" | "Strikethrough" | "Underline" | "Map" | "Embed" | "Block" | "BlockContainer" | "LinkBlock" | "TextLink" | "ListItem" | "HtmlEmbed" | "LineBreak" | "Blockquote" | "Figcaption" | "InlineCode" | "NavbarWrapper" | "NavbarContainer" | "NavbarBrand" | "NavbarMenu" | "NavbarLink" | "NavbarButton" | "DropdownWrapper" | "DropdownToggle" | "DropdownList" | "DropdownLink" | "TabsWrapper" | "TabsMenu" | "TabsContent" | "TabsLink" | "TabsPane" | "SliderWrapper" | "SliderMask" | "SliderSlide" | "SliderArrow" | "SliderNav" | "FormWrapper" | "FormForm" | "FormBlockLabel" | "FormTextInput" | "FormTextarea" | "FormSelect" | "FormButton" | "FormCheckboxWrapper" | "FormCheckboxInput" | "FormRadioWrapper" | "FormRadioInput" | "FormInlineLabel" | "FormSuccessMessage" | "FormErrorMessage" | "FormFileUploadWrapper" | "FormFileUploadDefault" | "FormFileUploadUploading" | "FormFileUploadSuccess" | "FormFileUploadError" | "FormFileUploadInput" | "FormFileUploadLabel" | "FormFileUploadErrorMsg" | "FormReCaptcha" | "SearchForm" | "SearchInput" | "SearchButton" | "LightboxWrapper" | "DynamoList" | "DynamoItem" | "DynamoEmpty")[];
    readonly tabs: ("RichText" | "Image" | "Video" | "Link" | "Section" | "Button" | "List" | "Icon" | "Heading" | "Paragraph" | "Span" | "Figure" | "Strong" | "Emphasized" | "Superscript" | "Subscript" | "Strikethrough" | "Underline" | "Map" | "Embed" | "Block" | "BlockContainer" | "LinkBlock" | "TextLink" | "ListItem" | "HtmlEmbed" | "LineBreak" | "Blockquote" | "Figcaption" | "InlineCode" | "NavbarWrapper" | "NavbarContainer" | "NavbarBrand" | "NavbarMenu" | "NavbarLink" | "NavbarButton" | "DropdownWrapper" | "DropdownToggle" | "DropdownList" | "DropdownLink" | "TabsWrapper" | "TabsMenu" | "TabsContent" | "TabsLink" | "TabsPane" | "SliderWrapper" | "SliderMask" | "SliderSlide" | "SliderArrow" | "SliderNav" | "FormWrapper" | "FormForm" | "FormBlockLabel" | "FormTextInput" | "FormTextarea" | "FormSelect" | "FormButton" | "FormCheckboxWrapper" | "FormCheckboxInput" | "FormRadioWrapper" | "FormRadioInput" | "FormInlineLabel" | "FormSuccessMessage" | "FormErrorMessage" | "FormFileUploadWrapper" | "FormFileUploadDefault" | "FormFileUploadUploading" | "FormFileUploadSuccess" | "FormFileUploadError" | "FormFileUploadInput" | "FormFileUploadLabel" | "FormFileUploadErrorMsg" | "FormReCaptcha" | "SearchForm" | "SearchInput" | "SearchButton" | "LightboxWrapper" | "DynamoList" | "DynamoItem" | "DynamoEmpty")[];
    readonly slider: ("RichText" | "Image" | "Video" | "Link" | "Section" | "Button" | "List" | "Icon" | "Heading" | "Paragraph" | "Span" | "Figure" | "Strong" | "Emphasized" | "Superscript" | "Subscript" | "Strikethrough" | "Underline" | "Map" | "Embed" | "Block" | "BlockContainer" | "LinkBlock" | "TextLink" | "ListItem" | "HtmlEmbed" | "LineBreak" | "Blockquote" | "Figcaption" | "InlineCode" | "NavbarWrapper" | "NavbarContainer" | "NavbarBrand" | "NavbarMenu" | "NavbarLink" | "NavbarButton" | "DropdownWrapper" | "DropdownToggle" | "DropdownList" | "DropdownLink" | "TabsWrapper" | "TabsMenu" | "TabsContent" | "TabsLink" | "TabsPane" | "SliderWrapper" | "SliderMask" | "SliderSlide" | "SliderArrow" | "SliderNav" | "FormWrapper" | "FormForm" | "FormBlockLabel" | "FormTextInput" | "FormTextarea" | "FormSelect" | "FormButton" | "FormCheckboxWrapper" | "FormCheckboxInput" | "FormRadioWrapper" | "FormRadioInput" | "FormInlineLabel" | "FormSuccessMessage" | "FormErrorMessage" | "FormFileUploadWrapper" | "FormFileUploadDefault" | "FormFileUploadUploading" | "FormFileUploadSuccess" | "FormFileUploadError" | "FormFileUploadInput" | "FormFileUploadLabel" | "FormFileUploadErrorMsg" | "FormReCaptcha" | "SearchForm" | "SearchInput" | "SearchButton" | "LightboxWrapper" | "DynamoList" | "DynamoItem" | "DynamoEmpty")[];
    readonly form: ("RichText" | "Image" | "Video" | "Link" | "Section" | "Button" | "List" | "Icon" | "Heading" | "Paragraph" | "Span" | "Figure" | "Strong" | "Emphasized" | "Superscript" | "Subscript" | "Strikethrough" | "Underline" | "Map" | "Embed" | "Block" | "BlockContainer" | "LinkBlock" | "TextLink" | "ListItem" | "HtmlEmbed" | "LineBreak" | "Blockquote" | "Figcaption" | "InlineCode" | "NavbarWrapper" | "NavbarContainer" | "NavbarBrand" | "NavbarMenu" | "NavbarLink" | "NavbarButton" | "DropdownWrapper" | "DropdownToggle" | "DropdownList" | "DropdownLink" | "TabsWrapper" | "TabsMenu" | "TabsContent" | "TabsLink" | "TabsPane" | "SliderWrapper" | "SliderMask" | "SliderSlide" | "SliderArrow" | "SliderNav" | "FormWrapper" | "FormForm" | "FormBlockLabel" | "FormTextInput" | "FormTextarea" | "FormSelect" | "FormButton" | "FormCheckboxWrapper" | "FormCheckboxInput" | "FormRadioWrapper" | "FormRadioInput" | "FormInlineLabel" | "FormSuccessMessage" | "FormErrorMessage" | "FormFileUploadWrapper" | "FormFileUploadDefault" | "FormFileUploadUploading" | "FormFileUploadSuccess" | "FormFileUploadError" | "FormFileUploadInput" | "FormFileUploadLabel" | "FormFileUploadErrorMsg" | "FormReCaptcha" | "SearchForm" | "SearchInput" | "SearchButton" | "LightboxWrapper" | "DynamoList" | "DynamoItem" | "DynamoEmpty")[];
    readonly search: ("RichText" | "Image" | "Video" | "Link" | "Section" | "Button" | "List" | "Icon" | "Heading" | "Paragraph" | "Span" | "Figure" | "Strong" | "Emphasized" | "Superscript" | "Subscript" | "Strikethrough" | "Underline" | "Map" | "Embed" | "Block" | "BlockContainer" | "LinkBlock" | "TextLink" | "ListItem" | "HtmlEmbed" | "LineBreak" | "Blockquote" | "Figcaption" | "InlineCode" | "NavbarWrapper" | "NavbarContainer" | "NavbarBrand" | "NavbarMenu" | "NavbarLink" | "NavbarButton" | "DropdownWrapper" | "DropdownToggle" | "DropdownList" | "DropdownLink" | "TabsWrapper" | "TabsMenu" | "TabsContent" | "TabsLink" | "TabsPane" | "SliderWrapper" | "SliderMask" | "SliderSlide" | "SliderArrow" | "SliderNav" | "FormWrapper" | "FormForm" | "FormBlockLabel" | "FormTextInput" | "FormTextarea" | "FormSelect" | "FormButton" | "FormCheckboxWrapper" | "FormCheckboxInput" | "FormRadioWrapper" | "FormRadioInput" | "FormInlineLabel" | "FormSuccessMessage" | "FormErrorMessage" | "FormFileUploadWrapper" | "FormFileUploadDefault" | "FormFileUploadUploading" | "FormFileUploadSuccess" | "FormFileUploadError" | "FormFileUploadInput" | "FormFileUploadLabel" | "FormFileUploadErrorMsg" | "FormReCaptcha" | "SearchForm" | "SearchInput" | "SearchButton" | "LightboxWrapper" | "DynamoList" | "DynamoItem" | "DynamoEmpty")[];
    readonly media: ("RichText" | "Image" | "Video" | "Link" | "Section" | "Button" | "List" | "Icon" | "Heading" | "Paragraph" | "Span" | "Figure" | "Strong" | "Emphasized" | "Superscript" | "Subscript" | "Strikethrough" | "Underline" | "Map" | "Embed" | "Block" | "BlockContainer" | "LinkBlock" | "TextLink" | "ListItem" | "HtmlEmbed" | "LineBreak" | "Blockquote" | "Figcaption" | "InlineCode" | "NavbarWrapper" | "NavbarContainer" | "NavbarBrand" | "NavbarMenu" | "NavbarLink" | "NavbarButton" | "DropdownWrapper" | "DropdownToggle" | "DropdownList" | "DropdownLink" | "TabsWrapper" | "TabsMenu" | "TabsContent" | "TabsLink" | "TabsPane" | "SliderWrapper" | "SliderMask" | "SliderSlide" | "SliderArrow" | "SliderNav" | "FormWrapper" | "FormForm" | "FormBlockLabel" | "FormTextInput" | "FormTextarea" | "FormSelect" | "FormButton" | "FormCheckboxWrapper" | "FormCheckboxInput" | "FormRadioWrapper" | "FormRadioInput" | "FormInlineLabel" | "FormSuccessMessage" | "FormErrorMessage" | "FormFileUploadWrapper" | "FormFileUploadDefault" | "FormFileUploadUploading" | "FormFileUploadSuccess" | "FormFileUploadError" | "FormFileUploadInput" | "FormFileUploadLabel" | "FormFileUploadErrorMsg" | "FormReCaptcha" | "SearchForm" | "SearchInput" | "SearchButton" | "LightboxWrapper" | "DynamoList" | "DynamoItem" | "DynamoEmpty")[];
    readonly cms: ("RichText" | "Image" | "Video" | "Link" | "Section" | "Button" | "List" | "Icon" | "Heading" | "Paragraph" | "Span" | "Figure" | "Strong" | "Emphasized" | "Superscript" | "Subscript" | "Strikethrough" | "Underline" | "Map" | "Embed" | "Block" | "BlockContainer" | "LinkBlock" | "TextLink" | "ListItem" | "HtmlEmbed" | "LineBreak" | "Blockquote" | "Figcaption" | "InlineCode" | "NavbarWrapper" | "NavbarContainer" | "NavbarBrand" | "NavbarMenu" | "NavbarLink" | "NavbarButton" | "DropdownWrapper" | "DropdownToggle" | "DropdownList" | "DropdownLink" | "TabsWrapper" | "TabsMenu" | "TabsContent" | "TabsLink" | "TabsPane" | "SliderWrapper" | "SliderMask" | "SliderSlide" | "SliderArrow" | "SliderNav" | "FormWrapper" | "FormForm" | "FormBlockLabel" | "FormTextInput" | "FormTextarea" | "FormSelect" | "FormButton" | "FormCheckboxWrapper" | "FormCheckboxInput" | "FormRadioWrapper" | "FormRadioInput" | "FormInlineLabel" | "FormSuccessMessage" | "FormErrorMessage" | "FormFileUploadWrapper" | "FormFileUploadDefault" | "FormFileUploadUploading" | "FormFileUploadSuccess" | "FormFileUploadError" | "FormFileUploadInput" | "FormFileUploadLabel" | "FormFileUploadErrorMsg" | "FormReCaptcha" | "SearchForm" | "SearchInput" | "SearchButton" | "LightboxWrapper" | "DynamoList" | "DynamoItem" | "DynamoEmpty")[];
};
/** Count of components */
export declare const COMPONENT_COUNT: number;
//# sourceMappingURL=components.d.ts.map