import { createTestFile } from './services/file-generator.js';
import { parseFileContent } from './services/file-parser.js';
import { findTestFiles } from './services/file-scanner.js';
import { generateReport } from './services/reporter.js';
import { Command } from 'commander';
import fs from 'fs/promises';
import chalk from 'chalk';
import path from 'path';

const CACHE_FILE_PATH = './.cache/analysis.json';

const program = new Command();

program
    .name('test-manager')
    .description('A CLI tool to analyze and manage Playwright test suites.')
    .version('1.0.0');

program
    .command('scan')
    .description('Scan a directory for test files')
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

            console.log(
                `${chalk.green('✅ Scan complete.')} Analysis data saved to '${chalk.cyan.underline(
                    CACHE_FILE_PATH
                )}'.`
            );
        } catch (error) {
            console.error(`${chalk.red('❌ Something went wrong:')} ${error}`);
        }
    });

program
    .command('report')
    .description('Generate a report from the cached analysis data')
    .action(async () => {
        try {
            const fileContent = await fs.readFile(CACHE_FILE_PATH, 'utf-8');

            const reportData = JSON.parse(fileContent);

            generateReport(reportData);
        } catch (error) {
            console.error(`${chalk.red('❌ Something went wrong:')} ${chalk.bold(error)}`);
        }
    });

program
    .command('create')
    .description('Create a new test file from a template')
    .argument('<targetName>', 'Name of the new test file (without extension)')
    .argument('<testSuiteName>', 'Name of the test suite (test.describe())')
    .argument('<testCaseName>', 'Name of the test case (test())')
    .option(
        '-d, --directory <path>',
        'Directory where the new test file will be created',
        '../gad-playwright/tests'
    )
    .action(async (targetName, testSuiteName, testCaseName, options) => {
        const targetDir = options.directory;

        try {
            const newTestFile = await createTestFile(
                targetDir,
                targetName,
                testSuiteName,
                testCaseName
            );

            console.log(
                `${chalk.green(
                    `✅ Test file '${chalk.bold.underline(targetName)}' successfully created in:`
                )} ${chalk.cyan.underline(newTestFile)}`
            );
        } catch (error) {
            console.error(`${chalk.red('❌ Something went wrong:')} ${chalk.bold(error)}`);
        }
    });

program.parse(process.argv);
