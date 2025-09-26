import fs from 'fs/promises';
import path from 'path';

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
    const templatePath = path.join(process.cwd(), 'src', 'templates', 'test.template.ts');
    const templateContent = await fs.readFile(templatePath, 'utf-8');

    const newFileName = `${targetName.replace(/\s+/g, '-').toLowerCase()}.spec.ts`;

    const newContent = templateContent
        .replace('{{testSuiteName}}', testSuiteName)
        .replace('{{testCaseName}}', testCaseName);

    const newFilePath = path.join(targetDir, newFileName);

    await fs.writeFile(newFilePath, newContent);

    return newFilePath;
};
