import chalk from 'chalk';
/**
 * Custom error classes for better error handling
 */
export class SchemifyError extends Error {
    constructor(message, code, suggestions) {
        super(message);
        this.code = code;
        this.suggestions = suggestions;
        this.name = 'SchemifyError';
    }
}
export class ValidationError extends SchemifyError {
    constructor(message, suggestions) {
        super(message, 'VALIDATION_ERROR', suggestions);
        this.name = 'ValidationError';
    }
}
export class PromptError extends SchemifyError {
    constructor(message, suggestions) {
        super(message, 'PROMPT_ERROR', suggestions);
        this.name = 'PromptError';
    }
}
export class ScaffoldingError extends SchemifyError {
    constructor(message, suggestions) {
        super(message, 'SCAFFOLDING_ERROR', suggestions);
        this.name = 'ScaffoldingError';
    }
}
/**
 * Error handler utility similar to NestJS exception filter
 */
export class ErrorHandler {
    /**
     * Handle and format errors for CLI output
     */
    static handle(error) {
        if (error instanceof SchemifyError) {
            this.handleSchemifyError(error);
        }
        else if (error instanceof Error) {
            this.handleGenericError(error);
        }
        else {
            this.handleUnknownError(error);
        }
    }
    static handleSchemifyError(error) {
        console.error(chalk.red(`❌ ${error.name}:`), error.message);
        if (error.suggestions && error.suggestions.length > 0) {
            console.error(chalk.yellow('\n💡 Suggestions:'));
            error.suggestions.forEach((suggestion) => {
                console.error(chalk.yellow(`   • ${suggestion}`));
            });
        }
        // Provide specific help based on error code
        switch (error.code) {
            case 'VALIDATION_ERROR':
                console.error(chalk.blue('\n📖 For more information, run: schemify --help'));
                break;
            case 'PROMPT_ERROR':
                console.error(chalk.blue('\n📖 Try running the command again or use Ctrl+C to cancel'));
                break;
            case 'SCAFFOLDING_ERROR':
                console.error(chalk.blue('\n📖 Check your permissions and available disk space'));
                break;
        }
    }
    static handleGenericError(error) {
        console.error(chalk.red('❌ Error:'), error.message);
        // Provide helpful suggestions based on error message
        if (error.message.includes('ENOENT')) {
            console.error(chalk.yellow('💡 Tip: Check that you have write permissions in the current directory.'));
        }
        else if (error.message.includes('network') ||
            error.message.includes('fetch')) {
            console.error(chalk.yellow('💡 Tip: Check your internet connection.'));
        }
        else if (error.message.includes('permission')) {
            console.error(chalk.yellow('💡 Tip: Run the command with administrator privileges if necessary.'));
        }
    }
    static handleUnknownError(error) {
        console.error(chalk.red('❌ Unexpected error:'), error);
        console.error(chalk.yellow('💡 Tip: Report this error in the GitHub repository.'));
    }
    /**
     * Create a formatted error message
     */
    static formatError(message, code) {
        return code ? `[${code}] ${message}` : message;
    }
}
/**
 * Utility function to wrap async operations with error handling
 */
export function withErrorHandling(operation, errorContext) {
    return operation().catch((error) => {
        if (error instanceof SchemifyError) {
            throw error;
        }
        const context = errorContext ? `${errorContext}: ` : '';
        throw new SchemifyError(`${context}${error instanceof Error ? error.message : 'Unknown error'}`, 'OPERATION_ERROR');
    });
}
