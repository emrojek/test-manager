import { describe, test, expect } from 'vitest';
import { formatStat, formatFileHeader, formatWarning, formatSection } from './formatter.js';

describe('formatStat', () => {
    test('should return formatted string when shouldDisplay is true', () => {
        const result = formatStat('Test blocks', 5, true);

        expect(result).toContain('Test blocks:');
        expect(result).toContain('5');
    });

    test('should return null when shouldDisplay is false', () => {
        const result = formatStat('Describe blocks', 3, false);

        expect(result).toBeNull();
    });

    test('should use default shouldDisplay value of true', () => {
        const result = formatStat('Skip blocks', 2);

        expect(result).toContain('Skip blocks:');
        expect(result).toContain('2');
    });

    test('should handle zero count correctly', () => {
        const result = formatStat('Only blocks', 0);

        expect(result).toContain('0');
    });
});

describe('formatFileHeader', () => {
    test('should format file path with "File:" prefix', () => {
        const filePath = 'test.spec.ts';
        const result = formatFileHeader(filePath);

        expect(result).toContain(`File: ${filePath}`);
    });

    test('should handle nested paths correctly', () => {
        const filePath = 'tests/e2e/test.spec.ts';
        const result = formatFileHeader(filePath);

        expect(result).toContain(`File: ${filePath}`);
    });
});

describe('formatWarning', () => {
    test('should format warning message with [WARNING] prefix', () => {
        const message = 'This is a warning message';
        const result = formatWarning(message);

        expect(result).toContain(`[WARNING] ${message}`);
    });

    test('should format multi-line warning messages correctly', () => {
        const message = 'Line 1\nLine 2\nLine 3';
        const result = formatWarning(message);

        expect(result).toContain(`[WARNING] ${message}`);
    });

    test('should include newline at the start of the warning', () => {
        const message = 'Check this warning';
        const result = formatWarning(message);

        expect(result.startsWith('\n')).toBe(true);
    });
});

describe('formatSection', () => {
    test('should format section title with dashes', () => {
        const title = 'Test Section';
        const result = formatSection(title);

        expect(result).toContain(`--- ${title} ---`);
    });

    test('should include newlines at start and end', () => {
        const title = 'Another Section';
        const result = formatSection(title);

        expect(result.startsWith('\n')).toBe(true);
        expect(result.endsWith('\n')).toBe(true);
    });
});
