/**
 * Number utility functions for common mathematical operations and number formatting
 */

/**
 * Rounds a number to a specified number of decimal places
 * @param num The number to round
 * @param decimals Number of decimal places (default: 0)
 * @returns Rounded number
 */
export function round(num: number, decimals: number = 0): number {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

/**
 * Rounds a number down to a specified number of decimal places
 * @param num The number to round down
 * @param decimals Number of decimal places (default: 0)
 * @returns Rounded down number
 */
export function floor(num: number, decimals: number = 0): number {
  const factor = Math.pow(10, decimals);
  return Math.floor(num * factor) / factor;
}

/**
 * Rounds a number up to a specified number of decimal places
 * @param num The number to round up
 * @param decimals Number of decimal places (default: 0)
 * @returns Rounded up number
 */
export function ceil(num: number, decimals: number = 0): number {
  const factor = Math.pow(10, decimals);
  return Math.ceil(num * factor) / factor;
}

/**
 * Generates a random number between min and max (inclusive)
 * @param min Minimum value (inclusive)
 * @param max Maximum value (inclusive)
 * @returns Random number between min and max
 */
export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random floating point number between min and max
 * @param min Minimum value (inclusive)
 * @param max Maximum value (inclusive)
 * @param decimals Number of decimal places (default: 2)
 * @returns Random floating point number between min and max
 */
export function randomFloat(min: number, max: number, decimals: number = 2): number {
  const num = Math.random() * (max - min) + min;
  return round(num, decimals);
}

/**
 * Checks if a number is within a specified range
 * @param num The number to check
 * @param min Minimum value (inclusive)
 * @param max Maximum value (inclusive)
 * @returns True if the number is within the range, false otherwise
 */
export function isInRange(num: number, min: number, max: number): boolean {
  return num >= min && num <= max;
}

/**
 * Clamps a number between a minimum and maximum value
 * @param num The number to clamp
 * @param min Minimum value
 * @param max Maximum value
 * @returns The clamped number
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

/**
 * Maps a number from one range to another
 * @param num The number to map
 * @param inMin Input range minimum
 * @param inMax Input range maximum
 * @param outMin Output range minimum
 * @param outMax Output range maximum
 * @returns The mapped number
 */
export function mapRange(
  num: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Calculates the percentage of a number relative to a total
 * @param value The value to calculate the percentage of
 * @param total The total value
 * @param decimals Number of decimal places (default: 2)
 * @returns The percentage value
 */
export function percentage(value: number, total: number, decimals: number = 2): number {
  if (total === 0) return 0;
  return round((value / total) * 100, decimals);
}

/**
 * Checks if a number is an integer
 * @param num The number to check
 * @returns True if the number is an integer, false otherwise
 */
export function isInteger(num: number): boolean {
  return Number.isInteger(num);
}

/**
 * Checks if a number is a float
 * @param num The number to check
 * @returns True if the number is a float, false otherwise
 */
export function isFloat(num: number): boolean {
  return !isInteger(num);
}

/**
 * Formats a number with thousands separators
 * @param num The number to format
 * @param decimals Number of decimal places (default: 2)
 * @returns Formatted number string
 */
export function formatNumber(num: number, decimals: number = 2): string {
  return round(num, decimals).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
} 