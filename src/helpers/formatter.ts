import chalk from 'chalk';

/**
 * Formats a statistic for display in the report.
 * @param label - The label for the statistic (e.g., "Test blocks").
 * @param count - The count of the statistic.
 * @param shouldDisplay - Whether to display the statistic.
 * @returns The formatted statistic string or null if not displayed.
 * @example
 * const stat = formatStat('Test blocks', 10, true);
 * console.log(stat); // Outputs: Test blocks: 10 (with dim label and bold count)
 */

export const formatStat = (
    label: string,
    count: number,
    shouldDisplay: boolean = true
): string | null => {
    if (!shouldDisplay) return null;
    return chalk.dim(`${label}:`) + ` ${chalk.bold(count)}`;
};

/**
 * Formats a file's header for display in the report.
 * @param path - The file path to format.
 * @returns The formatted file header string.
 * @example
 * const header = formatFileHeader('tests/example.test.ts');
 * console.log(header); // Outputs: File: tests/example.test.ts (with cyan underline)
 */

export const formatFileHeader = (path: string): string => `File: ${chalk.cyan.underline(path)}`;

/**
 * Formats a warning message with red background.
 * @param message - The warning message to format.
 * @returns The formatted warning message string.
 * @example
 * const warning = formatWarning('This is a warning');
 * console.log(warning); // Outputs: [WARNING] This is a warning (with red background and bold text)
 */

export const formatWarning = (message: string): string =>
    chalk.bgRed.bold(`\n[WARNING] ${message}`);

/**
 * Formats a section header for display in the report.
 * @param title - The title of the section.
 * @returns The formatted section header string.
 * @example
 * const section = formatSection('Test Results');
 * console.log(section); // Outputs: --- Test Results --- (with bold yellow text)
 */

export const formatSection = (title: string): string => chalk.bold.yellow(`\n--- ${title} ---\n`);
