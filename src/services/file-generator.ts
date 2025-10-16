import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

/**
 * Creates a new test file based on a template.
 * @param targetDir - The directory where the new test file will be created.
 * @param targetName - The name of the new test file (without extension, e.g., 'login form').
 * @param testSuiteName - The name for the test.describe() block.
 * @param testCaseName - The name for the test() block.
 * @returns A promise that resolves to the path of the newly created test file.
 */

export const createTestFile = async (
    targetDir: string,
    targetName: string,
    testSuiteName: string,
    testCaseName: string
): Promise<string> => {
    const templatePath = join(process.cwd(), 'src', 'templates', 'test.template.ts');
    const templateContent = await readFile(templatePath, 'utf-8');

    const newFileName = `${targetName.replace(/\s+/g, '-').toLowerCase()}.spec.ts`;

    const newContent = templateContent
        .replace('{{testSuiteName}}', testSuiteName)
        .replace('{{testCaseName}}', testCaseName);

    const newFilePath = join(targetDir, newFileName);

    await writeFile(newFilePath, newContent);

    return newFilePath;
};
