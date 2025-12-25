"use strict";
// ============================================================================
// COMPLEX HIERARCHY DETECTION TYPES
// Types for the plugin's complex hierarchy review panel
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfidenceFromReason = getConfidenceFromReason;
exports.getReasonDisplayText = getReasonDisplayText;
/**
 * Get confidence level from detection reason
 */
function getConfidenceFromReason(reason) {
    switch (reason) {
        // Confident - Designer explicitly named/structured
        case 'name_pattern':
        case 'shape_composition':
            return 'confident';
        // Needs Review - No clear intent (auto-named elements)
        case 'default_names':
            return 'needs_review';
        // Likely - Pattern-based detection (all other cases)
        default:
            return 'likely';
    }
}
/**
 * Get user-friendly display text for a complexity reason
 */
function getReasonDisplayText(reason, details) {
    switch (reason) {
        case 'hard_limit':
            return 'Very deep nesting (25+ levels)';
        case 'name_pattern':
            return `Name suggests graphic${details ? ` (${details})` : ''}`;
        case 'scattered':
            return `Scattered elements${details ? ` (${details})` : ''}`;
        case 'overlapping':
            return `Overlapping layers${details ? ` (${details})` : ''}`;
        case 'thin_lines':
            return 'Decorative line pattern';
        case 'low_opacity':
            return 'Transparent overlay elements';
        case 'default_names':
            return 'Auto-named elements (Rectangle 1, etc)';
        case 'very_deep':
            return `Deeply nested${details ? ` (${details})` : ''}`;
        case 'deep':
            return `Nested structure${details ? ` (${details})` : ''}`;
        case 'complexity_score':
            return `Complex composition${details ? ` (score: ${details})` : ''}`;
        case 'shape_composition':
            return `Shape composition${details ? ` (${details})` : ''}`;
        default:
            return 'Complex element';
    }
}
