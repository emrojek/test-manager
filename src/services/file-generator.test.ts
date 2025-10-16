import { describe, expect, test, vi, beforeEach } from 'vitest';
import { createTestFile } from './file-generator.js';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

vi.mock('fs/promises', () => ({
    readFile: vi.fn(),
    writeFile: vi.fn(),
}));

vi.mock('path', () => ({
    join: vi.fn(),
}));

const mockedReadFile = readFile as unknown as ReturnType<typeof vi.fn>;
const mockedWriteFile = writeFile as unknown as ReturnType<typeof vi.fn>;
const mockedPathJoin = join as unknown as ReturnType<typeof vi.fn>;

describe('createTestFile', () => {
    const testData = {
        template:
            'test.describe("{{testSuiteName}}", () => {test("{{testCaseName}}", async () => {})})',
        targetDir: 'some/directory',
        targetName: 'new test suite',
        testSuiteName: 'New Test Suite',
        testCaseName: 'New Test Case',
        templatePath: 'path/to/template.ts',
        newFileName: 'new-test-suite.spec.ts',
        get newFilePath() {
            return `${this.targetDir}/${this.newFileName}`;
        },
        get expectedContent() {
            return this.template
                .replace('{{testSuiteName}}', this.testSuiteName)
                .replace('{{testCaseName}}', this.testCaseName);
        },
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('should create a new test file with the correct content', async () => {
        mockedReadFile.mockResolvedValue(testData.template);
        mockedPathJoin
            .mockReturnValueOnce(testData.templatePath)
            .mockReturnValueOnce(testData.newFilePath);

        await createTestFile(
            testData.targetDir,
            testData.targetName,
            testData.testSuiteName,
            testData.testCaseName
        );

        expect(mockedReadFile).toHaveBeenCalledWith(testData.templatePath, 'utf-8');
        expect(mockedWriteFile).toHaveBeenCalledWith(
            testData.newFilePath,
            testData.expectedContent
        );
    });

    test('should handle error when reading the template file', async () => {
        const errorMessage = 'File cannot be read';

        mockedReadFile.mockRejectedValue(new Error(errorMessage));

        await expect(
            createTestFile(
                testData.targetDir,
                testData.targetName,
                testData.testSuiteName,
                testData.testCaseName
            )
        ).rejects.toThrow(errorMessage);
    });

    test('should handle error when writing the new test file', async () => {
        const errorMessage = 'File cannot be saved';

        mockedReadFile.mockResolvedValue(testData.template);
        mockedPathJoin.mockReturnValueOnce(testData.templatePath);
        mockedWriteFile.mockRejectedValue(new Error(errorMessage));

        await expect(
            createTestFile(
                testData.targetDir,
                testData.targetName,
                testData.testSuiteName,
                testData.testCaseName
            )
        ).rejects.toThrow(errorMessage);

        expect(mockedReadFile).toHaveBeenCalledWith(testData.templatePath, 'utf-8');
    });
});
