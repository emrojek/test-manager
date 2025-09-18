import { parseFileContent } from './services/file-parser.js';
import { findTestFiles } from './services/file-scanner.js';
import { Command } from 'commander';
import fs from 'fs/promises';
import path from 'path';

const CACHE_FILE_PATH = './.cache/analysis.json';

const program = new Command();

program
    .name('test-manager')
    .description('A CLI tool to analyze and manage Playwright test suites.')
    .version('1.0.0');

program
    .command('scan')
    .description('Scan a directory for test files)')
    .argument('<directory>', 'The path to the directory containing test files')
    .action(async (directory) => {
        try {
            const testFiles = await findTestFiles(directory);
            const analysisResults = [];

            for (const filePath of testFiles) {
                const fileContent = await fs.readFile(filePath, 'utf-8');
                const stats = parseFileContent(fileContent);

                analysisResults.push({ path: filePath, stats: stats });
            }

            const dataToSave = analysisResults.map((result) => ({
                relativePath: path.relative(directory, result.path),
                stats: result.stats,
            }));

            await fs.mkdir(path.dirname(CACHE_FILE_PATH), { recursive: true });
            await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(dataToSave, null, 2));

            console.log(`✅ Scan complete. Analysis data saved to '${CACHE_FILE_PATH}'.`);
        } catch (error) {
            console.error('An error occured:', error);
        }
    });

program.parse(process.argv);
