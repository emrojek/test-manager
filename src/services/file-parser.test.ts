import { describe, test, expect } from 'vitest';
import { parseFileContent } from './file-parser.js';

describe('parseFileContent', () => {
    test('should correctly count describe and test blocks in a simple file', () => {
        const simpleContent = `
            test.describe('My test suite', () => {
                test('my first test', () => {});
                test('my second test', () => {});
            });
        `;

        const result = parseFileContent(simpleContent);

        expect(result.describeCount).toBe(1);
        expect(result.testCount).toBe(2);
        expect(result.skipCount).toBe(0);
        expect(result.onlyCount).toBe(0);
    });

    test('should correctly count mixed test blocks including .skip and .only', () => {
        const mixedContent = `
            test.describe('My test suite', () => {
                test('my first test', () => {});
                test.skip('my skipped test', () => {});
                test.only('my only test', () => {});
            });
        `;

        const result = parseFileContent(mixedContent);

        expect(result.describeCount).toBe(1);
        expect(result.testCount).toBe(1);
        expect(result.skipCount).toBe(1);
        expect(result.onlyCount).toBe(1);
    });
});
