import {
  round,
  floor,
  ceil,
  random,
  randomFloat,
  isInRange,
  clamp,
  mapRange,
  percentage,
  isInteger,
  isFloat,
  formatNumber
} from '../Number';

describe('Math Utilities', () => {
  describe('Rounding Functions', () => {
    test('round should round numbers correctly', () => {
      expect(round(3.14159)).toBe(3);
      expect(round(3.14159, 2)).toBe(3.14);
      expect(round(3.14159, 4)).toBe(3.1416);
    });

    test('floor should round numbers down correctly', () => {
      expect(floor(3.14159)).toBe(3);
      expect(floor(3.14159, 2)).toBe(3.14);
      expect(floor(3.14159, 4)).toBe(3.1415);
    });

    test('ceil should round numbers up correctly', () => {
      expect(ceil(3.14159)).toBe(4);
      expect(ceil(3.14159, 2)).toBe(3.15);
      expect(ceil(3.14159, 4)).toBe(3.1416);
    });
  });

  describe('Random Number Generation', () => {
    test('random should generate numbers within range', () => {
      const min = 1;
      const max = 10;
      const results = Array.from({ length: 100 }, () => random(min, max));
      
      results.forEach(num => {
        expect(num).toBeGreaterThanOrEqual(min);
        expect(num).toBeLessThanOrEqual(max);
        expect(Number.isInteger(num)).toBe(true);
      });
    });

    test('randomFloat should generate floating point numbers within range', () => {
      const min = 1;
      const max = 10;
      const decimals = 2;
      const results = Array.from({ length: 100 }, () => randomFloat(min, max, decimals));
      
      results.forEach(num => {
        expect(num).toBeGreaterThanOrEqual(min);
        expect(num).toBeLessThanOrEqual(max);
        const decimalPart = num.toString().split('.')[1];
        if (decimalPart) {
          expect(decimalPart.length).toBeLessThanOrEqual(decimals);
        }
      });
    });
  });

  describe('Range Validation', () => {
    test('isInRange should check if numbers are within range', () => {
      expect(isInRange(5, 1, 10)).toBe(true);
      expect(isInRange(0, 1, 10)).toBe(false);
      expect(isInRange(11, 1, 10)).toBe(false);
      expect(isInRange(1, 1, 10)).toBe(true);
      expect(isInRange(10, 1, 10)).toBe(true);
    });

    test('clamp should limit numbers to range', () => {
      expect(clamp(5, 1, 10)).toBe(5);
      expect(clamp(0, 1, 10)).toBe(1);
      expect(clamp(11, 1, 10)).toBe(10);
      expect(clamp(1, 1, 10)).toBe(1);
      expect(clamp(10, 1, 10)).toBe(10);
    });

    test('mapRange should map numbers between ranges', () => {
      expect(mapRange(5, 0, 10, 0, 100)).toBe(50);
      expect(mapRange(0, 0, 10, 0, 100)).toBe(0);
      expect(mapRange(10, 0, 10, 0, 100)).toBe(100);
      expect(mapRange(2.5, 0, 10, 0, 100)).toBe(25);
    });
  });

  describe('Number Type Checks', () => {
    test('isInteger should check if numbers are integers', () => {
      expect(isInteger(5)).toBe(true);
      expect(isInteger(5.0)).toBe(true);
      expect(isInteger(5.1)).toBe(false);
      expect(isInteger(-5)).toBe(true);
      expect(isInteger(0)).toBe(true);
    });

    test('isFloat should check if numbers are floats', () => {
      expect(isFloat(5)).toBe(false);
      expect(isFloat(5.0)).toBe(false);
      expect(isFloat(5.1)).toBe(true);
      expect(isFloat(-5.1)).toBe(true);
      expect(isFloat(0.1)).toBe(true);
    });
  });

  describe('Number Formatting', () => {
    test('percentage should calculate percentages correctly', () => {
      expect(percentage(50, 100)).toBe(50);
      expect(percentage(25, 100)).toBe(25);
      expect(percentage(33.333, 100, 1)).toBe(33.3);
      expect(percentage(0, 100)).toBe(0);
      expect(percentage(100, 100)).toBe(100);
    });

    test('formatNumber should format numbers with separators', () => {
      expect(formatNumber(1000)).toBe('1,000.00');
      expect(formatNumber(1000.123, 1)).toBe('1,000.1');
      expect(formatNumber(1000000)).toBe('1,000,000.00');
      expect(formatNumber(1000.567, 0)).toBe('1,001');
    });
  });
}); 