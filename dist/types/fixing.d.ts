/**
 * Fixing Stage Types
 */
export type FixingCommandAction = 'setProperty' | 'removeProperty' | 'addClass' | 'removeClass' | 'setTextContent' | 'deleteElement' | 'hideElement' | 'showElement' | 'comment';
export interface FixingCommand {
    action: FixingCommandAction;
    displayMessage: string;
    /** Node ID to identify which element (e.g., "node-4") */
    nodeId: string;
    /** Combo class in CSS selector format (e.g., ".container.nav-container") */
    comboClass: string;
    /** Breakpoint to apply the change to */
    breakpoint: 'desktop' | 'tablet' | 'mobile';
    /** CSS property in kebab-case - for setProperty/removeProperty */
    property?: string;
    /** CSS value with units - for setProperty */
    value?: string;
    /** Message for comment action */
    message?: string;
    /** Class name to add/remove - for addClass/removeClass */
    className?: string;
    /** Text content - for setTextContent */
    text?: string;
    /** Display value to restore - for showElement (e.g., "flex", "block", "grid") */
    displayValue?: string;
}
/** Result of executing a fixing command */
export interface FixingCommandResult {
    command: FixingCommand;
    status: 'success' | 'failed' | 'skipped';
    reason?: string;
}
/** Context from a previous fixing pass */
export interface PreviousPassContext {
    passNumber: number;
    analysis: string;
    commands: FixingCommand[];
    commandResults: FixingCommandResult[];
}
export interface FixingSection {
    id: string;
    name: string;
    nodeId: string;
    bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    isGlobal: boolean;
    status: 'pending' | 'in_progress' | 'complete';
}
export interface FixingStartRequest {
    projectId: string;
    designId: string;
    sections: FixingSection[];
}
export interface FixingSectionRequest {
    projectId: string;
    designId: string;
    sectionId: string;
    sectionName: string;
    nodes: Array<{
        id: string;
        type: string;
        classes: string[];
        tag?: string;
    }>;
    styles: Array<{
        name: string;
        combo: string;
        properties?: Record<string, string>;
        breakpoints?: {
            desktop?: Record<string, string>;
            tablet?: Record<string, string>;
            mobile?: Record<string, string>;
        };
    }>;
    figmaScreenshot: string;
    builtScreenshot: string;
    /** Current pass number (1 = initial, 2 = verification) */
    passNumber?: 1 | 2;
    /** Context from pass 1 (only for pass 2) */
    previousPass?: PreviousPassContext;
}
export interface FixingCommandsResponse {
    projectId: string;
    designId: string;
    sectionId: string;
    analysis: string;
    commands: FixingCommand[];
    /** Which pass this response is for */
    passNumber?: 1 | 2;
}
export interface FixingResult {
    section: string;
    analysis: string;
    commands: FixingCommand[];
}
//# sourceMappingURL=fixing.d.ts.map