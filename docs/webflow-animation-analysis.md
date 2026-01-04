# Webflow Generator - Complete Architecture & Animation Analysis

> Comprehensive analysis of the Webflow generator pipeline and animation handling

---

## 1. Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         WEBFLOW GENERATOR PIPELINE                          │
└─────────────────────────────────────────────────────────────────────────────┘

                    ┌─────────────────────────┐
                    │ INPUT: Assembled Design │
                    │ - html (consolidated)   │
                    │ - css (consolidated)    │
                    │ - js (consolidated)     │
                    └───────────┬─────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STAGE 1: Convert Styles                                                      │
│ File: stages/1-convert-styles.ts                                            │
│ Prompt: prompts/webflow-new/1-convert-styles.ts                             │
│                                                                              │
│ INPUT: globalStylesheet + sections CSS                                       │
│                                                                              │
│ AI OUTPUTS (parsed blocks):                                                  │
│ ├─ STYLE_REGISTRY        → StyleRegistry (byName, byId maps)                │
│ ├─ ANIMATION_REGISTRY    → AnimationEntry[] (hover/scroll animations)       │
│ ├─ KEYFRAMES_REGISTRY    → KeyframeDefinition[] (@keyframes defs)           │
│ ├─ KEYFRAME_USAGES       → KeyframeUsage[] (class→animation mappings)       │
│ ├─ INITIAL_ANIMATIONS    → (captured in AI response, used for IX2)          │
│ └─ HOVER_ANIMATIONS      → (hover transitions, stay in CSS styleLess)       │
└─────────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STAGE 2: Assemble Design Structure                                           │
│ File: stages/2-assemble-design.ts                                           │
│ Prompt: prompts/webflow-new/2-assemble-design.ts                            │
│                                                                              │
│ INPUT: designHTML + Stage1FullOutput (style registry)                        │
│                                                                              │
│ AI OUTPUTS:                                                                  │
│ └─ STRUCTURE block → StructureElement[]                                      │
│    Each element has:                                                         │
│    - id, compType, parent, styles (selector IDs)                            │
│    - Optional: tag, text, src, alt, href                                    │
│    - Animation attrs: aos, aosDelay, aosDuration, aosEasing                 │
│    - Keyframe attrs: animation, animationDelay, animationTrigger            │
└─────────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STAGE 4: Generate XSCP                                                       │
│ File: stages/4-generate-xscp.ts                                             │
│                                                                              │
│ Calls: buildXSCP() from utils/xscp-builder.ts                               │
│                                                                              │
│ INPUTS:                                                                      │
│ ├─ styleRegistry                                                             │
│ ├─ elements (StructureElement[])                                            │
│ ├─ javascript                                                                │
│ ├─ animationRegistry                                                         │
│ ├─ keyframesRegistry                                                         │
│ ├─ keyframeUsages                                                            │
│ └─ assetCache                                                                │
│                                                                              │
│ OUTPUTS:                                                                     │
│ └─ WebflowXSCPData                                                           │
│    ├─ nodes[]     (Webflow element nodes)                                   │
│    ├─ styles[]    (Webflow style definitions with variants)                 │
│    ├─ assets[]    (uploaded images)                                          │
│    ├─ ix1[]       (legacy, always empty)                                    │
│    └─ ix2         (Interactions 2.0)                                        │
│        ├─ interactions[]                                                     │
│        ├─ events[]                                                           │
│        └─ actionLists[]                                                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ STAGE 5: Validate Structure                                                  │
│ File: stages/5-validate-structure.ts                                        │
│                                                                              │
│ - Validates XSCP structure                                                   │
│ - Fixes hierarchy issues if needed                                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. File Structure

```
backend-new/generators/webflow-new/
├── index.ts                           # Main orchestrator (WebflowNewGenerator class)
├── types.ts                           # All TypeScript type definitions
│
├── stages/
│   ├── 1-convert-styles.ts           # CSS → StyleRegistry + Animations
│   ├── 2-assemble-design.ts          # HTML → Structure with style refs
│   ├── 4-generate-xscp.ts            # Structure → XSCP (calls buildXSCP)
│   ├── 5-validate-structure.ts       # Validation + fixes
│   └── 6-convert-javascript.ts       # JS conversion (global)
│
└── utils/
    ├── ix2-builder.ts                # IX2 animation conversion (~577 lines)
    ├── xscp-builder.ts               # XSCP builder (~1182 lines)
    ├── parsers.ts                    # Parse AI responses (~887 lines)
    ├── validators.ts                 # XSCP validation
    ├── style-processor.ts            # Style property processing
    ├── hierarchy-fixer.ts            # Component type corrections
    ├── element-validator.ts          # Element validation
    └── class-combination-extractor.ts

backend-new/prompts/webflow-new/
├── 1-convert-styles.ts               # Stage 1 prompt (~340 lines)
├── 2-assemble-design.ts              # Stage 2 prompt (~316 lines)
├── 4-fix-hierarchy.ts                # Hierarchy fix prompt
├── 5-convert-javascript.ts           # JS conversion prompt
└── index.ts                          # Exports
```

---

## 3. Type System

### 3.1 Core Types (types.ts)

```typescript
// Style Registry Entry - single CSS class converted
interface StyleRegistryEntry {
  id: string;           // CSS selector: ".btn", ".hero_section .container"
  name: string;         // Derived: "btn", "hero_section_container"
  comb: '' | '&';       // '' = base class, '&' = combo modifier
  main: string;         // Desktop CSS properties
  medium?: string;      // ≤991px
  small?: string;       // ≤767px
  tiny?: string;        // ≤478px
  hover?: string;       // :hover state CSS
  focus?: string;       // :focus state CSS
  active?: string;      // :active state CSS
  children?: string[];  // Combo children class names
}

// Structure Element - DOM element in Webflow format
interface StructureElement {
  id: string;
  compType: string;     // Block, Section, Heading, Link, etc.
  parent: string;
  styles: string[];     // Array of style IDs (selectors)

  // Optional attributes
  tag?: string;         // h1, h2, p, etc.
  text?: string;        // Text content
  src?: string;         // Image source
  alt?: string;         // Image alt
  href?: string;        // Link URL
  html?: string;        // HtmlEmbed content
  collapse?: string;    // NavbarWrapper collapse breakpoint

  // Animation attributes
  aos?: string;                // data-aos value: fade-up, slide-down, etc.
  aosDelay?: number;           // data-aos-delay in ms
  aosDuration?: number;        // data-aos-duration in ms
  aosEasing?: string;          // data-aos-easing
  animation?: string;          // @keyframes name
  animationDelay?: number;     // delay in ms
  animationDuration?: number;  // duration in ms
  animationTrigger?: 'load' | 'scroll';
}
```

### 3.2 Animation Types

```typescript
// Animation detected from CSS transitions
interface AnimationEntry {
  styleId: string;
  className: string;
  type: 'hover' | 'focus' | 'active' | 'scroll' | 'load';
  duration: number;
  easing: string;
  delay?: number;
  preset?: string;  // For scroll: fade-up, slide-down, etc.
  properties?: {
    prop: string;
    from: string;
    to: string;
  }[];
}

// @keyframes definition
interface KeyframeDefinition {
  name: string;           // Animation name
  duration: number;       // Default duration in ms
  easing: string;         // Easing function
  fillMode?: string;      // forwards, backwards, both, none
  iterationCount?: number | 'infinite';
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  steps: KeyframeStep[];  // Individual keyframes
}

interface KeyframeStep {
  percent: number;        // 0-100
  opacity?: number;
  transform?: string;     // Raw: "translateY(30px)"
  backgroundColor?: string;
  color?: string;
  transformParsed?: {     // Parsed for IX2
    translateX?: number;
    translateY?: number;
    translateZ?: number;
    scaleX?: number;
    scaleY?: number;
    rotateZ?: number;
  };
}

// Maps CSS class to animation usage
interface KeyframeUsage {
  className: string;            // CSS class
  animation: string;            // Keyframe animation name
  delay?: number;               // Animation delay
  trigger: 'load' | 'click' | 'scroll';
}
```

### 3.3 IX2 (Webflow Interactions 2.0)

```typescript
interface IX2Data {
  interactions: IX2Interaction[];  // Which elements have interactions
  events: IX2Event[];              // Event triggers
  actionLists: IX2ActionList[];    // Animation sequences
}

interface IX2Interaction {
  id: string;                     // e.g., "i-abc123"
  interactionTypeId: string;      // SCROLL_INTO_VIEW_INTERACTION, PAGE_ANIMATION
  eventIds: string[];             // Linked events
  target: string;                 // Target node ID
  createdOn: number;
}

interface IX2Event {
  id: string;
  name: string;
  animationType: 'preset' | 'custom';
  eventTypeId: string;            // SCROLL_INTO_VIEW, PAGE_START, MOUSE_CLICK
  action: {
    id: string;
    actionTypeId: string;         // FADE_EFFECT, SLIDE_EFFECT, GENERAL_START_ACTION
    instant: boolean;
    config: {
      actionListId: string;
      autoStopEventId: string;
    };
  } | null;
  mediaQueries: string[];         // ['main', 'medium', 'small', 'tiny']
  target: { id: string; appliesTo: string; styleBlockIds: string[] };
  config: {
    loop: boolean;
    playInReverse: boolean;
    scrollOffsetValue: number;
    scrollOffsetUnit: string;
    delay: number | null;
    direction: string | null;     // BOTTOM, TOP, LEFT, RIGHT
    effectIn: boolean | null;
  };
}

interface IX2ActionList {
  id: string;
  title: string;
  actionItemGroups: {
    actionItems: {
      id: string;
      actionTypeId: string;       // STYLE_OPACITY, TRANSFORM_MOVE, TRANSFORM_SCALE, etc.
      config: Record<string, unknown>;
      instant?: boolean;
    }[];
  }[];
  useFirstGroupAsInitialState: boolean;
}
```

---

## 4. Animation Processing Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          ANIMATION DATA FLOW                                 │
└─────────────────────────────────────────────────────────────────────────────┘

CSS INPUT
├── .btn { transition: background 0.3s ease; }
├── .btn:hover { background: #2563eb; }
├── .card { opacity: 0; transform: translateY(30px); }
├── .hero_image { animation: fadeInUp 0.6s ease; }
└── @keyframes fadeInUp { 0%: {...} 100%: {...} }

                    │
                    ▼
         ┌─────────────────────┐
         │  STAGE 1 AI PROMPT  │
         │ (1-convert-styles)  │
         └──────────┬──────────┘
                    │
         AI Response Contains:
         │
         ├─► STYLE_REGISTRY
         │   - id: ".btn"
         │     hover: "background-color: #2563eb;"
         │
         ├─► INITIAL_ANIMATIONS (prompt asks for this)
         │   - selector: ".card"
         │     type: fadeInUp
         │     from: "opacity: 0; transform: translateY(30px)"
         │     to: "opacity: 1; transform: none"
         │
         ├─► HOVER_ANIMATIONS (prompt asks for this)
         │   - selector: ".btn"
         │     duration: 300
         │     properties: background-color
         │
         └─► KEYFRAMES (prompt asks for this)
             - name: "fadeInUp"
               steps: [...]
                    │
                    ▼
         ┌─────────────────────┐
         │   PARSERS.TS        │
         │                     │
         │ parseStyleRegistry()│ → StyleRegistry
         │ parseAnimationRegistry() → AnimationEntry[]    ⚠️ Looks for ANIMATION_REGISTRY
         │ parseKeyframesRegistry() → KeyframeDefinition[] ⚠️ Looks for KEYFRAMES_REGISTRY
         │ parseKeyframeUsages()   → KeyframeUsage[]       ⚠️ Looks for KEYFRAME_USAGES
         └──────────┬──────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │  STAGE 2 AI PROMPT  │
         │ (2-assemble-design) │
         └──────────┬──────────┘
                    │
         AI Response Contains:
         │
         └─► STRUCTURE
             - id: "hero_card"
               compType: "Block"
               styles: [".card"]
               aos: "fade-up"          ← Animation attrs
               aosDelay: 100
                    │
                    ▼
         ┌─────────────────────┐
         │   PARSERS.TS        │
         │ parseSectionStructure()
         │ → extracts aos, animation attrs
         └──────────┬──────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │  XSCP BUILDER       │
         │ (xscp-builder.ts)   │
         └──────────┬──────────┘
                    │
         Collects elementAnimations Map:
         │ - Loops through elements
         │ - Checks for aos, animation attrs
         │ - Matches keyframeUsages to styles
                    │
                    ▼
         ┌─────────────────────┐
         │  IX2 BUILDER        │
         │ (ix2-builder.ts)    │
         │                     │
         │ buildIx2Data(       │
         │   animationRegistry,│
         │   elementAnimations,│
         │   nodeIdMap,        │
         │   projectId,        │
         │   keyframesRegistry │
         │ )                   │
         └──────────┬──────────┘
                    │
         Processing:
         │
         ├─► Hover/Focus/Active → SKIPPED (handled by CSS styleLess)
         │
         ├─► AOS Scroll Animations:
         │   - Creates SCROLL_INTO_VIEW_INTERACTION
         │   - Creates SCROLL_INTO_VIEW event with preset action
         │   - Maps aos types: fade→FADE_EFFECT, slide→SLIDE_EFFECT, etc.
         │
         └─► @keyframes Animations:
             - Creates PAGE_ANIMATION or SCROLL_INTO_VIEW_INTERACTION
             - Creates custom actionList from keyframe steps
             - Converts transform properties to IX2 action items
                    │
                    ▼
         ┌─────────────────────┐
         │  IX2 OUTPUT         │
         │                     │
         │  ix2: {             │
         │    interactions,    │
         │    events,          │
         │    actionLists      │
         │  }                  │
         └─────────────────────┘
```

---

## 5. Mapping Tables

### 5.1 AOS Animation → IX2 Action Type

| AOS Animation | Webflow Action |
|---------------|----------------|
| `fade*` | `FADE_EFFECT` |
| `slide*` | `SLIDE_EFFECT` |
| `zoom*`, `scale*` | `GROW_EFFECT` |
| `flip*` | `FLIP_EFFECT` |
| `bounce*`, `jello` | `BOUNCE_EFFECT` |
| `rotate*`, `spin` | `FLIP_EFFECT` |
| `blur*` | `FADE_EFFECT` |
| `pop*`, `pulse` | `GROW_EFFECT` |
| `shrink` | `SHRINK_EFFECT` |

### 5.2 AOS Direction → IX2 Direction

| AOS Direction | Webflow Direction |
|---------------|-------------------|
| `up`, `bottom` | `BOTTOM` |
| `down`, `top` | `TOP` |
| `left` | `RIGHT` |
| `right` | `LEFT` |

### 5.3 CSS Easing → IX2 Easing

| CSS Easing | Webflow Easing |
|------------|----------------|
| `linear` | `linear` |
| `ease` | `ease` |
| `ease-in` | `easeIn` |
| `ease-out` | `easeOut` |
| `ease-in-out` | `easeInOut` |
| `cubic-bezier(0.22, 1, ...)` | `outQuart` |
| `cubic-bezier(0.64, 0, ...)` | `inQuart` |

### 5.4 Keyframe Transform → IX2 Action

| Transform | IX2 ActionTypeId |
|-----------|------------------|
| `translateX`, `translateY`, `translateZ` | `TRANSFORM_MOVE` |
| `scale`, `scaleX`, `scaleY` | `TRANSFORM_SCALE` |
| `rotate`, `rotateX`, `rotateY`, `rotateZ` | `TRANSFORM_ROTATE` |
| `opacity` | `STYLE_OPACITY` |

---

## 6. Animation Systems Supported

### 6.1 Hover/Focus/Active Transitions (CSS-only)

**Detection:** CSS `:hover`, `:focus`, `:active` selectors with `transition`
**Storage:** In StyleRegistryEntry as `hover`, `focus`, `active` fields
**Output:** WebflowStyle `variants.main_hover`, etc.
**IX2:** NOT NEEDED - Webflow handles via styleLess variants

```css
/* Input */
.btn { transition: background 0.3s ease; }
.btn:hover { background: #2563eb; }

/* Output in STYLE_REGISTRY */
- id: ".btn"
  main: "transition: background 0.3s ease;"
  hover: "background: #2563eb;"
```

### 6.2 AOS Scroll Animations

**Detection:** `data-aos` attributes on HTML elements
**Parsing:** Structure parser extracts aos, aosDelay, aosDuration, aosEasing
**Storage:** In StructureElement as aos* fields
**Output:** IX2 SCROLL_INTO_VIEW_INTERACTION with preset animation

```html
<!-- Input -->
<div class="card" data-aos="fade-up" data-aos-delay="100"></div>

<!-- Structure line -->
id: "card" | compType: "Block" | parent: "..." | styles: [".card"] | aos: "fade-up" | aosDelay: 100

<!-- IX2 Output -->
{
  interactions: [{
    id: "i-xxx",
    interactionTypeId: "SCROLL_INTO_VIEW_INTERACTION",
    eventIds: ["e-xxx-in", "e-xxx-out"],
    target: "node-id"
  }],
  events: [{
    id: "e-xxx-in",
    eventTypeId: "SCROLL_INTO_VIEW",
    action: { actionTypeId: "FADE_EFFECT", ... }
  }]
}
```

### 6.3 @keyframes Animations

**Detection:** CSS `@keyframes` rules + elements with `animation:` property
**Parsing:** parseKeyframesRegistry() extracts KeyframeDefinition[]
**Storage:** In keyframesRegistry array
**Output:** IX2 custom actionList with step-by-step actions

```css
/* Input */
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}
.hero_image { animation: fadeInUp 0.6s ease; }

/* Output in IX2 */
{
  actionLists: [{
    id: "a-xxx",
    title: "fadeInUp",
    actionItemGroups: [{
      actionItems: [
        { actionTypeId: "STYLE_OPACITY", config: { value: 0 }, instant: true },
        { actionTypeId: "TRANSFORM_MOVE", config: { yValue: 30 }, instant: true }
      ]
    }, {
      actionItems: [
        { actionTypeId: "STYLE_OPACITY", config: { value: 1, duration: 600 } },
        { actionTypeId: "TRANSFORM_MOVE", config: { yValue: 0, duration: 600 } }
      ]
    }]
  }]
}
```

### 6.4 Initial State Animations (opacity: 0 pattern)

**Detection:** CSS with `opacity: 0` + `transform` (element would be invisible)
**Handling:** Prompt instructs AI to output END state only, capture animation separately
**Storage:** In INITIAL_ANIMATIONS block (AI response)
**Note:** This ensures static Webflow preview shows visible elements

---

## 7. Current Gaps & Issues

### 7.1 Prompt ↔ Parser Mismatch

The Stage 1 prompt asks for:
- `INITIAL_ANIMATIONS`
- `HOVER_ANIMATIONS`
- `KEYFRAMES`

But parsers look for:
- `ANIMATION_REGISTRY` ← **NOT in prompt**
- `KEYFRAMES_REGISTRY` ← **NOT in prompt**
- `KEYFRAME_USAGES` ← **NOT in prompt**

**Impact:** Animation data may not be parsed correctly.

### 7.2 Click Animations Not Implemented

```typescript
// types.ts has:
trigger: 'load' | 'click' | 'scroll'

// ix2-builder.ts only handles:
// - scroll (SCROLL_INTO_VIEW_INTERACTION)
// - load (PAGE_ANIMATION)
// Click is NOT implemented
```

### 7.3 Complex Sequences Not Supported

- Multi-element staggered animations
- Chained/dependent animations
- Loop animations (partial support)
- Interaction-based triggers (hover → animate something else)

---

## 8. Key Functions

### buildIx2Data() (ix2-builder.ts:79)

Main entry point for IX2 generation:

```typescript
export function buildIx2Data(
  animationRegistry: AnimationEntry[],    // From CSS transition detection
  elementAnimations: Map<string, ElementAnimationAttrs>,  // From element attrs
  nodeIdMap: Map<string, string>,         // Element ID → Webflow node ID
  projectId: string,                      // For deterministic IDs
  keyframesRegistry: KeyframeDefinition[] // @keyframes definitions
): IX2Data
```

### buildActionListFromKeyframe() (ix2-builder.ts:281)

Converts keyframe definition to IX2 actionList:

```typescript
function buildActionListFromKeyframe(
  keyframe: KeyframeDefinition,
  actionListId: string,
  duration: number,
  timestamp: number
): IX2ActionList
```

**Timing calculation:**
- First step (0%): `instant: true`, sets initial state
- Subsequent steps: duration calculated from percent difference

### parseTransformFromStep() (ix2-builder.ts:416)

Parses CSS transform string into individual values:

```typescript
// Input: "translateY(30px) scale(0.9) rotate(45deg)"
// Output: { translateY: 30, scaleX: 0.9, scaleY: 0.9, rotateZ: 45 }
```

---

## 9. XSCP Builder Animation Integration

In `xscp-builder.ts`, animations are processed in the IX2 section (lines 260-333):

1. **Build class→animation lookup** from keyframeUsages
2. **Build registryId→className lookup** for matching
3. **Collect elementAnimations** by checking:
   - Direct aos/animation attributes on elements
   - Style matches to keyframeUsages
4. **Call buildIx2Data()** with all collected data
5. **Include IX2 in final XSCP output**

```typescript
// Line 319-325
const ix2 = buildIx2Data(
  animationRegistry,
  elementAnimations,
  nodeIdMap,
  projectId || '',
  keyframesRegistry
);
```

---

## 10. Debugging Animations

### Check Points

1. **Stage 1 Response:** Look for animation blocks in `stage1-response.txt`
2. **Parsed Data:** Log shows `animationEntries`, `keyframesCount`, `keyframeUsagesCount`
3. **Stage 2 Response:** Check structure elements have `aos`, `animation` fields
4. **XSCP Output:** Check `xscp-data.json` → `payload.ix2`

### Log Prefixes

- `[Stage1]` - Style conversion
- `[Stage2-Assemble]` - Structure assembly
- `[Stage4]` - XSCP generation
- `[XSCPBuilder]` - XSCP building, includes IX2 stats
- `[IX2Builder]` - Animation conversion

### Expected Logs

```
[Stage1] Style conversion complete
  animationEntries: 5
  keyframeEntries: 2
  keyframeUsages: 3

[XSCPBuilder] Animation mappings from keyframeUsages
  keyframeUsagesCount: 3
  elementsWithAnimations: 8

[XSCPBuilder] IX2 animations processed
  ix2Interactions: 8
  ix2Events: 16
  ix2ActionLists: 2
```

---

## 11. Recommendations

### Fix Prompt ↔ Parser Alignment

Update `1-convert-styles.ts` prompt to output blocks that match parser expectations:

```
BEGIN ANIMATION_REGISTRY
- styleId: "ss-btn-001"
  className: "btn"
  type: hover
  duration: 300
  ...
END ANIMATION_REGISTRY

BEGIN KEYFRAMES_REGISTRY
- name: "fadeInUp"
  duration: 600
  ...
END KEYFRAMES_REGISTRY

KEYFRAME_USAGES:
- className: "hero_image"
  animation: "fadeInUp"
  trigger: load
```

### Add Click Animation Support

In `ix2-builder.ts`, add handling for click triggers:

```typescript
// Add after scroll animations handling
if (trigger === 'click') {
  // Create MOUSE_CLICK event
  events.push({
    eventTypeId: 'MOUSE_CLICK',
    // ...
  });
}
```

---

## 12. Fixes Implemented (2026-01-04)

### Fix 1: Prompt ↔ Parser Alignment ✅

Updated `prompts/webflow-new/1-convert-styles.ts` to output blocks that match parser expectations:

| Before | After |
|--------|-------|
| `INITIAL_ANIMATIONS` | `BEGIN ANIMATION_REGISTRY ... END ANIMATION_REGISTRY` |
| `HOVER_ANIMATIONS` | (hover stays in style entry `hover:` field) |
| `KEYFRAMES` | `BEGIN KEYFRAMES_REGISTRY ... END KEYFRAMES_REGISTRY` |
| (missing) | `KEYFRAME_USAGES:` section |

### Fix 2: Dropdown Interaction Support ✅

Added to `utils/ix2-builder.ts`:
- `buildDropdownInteraction()` - Creates DROPDOWN_INTERACTION with open/close actionLists
- Creates STYLE_SIZE and STYLE_OPACITY action items for smooth animations

Added to `utils/xscp-builder.ts`:
- Automatic detection of `DropdownWrapper` elements
- Auto-generation of dropdown interactions with linked actionLists

### Fix 3: Navbar Menu Interaction Support ✅

Added to `utils/ix2-builder.ts`:
- `buildNavbarMenuInteraction()` - Creates NAVBAR_INTERACTION for mobile hamburger menu
- Creates open/close animations with height and opacity transitions

Added to `utils/xscp-builder.ts`:
- Automatic detection of `NavbarWrapper` + `NavbarMenu` pairs
- Auto-generation of navbar menu interactions

### Fix 4: Stage 2 Animation Detection ✅

Updated `prompts/webflow-new/2-assemble-design.ts`:
- Added comprehensive animation detection instructions
- Added animation attribute fields to output format:
  - `aos`, `aosDelay`, `aosDuration`, `aosEasing`
  - `animation`, `animationDelay`, `animationTrigger`

### Summary of Changes

| File | Changes |
|------|---------|
| `prompts/webflow-new/1-convert-styles.ts` | Added ANIMATION_REGISTRY, KEYFRAMES_REGISTRY, KEYFRAME_USAGES output |
| `prompts/webflow-new/2-assemble-design.ts` | Added animation detection and attribute fields |
| `utils/ix2-builder.ts` | Added dropdown and navbar interaction builders (~400 lines) |
| `utils/xscp-builder.ts` | Added automatic dropdown/navbar detection and interaction generation |

---

*Generated: 2026-01-04*
*Updated: 2026-01-04 - Added animation system fixes*
