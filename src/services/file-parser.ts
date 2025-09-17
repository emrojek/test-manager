export interface TestStats {
    describeCount: number;
    testCount: number;
    skipCount: number;
    onlyCount: number;
}

/**
 *
 * @param fileContent - The content of the file as a string.
 * @returns - An object containing the counts of 'describe' blocks, 'test' cases, 'skip' blocks, and 'only' blocks.
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
