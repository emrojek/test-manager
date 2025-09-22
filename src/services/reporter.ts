import { TestStats } from './file-parser.js';
import chalk from 'chalk';

interface ReportData {
    relativePath: string;
    stats: TestStats;
}

/**
 * @param reportData - An array of analysis results for each test file.
 */

export const generateReport = (reportData: ReportData[]): void => {
    console.log(chalk.bold.yellow('--- Test Analysis Report ---'));

    for (const result of reportData) {
        console.log(`\nFile: ${chalk.cyan.underline(result.relativePath)}`);
        console.log(
            chalk.dim(`   Describe blocks (.describe):`) +
                ` ${chalk.bold(result.stats.describeCount)}`
        );
        console.log(
            chalk.dim(`   Test blocks (.test):`) + ` ${chalk.bold(result.stats.testCount)}`
        );

        if (result.stats.skipCount > 0) {
            console.log(
                chalk.dim(`   Skip blocks (.skip):`) + ` ${chalk.bold(result.stats.skipCount)}`
            );
        }

        if (result.stats.onlyCount > 0) {
            console.log(
                chalk.dim(`   Only blocks (.only):`) + ` ${chalk.bold(result.stats.onlyCount)}`
            );
        }
    }

    const totalStats = reportData.reduce(
        (acc, current) => {
            acc.totalDescribes += current.stats.describeCount;
            acc.totalTests += current.stats.testCount;
            acc.totalSkips += current.stats.skipCount;
            acc.totalOnlys += current.stats.onlyCount;
            return acc;
        },
        { totalDescribes: 0, totalTests: 0, totalSkips: 0, totalOnlys: 0 }
    );

    console.log(chalk.bold.yellow('\n--- Report Summary ---\n'));
    console.log(chalk.dim(`Total files scanned:`) + ` ${chalk.bold(reportData.length)}`);
    console.log(chalk.dim(`Total test blocks:`) + ` ${chalk.bold(totalStats.totalTests)}`);
    console.log(chalk.dim(`Total describe blocks:`) + ` ${chalk.bold(totalStats.totalDescribes)}`);

    if (totalStats.totalSkips > 0) {
        console.log(chalk.dim(`Total skip blocks:`) + ` ${chalk.bold(totalStats.totalSkips)}`);
    }

    if (totalStats.totalOnlys > 0) {
        console.log(chalk.dim(`Total only blocks:`) + ` ${chalk.bold(totalStats.totalOnlys)}`);
    }

    if (totalStats.totalOnlys > 0) {
        console.log(
            chalk.bgRed.bold(
                `\n[WARRNING] There are tests marked with ".only". Ensure this is intentional.`
            )
        );
    }
};
