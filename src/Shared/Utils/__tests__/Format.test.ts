import {
  formatCurrency,
  formatUSD,
  formatEUR,
  formatEURfr,
  formatDate,
  truncateText,
} from '../Format';

describe('format', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2023-01-01');
      expect(formatDate(date, { locale: 'en-US' })).toBe('1/1/2023');
    });

    it('should format date with custom options', () => {
      const date = new Date('2023-01-01');
      expect(formatDate(date, { 
        locale: 'en-US',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })).toBe('January 1, 2023');
    });

    it('should handle invalid date string', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      expect(formatDate('invalid')).toBe('Invalid Date');
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should handle invalid Date object', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const invalidDate = new Date('invalid');
      expect(formatDate(invalidDate)).toBe('Invalid Date');
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1000, { currency: 'USD', locale: 'en-US' })).toBe('$1,000.00');
    });

    it('should format currency with custom options', () => {
      expect(formatCurrency(1000, {
        currency: 'EUR',
        locale: 'nl-BE'
      })).toBe('€ 1.000,00');
    });

    it('should handle zero', () => {
      expect(formatCurrency(0, { currency: 'USD', locale: 'en-US' })).toBe('$0.00');
    });

    it('should handle negative numbers', () => {
      expect(formatCurrency(-1000, { currency: 'USD', locale: 'en-US' })).toBe('-$1,000.00');
    });

    it('should throw error for NaN', () => {
      expect(() => formatCurrency(NaN)).toThrow('Invalid amount provided to formatCurrency');
    });
  });

  describe('formatUSD', () => {
    it('should format USD with default options', () => {
      expect(formatUSD(1000)).toBe('$1,000.00');
    });

    it('should format USD with custom options', () => {
      expect(formatUSD(1000, { minimumFractionDigits: 0 })).toBe('$1,000');
    });
  });

  describe('formatEUR', () => {
    it('should format EUR with default options', () => {
      expect(formatEUR(1000)).toBe('€ 1.000,00');
    });

    it('should format EUR with custom options', () => {
      expect(formatEUR(1000, { minimumFractionDigits: 0 })).toBe('€ 1.000');
    });
  });

  describe('formatEURfr', () => {
    it('should format EUR in French format', () => {
      expect(formatEURfr(1000)).toBe('1 000,00 €');
    });
  });

  describe('truncateText', () => {
    it('should truncate text to specified length', () => {
      expect(truncateText('Hello World', { maxLength: 5 })).toBe('Hello...');
    });

    it('should preserve words when truncating', () => {
      expect(truncateText('Hello World', { maxLength: 8, preserveWords: true })).toBe('Hello...');
    });

    it('should use custom ellipsis', () => {
      expect(truncateText('Hello World', { maxLength: 5, ellipsis: '...' })).toBe('Hello...');
    });

    it('should not truncate if text is shorter than max length', () => {
      expect(truncateText('Hello', { maxLength: 10 })).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(truncateText('', { maxLength: 5 })).toBe('');
    });
  });
}); 