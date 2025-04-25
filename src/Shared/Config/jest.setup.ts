import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Define the type for the global object
interface CustomGlobal {
  TextEncoder: typeof TextEncoder;
  TextDecoder: typeof TextDecoder;
}

// Add TextEncoder polyfill
(global as unknown as CustomGlobal).TextEncoder = TextEncoder;
(global as unknown as CustomGlobal).TextDecoder = TextDecoder;

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    href: '',
    replace: jest.fn(),
  },
  writable: true,
}); 