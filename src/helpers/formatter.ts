import chalk from 'chalk';

export const formatStat = (
    label: string,
    count: number,
    shouldDisplay: boolean = true
): string | null => {
    if (!shouldDisplay) return null;
    return chalk.dim(`${label}:`) + ` ${chalk.bold(count)}`;
};

export const formatFileHeader = (path: string): string => `File: ${chalk.cyan.underline(path)}`;

export const formatWarning = (message: string): string =>
    chalk.bgRed.bold(`\n[WARNING] ${message}`);

export const formatSection = (title: string): string => chalk.bold.yellow(`\n--- ${title} ---\n`);
