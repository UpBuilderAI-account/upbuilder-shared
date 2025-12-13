"use strict";
// ============================================================================
// ELEMENT TYPE - Unified across plugin and backend
// Single source of truth for element/node data
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineHeightUnit = exports.SizeUnit = exports.ElementType = void 0;
// ==================== ENUMS ====================
var ElementType;
(function (ElementType) {
    ElementType["FRAME"] = "FRAME";
    ElementType["TEXT"] = "TEXT";
    ElementType["RECTANGLE"] = "RECTANGLE";
    ElementType["VECTOR"] = "VECTOR";
    ElementType["ELLIPSE"] = "ELLIPSE";
    ElementType["POLYGON"] = "POLYGON";
    ElementType["STAR"] = "STAR";
    ElementType["INSTANCE"] = "INSTANCE";
    ElementType["COMPONENT"] = "COMPONENT";
    ElementType["GROUP"] = "GROUP";
    ElementType["IMAGE"] = "IMAGE";
    ElementType["ROW"] = "ROW";
    ElementType["COLUMN"] = "COLUMN";
})(ElementType || (exports.ElementType = ElementType = {}));
var SizeUnit;
(function (SizeUnit) {
    SizeUnit["PIXELS"] = "PIXELS";
    SizeUnit["PERCENT"] = "PERCENT";
})(SizeUnit || (exports.SizeUnit = SizeUnit = {}));
var LineHeightUnit;
(function (LineHeightUnit) {
    LineHeightUnit["PIXELS"] = "PIXELS";
    LineHeightUnit["PERCENT"] = "PERCENT";
    LineHeightUnit["AUTO"] = "AUTO";
})(LineHeightUnit || (exports.LineHeightUnit = LineHeightUnit = {}));
// ==================== TYPE GUARDS ====================
