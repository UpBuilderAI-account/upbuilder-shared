import type { ColorRGBA, GradientData } from '../types/element';
/**
 * Interface for CSS gradient stop (string-based, for CSS output)
 * Different from GradientStop in types/element.ts which uses ColorRGBA
 */
export interface CSSGradientStop {
    color: string;
    position?: string;
}
/**
 * Interface for parsed CSS gradient
 */
export interface ParsedGradient {
    type: string;
    direction?: string;
    stops: CSSGradientStop[];
}
/**
 * Convert RGBA color object (0-1 range) to hex string
 * @param r Red (0-1)
 * @param g Green (0-1)
 * @param b Blue (0-1)
 * @param a Alpha (0-1), optional
 * @returns Hex color string (#RRGGBB or #RRGGBBAA if alpha < 1)
 */
export declare function rgbaToHex(r: number, g: number, b: number, a?: number): string;
/**
 * Convert ColorRGBA object to hex string
 */
export declare function colorRGBAToHex(color: ColorRGBA): string;
/**
 * Convert GradientData object (from plugin) to CSS gradient string
 */
export declare function convertGradientDataToCSS(gradientData: GradientData): string;
/**
 * Parse a gradient string into its components
 */
export declare function parseGradient(gradient: string): ParsedGradient;
/**
 * Builds a CSS gradient string
 */
export declare function buildGradientString(type: string, direction: string | undefined, stops: string[]): string;
/**
 * Process color object to CSS color string (hex format)
 * Handles raw RGBA objects, hex strings, and CSS color strings
 *
 * @param color - Color value (string, RGBA object, or gradient data)
 * @param colorsOrConfig - Optional colors array for resolving numeric indices
 */
export declare function processColor(color: any, colorsOrConfig?: string[] | any): string;
/**
 * Process gradient strings
 */
export declare function processGradient(gradient: string, colorsOrConfig?: string[] | any): string;
/**
 * Process a gradient stop
 * Handles both numeric color indices and direct colors
 */
export declare function processGradientStop(stop: CSSGradientStop, colorsOrConfig?: string[] | any): string;
/**
 * Round dimension values for consistent CSS output
 */
export declare function roundDimension(value: number): number;
/**
 * Format numeric value to max decimals
 */
export declare function formatToMaxDecimals(value: number, maxDecimals?: number): string;
//# sourceMappingURL=colors.d.ts.map