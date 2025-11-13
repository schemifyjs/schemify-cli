/**
 * Custom error classes for better error handling
 */
export declare class SchemifyError extends Error {
    readonly code: string;
    readonly suggestions?: string[] | undefined;
    constructor(message: string, code: string, suggestions?: string[] | undefined);
}
export declare class ValidationError extends SchemifyError {
    constructor(message: string, suggestions?: string[]);
}
export declare class PromptError extends SchemifyError {
    constructor(message: string, suggestions?: string[]);
}
export declare class ScaffoldingError extends SchemifyError {
    constructor(message: string, suggestions?: string[]);
}
/**
 * Error handler utility similar to NestJS exception filter
 */
export declare class ErrorHandler {
    /**
     * Handle and format errors for CLI output
     */
    static handle(error: unknown): void;
    private static handleSchemifyError;
    private static handleGenericError;
    private static handleUnknownError;
    /**
     * Create a formatted error message
     */
    static formatError(message: string, code?: string): string;
}
/**
 * Utility function to wrap async operations with error handling
 */
export declare function withErrorHandling<T>(operation: () => Promise<T>, errorContext?: string): Promise<T>;
