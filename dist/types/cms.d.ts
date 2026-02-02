/**
 * Webflow plan tier - determines CMS limits
 */
export type WebflowPlan = 'starter' | 'cms' | 'business' | 'enterprise';
/**
 * CMS budget derived from plan + existing usage
 */
export interface CMSBudget {
    plan: WebflowPlan;
    maxCollections: number;
    maxFieldsPerCollection: number;
    maxItems: number;
    localeCount: number;
    existingCollections: number;
    existingItems: number;
}
/**
 * Webflow CMS field types
 */
export type CMSFieldType = 'PlainText' | 'RichText' | 'Image' | 'Video' | 'File' | 'Link' | 'Email' | 'Phone' | 'Number' | 'DateTime' | 'Switch' | 'Option' | 'Color' | 'Reference' | 'MultiReference';
/**
 * A single field within a collection
 */
export interface CMSFieldDefinition {
    name: string;
    type: CMSFieldType;
    required?: boolean;
    helpText?: string;
    choices?: string[];
    referenceCollection?: string;
    min?: number;
    max?: number;
    textMode?: 'single' | 'multi';
}
/**
 * A relationship between two collections
 */
export interface CMSRelationship {
    fromCollection: string;
    fieldName: string;
    toCollection: string;
    type: 'Reference' | 'MultiReference';
}
/**
 * A sample CMS item extracted from the design
 */
export interface CMSSampleItem {
    fields: Record<string, string | number | boolean>;
}
/**
 * A single CMS collection definition
 */
export interface CMSCollectionDefinition {
    name: string;
    singularName: string;
    slug: string;
    usedBySections: string[];
    fields: CMSFieldDefinition[];
    sampleItems: CMSSampleItem[];
}
/**
 * Display hint for build-sections - how to render a CMS-driven section
 */
export interface CMSDisplayHint {
    sectionId: string;
    collectionSlug: string;
    displayType: 'collection-list' | 'collection-page';
    limit?: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
    filters?: Array<{
        field: string;
        condition: 'is' | 'is-not' | 'is-set' | 'is-not-set' | 'is-on' | 'is-off' | 'before-today' | 'after-today';
        value?: string;
    }>;
    needsNestedList?: boolean;
    nestedListWarning?: string;
}
/**
 * Complete CMS schema output from AI
 */
export interface CMSSchema {
    collections: CMSCollectionDefinition[];
    relationships: CMSRelationship[];
    displayHints: CMSDisplayHint[];
    warnings: string[];
    budgetUsage: {
        collectionsUsed: number;
        collectionsAvailable: number;
        estimatedItems: number;
        itemBudgetRemaining: number;
    };
}
/**
 * Normalize a full CMS schema so every sampleItem is in { fields: {...} } shape.
 * Safe to call on already-normalized schemas (idempotent).
 */
export declare function normalizeCmsSchema(schema: CMSSchema): CMSSchema;
/**
 * Binding between an XSCP node and a CMS field
 */
export interface CMSBinding {
    collectionSlug: string;
    fieldSlug: string;
    fieldType: CMSFieldType;
}
/**
 * CMS configuration passed to the XSCP builder
 */
export interface CMSXSCPConfig {
    schema: CMSSchema;
    /** Map of section ID -> collection slug for sections that need collection wrappers */
    sectionBindings: Map<string, CMSDisplayHint>;
}
/**
 * Status of CMS collection creation (reported by extension)
 */
export interface CMSCollectionStatus {
    collectionSlug: string;
    status: 'success' | 'failed';
    webflowCollectionId?: string;
    error?: string;
    itemsCreated?: number;
}
/**
 * Full CMS creation report from extension
 */
export interface CMSCreationReport {
    collections: CMSCollectionStatus[];
    completedAt: string;
}
//# sourceMappingURL=cms.d.ts.map