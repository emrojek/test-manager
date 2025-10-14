import { describe, test, expect, vi, beforeEach } from 'vitest';
import { findTestFiles } from './file-scanner.js';
import { glob } from 'glob';

vi.mock('glob', () => ({
    glob: vi.fn(),
}));

const mockedGlob = glob as unknown as ReturnType<typeof vi.fn>;

describe('findTestFiles', () => {
    beforeEach(() => {
        mockedGlob.mockClear();
    });

    const directory = 'some/directory';

    test('should return an array of found file paths', async () => {
        const mockFilePaths = ['/path/to/test1.spec.ts', '/path/to/test2.spec.ts'];

        mockedGlob.mockResolvedValue(mockFilePaths);

        const foundFiles = await findTestFiles(directory);

        expect(foundFiles).toEqual(mockFilePaths);
        expect(glob).toHaveBeenCalledWith(`${directory}/**/*.spec.ts`, { absolute: true });
    });

    test('should return an empty array if no files are found', async () => {
        mockedGlob.mockResolvedValue([]);

        const foundFiles = await findTestFiles(directory);

        expect(foundFiles).toEqual([]);
    });

    test('should throw an error if glob fails', async () => {
        const errorMessage = 'Something went wrong';

        mockedGlob.mockRejectedValue(new Error(errorMessage));

        await expect(findTestFiles(directory)).rejects.toThrow(errorMessage);
    });
});
