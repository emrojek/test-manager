import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateReport, ReportData } from './reporter.js';

describe('generateReport', () => {
    let consoleLogSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleLogSpy.mockRestore();
    });

    test('should generate a full report when all stats are greater than zero', () => {
        const mockReportData: ReportData[] = [
            {
                relativePath: 'register.spec.ts',
                stats: {
                    testCount: 10,
                    describeCount: 2,
                    skipCount: 0,
                    onlyCount: 1,
                },
            },
            {
                relativePath: 'login.spec.ts',
                stats: {
                    testCount: 5,
                    describeCount: 1,
                    skipCount: 2,
                    onlyCount: 0,
                },
            },
        ];

        generateReport(mockReportData);

        const loggedMessages = consoleLogSpy.mock.calls.flat();

        const expectedReport = [
            expect.stringContaining('--- Test Analysis Report ---'),
            expect.stringContaining('File: register.spec.ts'),
            expect.stringContaining('Describe blocks (.describe): 2'),
            expect.stringContaining('Test blocks (.test): 10'),
            expect.stringContaining('Only blocks (.only): 1'),
            expect.stringContaining('File: login.spec.ts'),
            expect.stringContaining('Describe blocks (.describe): 1'),
            expect.stringContaining('Test blocks (.test): 5'),
            expect.stringContaining('Skip blocks (.skip): 2'),
            expect.stringContaining('--- Report Summary ---'),
            expect.stringContaining('Total files scanned: 2'),
            expect.stringContaining('Total test blocks: 15'),
            expect.stringContaining('Total describe blocks: 3'),
            expect.stringContaining('Total skip blocks: 2'),
            expect.stringContaining('Total only blocks: 1'),
            expect.stringContaining(
                '[WARRNING] There are tests marked with ".only". Ensure this is intentional.'
            ),
        ];

        expect(loggedMessages).toEqual(expectedReport);
    });

    test('should hide zero-value stats and the warning if not applicable', () => {
        const mockReportData: ReportData[] = [
            {
                relativePath: 'without-only.spec.ts',
                stats: {
                    testCount: 5,
                    describeCount: 1,
                    skipCount: 1,
                    onlyCount: 0,
                },
            },
            {
                relativePath: 'zero-stats.spec.ts',
                stats: {
                    testCount: 2,
                    describeCount: 1,
                    skipCount: 0,
                    onlyCount: 0,
                },
            },
        ];

        generateReport(mockReportData);

        const loggedMessages = consoleLogSpy.mock.calls.flat();

        const expectedReport = [
            expect.stringContaining('--- Test Analysis Report ---'),
            expect.stringContaining('File: without-only.spec.ts'),
            expect.stringContaining('Describe blocks (.describe): 1'),
            expect.stringContaining('Test blocks (.test): 5'),
            expect.stringContaining('Skip blocks (.skip): 1'),
            expect.stringContaining('File: zero-stats.spec.ts'),
            expect.stringContaining('Describe blocks (.describe): 1'),
            expect.stringContaining('Test blocks (.test): 2'),
            expect.stringContaining('--- Report Summary ---'),
            expect.stringContaining('Total files scanned: 2'),
            expect.stringContaining('Total test blocks: 7'),
            expect.stringContaining('Total describe blocks: 2'),
            expect.stringContaining('Total skip blocks: 1'),
        ];

        expect(loggedMessages).toEqual(expectedReport);
    });
});
