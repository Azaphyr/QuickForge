require('@testing-library/jest-dom');
const { TextEncoder, TextDecoder } = require('util');

// Add TextEncoder/TextDecoder polyfills
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Add localStorage mock
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Add window.location mock
const locationMock = {
  href: '',
  replace: jest.fn(),
};
Object.defineProperty(window, 'location', {
  value: locationMock,
  writable: true,
}); 