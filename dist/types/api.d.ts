/**
 * Standard API response wrapper
 * Used for all HTTP endpoints to provide consistent error handling
 */
export interface ApiResponse<T = unknown> {
    data: T | null;
    error: string | null;
    success: boolean;
}
/**
 * Paginated API response
 * Used for list endpoints with pagination support
 */
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}
/**
 * Dashboard statistics
 * Response type for dashboard analytics API
 */
export interface DashboardStats {
    totalProjects: number;
    projectsTrend: number;
    exportsThisMonth: number;
    exportsTrend: number;
    storageUsed: string;
    apiCalls: number;
}
//# sourceMappingURL=api.d.ts.map