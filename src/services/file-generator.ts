import fs from 'fs/promises';
import path from 'path';

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
