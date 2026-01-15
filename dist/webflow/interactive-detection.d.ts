export interface InteractivePattern {
    /** Name of the pattern */
    name: string;
    /** Description for AI prompts */
    description: string;
    /** Visual indicators that suggest this pattern */
    indicators: string[];
    /** Keywords in element names/alt text that suggest this pattern */
    keywords: string[];
    /** The Webflow component structure to use */
    structure: InteractiveStructure;
}
export interface InteractiveStructure {
    /** Root component type */
    root: string;
    /** Required children with their roles */
    children: Array<{
        type: string;
        role: string;
        optional?: boolean;
        children?: InteractiveStructure['children'];
    }>;
}
export declare const INTERACTIVE_PATTERNS: InteractivePattern[];
/**
 * Check if element names/alt text suggest an interactive pattern
 */
export declare function detectInteractivePattern(elementNames: string[], altTexts: string[]): InteractivePattern | null;
/**
 * Get pattern by name
 */
export declare function getInteractivePattern(name: string): InteractivePattern | null;
/**
 * Generate prompt documentation for all interactive patterns
 */
export declare function generateInteractivePatternDocs(): string;
export declare const INTERACTIVE_PATTERN_DOCS: string;
export declare const INTERACTIVE_PATTERN_DOCS_COMPACT = "\n## Interactive Component Detection\n\n**IMPORTANT**: When you recognize these patterns, use the Webflow interactive components - NOT static divs with images!\n\n**Slider/Carousel** - Use when you see ANY of these:\n- Navigation arrows (left/right, one or both)\n- Pagination dots or indicators\n- Multiple similar items (testimonials, cards, images) that look like slides\n- Content that appears designed to rotate/cycle\n\n**\u26A0\uFE0F SLIDER CRITICAL RULE: ONE ITEM PER SLIDE!**\nEach card/testimonial/image = its own SliderSlide. NEVER put multiple items in one slide with a grid!\n- 4 team cards = 4 SliderSlides (one card each)\n- 3 testimonials = 3 SliderSlides (one testimonial each)\n\n\u2192 SliderWrapper > SliderMask > SliderSlide (one per item!) + SliderArrow (if arrows) + SliderNav (if dots)\n\n**Tabs** - Use when you see: clickable headers/buttons that switch content panels\n\u2192 TabsWrapper > TabsMenu > TabsLink + TabsContent > TabsPane\n\n**Dropdown** - Use when you see: trigger button/link with expandable menu\n\u2192 DropdownWrapper > DropdownToggle + DropdownList > DropdownLink\n\n**Navbar** - Use when you see: header with logo + navigation links (+ mobile menu)\n\u2192 NavbarWrapper > NavbarContainer > NavbarBrand + NavbarMenu > NavbarLink\n\n**Lightbox** - Use when you see: images that should enlarge/popup on click\n\u2192 LightboxWrapper > Image\n\n**Form** - Use when you see: input fields + submit button\n\u2192 FormWrapper > FormForm > FormTextInput/Textarea/Select + FormButton\n";
//# sourceMappingURL=interactive-detection.d.ts.map