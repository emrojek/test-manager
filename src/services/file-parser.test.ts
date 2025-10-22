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

    test('should return zero counts for an empty file', () => {
        const emptyContent = '';
        const result = parseFileContent(emptyContent);

        expect(result.describeCount).toBe(0);
        expect(result.testCount).toBe(0);
        expect(result.skipCount).toBe(0);
        expect(result.onlyCount).toBe(0);
    });

    test('should ignore blocks in comments', () => {
        const commentedContent = `
            // test('commented test', () => {});
            /* test.describe('block comment', () => {}); */
            test('real test', () => {});
        `;
        const result = parseFileContent(commentedContent);

        expect(result.testCount).toBe(1);
        expect(result.describeCount).toBe(0);
    });

    test('should ignore blocks in strings', () => {
        const stringContent = `
            const myString = "test('fake test', () => {})";
            test('real test', () => {});
        `;
        const result = parseFileContent(stringContent);

        expect(result.testCount).toBe(1);
    });

    test('should count nested blocks correctly', () => {
        const nestedContent = `
            test.describe('Outer suite', () => {
                test.describe('Inner suite', () => {
                    test('inner test', () => {});
                });
                test('outer test', () => {});
            });
        `;
        const result = parseFileContent(nestedContent);

        expect(result.describeCount).toBe(2);
        expect(result.testCount).toBe(2);
    });
});
