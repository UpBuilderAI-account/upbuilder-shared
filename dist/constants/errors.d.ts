import { type ErrorCode } from '../types/socket-protocol';
/**
 * Check if a string is a valid error code
 */
export declare function isValidErrorCode(code: string): code is ErrorCode;
/**
 * Get a user-friendly error message for an error code
 */
export declare function getErrorMessage(code: ErrorCode | string): string;
//# sourceMappingURL=errors.d.ts.map