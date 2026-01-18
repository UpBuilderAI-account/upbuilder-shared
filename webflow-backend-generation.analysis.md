# Webflow Backend Generation System Analysis

This document provides a comprehensive analysis of how the Webflow backend generation system works, including the XSCP format, AI-powered code generation, style processing, and bidirectional conversion between editable and XSCP formats.

---

## Table of Contents

1. [High-Level Architecture](#high-level-architecture)
2. [XSCP Format](#xscp-format)
3. [Generation Pipeline](#generation-pipeline)
4. [Multi-Design Unified Builder](#multi-design-unified-builder)
5. [Style Processing](#style-processing)
6. [XSCP Builder](#xscp-builder)
7. [Bidirectional Conversion](#bidirectional-conversion)
8. [Edit Operations](#edit-operations)
9. [Asset Management](#asset-management)
10. [Data Flow Summary](#data-flow-summary)

---

## High-Level Architecture

```
┌────────────────────────────────────────────────────────────────────────────┐
│                        WEBFLOW GENERATION PIPELINE                          │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐               │
│   │   FIGMA      │     │   STAGE 5    │     │   XSCP       │               │
│   │   PLUGIN     │────>│   WEBFLOW    │────>│   OUTPUT     │               │
│   │   (HTML/CSS) │     │   EXPORT     │     │   (JSON)     │               │
│   └──────────────┘     └──────────────┘     └──────────────┘               │
│                              │                     │                         │
│                              ▼                     ▼                         │
│                    ┌──────────────────┐   ┌──────────────────┐              │
│                    │  Multi-Design    │   │  S3 Storage      │              │
│                    │  Unified Builder │   │  (webflow-xscp   │              │
│                    │  (AI-Powered)    │   │   .json)         │              │
│                    └──────────────────┘   └──────────────────┘              │
│                              │                     │                         │
│                              ▼                     ▼                         │
│                    ┌──────────────────┐   ┌──────────────────┐              │
│                    │  Style Registry  │   │  Customizer      │              │
│                    │  + Structures    │   │  (Frontend)      │              │
│                    └──────────────────┘   └──────────────────┘              │
│                              │                     │                         │
│                              ▼                     ▼                         │
│                    ┌──────────────────┐   ┌──────────────────┐              │
│                    │  XSCP Builder    │   │  XSCP ↔ Editable │              │
│                    │  (buildXSCP)     │   │  Converter       │              │
│                    └──────────────────┘   └──────────────────┘              │
│                              │                     │                         │
│                              ▼                     ▼                         │
│                    ┌──────────────────┐   ┌──────────────────┐              │
│                    │  XSCP Validation │   │  Edit Operations │              │
│                    │  & Sanitization  │   │  (Apply to XSCP) │              │
│                    └──────────────────┘   └──────────────────┘              │
│                                                                              │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## XSCP Format

### What is XSCP?

XSCP (Webflow Cross-Site Copy/Paste) is Webflow's internal clipboard format for transferring design elements between projects. It's a JSON structure containing:

- **Nodes**: DOM elements with their properties
- **Styles**: CSS classes in Webflow's format
- **Assets**: Images and other media
- **IX2**: Interaction animations (not used in our static export)

### WebflowXSCPData Structure

```typescript
interface WebflowXSCPData {
  type: '@webflow/XscpData';  // Magic type identifier
  payload: {
    nodes: WebflowNode[];     // DOM tree
    styles: WebflowStyle[];   // CSS classes
    assets: WebflowAsset[];   // Images, fonts
    ix1: any[];               // Legacy interactions
    ix2: {                    // IX2 animations (unused)
      interactions: any[];
      events: any[];
      actionLists: any[];
    };
  };
  meta: {
    unlinkedSymbolCount: number;
    droppedLinks: number;
    dynBindRemovedCount: number;
    dynListBindRemovedCount: number;
    paginationRemovedCount: number;
    universalBindingsRemovedCount: number;
  };
}
```

### WebflowNode (DOM Element)

```typescript
interface WebflowNode {
  _id: string;               // Unique 24-char hex ID
  type: string;              // Component type (Block, Image, Link, etc.)
  tag: string;               // HTML tag (div, p, img, etc.)
  classes: string[];         // Array of style _ids (order matters!)
  children: string[];        // Child node _ids
  data: {
    tag: string;
    search?: { exclude: boolean };
    visibility?: { conditions: any[] };
    attr?: Record<string, string>;  // HTML attributes
    link?: { url: string; target?: string; mode?: string };
    form?: { type?: string; name?: string };
    img?: { id: string; _id: string };  // Asset reference
    navbar?: { type?: string; collapse?: string; ... };
    slider?: { type?: string; dir?: string; ... };
    embed?: { type: string; meta: { html: string; ... } };
    devId?: string;  // Original element ID for debugging
  };
  text?: boolean;    // True for text-only nodes
  v?: string;        // Text content (for text nodes)
}
```

### WebflowStyle (CSS Class)

```typescript
interface WebflowStyle {
  _id: string;             // Unique 24-char hex ID
  fake: boolean;           // Always false for real classes
  type: 'class';
  name: string;            // Class name (e.g., "button")
  namespace: string;       // Usually empty
  comb: '' | '&';          // '' = base class, '&' = combo modifier
  styleLess: string;       // CSS: "color: red; padding: 10px"
  children: string[];      // IDs of combo classes that can follow
  variants: {
    // Breakpoint variants
    medium?: { styleLess: string };   // Tablet (≤991px)
    tiny?: { styleLess: string };     // Mobile (≤478px)
    // State variants
    main_hover?: { styleLess: string };
    main_pressed?: { styleLess: string };
    main_focus?: { styleLess: string };
    // Breakpoint + state combinations
    medium_hover?: { styleLess: string };
    tiny_hover?: { styleLess: string };
    // ... etc
  };
}
```

### Combo Class Model

Webflow uses a unique combo class system:

```
Element classes: ["button", "is-primary", "is-large"]

CSS selector generated: .button.is-primary.is-large

In XSCP:
- "button" has comb: "" (base class)
- "is-primary" has comb: "&" (combo modifier)
- "is-large" has comb: "&" (combo modifier)

The children array links them:
button._id = "abc123"
button.children = ["def456", "ghi789"]  // is-primary, is-large IDs
```

---

## Generation Pipeline

### Stage 5: Webflow Export

**Location**: `backend-new/websocket/frontend/workflow/stages/5-webflow-export/`

```
┌─────────────────────────────────────────────────────────────────────┐
│                    STAGE 5: WEBFLOW EXPORT                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────┐                                                    │
│  │ Input:       │                                                    │
│  │ - HTML/CSS   │ (from Figma plugin)                                │
│  │ - Screenshots│ (design images)                                    │
│  │ - Config     │ (breakpoints, framework)                           │
│  └──────────────┘                                                    │
│         │                                                            │
│         ▼                                                            │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ MULTI-DESIGN UNIFIED BUILDER (AI)                             │   │
│  │                                                                │   │
│  │ Input: HTML, CSS, screenshots for ALL designs                 │   │
│  │ Output:                                                        │   │
│  │   - DESIGN_ANALYSIS (names + types)                           │   │
│  │   - ALL_STYLES (global StyleRegistry)                          │   │
│  │   - STRUCTURE D1, D2, D3... (per-design structures)           │   │
│  └──────────────────────────────────────────────────────────────┘   │
│         │                                                            │
│         ▼                                                            │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ XSCP GENERATOR                                                 │   │
│  │                                                                │   │
│  │ Converts StyleRegistry + StructureElements → XSCP format      │   │
│  │                                                                │   │
│  │ Steps:                                                         │   │
│  │ 1. Fix duplicate IDs                                          │   │
│  │ 2. Auto-correct component types                               │   │
│  │ 3. Process styles (expand shorthands, fix gradients)          │   │
│  │ 4. Build global base styles                                   │   │
│  │ 5. Build per-element combo chain styles                       │   │
│  │ 6. Convert elements to WebflowNodes                           │   │
│  │ 7. Link parent-child relationships                            │   │
│  │ 8. Build assets array                                         │   │
│  │ 9. Validate and sanitize                                      │   │
│  └──────────────────────────────────────────────────────────────┘   │
│         │                                                            │
│         ▼                                                            │
│  ┌──────────────┐                                                    │
│  │ Output:      │                                                    │
│  │ - XSCP JSON  │ (saved to S3)                                      │
│  │ - ID Mappings│ (for edit operations)                              │
│  └──────────────┘                                                    │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

### Pipeline Stages

| Stage | Name | Purpose |
|-------|------|---------|
| 0 | Export Config | Initialize export configuration |
| 1 | Load | Load design data from Figma plugin |
| 2-4 | (Internal) | Processing stages |
| 5 | Webflow Export | Generate XSCP from processed data |
| 6 | Customize | Post-generation customization |

---

## Multi-Design Unified Builder

### Location
`backend-new/websocket/frontend/workflow/stages/5-webflow-export/multi-design-unified-builder.ts`

### Purpose
Single AI call that processes multiple designs together, generating:
1. Shared style registry (all CSS classes)
2. Per-design structure (DOM tree for each design)
3. Design analysis (names and types)

### Input Structure

```typescript
interface MultiDesignBuildInput {
  projectId: string;
  projectName: string;
  designIds: string[];
  styleFramework: 'bem-lite' | 'client-first';
  breakpoints?: {
    tablet: number;  // e.g., 991
    mobile: number;  // e.g., 478
  };
  enableResponsive: boolean;
  enableTransitions: boolean;
  allowFlexibleUnits?: boolean;
  enableInteractiveComponents?: boolean;
  customInstructions?: string;
}
```

### AI Prompt Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    AI PROMPT STRUCTURE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  SYSTEM PROMPT:                                                  │
│  ├── Webflow constraints (valid component types, hierarchy)     │
│  ├── Naming conventions (BEM-lite or Client-First)              │
│  ├── Responsive patterns (breakpoints, mobile-first)            │
│  └── Component documentation (Navbar, Slider, Form, etc.)       │
│                                                                   │
│  USER PROMPT:                                                    │
│  ├── Project context (name, ID)                                 │
│  ├── Design 1: HTML + Figma mockup data                         │
│  ├── Design 2: HTML + Figma mockup data                         │
│  ├── Design 3: HTML + Figma mockup data                         │
│  └── ...                                                         │
│                                                                   │
│  IMAGES (attached):                                              │
│  ├── Screenshot of Design 1 (8K max)                            │
│  ├── Screenshot of Design 2                                     │
│  └── ...                                                         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### AI Response Structure

```
BEGIN DESIGN_ANALYSIS
{
  "designs": [
    { "id": "d1", "name": "Home", "type": "hero" },
    { "id": "d2", "name": "About", "type": "about" }
  ]
}
END DESIGN_ANALYSIS

BEGIN STRUCTURE D1
.page-wrapper | Block | parent:none
├── .hero-section | Section | parent:.page-wrapper
│   ├── .hero-container | Block | parent:.hero-section
│   │   ├── .hero-heading | Heading | parent:.hero-container | text:"Welcome"
│   │   └── .hero-button | Link | parent:.hero-container | text:"Get Started"
...
END STRUCTURE D1

BEGIN STRUCTURE D2
.page-wrapper | Block | parent:none
├── .about-section | Section | parent:.page-wrapper
...
END STRUCTURE D2

BEGIN ALL_STYLES
.page-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.hero-section {
  padding: 100px 5%;
  background-color: #f5f5f5;
}

@media (max-width: 991px) {
  .hero-section {
    padding: 60px 5%;
  }
}

@media (max-width: 478px) {
  .hero-section {
    padding: 40px 5%;
  }
}
...
END ALL_STYLES
```

### Parsing Logic

```typescript
function parseMultiDesignResponse(response, designInputs) {
  // 1. Extract DESIGN_ANALYSIS → JSON parse
  const designAnalysis = parseDesignAnalysis(response);

  // 2. Extract ALL_STYLES → parse CSS to StyleRegistryEntry[]
  const allStylesText = extractBlock(response, 'ALL_STYLES');
  const globalRegistry = parseGlobalStyleRegistry(allStylesText);

  // 3. Extract each STRUCTURE Dn → parse to StructureElement[]
  for (let i = 0; i < designInputs.length; i++) {
    const blockName = `STRUCTURE D${i + 1}`;
    const structureContent = extractBlock(response, blockName);
    const structure = parseSectionStructure(structureContent);
    designStructures.push({ designId, structure });
  }

  return { globalRegistry, designStructures, designAnalysis };
}
```

---

## Style Processing

### Location
`backend-new/generators/webflow/utils/style-processor.ts`

### Purpose
Convert CSS from AI output to Webflow-compatible format:
1. Expand shorthand properties
2. Convert gradients to background-image
3. Expand grid repeat() functions
4. Replace background URLs with S3 URLs

### Key Transformations

#### Shorthand Expansion

```css
/* Input */
.button {
  margin: 10px 20px;
  padding: 15px;
  border-radius: 8px;
}

/* Output */
.button {
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
  padding-top: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
}
```

#### Gradient Conversion

```css
/* Input - Webflow doesn't support gradients in 'background' shorthand */
.gradient-box {
  background: linear-gradient(to right, #ff0000, #0000ff);
}

/* Output */
.gradient-box {
  background-image: linear-gradient(to right, #ff0000, #0000ff);
  background-position: 0px 0px;
  background-size: auto;
}
```

#### Grid Repeat Expansion

```css
/* Input */
.grid {
  grid-template-columns: repeat(3, 1fr);
}

/* Output */
.grid {
  grid-template-columns: 1fr 1fr 1fr;
}
```

### Background URL Resolution

```typescript
function replaceBackgroundImageUrls(css: string, projectId: string): string {
  return css.replace(
    /url\(['"]?([^'")]+\.(?:png|jpg|jpeg|gif|webp|svg))['"]?\)/gi,
    (match, filename) => {
      if (filename.startsWith('http')) return match;  // Already full URL

      const cleanFilename = filename.split('/').pop();
      const s3Url = `https://upbuilder.s3.us-east-1.amazonaws.com/projects/${projectId}/images/${cleanFilename}`;
      return `url('${s3Url}')`;
    }
  );
}
```

---

## XSCP Builder

### Location
`backend-new/generators/webflow/utils/xscp-builder.ts`

### Purpose
Convert StyleRegistry + StructureElements into final WebflowXSCPData.

### Build Process

```
StyleRegistry + StructureElements
              │
              ▼
┌─────────────────────────────────────────────────────────────────┐
│ PRE-PROCESSING                                                   │
├─────────────────────────────────────────────────────────────────┤
│ 1. Detect and fix duplicate IDs                                 │
│ 2. Auto-correct component types (FormLabel → FormBlockLabel)    │
└─────────────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────────┐
│ STYLE PROCESSING                                                 │
├─────────────────────────────────────────────────────────────────┤
│ 1. Process style properties (expand shorthands, fix gradients) │
│ 2. Collect all used class names                                 │
│ 3. Add default Webflow styles (w-form, w-checkbox, etc.)       │
│ 4. Build registry lookup map                                    │
└─────────────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────────┐
│ STYLE BUILDING                                                   │
├─────────────────────────────────────────────────────────────────┤
│ 1. Create node ID map (element id → webflow id)                 │
│ 2. Build global BASE styles (comb: "") for Webflow UI           │
│ 3. Build per-element combo chain styles                         │
│ 4. Combine: global base styles + combo chain styles             │
│ 5. Accumulate children arrays for base classes                  │
└─────────────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────────┐
│ NODE BUILDING                                                    │
├─────────────────────────────────────────────────────────────────┤
│ 1. Convert elements to WebflowNodes                             │
│ 2. Add type-specific data (image, link, form, navbar, etc.)    │
│ 3. Create text nodes for text content                           │
│ 4. Link parent-child relationships                              │
│ 5. Fix multiple roots (wrap in container if needed)            │
└─────────────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────────┐
│ ASSET PROCESSING                                                 │
├─────────────────────────────────────────────────────────────────┤
│ 1. Build assets array from assetCache (if available)           │
│ 2. OR extract assets from nodes (image src attributes)         │
│ 3. Update nodes with asset references                           │
│ 4. Update styles with @img_ references for backgrounds          │
└─────────────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────────┐
│ SANITIZATION                                                     │
├─────────────────────────────────────────────────────────────────┤
│ 1. Remove null/undefined from arrays                            │
│ 2. Remove missing style references from nodes                   │
│ 3. Remove missing children references                           │
│ 4. Remove self-references and circular references              │
│ 5. Fix invalid comb values                                      │
└─────────────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────────┐
│ VALIDATION                                                       │
├─────────────────────────────────────────────────────────────────┤
│ 1. Validate node structure (required fields)                    │
│ 2. Validate style references exist                              │
│ 3. Check parent-child consistency                               │
│ 4. Log warnings for non-fatal issues                            │
└─────────────────────────────────────────────────────────────────┘
              │
              ▼
        WebflowXSCPData
```

### Deterministic ID Generation

```typescript
// For nodes: random IDs
function generateWebflowId(): string {
  return crypto.randomBytes(12).toString('hex').substring(0, 24);
}

// For styles: deterministic based on project + name
function generateStyleWebflowId(styleName: string, projectId: string): string {
  return crypto.createHash('md5')
    .update(`${projectId}-style-${styleName}`)
    .digest('hex')
    .substring(0, 24);
}

// For combo chains: deterministic based on chain position
function generateComboChainId(classNames: string[], position: number, projectId: string): string {
  const chainKey = classNames.slice(0, position + 1).join('+');
  return crypto.createHash('md5')
    .update(`${projectId}-chain-${chainKey}-pos${position}`)
    .digest('hex')
    .substring(0, 24);
}
```

### Combo Chain Building

```typescript
// Element with classes: ["button", "is-primary", "is-large"]

// Creates styles:
// 1. Base "button" (comb: "")
// 2. Modifier "is-primary" (comb: "&") - linked as child of button
// 3. Modifier "is-large" (comb: "&") - linked as child of is-primary

// Node.classes = [buttonStyleId, isPrimaryStyleId, isLargeStyleId]
```

---

## Bidirectional Conversion

### XSCP → Editable (for Frontend)

**Location**: `backend-new/websocket/frontend/workflow/customizer/xscp-to-editable.ts`

```typescript
// Converts XSCP to EditableTreePayloadV2
function convertXscpToEditable(
  xscp: WebflowXSCPData,
  designId: string,
  designName: string
): { design: EditableDesign; idMapping: IdMapping }

// Builds the full payload with styleObjects and chainIndex
function buildEditableTreePayload(options: BuildPayloadOptions): {
  payload: EditableTreePayloadV2;
  idMappings: Record<string, IdMapping>;
}
```

### Conversion Steps

```
WebflowXSCPData
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ 1. BUILD LOOKUPS                                              │
│    - styleIdToName: Map<string, string>                      │
│    - assetMap: Map<string, string>                           │
│    - nodeIdToChildren: Map<string, string[]>                 │
│    - nodeIdToParent: Map<string, string>                     │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ 2. CONVERT STYLES → EditableClass                            │
│    - Parse styleLess → EditableProperty[]                    │
│    - Organize by breakpoint and state                        │
│    - Find available combos from children array               │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ 3. BUILD COMPOUND CLASSES                                     │
│    - Scan element class stacks                               │
│    - Create compound entries (e.g., "button.is-primary")     │
│    - Build parent-child compound map                         │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ 4. CONVERT NODES → EditableNode                              │
│    - Skip text-only nodes (collapse into parent)            │
│    - Map style IDs to class names                            │
│    - Extract text content from text children                 │
│    - Generate display names                                  │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ 5. BUILD STYLEOBJECTS + CHAININDEX                           │
│    - Convert WebflowStyle → WebflowStyleObject               │
│    - Build chain context for each style                      │
│    - Build chainIndex: signature → styleId                   │
└──────────────────────────────────────────────────────────────┘
       │
       ▼
EditableTreePayloadV2
```

### ID Mapping Structure

```typescript
interface IdMapping {
  nodeIdToWebflow: Record<string, string>;    // internal ID → XSCP ID
  webflowToNodeId: Record<string, string>;    // XSCP ID → internal ID
  classNameToWebflowId: Record<string, string>; // class name → style ID
  webflowIdToClassName: Record<string, string>; // style ID → class name
  version: string;                             // For conflict detection
}
```

### Editable → XSCP (Applying Edits)

**Location**: `backend-new/websocket/frontend/workflow/customizer/editable-to-xscp.ts`

```typescript
// Apply edit operations to XSCP
function applyOperationsToXscp(
  xscp: WebflowXSCPData,
  operations: EditOperation[],
  idMapping: IdMapping
): ApplyResult
```

---

## Edit Operations

### Supported Operations

| Operation | Description |
|-----------|-------------|
| `addClass` | Add class to node at optional index |
| `removeClass` | Remove class from node |
| `reorderClasses` | Reorder classes on node |
| `moveNode` | Move node to new parent at index |
| `deleteNode` | Delete node and all descendants |
| `duplicateNode` | Clone node tree with new IDs |
| `updateText` | Update text content |
| `updateNodeImage` | Update image src/alt |
| `updateNodeLink` | Update link href/target |
| `updateNodeFormProps` | Update form input properties |
| `updateNodeVideoProps` | Update video properties |
| `createClass` | Create new CSS class |
| `updateClassProperty` | Update CSS property on class |
| `removeClassProperty` | Remove CSS property from class |
| `renameClass` | Rename class across all nodes |
| `updateStyleObjectProperty` | Update using new chain model |
| `createStyleObject` | Create new combo style |
| `deleteStyleObject` | Delete unused class |

### Operation Flow

```
Frontend Edit
      │
      ▼
┌─────────────────────────────────────┐
│ Store queues EditOperation          │
│ pendingOperations.push(op)          │
└─────────────────────────────────────┘
      │
      ▼ (1 second debounce)
┌─────────────────────────────────────┐
│ Socket: APPLY_EDITS                 │
│ { projectId, designId, operations } │
└─────────────────────────────────────┘
      │
      ▼
┌─────────────────────────────────────┐
│ Backend: Load XSCP from S3          │
└─────────────────────────────────────┘
      │
      ▼
┌─────────────────────────────────────┐
│ applyOperationsToXscp()             │
│ - Iterate operations                │
│ - Apply each to XSCP                │
│ - Track success/errors              │
└─────────────────────────────────────┘
      │
      ▼
┌─────────────────────────────────────┐
│ Save updated XSCP to S3             │
│ Update version                      │
└─────────────────────────────────────┘
      │
      ▼
┌─────────────────────────────────────┐
│ Return: { success, newVersion }     │
└─────────────────────────────────────┘
```

### Example: updateStyleObjectProperty

```typescript
function applyUpdateStyleObjectProperty(
  xscp: WebflowXSCPData,
  op: UpdateStyleObjectPropertyOp,
  idMapping: IdMapping
): OperationResult {
  const { styleId, chainContext, property, value, breakpoint, state } = op;

  // 1. Find style by ID or chain
  let style = xscp.payload.styles.find(s => s._id === styleId);
  if (!style) {
    style = findStyleByChain(xscp, chainContext);
  }

  // 2. Get variant key (e.g., "main", "medium", "main_hover")
  const variantKey = getVariantKey(breakpoint, state);

  // 3. Get current styleLess
  let currentStyleLess = variantKey === 'main'
    ? style.styleLess
    : style.variants[variantKey]?.styleLess || '';

  // 4. Parse, update, serialize
  const props = styleLessToProperties(currentStyleLess);
  const idx = props.findIndex(p => p.name === property);
  if (idx !== -1) {
    props[idx].value = value;
  } else {
    props.push({ name: property, value });
  }

  // 5. Set back
  if (variantKey === 'main') {
    style.styleLess = propertiesToStyleLess(props);
  } else {
    style.variants[variantKey] = { styleLess: propertiesToStyleLess(props) };
  }

  return { success: true };
}
```

---

## Asset Management

### Asset Flow

```
Figma Plugin
      │
      ▼
┌─────────────────────────────────────┐
│ Image extracted from design         │
│ (data:base64 or Figma CDN URL)     │
└─────────────────────────────────────┘
      │
      ▼
┌─────────────────────────────────────┐
│ Upload to S3                        │
│ projects/{projectId}/images/        │
└─────────────────────────────────────┘
      │
      ▼
┌─────────────────────────────────────┐
│ XSCP Builder                        │
│ - Add to assets array              │
│ - Update node.data.attr.src        │
│ - Replace background URLs           │
└─────────────────────────────────────┘
      │
      ▼ (on Webflow export)
┌─────────────────────────────────────┐
│ Upload to Webflow CDN               │
│ (via Webflow Assets API)           │
└─────────────────────────────────────┘
      │
      ▼
┌─────────────────────────────────────┐
│ Replace S3 URLs with CDN URLs       │
│ in final XSCP                       │
└─────────────────────────────────────┘
```

### Asset Structure

```typescript
interface WebflowAsset {
  _id: string;
  cdnUrl: string;          // Webflow CDN URL
  url: string;             // Same as cdnUrl
  origFileName: string;    // Original filename
  mimeType: string;
  s3Url: string;           // S3 URL (fallback)
  isHD: boolean;
  createdOn: string;
  updatedOn: string;
}
```

---

## Data Flow Summary

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           COMPLETE DATA FLOW                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  FIGMA                BACKEND                           FRONTEND             │
│  ─────                ───────                           ────────             │
│                                                                               │
│  ┌────────┐                                                                  │
│  │ Design │                                                                  │
│  │ (Figma)│                                                                  │
│  └────┬───┘                                                                  │
│       │                                                                      │
│       │ Plugin                                                               │
│       ▼                                                                      │
│  ┌────────┐     ┌─────────────────┐                                         │
│  │ HTML   │────>│ Multi-Design    │                                         │
│  │ + CSS  │     │ Unified Builder │                                         │
│  └────────┘     │ (AI)            │                                         │
│                 └────────┬────────┘                                         │
│                          │                                                   │
│                          ▼                                                   │
│                 ┌─────────────────┐                                         │
│                 │ StyleRegistry   │                                         │
│                 │ + Structures    │                                         │
│                 └────────┬────────┘                                         │
│                          │                                                   │
│                          ▼                                                   │
│                 ┌─────────────────┐                                         │
│                 │ XSCP Builder    │                                         │
│                 │ (buildXSCP)     │                                         │
│                 └────────┬────────┘                                         │
│                          │                                                   │
│                          ▼                                                   │
│                 ┌─────────────────┐     ┌─────────────────┐                 │
│                 │ webflow-xscp    │────>│ xscp-to-editable│                 │
│                 │ .json (S3)      │     │ converter       │                 │
│                 └─────────────────┘     └────────┬────────┘                 │
│                          ▲                       │                           │
│                          │                       ▼                           │
│                 ┌─────────────────┐     ┌─────────────────┐                 │
│                 │ editable-to-xscp│<────│ EditableTree    │                 │
│                 │ (apply edits)   │     │ PayloadV2       │                 │
│                 └─────────────────┘     └────────┬────────┘                 │
│                                                  │                           │
│                                                  ▼                           │
│                                         ┌─────────────────┐                 │
│                                         │ Customizer      │                 │
│                                         │ (Zustand Store) │                 │
│                                         └─────────────────┘                 │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Key Files Summary

| Category | File | Purpose |
|----------|------|---------|
| **Stage 5** | `stages/5-webflow-export/index.ts` | Main export orchestrator |
| **Stage 5** | `stages/5-webflow-export/xscp-generator.ts` | XSCP generation stage |
| **Stage 5** | `stages/5-webflow-export/multi-design-unified-builder.ts` | AI multi-design builder |
| **Generators** | `generators/webflow/utils/xscp-builder.ts` | Build final XSCP |
| **Generators** | `generators/webflow/utils/style-processor.ts` | CSS → Webflow format |
| **Generators** | `generators/webflow/types.ts` | All Webflow type definitions |
| **Customizer** | `customizer/xscp-to-editable.ts` | XSCP → Frontend format |
| **Customizer** | `customizer/editable-to-xscp.ts` | Apply edits to XSCP |
| **Customizer** | `customizer/handlers.ts` | Socket event handlers |

---

## Summary

The Webflow backend generation system:

1. **Takes** HTML/CSS from Figma plugin + design screenshots
2. **Uses AI** to analyze designs and generate structured output
3. **Parses** AI response into StyleRegistry + StructureElements
4. **Builds** XSCP format with proper combo class chains
5. **Stores** XSCP in S3 for persistence
6. **Converts** XSCP to EditableTree for frontend customizer
7. **Applies** frontend edit operations back to XSCP
8. **Exports** final XSCP for Webflow copy/paste

The system is designed for:
- **Multi-design projects** (single AI call for all pages)
- **Deterministic IDs** (same class → same ID across designs)
- **Webflow compatibility** (valid XSCP that pastes correctly)
- **Bidirectional editing** (frontend changes sync to XSCP)
