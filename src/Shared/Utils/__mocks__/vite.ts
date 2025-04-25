// Mock environment variables
process.env.VITE_API_BASE_URL = 'http://test-api.com';

export default {
  env: {
    VITE_API_BASE_URL: 'http://test-api.com',
  },
};

describe('Vite Mock', () => {
  test('should have the correct API base URL', () => {
    expect(process.env.VITE_API_BASE_URL).toBe('http://test-api.com');
  });
}); 