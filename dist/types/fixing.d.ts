/**
 * Fixing Stage Types
 */
export type FixingCommandAction = 'selectNode' | 'setBreakpoint' | 'setProperty' | 'removeProperty' | 'comment';
export interface FixingCommand {
    action: FixingCommandAction;
    displayMessage: string;
    nodeId?: string;
    className?: string;
    property?: string;
    value?: string;
    breakpoint?: 'desktop' | 'tablet' | 'mobile';
    message?: string;
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
        properties: Record<string, string>;
    }>;
    figmaScreenshot: string;
    builtScreenshot: string;
}
export interface FixingCommandsResponse {
    projectId: string;
    designId: string;
    sectionId: string;
    analysis: string;
    commands: FixingCommand[];
}
export interface FixingResult {
    section: string;
    analysis: string;
    commands: FixingCommand[];
}
//# sourceMappingURL=fixing.d.ts.map