import { glob } from 'glob';

/**
 *
 * @param directory - The directory to scan for test files.
 * @returns - A promise that resolves to an array of file paths matching the pattern.
 */

export const findTestFiles = async (directory: string): Promise<string[]> => {
    const pattern = `${directory}/**/*.spec.ts`;
    const files = await glob(pattern, { absolute: true });

    return files;
};
