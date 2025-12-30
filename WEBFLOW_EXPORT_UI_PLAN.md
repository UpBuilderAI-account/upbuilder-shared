# Webflow Export UI Redesign Plan

## Overview
Redesign the Webflow export complete section to be cleaner and easier to follow.

## New Layout Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  SECTION 1: COPY YOUR DESIGNS                                               │
│  ─────────────────────────────────────────────────────────────────────────  │
│  [Design Card 1]  [Design Card 2]  [Design Card 3]  [Design Card 4]         │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  SECTION 2: BEFORE YOU PASTE (Tips)                                         │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  IF CUSTOM FONTS DETECTED (3 columns):                                      │
│  ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐          │
│  │ ⚠️ Custom Fonts    │ │ 🆕 Empty Project  │ │ 📋 Paste All      │          │
│  │                   │ │                   │ │    Designs        │          │
│  │ Add these fonts   │ │ Create blank site │ │ Paste all designs │          │
│  │ before pasting:   │ │ to avoid style    │ │ to keep shared    │          │
│  │ [Inter] [Poppins] │ │ conflicts         │ │ classes linked    │          │
│  │                   │ │                   │ │                   │          │
│  │ Or Webflow will   │ │                   │ │                   │          │
│  │ convert to Arial! │ │                   │ │                   │          │
│  │ 🔗 Learn how      │ │                   │ │                   │          │
│  └───────────────────┘ └───────────────────┘ └───────────────────┘          │
│                                                                             │
│  IF NO CUSTOM FONTS (2 columns):                                            │
│  ┌────────────────────────────┐ ┌────────────────────────────┐              │
│  │ 🆕 Start with empty project│ │ 📋 Paste all designs       │              │
│  │                            │ │                            │              │
│  │ Create a blank Webflow     │ │ If you have multiple       │              │
│  │ site to avoid duplicated   │ │ designs, paste them all    │              │
│  │ styles and conflicts       │ │ to keep shared classes     │              │
│  │                            │ │ properly linked            │              │
│  └────────────────────────────┘ └────────────────────────────┘              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  SECTION 3: HOW TO PASTE                                                    │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  ┌─────────────────────────────────┐                                        │
│  │                                 │   Select Body in Navigator,            │
│  │    [Single GIF - step2final]   │   then press Ctrl+V (⌘+V on Mac)       │
│  │                                 │                                        │
│  └─────────────────────────────────┘                                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Changes Required

### 1. Remove Old Components/Sections
- [x] Remove the standalone `WebflowTutorialStep` component (no longer needed with single GIF)
- [x] Remove the old custom fonts warning section (moving into tips grid)
- [x] Remove the "Reload if styles don't apply" section
- [x] Remove the separator between the two old tutorial steps

### 2. Create New Tip Card Component
- [x] Create `TipCard` component with:
  - Icon (emoji or Lucide icon)
  - Title
  - Description
  - Optional: font chips for custom fonts card
  - Optional: external link

### 3. Update Export Complete Section
- [x] Keep "Copy Your Designs" section as-is (design cards grid)
- [x] Add new "Before You Paste" section with tip cards:
  - Dynamic grid: 3 columns if custom fonts, 2 columns if not
  - Card 1 (conditional): Custom Fonts warning with font chips
  - Card 2: Empty Project tip
  - Card 3: Paste All Designs tip
- [x] Add new "How to Paste" section:
  - Single GIF (step2final.gif - the paste action)
  - Simple instruction text beside it

### 4. Styling
- Tip cards should have:
  - Subtle border
  - Slightly elevated background
  - Icon at top
  - Bold title
  - Muted description text
- Custom fonts card should have warning styling (orange/yellow tint)
- Equal height cards in the grid

## Files to Modify
1. `frontend-upbuilder/src/features/workflow/components/ExportContent.tsx`

## Implementation Order
1. [x] Create the `TipCard` component
2. [x] Create the `WebflowTipsSection` component (handles 2 or 3 column logic)
3. [x] Create the `HowToPasteSection` component (single GIF + text)
4. [x] Update the main export complete render to use new components
5. [x] Remove old code (WebflowTutorialStep usage, old fonts warning, reload section)

## Implementation Complete
All items have been implemented in `ExportContent.tsx`.
