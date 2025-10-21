import { glob } from 'glob';

/**
 * Scans the specified directory recursively to find all test files with a `.spec.ts` extension.
 * @param directory - The directory to scan for test files.
 * @returns A promise that resolves to an array of file paths matching the pattern.
 * @example
 * const testFiles = await findTestFiles('tests');
 */

export const findTestFiles = async (directory: string): Promise<string[]> => {
    const pattern = `${directory}/**/*.spec.ts`;
    const files = await glob(pattern, { absolute: true });

    return files;
};
