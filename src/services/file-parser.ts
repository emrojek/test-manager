/**
 *
 * @param fileContent - The content of the file as a string.
 * @returns - An object containing the counts of 'describe' blocks and 'test' cases.
 */

export const parseFileContent = (fileContent: string) => {
    let describeCount = 0;
    let testCount = 0;
    const lines = fileContent.split('\n');

    for (const line of lines) {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith('test.describe(')) {
            describeCount++;
        } else if (trimmedLine.startsWith('test(')) testCount++;
    }

    return { describeCount, testCount };
};
