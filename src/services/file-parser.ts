export interface TestStats {
    describeCount: number;
    testCount: number;
    skipCount: number;
    onlyCount: number;
}

/**
 * Parses the content of a test file to extract statistics about test blocks.
 * @param fileContent - The content of the test file as a string.
 * @returns An object containing the counts of 'describe' blocks, 'test' cases, 'skip' blocks, and 'only' blocks.
 * @example
 * const fileContent = `
 * test.describe('My Test Suite', () => {
 *   test('should do something', () => {
 *     // Test implementation
 *   });
 * });
 * `;
 * const stats = parseFileContent(fileContent);
 * console.log(stats);
 * // Outputs: { describeCount: 1, testCount: 1, skipCount: 0, onlyCount: 0 }
 */

export const parseFileContent = (fileContent: string): TestStats => {
    let describeCount = 0;
    let testCount = 0;
    let skipCount = 0;
    let onlyCount = 0;

    const lines = fileContent.split('\n');

    for (const line of lines) {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith('test.describe(')) {
            describeCount++;
        } else if (trimmedLine.startsWith('test(')) {
            testCount++;
        } else if (trimmedLine.startsWith('test.skip(')) {
            skipCount++;
        } else if (trimmedLine.startsWith('test.only(')) {
            onlyCount++;
        }
    }

    return { describeCount, testCount, skipCount, onlyCount };
};
