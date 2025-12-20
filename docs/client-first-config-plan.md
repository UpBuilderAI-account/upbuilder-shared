# Client-First V2.1 Stylesheet Configuration - Implementation Plan

## Overview

This document outlines the complete redesign of the `styles_config` stage to properly implement Finsweet's Client-First V2.1 framework. The goal is to allow users to configure their stylesheet generation with sensible defaults while respecting the framework's core principles.

---

## 1. Configuration Structure

### 1.1 New `StylesConfig` Interface

```typescript
export interface StylesConfig {
  // ===========================================
  // CORE SETTINGS (Always applied, not toggleable)
  // ===========================================

  /** Use rem units for font sizes (always true for Client-First) */
  useRemFontSizes: boolean; // Always true, shown but disabled

  /** Use unitless line-height values (always true for Client-First) */
  useUnitlessLineHeight: boolean; // Always true, shown but disabled

  // ===========================================
  // CATEGORY TOGGLES
  // ===========================================

  // --- CORE (Required - enabled by default, can disable) ---
  /** Generate spacing utilities (margin-*, padding-*) */
  generateSpacing: boolean; // default: true

  /** Generate typography utilities (text-size-*, text-weight-*, etc.) */
  generateTypography: boolean; // default: true

  /** Generate color utilities (text-color-*, background-color-*) */
  generateColors: boolean; // default: true

  // --- RECOMMENDED (Enabled by default) ---
  /** Generate button classes (.button, .button.is-*) */
  generateButtons: boolean; // default: true

  /** Generate visibility utilities (hide, hide-tablet, etc.) */
  generateVisibility: boolean; // default: true

  /** Generate max-width utilities */
  generateMaxWidth: boolean; // default: true

  // --- EXTENDED (Disabled by default - adds CSS weight) ---
  /** Generate border/radius utilities */
  generateBorders: boolean; // default: false

  /** Generate shadow utilities */
  generateShadows: boolean; // default: false

  /** Generate icon sizing utilities */
  generateIcons: boolean; // default: false

  /** Generate aspect ratio utilities */
  generateAspectRatios: boolean; // default: false

  /** Generate overflow utilities */
  generateOverflow: boolean; // default: false

  /** Generate z-index utilities */
  generateZIndex: boolean; // default: false

  /** Generate pointer-events utilities */
  generatePointerEvents: boolean; // default: false

  // ===========================================
  // CUSTOM VALUES (Optional overrides)
  // ===========================================

  /** Custom spacing scale (overrides defaults) */
  spacingScale?: SpacingScale;

  /** Custom container widths */
  containerWidths?: ContainerWidths;

  /** Custom section padding values */
  sectionPadding?: SectionPadding;

  /** Custom typography scale */
  typographyScale?: TypographyScale;

  // ===========================================
  // CUSTOM INSTRUCTIONS
  // ===========================================

  /** Additional instructions for the AI */
  customInstructions?: string;
}
```

### 1.2 Supporting Types

```typescript
export interface SpacingScale {
  tiny?: string;      // default: 0.125rem (2px)
  xxsmall?: string;   // default: 0.25rem (4px)
  xsmall?: string;    // default: 0.5rem (8px)
  small?: string;     // default: 1rem (16px)
  medium?: string;    // default: 2rem (32px)
  large?: string;     // default: 3rem (48px)
  xlarge?: string;    // default: 4rem (64px)
  xxlarge?: string;   // default: 5rem (80px)
  huge?: string;      // default: 6rem (96px)
  xhuge?: string;     // default: 8rem (128px)
  xxhuge?: string;    // default: 12rem (192px)
}

export interface ContainerWidths {
  small?: string;     // default: 48rem (768px)
  medium?: string;    // default: 64rem (1024px)
  large?: string;     // default: 80rem (1280px)
}

export interface SectionPadding {
  small?: string;     // default: 3rem (48px)
  medium?: string;    // default: 5rem (80px)
  large?: string;     // default: 8rem (128px)
}

export interface TypographyScale {
  tiny?: string;      // default: 0.75rem (12px)
  small?: string;     // default: 0.875rem (14px)
  regular?: string;   // default: 1rem (16px)
  medium?: string;    // default: 1.125rem (18px)
  large?: string;     // default: 1.25rem (20px)
}
```

### 1.3 Default Configuration

```typescript
export const DEFAULT_STYLES_CONFIG: StylesConfig = {
  // Core settings (locked)
  useRemFontSizes: true,
  useUnitlessLineHeight: true,

  // Core utilities (required)
  generateSpacing: true,
  generateTypography: true,
  generateColors: true,

  // Recommended utilities
  generateButtons: true,
  generateVisibility: true,
  generateMaxWidth: true,

  // Extended utilities (off by default)
  generateBorders: false,
  generateShadows: false,
  generateIcons: false,
  generateAspectRatios: false,
  generateOverflow: false,
  generateZIndex: false,
  generatePointerEvents: false,

  // No custom values by default
  spacingScale: undefined,
  containerWidths: undefined,
  sectionPadding: undefined,
  typographyScale: undefined,
  customInstructions: '',
};
```

---

## 2. Frontend UI Design

### 2.1 Layout Structure

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│   [Palette Icon]                                                 │
│   Configure Client-First Stylesheet                             │
│   Customize your Finsweet V2.1 utility system                   │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────┐  ┌─────────────────────────────┐   │
│  │ CORE SETTINGS           │  │ CORE UTILITIES              │   │
│  │ (Framework Requirements)│  │ (Recommended)               │   │
│  ├─────────────────────────┤  ├─────────────────────────────┤   │
│  │ ☑ Rem font sizes   [i]  │  │ ☑ Spacing        Required   │   │
│  │   (Required)            │  │   margin-*, padding-*       │   │
│  │                         │  │                             │   │
│  │ ☑ Unitless line-height  │  │ ☑ Typography     Required   │   │
│  │   (Required)        [i] │  │   text-size-*, text-weight- │   │
│  │                         │  │                             │   │
│  │                         │  │ ☑ Colors         Required   │   │
│  │                         │  │   text-color-*, bg-*        │   │
│  └─────────────────────────┘  └─────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────┐  ┌─────────────────────────────┐   │
│  │ RECOMMENDED             │  │ EXTENDED                    │   │
│  │ (Enabled by Default)    │  │ (Adds CSS Weight)           │   │
│  ├─────────────────────────┤  ├─────────────────────────────┤   │
│  │ ☑ Buttons               │  │ ☐ Borders & Radius          │   │
│  │   .button, .is-*        │  │   border-*, radius-*        │   │
│  │                         │  │                             │   │
│  │ ☑ Visibility            │  │ ☐ Shadows                   │   │
│  │   hide, hide-tablet     │  │   shadow-*                  │   │
│  │                         │  │                             │   │
│  │ ☑ Max-Width             │  │ ☐ Icons                     │   │
│  │   max-width-*           │  │   icon-height-*, icon-1x1-* │   │
│  │                         │  │                             │   │
│  │                         │  │ ☐ Aspect Ratios             │   │
│  │                         │  │   aspect-ratio-*            │   │
│  │                         │  │                             │   │
│  │                         │  │ ☐ Overflow                  │   │
│  │                         │  │   overflow-*                │   │
│  │                         │  │                             │   │
│  │                         │  │ ☐ Z-Index                   │   │
│  │                         │  │   z-index-*                 │   │
│  │                         │  │                             │   │
│  │                         │  │ ☐ Pointer Events            │   │
│  │                         │  │   pointer-events-*          │   │
│  └─────────────────────────┘  └─────────────────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ CUSTOM INSTRUCTIONS (optional)                            │   │
│  │ ┌────────────────────────────────────────────────────┐   │   │
│  │ │ e.g., Use specific color palette, adjust spacing...│   │   │
│  │ └────────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│         ┌─────────────────────────────────────────┐              │
│         │     Generate Stylesheet      →          │              │
│         └─────────────────────────────────────────┘              │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### 2.2 Component Structure

```tsx
// Main sections (2x2 grid on desktop)
const SECTIONS = {
  coreSettings: {
    title: 'Core Settings',
    subtitle: 'Framework Requirements',
    locked: true, // Show but disable toggles
  },
  coreUtilities: {
    title: 'Core Utilities',
    subtitle: 'Recommended',
    badge: 'Required',
  },
  recommended: {
    title: 'Recommended',
    subtitle: 'Enabled by Default',
  },
  extended: {
    title: 'Extended',
    subtitle: 'Adds CSS Weight',
    badge: 'Optional',
  },
};
```

### 2.3 Option Definitions

```tsx
const CORE_SETTINGS = [
  {
    key: 'useRemFontSizes',
    label: 'Rem font sizes',
    hint: 'All sizes use rem for accessibility',
    locked: true,
  },
  {
    key: 'useUnitlessLineHeight',
    label: 'Unitless line-height',
    hint: 'Scales proportionally with font size',
    locked: true,
  },
];

const CORE_UTILITIES = [
  {
    key: 'generateSpacing',
    label: 'Spacing',
    hint: 'margin-*, padding-*, spacer-*',
    badge: 'Required',
  },
  {
    key: 'generateTypography',
    label: 'Typography',
    hint: 'text-size-*, text-weight-*, heading-style-*',
    badge: 'Required',
  },
  {
    key: 'generateColors',
    label: 'Colors',
    hint: 'text-color-*, background-color-*',
    badge: 'Required',
  },
];

const RECOMMENDED = [
  {
    key: 'generateButtons',
    label: 'Buttons',
    hint: '.button, .button.is-secondary, .button.is-text',
  },
  {
    key: 'generateVisibility',
    label: 'Visibility',
    hint: 'hide, hide-tablet, hide-mobile-*',
  },
  {
    key: 'generateMaxWidth',
    label: 'Max-Width',
    hint: 'max-width-small through max-width-xxlarge',
  },
];

const EXTENDED = [
  {
    key: 'generateBorders',
    label: 'Borders & Radius',
    hint: 'border-*, radius-*',
  },
  {
    key: 'generateShadows',
    label: 'Shadows',
    hint: 'shadow-small, shadow-medium, shadow-large',
  },
  {
    key: 'generateIcons',
    label: 'Icons',
    hint: 'icon-height-*, icon-1x1-*',
  },
  {
    key: 'generateAspectRatios',
    label: 'Aspect Ratios',
    hint: 'aspect-ratio-square, -portrait, -landscape, -widescreen',
  },
  {
    key: 'generateOverflow',
    label: 'Overflow',
    hint: 'overflow-hidden, overflow-scroll, overflow-auto',
  },
  {
    key: 'generateZIndex',
    label: 'Z-Index',
    hint: 'z-index-1, z-index-2, layer',
  },
  {
    key: 'generatePointerEvents',
    label: 'Pointer Events',
    hint: 'pointer-events-none, pointer-events-auto',
  },
];
```

---

## 3. Backend Prompt Structure

### 3.1 Prompt Template

The backend prompt should be restructured to:

1. **Always include** the reset and core structure reference
2. **Conditionally include** each utility category based on config
3. **Use exact Client-First class names** from the V2.1 spec

### 3.2 Utility Class Specifications

#### Reset (Always Included)
```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
img, video {
  max-width: 100%;
  height: auto;
  display: block;
}
a {
  text-decoration: none;
  color: inherit;
}
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

#### Spacing (when `generateSpacing: true`)
```
Classes to generate:
- Direction: margin-top, margin-bottom, margin-left, margin-right, margin-horizontal, margin-vertical
- Direction: padding-top, padding-bottom, padding-left, padding-right, padding-horizontal, padding-vertical
- Sizes: margin-{size}, padding-{size} where size = 0, tiny, xxsmall, xsmall, small, medium, large, xlarge, xxlarge, huge, xhuge, xxhuge
- Resets: spacing-clean, margin-0, padding-0
- Spacers: spacer-{size}

Values (rem):
- 0: 0
- tiny: 0.125
- xxsmall: 0.25
- xsmall: 0.5
- small: 1
- medium: 2
- large: 3
- xlarge: 4
- xxlarge: 5
- huge: 6
- xhuge: 8
- xxhuge: 12
```

#### Typography (when `generateTypography: true`)
```
Classes to generate:
- heading-style-h1 through heading-style-h6
- text-size-tiny, text-size-small, text-size-regular, text-size-medium, text-size-large
- text-weight-light, text-weight-normal, text-weight-semibold, text-weight-bold, text-weight-xbold
- text-align-left, text-align-center, text-align-right
- text-style-allcaps, text-style-italic, text-style-muted, text-style-nowrap, text-style-link

Values:
- text-size-tiny: 0.75rem
- text-size-small: 0.875rem
- text-size-regular: 1rem
- text-size-medium: 1.125rem
- text-size-large: 1.25rem
```

#### Colors (when `generateColors: true`)
```
Classes to generate:
- text-color-primary, text-color-secondary, text-color-alternate
- background-color-primary, background-color-secondary, background-color-tertiary, background-color-alternate
- inherit-color

Note: Extract actual colors from Figma design
```

#### Buttons (when `generateButtons: true`)
```
Classes to generate:
- .button (base styles with padding)
- .button.is-secondary
- .button.is-text
- .button.is-small
- .button.is-large
- .button.is-icon
```

#### Visibility (when `generateVisibility: true`)
```
Classes to generate:
- hide (display: none on all devices)
- hide-tablet (hidden from 991px down)
- hide-mobile-landscape (hidden from 767px down)
- hide-mobile-portrait (hidden from 479px down)
```

#### Max-Width (when `generateMaxWidth: true`)
```
Classes to generate:
- max-width-xxsmall: 12rem
- max-width-xsmall: 16rem
- max-width-small: 20rem
- max-width-medium: 32rem
- max-width-large: 48rem
- max-width-xlarge: 64rem
- max-width-xxlarge: 80rem
- max-width-full: none
- max-width-full-tablet, max-width-full-mobile-landscape, max-width-full-mobile-portrait
```

#### Borders (when `generateBorders: true`)
```
Classes to generate:
- radius-small, radius-medium, radius-large, radius-full
- border-1, border-2
```

#### Shadows (when `generateShadows: true`)
```
Classes to generate:
- shadow-small
- shadow-medium
- shadow-large
- shadow-xlarge
```

#### Icons (when `generateIcons: true`)
```
Classes to generate:
- icon-height-small, icon-height-medium, icon-height-large
- icon-1x1-small, icon-1x1-medium, icon-1x1-large
```

#### Aspect Ratios (when `generateAspectRatios: true`)
```
Classes to generate:
- aspect-ratio-square (1/1)
- aspect-ratio-portrait (2/3)
- aspect-ratio-landscape (3/2)
- aspect-ratio-widescreen (16/9)
```

#### Overflow (when `generateOverflow: true`)
```
Classes to generate:
- overflow-hidden
- overflow-scroll
- overflow-auto
```

#### Z-Index (when `generateZIndex: true`)
```
Classes to generate:
- z-index-1
- z-index-2
- layer (position: absolute with 0% on all sides)
```

#### Pointer Events (when `generatePointerEvents: true`)
```
Classes to generate:
- pointer-events-none
- pointer-events-auto
```

---

## 4. Implementation Tasks

### 4.1 Shared Types (`shared/types/workflow.ts`)

- [ ] Update `StylesConfig` interface with new structure
- [ ] Add `SpacingScale`, `ContainerWidths`, `SectionPadding`, `TypographyScale` types
- [ ] Update `DEFAULT_STYLES_CONFIG` with new defaults

### 4.2 Frontend (`StylesConfigContent.tsx`)

- [ ] Redesign UI with 4 sections (Core Settings, Core Utilities, Recommended, Extended)
- [ ] Use 2x2 grid layout on desktop, stack on mobile
- [ ] Add locked state for Core Settings (shown but not toggleable)
- [ ] Add "Required" badges for Core Utilities
- [ ] Add "Optional" badges for Extended section
- [ ] Keep Custom Instructions textarea at bottom
- [ ] Update initial config state with new defaults

### 4.3 Backend Prompt (`prompts/frontend/stylesheet/initial.ts`)

- [ ] Restructure prompt to conditionally include sections based on config
- [ ] Add exact Client-First V2.1 class specifications for each category
- [ ] Update spacing values to match V2.1 scale
- [ ] Add direction classes for margin/padding
- [ ] Add spacer block classes
- [ ] Add all typography utilities (heading-style-*, text-weight-*, text-style-*, text-align-*)
- [ ] Add visibility utilities with correct breakpoints
- [ ] Add max-width utilities with responsive variants
- [ ] Add new extended utilities (icons, aspect-ratios, overflow, z-index, pointer-events)

### 4.4 Testing

- [ ] Verify all utility classes match Client-First V2.1 documentation
- [ ] Test each toggle independently
- [ ] Verify generated CSS is valid
- [ ] Test responsive breakpoints match Webflow defaults (991px, 767px, 479px)

---

## 5. Breakpoints Reference

```css
/* Webflow default breakpoints - must match */
@media screen and (max-width: 991px) { /* Tablet */ }
@media screen and (max-width: 767px) { /* Mobile Landscape */ }
@media screen and (max-width: 479px) { /* Mobile Portrait */ }
```

---

## 6. Files to Modify

| File | Changes |
|------|---------|
| `shared/types/workflow.ts` | New StylesConfig interface, supporting types, defaults |
| `frontend-upbuilder/src/features/workflow/components/StylesConfigContent.tsx` | Complete UI redesign |
| `backend-new/prompts/frontend/stylesheet/initial.ts` | Restructure prompt with conditional sections |

---

## 7. Notes

- **No CSS Variables**: As requested, we skip CSS variables to avoid breaking the existing system
- **Rem Units**: Always use rem, never px (except for 1px borders)
- **Client-First V2.1**: All class names must match the official Finsweet documentation
- **Accessibility**: rem units ensure proper browser zoom and user font size preferences
