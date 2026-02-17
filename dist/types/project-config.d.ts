/**
 * PROJECT CONFIGURATION TYPES
 * Types for fonts.json, design_tokens.json, navigation.json
 */
export interface GoogleFontFamily {
    family: string;
    weights: number[];
    styles: ('normal' | 'italic')[];
}
export interface LocalFontWeight {
    value: number;
    style: 'normal' | 'italic';
    file: string;
}
export interface LocalFont {
    family: string;
    weights: LocalFontWeight[];
    source: 'figma' | 'upload' | 's3';
}
export interface FontUsage {
    family: string;
    usedIn: string[];
}
export interface FontsConfig {
    /** Google Fonts configuration */
    googleFonts: {
        url: string;
        families: GoogleFontFamily[];
    } | null;
    /** Local/custom fonts */
    localFonts: LocalFont[];
    /** Font usage tracking */
    usage: FontUsage[];
}
export interface ColorToken {
    /** CSS value (hex or rgb) */
    value: string;
    /** CSS custom property name */
    cssVariable: string;
    /** Values per mode (Light, Dark, etc.) */
    modes?: Record<string, string>;
}
export interface TypographyToken {
    fontSize: string;
    lineHeight?: string;
    fontWeight?: string;
    fontFamily?: string;
    letterSpacing?: string;
}
export interface DesignTokens {
    /** Color tokens from Figma variables */
    colors: Record<string, ColorToken>;
    /** Typography scales */
    typography: Record<string, TypographyToken>;
    /** Spacing scale */
    spacing: Record<string, string>;
}
export interface NavItem {
    /** Display text */
    label: string;
    /** URL or page slug */
    href: string;
    /** Link type */
    type: 'page' | 'section' | 'external' | 'email' | 'phone' | 'dropdown';
    /** Link target */
    target?: '_blank' | '_self';
    /** Dropdown children */
    children?: NavItem[];
}
export interface FooterColumn {
    title: string;
    items: NavItem[];
}
export interface NavigationConfig {
    /** Primary navigation (navbar) */
    primary: NavItem[];
    /** Footer navigation columns */
    footer: FooterColumn[];
}
//# sourceMappingURL=project-config.d.ts.map