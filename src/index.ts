import { parseFileContent } from './services/file-parser.js';
import { findTestFiles } from './services/file-scanner.js';
import fs from 'fs/promises';
import path from 'path';

const main = async () => {
    console.log('--- Test Manager CLI ---');

    // Temporary hardcoded path for demonstration purposes
    const directory = path.join(process.cwd(), '../gad-playwright/tests');

    try {
        const testFiles = await findTestFiles(directory);
        console.log(`\nFound ${testFiles.length} test files in '${directory}' directory:`);
        testFiles.forEach((file) => console.log(`- ${path.relative(directory, file)}`));

        const analysisResults = [];

        for (const filePath of testFiles) {
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const stats = parseFileContent(fileContent);

            analysisResults.push({ path: filePath, stats: stats });
        }

        for (const result of analysisResults) {
            const relativePath = path.relative(directory, result.path);

            console.log(
                `\nFound ${result.stats.describeCount} describe blocks in '${relativePath}' file.`
            );
            console.log(`Found ${result.stats.testCount} test cases in '${relativePath}' file.`);
        }
    } catch (error) {
        console.error('An error occured:', error);
    }
};

main();
