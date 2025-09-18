import { TestStats } from './file-parser.js';

interface ReportData {
    relativePath: string;
    stats: TestStats;
}

/**
 * @param reportData - An array of analysis results for each test file.
 */

export const generateReport = (reportData: ReportData[]): void => {
    console.log('--- Test Analysis Report ---');

    for (const result of reportData) {
        console.log(`\nFile: ${result.relativePath}`);
        console.log(`   Describe blocks (.describe): ${result.stats.describeCount}`);
        console.log(`   Test blocks (.test): ${result.stats.testCount}`);
        console.log(`   Skip blocks (.skip): ${result.stats.skipCount}`);
        console.log(`   Only blocks (.only): ${result.stats.onlyCount}`);
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

    console.log('\n--- Report Summary ---');
    console.log(`Total files scanned: ${reportData.length}`);
    console.log(`   Total describe blocks: ${totalStats.totalDescribes}`);
    console.log(`   Total test blocks: ${totalStats.totalTests}`);
    console.log(`   Total skip blocks: ${totalStats.totalSkips}`);
    console.log(`   Total only blocks: ${totalStats.totalOnlys}`);
};
