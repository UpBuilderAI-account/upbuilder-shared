# Customizer Frontend Architecture Analysis

This document provides a comprehensive analysis of how the Customizer frontend works, including data flow, socket synchronization, state management, and component interactions.

---

## Table of Contents

1. [High-Level Architecture](#high-level-architecture)
2. [Data Model](#data-model)
3. [State Management (Zustand Store)](#state-management-zustand-store)
4. [Socket Communication](#socket-communication)
5. [Component Architecture](#component-architecture)
6. [Editing Flow](#editing-flow)
7. [CSS Generation Pipeline](#css-generation-pipeline)
8. [Preview System](#preview-system)
9. [Undo/Redo System](#undoredo-system)
10. [Multi-Design Mode](#multi-design-mode)

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CUSTOMIZER PANEL                               │
├─────────────────┬─────────────────────────┬─────────────────────────────┤
│   LeftSidebar   │      PreviewPanel       │      InspectorPanel         │
│   (20% width)   │       (50% width)       │       (30% width)           │
├─────────────────┼─────────────────────────┼─────────────────────────────┤
│ • Designs       │ • Live HTML Preview     │ • ClassSelector             │
│ • Layers Tree   │ • Breakpoint Controls   │ • Style Sections            │
│ • Components    │ • Zoom Controls         │   - Layout                  │
│ • Styles        │ • Selection Overlays    │   - Spacing                 │
│ • Assets        │ • Inline Text Editing   │   - Size                    │
│ • CMS (soon)    │                         │   - Typography              │
│ • Variables     │                         │   - Backgrounds             │
│   (soon)        │                         │   - Borders                 │
│                 │                         │   - Effects                 │
└─────────────────┴─────────────────────────┴─────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │   Zustand Store   │
                    │ useCustomizerStore│
                    └─────────┬─────────┘
                              │
                    ┌─────────┴─────────┐
                    │  Socket.IO Layer  │
                    │useCustomizerSocket│
                    └─────────┬─────────┘
                              │
                    ┌─────────┴─────────┐
                    │    Backend API    │
                    │  (handlers.ts)    │
                    └───────────────────┘
```

---

## Data Model

### Core Types

#### EditableTreePayloadV2 (from Backend)
```typescript
interface EditableTreePayloadV2 {
  projectId: string;
  designs: EditableDesign[];        // Array of page designs
  styleObjects: Record<string, WebflowStyleObject>;  // CSS classes
  chainIndex: ChainIndex;           // O(1) class chain lookups
  assets: EditableAsset[];          // Images, fonts, etc.
  customFonts: EditableFontInfo[];
  version: string;                  // For conflict detection
  initialBreakpoint?: Breakpoint;   // Based on Figma dimensions
}
```

#### WebflowStyleObject (CSS Class)
```typescript
interface WebflowStyleObject {
  _id: string;                      // Deterministic hash ID
  name: string;                     // Class name (e.g., "button")
  comb: '' | '&';                   // '' = base class, '&' = combo modifier
  styleLess: StyleLessMap;          // CSS by breakpoint/state
  children: string[];               // Child combo class IDs
  chainContext: string[];           // Full class chain (e.g., ["button", "is-primary"])
  usageCount?: number;              // How many elements use this class
}

// StyleLessMap structure:
// {
//   desktop: { none: "color: red; padding: 10px", hover: "color: blue" },
//   tablet: { none: "padding: 5px" },
//   mobile: { none: "padding: 2px" }
// }
```

#### ChainIndex (Fast Lookups)
```typescript
// Key: chain signature (e.g., "button+is-primary")
// Value: style object _id
type ChainIndex = Record<string, string>;

// Example:
// {
//   "button": "s1234abc",
//   "button+is-primary": "s5678def",
//   "button+is-primary+is-large": "s9012ghi"
// }
```

#### EditableNode (DOM Element)
```typescript
interface EditableNode {
  id: string;                       // Unique node ID
  parentId: string;                 // Parent node ID ('' for root)
  displayName: string;              // User-facing name
  tag: string;                      // HTML tag (div, p, img, etc.)
  componentType: string;            // Webflow component type
  classes: string[];                // Applied CSS classes (order matters!)
  children: string[];               // Child node IDs
  textContent?: string;             // Text content
  image?: { src: string; alt: string };
  link?: { href: string; target: string };
  formProps?: { type: string; placeholder: string };
  depth: number;                    // Tree depth
  editable: boolean;
}
```

---

## State Management (Zustand Store)

### Store Location
`frontend-upbuilder/src/features/workflow/customizer/hooks/useCustomizerStore.ts`

### State Structure

```typescript
interface CustomizerState {
  // === DATA ===
  designs: Record<string, EditableDesign>;   // All designs by ID
  styleObjects: Record<string, WebflowStyleObject>;
  chainIndex: ChainIndex;
  assets: EditableAsset[];
  customFonts: EditableFontInfo[];
  version: string;
  projectId: string;

  // === SELECTION ===
  selectedDesignId: string | null;
  selectedNodeId: string | null;
  editingClassStack: string[] | null;  // Active combo class chain
  editingState: PseudoState;            // hover, pressed, focused, etc.
  currentBreakpoint: Breakpoint;        // desktop, tablet, mobile

  // === UI STATE ===
  expandedNodeIds: Set<string>;         // Expanded layers
  hoveredNodeId: string | null;
  isExportModalOpen: boolean;

  // === SYNC ===
  pendingOperations: EditOperation[];   // Queued for backend
  isSyncing: boolean;
  lastError: string | null;

  // === HISTORY ===
  undoStack: HistoryEntry[];
  redoStack: HistoryEntry[];
}
```

### Key Actions

#### Selection
```typescript
selectNode(id: string | null)           // Auto-sets editingClassStack to node's classes
selectClassStackForEditing(stack: string[])  // Set which combo level to edit
setEditingState(state: PseudoState)     // Set pseudo-state (hover, etc.)
setCurrentBreakpoint(bp: Breakpoint)    // Set responsive breakpoint
```

#### Class Operations
```typescript
addClass(nodeId, className, index?)     // Add class to node
removeClass(nodeId, className)          // Remove class from node
reorderClasses(nodeId, classNames)      // Reorder (affects cascade)
createClass(className, properties)      // Create new class
renameClass(oldName, newName)           // Rename across all nodes
deleteStyleObject(styleId)              // Delete class entirely
```

#### Style Operations
```typescript
updateClassProperty(className, breakpoint, property, value)
// Example: updateClassProperty("button", "desktop", "color", "red")

// Internally:
// 1. Finds style object via chainIndex
// 2. Parses styleLess string → Map
// 3. Updates property in Map
// 4. Converts back to styleLess string
// 5. Queues EditOperation for backend
```

#### Node Operations
```typescript
moveNode(nodeId, newParentId, newIndex)  // Drag-drop
deleteNode(nodeId)                        // Also deletes descendants
duplicateNode(nodeId)                     // Clone with new IDs
addNode(template, parentId, index)        // From component template
updateText(nodeId, newText)               // Text content
updateNodeImage(nodeId, src, alt)         // Image src/alt
```

---

## Socket Communication

### Socket Hook Location
`frontend-upbuilder/src/features/workflow/customizer/hooks/useCustomizerSocket.ts`

### Socket Events

#### REQUEST_TREE (Load Data)
```
Frontend → Backend: { projectId, designId? }
Backend → Frontend: { success, data: EditableTreePayloadV2 }

Flow:
1. On mount, socket emits REQUEST_TREE
2. Backend loads XSCP from S3
3. Backend transforms XSCP → EditableTree format
4. Backend generates styleObjects + chainIndex
5. Backend caches ID mappings for future edits
6. Response sets store via setTreeData()
```

#### APPLY_EDITS (Save Changes)
```
Frontend → Backend: {
  projectId,
  designId,
  operations: EditOperation[],
  baseVersion: string
}

Backend → Frontend: {
  success,
  newVersion,
  appliedCount,
  errors: ApplyError[]
}

Flow:
1. User makes edit → store updates optimistically
2. Operation added to pendingOperations queue
3. Debounce timer (1 second) triggers sync
4. flushOperations() returns and clears queue
5. Socket emits APPLY_EDITS with operations
6. Backend applies to XSCP, saves to S3
7. Response updates version, handles errors
```

### Debouncing Strategy
```typescript
const DEBOUNCE_MS = 1000;  // 1 second

// Watch for new operations
useEffect(() => {
  const unsubscribe = useCustomizerStore.subscribe((state) => {
    if (state.pendingOperations.length > prevLength) {
      debouncedApplyEdits();  // Debounced sync
    }
  });
}, []);
```

### Retry Logic
```typescript
const MAX_RETRIES = 2;

// On version mismatch:
if (response.errors.some(e => e.message.includes('Version mismatch'))) {
  updateVersion(response.newVersion);
  // Re-queue operations and retry
  if (retryCount < MAX_RETRIES) {
    retryCount++;
    requeue(operations);
    setTimeout(applyEdits, 500);
  }
}
```

### In-Flight Tracking
```typescript
const inFlightOpsRef = useRef<EditOperation[]>([]);

// Prevent duplicate syncs
if (inFlightOpsRef.current.length > 0) return;

// Track while syncing
inFlightOpsRef.current = operations;

// Clear on complete/error
inFlightOpsRef.current = [];
```

---

## Component Architecture

### CustomizerPanel (Main Container)
```
CustomizerPanel
├── UploadProvider (image upload context)
├── DragDropProvider (drag-drop context)
│   ├── PanelGroup (react-resizable-panels)
│   │   ├── Panel (20%) → LeftSidebar
│   │   ├── ResizeHandle
│   │   ├── Panel (50%) → PreviewPanel
│   │   ├── ResizeHandle
│   │   └── Panel (30%) → InspectorPanel
│   └── AIAssistant (floating chat)
├── BetaBanner
└── ExportModal
```

### LeftSidebar (Navigation Hub)
```
LeftSidebar
├── IconNav (sidebar icons)
│   ├── Designs icon
│   ├── Layers icon
│   ├── Components icon
│   ├── CMS icon (disabled)
│   ├── Variables icon (disabled)
│   ├── Styles icon
│   └── Assets icon
│
└── ActivePanel (based on selection)
    ├── DesignsPanel → Design list with status
    ├── LayersPanel → Layer tree with drag-drop
    ├── ComponentsPanel → Component templates
    ├── StylesPanel → Global class management
    └── AssetsPanel → Image library
```

### InspectorPanel (Property Editor)
```
InspectorPanel
├── Tabs (Style | Settings | Interactions)
│
└── InspectorProvider (context)
    ├── ClassSelector
    │   ├── Breakpoint indicator (Desktop/Tablet/Mobile)
    │   ├── Class stack chips
    │   ├── Add class autocomplete
    │   └── State selector (None/Hover/Pressed/etc.)
    │
    └── Style Sections (auto-hide based on element type)
        ├── ImageSection (for images)
        ├── VideoSection (for videos)
        ├── LinkSection (for links)
        ├── FormInputSection (for inputs)
        ├── ContentSection (for text)
        ├── FlexChildSection
        ├── LayoutSection
        ├── SpacingSection
        ├── SizeSection
        ├── PositionSection
        ├── TypographySection
        ├── BackgroundsSection
        ├── BordersSection
        └── EffectsSection
```

### PreviewPanel (Live Preview)
```
PreviewPanel
├── Toolbar
│   ├── Breakpoint selector (Desktop/Tablet/Mobile)
│   ├── Width input (custom px)
│   ├── Zoom controls (25%-200%)
│   └── Fullscreen button
│
├── Preview Container
│   ├── iframe (srcdoc with generated HTML/CSS)
│   └── SelectionOverlay (blue border on selected)
│
└── Message Protocol
    ├── ub:select → Select node by ID
    ├── ub:hover → Hover highlight
    ├── ub:refresh → Force re-render
    ├── ub:zoom → Update zoom level
    └── ub:update-classes → Update class data
```

---

## Editing Flow

### Property Edit Flow
```
User changes padding in Inspector
         │
         ▼
┌────────────────────────────────┐
│ InspectorContext.setProperty() │
│ setProperty("padding", "20px") │
└────────────────────────────────┘
         │
         ▼
┌────────────────────────────────┐
│ store.updateClassProperty()    │
│ (className, breakpoint,        │
│  property, value)              │
└────────────────────────────────┘
         │
         ├─── 1. Find style ID via chainIndex
         │
         ├─── 2. Parse styleLess string → Map
         │       "color: red; padding: 10px"
         │                ↓
         │       Map { color → red, padding → 10px }
         │
         ├─── 3. Update property in Map
         │       Map { color → red, padding → 20px }
         │
         ├─── 4. Convert back to styleLess
         │       "color: red; padding: 20px"
         │
         ├─── 5. Update styleObjects in store
         │       (triggers preview re-render)
         │
         └─── 6. Queue EditOperation
                 {
                   type: 'updateStyleObjectProperty',
                   styleId,
                   chainContext: ["button", "is-primary"],
                   breakpoint: "desktop",
                   state: "none",
                   property: "padding",
                   value: "20px"
                 }
                      │
                      ▼ (after 1s debounce)
         ┌───────────────────────────────┐
         │ useCustomizerSocket.applyEdits │
         │ → APPLY_EDITS socket event     │
         └───────────────────────────────┘
                      │
                      ▼
         ┌───────────────────────────────┐
         │ Backend handlers.ts            │
         │ 1. Load XSCP from S3           │
         │ 2. Apply operations to XSCP    │
         │ 3. Save XSCP to S3             │
         │ 4. Return new version          │
         └───────────────────────────────┘
```

### Node Selection Flow
```
User clicks element in Preview or Layers
         │
         ▼
┌────────────────────────────────┐
│ store.selectNode(nodeId)       │
└────────────────────────────────┘
         │
         ├─── 1. Get node from design
         │       node = design.nodes[nodeId]
         │
         ├─── 2. Auto-set editingClassStack
         │       editingClassStack = [...node.classes]
         │       (Full stack = edits affect combo selector)
         │
         ├─── 3. Auto-expand to node in LayersPanel
         │       expandToNode(nodeId)
         │
         ├─── 4. Show SelectionOverlay in Preview
         │       (blue border around element)
         │
         └─── 5. Update InspectorPanel
                 • ClassSelector shows stack
                 • Sections show computed styles
```

### Combo Class Editing
```
Node has classes: ["button", "is-primary", "is-large"]

When selected, editingClassStack = ["button", "is-primary", "is-large"]

Edits target the COMPOUND selector:
  .button.is-primary.is-large { ... }

User can click on earlier class chip to edit just that level:
  Click "button" → editingClassStack = ["button"]
  Now edits target: .button { ... }

Or click "is-primary" → editingClassStack = ["button", "is-primary"]
  Now edits target: .button.is-primary { ... }
```

---

## CSS Generation Pipeline

### Location
`frontend-upbuilder/src/features/workflow/customizer/utils/cssGenerator.ts`

### Generation Flow
```
styleObjects (from store)
         │
         ▼
┌────────────────────────────────┐
│ generateAllCss(styleObjects)   │
└────────────────────────────────┘
         │
         ├─── 1. BASE_STYLES (CSS reset + Webflow components)
         │
         ├─── 2. Desktop rules (no media query)
         │       for each styleObject:
         │         for each state (none, hover, pressed...):
         │           generateStyleObjectCss(obj, 'desktop', state)
         │
         ├─── 3. Tablet rules (@media max-width: 991px)
         │       for each styleObject:
         │         for each state:
         │           generateStyleObjectCss(obj, 'tablet', state)
         │
         ├─── 4. Mobile rules (@media max-width: 478px)
         │       for each styleObject:
         │         for each state:
         │           generateStyleObjectCss(obj, 'mobile', state)
         │
         └─── 5. Force-state rules (for editor preview)
                 [data-force-state="hover"] { hover styles }

Output: Complete CSS string
```

### Selector Generation
```typescript
// buildSelectorFromChain(chainContext)

// Single class:
chainContext = ["button"]
→ ".button"

// Combo class:
chainContext = ["button", "is-primary"]
→ ".button.is-primary"

// With state:
chainContext = ["button", "is-primary"], state = "hover"
→ ".button.is-primary:hover"
```

### Breakpoint Cascade
```
Desktop (base) ─┬─> Tablet (max-width: 991px) ─┬─> Mobile (max-width: 478px)
                │                               │
           Inherits                        Inherits from
           from desktop                    tablet/desktop
```

---

## Preview System

### Live Preview Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    PreviewPanel                          │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────┐ │
│ │                    iframe                            │ │
│ │  ┌───────────────────────────────────────────────┐  │ │
│ │  │ <html>                                        │  │ │
│ │  │   <head>                                      │  │ │
│ │  │     <style id="preview-styles">              │  │ │
│ │  │       /* Generated CSS */                    │  │ │
│ │  │     </style>                                 │  │ │
│ │  │   </head>                                    │  │ │
│ │  │   <body>                                     │  │ │
│ │  │     <div data-node-id="node-1" class="...">  │  │ │
│ │  │       ...                                    │  │ │
│ │  │     </div>                                   │  │ │
│ │  │   </body>                                    │  │ │
│ │  │ </html>                                      │  │ │
│ │  └───────────────────────────────────────────────┘  │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │            SelectionOverlay (fixed position)         │ │
│ │  • Blue border around selected element              │ │
│ │  • Label with element name                          │ │
│ │  • Positioned based on getBoundingClientRect()      │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### CSS Injection Flow
```
styleObjects change in store
         │
         ▼ (useMemo in PreviewPanel)
┌────────────────────────────────┐
│ generateAllCss(styleObjects)   │
└────────────────────────────────┘
         │
         ▼ (debounced 50ms)
┌────────────────────────────────┐
│ Inject into iframe             │
│ <style id="preview-styles">    │
└────────────────────────────────┘
```

### Message Protocol (iframe ↔ parent)
```typescript
// Parent → iframe
postMessage({ type: 'ub:select', nodeId: 'node-123' })
postMessage({ type: 'ub:hover', nodeId: 'node-456' })
postMessage({ type: 'ub:refresh' })
postMessage({ type: 'ub:zoom', zoom: 0.75 })

// iframe → parent
postMessage({ type: 'ub:click', nodeId: 'node-123' })
postMessage({ type: 'ub:dblclick', nodeId: 'node-123' })
postMessage({ type: 'ub:mouseover', nodeId: 'node-456' })
```

### Event Blocking
The preview iframe blocks default behaviors:
- Links don't navigate
- Forms don't submit
- Keyboard shortcuts are intercepted
- Click events are captured for selection

---

## Undo/Redo System

### History Structure
```typescript
interface HistorySnapshot {
  // Data state
  designs: Record<string, EditableDesign>;
  styleObjects: Record<string, WebflowStyleObject>;
  chainIndex: ChainIndex;
  pendingOperations: EditOperation[];

  // UI state (for time-travel)
  selectedDesignId: string | null;
  selectedNodeId: string | null;
  editingClassName: string | null;
  editingClassStack: string[] | null;
  editingState: PseudoState;
  expandedNodeIds: string[];
  currentBreakpoint: Breakpoint;
}

interface HistoryEntry {
  timestamp: number;
  label: string;           // "Change style", "Add element", etc.
  snapshot: HistorySnapshot;
}
```

### Configuration
```typescript
const MAX_HISTORY_SIZE = 50;      // Max undo steps
const HISTORY_DEBOUNCE_MS = 300;  // Debounce rapid changes
```

### Flow
```
Before any edit:
┌────────────────────────────────┐
│ pushHistory("Change style")    │
│ 1. Clone current state         │
│ 2. Push to undoStack           │
│ 3. Clear redoStack             │
└────────────────────────────────┘

On Ctrl+Z (undo):
┌────────────────────────────────┐
│ undo()                         │
│ 1. Save current → redoStack    │
│ 2. Pop from undoStack          │
│ 3. Restore snapshot            │
└────────────────────────────────┘

On Ctrl+Shift+Z (redo):
┌────────────────────────────────┐
│ redo()                         │
│ 1. Save current → undoStack    │
│ 2. Pop from redoStack          │
│ 3. Restore snapshot            │
└────────────────────────────────┘
```

### Keyboard Hook
```typescript
// useUndoRedoKeyboard.ts
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
      if (e.shiftKey) {
        redo();
      } else {
        undo();
      }
      e.preventDefault();
    }
  };
  window.addEventListener('keydown', handleKeyDown);
}, []);
```

---

## Multi-Design Mode

When project has multiple designs (pages):

### State
```typescript
interface CustomizerState {
  isMultiDesignMode: boolean;
  designStatuses: Record<string, {
    status: 'idle' | 'processing' | 'complete' | 'error';
    progress: number;
    message?: string;
  }>;
  styleUsageMap: Record<string, string[]>;  // styleId → designIds
}
```

### Design Switching
```typescript
selectDesign(designId) {
  // Clear current selection
  set({
    selectedDesignId: id,
    selectedNodeId: null,
    selectedClassId: null,
  });
}
```

### Style Usage Tracking
```typescript
// Shows which designs use which styles
// Used in StylesPanel to show cross-design usage

updateStyleUsageMap() {
  const usageMap = {};
  for (const [designId, design] of designs) {
    for (const node of design.nodes) {
      for (const className of node.classes) {
        const styleId = chainIndex[className];
        usageMap[styleId] ??= [];
        usageMap[styleId].push(designId);
      }
    }
  }
}
```

---

## Key Files Summary

| File | Purpose | Lines |
|------|---------|-------|
| `useCustomizerStore.ts` | Zustand state management | ~2400 |
| `useCustomizerSocket.ts` | Socket.IO communication | ~440 |
| `cssGenerator.ts` | CSS from styleObjects | ~950 |
| `computedStyles.ts` | Style cascade computation | ~200 |
| `InspectorContext.tsx` | Inspector shared context | ~480 |
| `CustomizerPanel.tsx` | Main container | ~230 |
| `LeftSidebar.tsx` | Navigation hub | ~950 |
| `LayersPanel.tsx` | Layer tree | ~1250 |
| `PreviewPanel.tsx` | Live preview | ~960 |
| `InspectorPanel.tsx` | Property editor | ~170 |

---

## Backend Integration

### Handlers Location
`backend-new/websocket/frontend/workflow/customizer/handlers.ts`

### Data Storage
- **XSCP files**: S3 at `projects/{projectId}/designs/{designId}/data/webflow-xscp.json`
- **ID mappings**: Project state in database (`state.customizerMappings`)
- **Asset cache**: S3 at `projects/{projectId}/data/webflow-asset-cache.json`

### Handler Functions
```typescript
handleRequestTree()      // Load design data
handleApplyEdits()       // Apply edit operations to XSCP
handleRequestPreview()   // Generate HTML preview (server-side)
handleRequestExport()    // Pro-only: Get XSCP for Webflow
handleUploadImage()      // Upload image to S3
handleAssetUploadStatus() // Check upload progress
```

---

## Performance Optimizations

1. **Debouncing**:
   - CSS injection: 50ms
   - Content updates: 16ms
   - Backend sync: 1000ms

2. **Memoization**:
   - All components wrapped with `React.memo`
   - `useMemo` for computed values
   - `useCallback` for callbacks

3. **Shallow Subscriptions**:
   - `useShallow` from Zustand to prevent re-renders

4. **O(1) Lookups**:
   - `chainIndex` for style lookups
   - `Map` for property lookups in inspector

5. **Local CSS Generation**:
   - Preview CSS generated on frontend
   - No backend round-trip for style previews

---

## Summary

The Customizer is a production-grade visual design editor that:

1. **Loads** design data via WebSocket (`REQUEST_TREE`)
2. **Manages** state in Zustand with undo/redo support
3. **Edits** optimistically, syncing to backend with debouncing
4. **Renders** live preview by generating CSS from styleObjects
5. **Supports** Webflow's combo class model (class stacks)
6. **Handles** responsive breakpoints and pseudo-states
7. **Exports** to Webflow via copy/paste of XSCP JSON

The architecture separates concerns cleanly:
- **Store**: Single source of truth
- **Socket**: Sync layer with retry/version handling
- **Components**: Declarative UI consuming store
- **Utils**: Pure functions for CSS/HTML generation
