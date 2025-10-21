import { TestStats } from './file-parser.js';
import {
    formatStat,
    formatFileHeader,
    formatWarning,
    formatSection,
} from '../helpers/formatter.js';

export interface ReportData {
    relativePath: string;
    stats: TestStats;
}

interface TotalStats {
    totalDescribes: number;
    totalTests: number;
    totalSkips: number;
    totalOnlys: number;
}

const calculateTotals = (reportData: ReportData[]): TotalStats =>
    reportData.reduce(
        (acc, current) => ({
            totalDescribes: acc.totalDescribes + current.stats.describeCount,
            totalTests: acc.totalTests + current.stats.testCount,
            totalSkips: acc.totalSkips + current.stats.skipCount,
            totalOnlys: acc.totalOnlys + current.stats.onlyCount,
        }),
        { totalDescribes: 0, totalTests: 0, totalSkips: 0, totalOnlys: 0 }
    );

const formatFileStats = (result: ReportData): string[] => {
    const lines = [
        formatFileHeader(result.relativePath),
        formatStat('Describe blocks (.describe)', result.stats.describeCount),
        formatStat('Test blocks (.test)', result.stats.testCount),
        formatStat('Skip blocks (.skip)', result.stats.skipCount, result.stats.skipCount > 0),
        formatStat('Only blocks (.only)', result.stats.onlyCount, result.stats.onlyCount > 0),
    ];

    return lines.filter((line): line is string => line !== null);
};

const formatSummaryStats = (reportData: ReportData[], totals: TotalStats): string[] => {
    const lines = [
        formatSection('Report Summary'),
        formatStat('Total files scanned', reportData.length),
        formatStat('Total test blocks', totals.totalTests),
        formatStat('Total describe blocks', totals.totalDescribes),
        formatStat('Total skip blocks', totals.totalSkips, totals.totalSkips > 0),
        formatStat('Total only blocks', totals.totalOnlys, totals.totalOnlys > 0),
    ];

    if (totals.totalOnlys > 0) {
        lines.push(
            formatWarning('There are tests marked with ".only". Ensure this is intentional.')
        );
    }

    return lines.filter((line): line is string => line !== null);
};

export const generateReport = (reportData: ReportData[]): void => {
    console.log(formatSection('Test Analysis Report'));

    reportData.forEach((data, index) => {
        if (index > 0) console.log();
        formatFileStats(data).forEach((line) => console.log(line));
    });

    const totalStats = calculateTotals(reportData);

    formatSummaryStats(reportData, totalStats).forEach((line) => console.log(line));
};
