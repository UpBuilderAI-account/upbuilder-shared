// ============================================================================
// SHARED COLOR UTILITIES
// Color conversion and gradient processing utilities
// Single source of truth for all color processing (backend + plugin)
// ============================================================================

import type { ColorRGBA, GradientData, GradientStop as ElementGradientStop } from '../types/element';

// ==================== INTERFACES ====================

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

// ==================== COLOR CONVERSION ====================

/**
 * Convert RGBA color object (0-1 range) to hex string
 * @param r Red (0-1)
 * @param g Green (0-1)
 * @param b Blue (0-1)
 * @param a Alpha (0-1), optional
 * @returns Hex color string (#RRGGBB or #RRGGBBAA if alpha < 1)
 */
export function rgbaToHex(r: number, g: number, b: number, a?: number): string {
  // Convert from 0-1 range to 0-255
  const r255 = Math.round(r * 255);
  const g255 = Math.round(g * 255);
  const b255 = Math.round(b * 255);

  // Convert to hex
  const toHex = (n: number) => n.toString(16).padStart(2, '0');

  const hex = `#${toHex(r255)}${toHex(g255)}${toHex(b255)}`;

  // Only add alpha if it's not fully opaque
  if (a !== undefined && a < 1) {
    const a255 = Math.round(a * 255);
    return `${hex}${toHex(a255)}`;
  }

  return hex;
}

/**
 * Convert ColorRGBA object to hex string
 */
export function colorRGBAToHex(color: ColorRGBA): string {
  return rgbaToHex(color.r, color.g, color.b, color.a);
}

// ==================== GRADIENT CONVERSION ====================

/**
 * Convert GradientData object (from plugin) to CSS gradient string
 */
export function convertGradientDataToCSS(gradientData: GradientData): string {
  if (!gradientData || !gradientData.stops || !Array.isArray(gradientData.stops)) {
    return 'linear-gradient(to bottom, #000000, #ffffff)';
  }

  const type = gradientData.type || 'LINEAR';
  const geometry = gradientData.geometry || {};

  // Convert stops to CSS format with hex colors
  const cssStops = gradientData.stops.map((stop: ElementGradientStop) => {
    const color = stop.color;
    const position = stop.position;

    // Convert Color object (0-1 range) to hex
    const hexColor = rgbaToHex(color.r, color.g, color.b, color.a);

    // Position is 0-1, convert to percentage
    const positionStr = position !== undefined ? ` ${Math.round(position * 100)}%` : '';

    return `${hexColor}${positionStr}`;
  }).join(', ');

  // Generate CSS gradient based on type
  switch (type) {
    case 'LINEAR': {
      // Use angle if available, otherwise default to bottom
      const angle = geometry.angle !== undefined ? `${Math.round(geometry.angle)}deg` : 'to bottom';
      return `linear-gradient(${angle}, ${cssStops})`;
    }

    case 'RADIAL': {
      // Use center and radius if available
      let position = 'at center';
      if (geometry.center && Array.isArray(geometry.center)) {
        const [cx, cy] = geometry.center;
        position = `at ${Math.round(cx * 100)}% ${Math.round(cy * 100)}%`;
      }

      let shape = 'circle';
      if (geometry.radius && Array.isArray(geometry.radius)) {
        const [rx, ry] = geometry.radius;
        if (Math.abs(rx - ry) > 0.01) {
          shape = 'ellipse';
        }
      }

      return `radial-gradient(${shape} ${position}, ${cssStops})`;
    }

    case 'ANGULAR': {
      // Angular gradients use conic-gradient in CSS
      let fromAngle = '0deg';
      let position = 'at center';

      if (geometry.rotation !== undefined) {
        fromAngle = `from ${Math.round(geometry.rotation)}deg`;
      }

      if (geometry.center && Array.isArray(geometry.center)) {
        const [cx, cy] = geometry.center;
        position = `at ${Math.round(cx * 100)}% ${Math.round(cy * 100)}%`;
      }

      return `conic-gradient(${fromAngle} ${position}, ${cssStops})`;
    }

    case 'DIAMOND': {
      // Diamond gradients are approximated as radial gradients
      let position = 'at center';
      if (geometry.center && Array.isArray(geometry.center)) {
        const [cx, cy] = geometry.center;
        position = `at ${Math.round(cx * 100)}% ${Math.round(cy * 100)}%`;
      }

      return `radial-gradient(circle ${position}, ${cssStops})`;
    }

    default:
      return `linear-gradient(to bottom, ${cssStops})`;
  }
}

// ==================== GRADIENT PARSING ====================

/**
 * Parse a gradient string into its components
 */
export function parseGradient(gradient: string): ParsedGradient {
  const gradientRegex = /(\w+)-gradient\s*\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)/;
  const match = gradient.match(gradientRegex);

  if (!match) {
    throw new Error('Invalid gradient string');
  }

  const [, type, content] = match;
  const parts = content.split(/,(?![^(]*\))/);

  let direction: string | undefined;
  const stops: CSSGradientStop[] = [];

  if (isDirectionPart(parts[0])) {
    direction = parts.shift()?.trim();
  }

  parts.forEach(part => {
    const [color, position] = part.trim().split(/\s+(?![^(]*\))/);
    stops.push({ color, position });
  });

  return { type, direction, stops };
}

/**
 * Checks if a part is a gradient direction
 */
function isDirectionPart(part: string): boolean {
  return part.trim().match(/^(to |[0-9]+deg|[a-z]+)/) !== null || part.includes('at ');
}

/**
 * Builds a CSS gradient string
 */
export function buildGradientString(type: string, direction: string | undefined, stops: string[]): string {
  let gradientString = `${type}-gradient(`;
  if (direction) {
    gradientString += `${direction}, `;
  }
  gradientString += stops.join(', ');
  gradientString += ')';
  return gradientString;
}

// ==================== COLOR PROCESSING ====================

/**
 * Process color object to CSS color string (hex format)
 * Handles raw RGBA objects, hex strings, and CSS color strings
 *
 * @param color - Color value (string, RGBA object, or gradient data)
 * @param colorsOrConfig - Optional colors array for resolving numeric indices
 */
export function processColor(color: any, colorsOrConfig?: string[] | any): string {
  if (!color) return '#000000';

  if (typeof color === 'string') {
    // Check if it's a gradient
    if (color.includes('gradient')) {
      return processGradient(color, colorsOrConfig);
    }
    return color;
  }

  if (color.hex) {
    return color.hex;
  }

  // Handle RGBA object (0-1 range from Figma)
  if (color.r !== undefined && color.g !== undefined && color.b !== undefined) {
    const a = color.a !== undefined ? color.a : 1;
    return rgbaToHex(color.r, color.g, color.b, a);
  }

  // Handle color object with nested color property (from BackgroundFill)
  if (color.color && color.color.r !== undefined) {
    const c = color.color;
    const a = c.a !== undefined ? c.a : 1;
    return rgbaToHex(c.r, c.g, c.b, a);
  }

  // Handle gradient data object (from plugin)
  if (color.gradient || color.type === 'LINEAR' || color.type === 'RADIAL' || color.type === 'ANGULAR' || color.type === 'DIAMOND') {
    const gradientData = color.gradient || color;
    return convertGradientDataToCSS(gradientData);
  }

  return '#000000';
}

/**
 * Process gradient strings
 */
export function processGradient(gradient: string, colorsOrConfig?: string[] | any): string {
  try {
    const parsedGradient = parseGradient(gradient);
    const processedStops = parsedGradient.stops.map(stop =>
      processGradientStop(stop, colorsOrConfig)
    );

    return buildGradientString(parsedGradient.type, parsedGradient.direction, processedStops);
  } catch (error) {
    console.error('[processGradient] Error processing gradient:', error);
    return 'linear-gradient(to bottom, #000000, #ffffff)';
  }
}

/**
 * Process a gradient stop
 * Handles both numeric color indices and direct colors
 */
export function processGradientStop(stop: CSSGradientStop, colorsOrConfig?: string[] | any): string {
  let processedColor = stop.color;

  // If the color is a numeric string and we have a colors array, resolve it
  if (Array.isArray(colorsOrConfig) && /^\d+$/.test(stop.color)) {
    const colorIndex = parseInt(stop.color);

    if (colorIndex >= 0 && colorIndex < colorsOrConfig.length) {
      processedColor = colorsOrConfig[colorIndex];
    } else {
      processedColor = '#000000';
    }
  }

  // Process the color (avoid recursion for already-processed colors)
  if (!processedColor.startsWith('#') && !processedColor.startsWith('rgb') && !processedColor.startsWith('hsl')) {
    processedColor = processColor(processedColor, colorsOrConfig);
  }

  // Additional safety check for numeric strings
  if (/^\d+$/.test(processedColor)) {
    const fallbackColor = '#000000';
    return stop.position ? `${fallbackColor} ${stop.position}` : fallbackColor;
  }

  return stop.position ? `${processedColor} ${stop.position}` : processedColor;
}

// ==================== DIMENSION UTILITIES ====================

/**
 * Round dimension values for consistent CSS output
 */
export function roundDimension(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Format numeric value to max decimals
 */
export function formatToMaxDecimals(value: number, maxDecimals: number = 2): string {
  return Number(value.toFixed(maxDecimals)).toString();
}
