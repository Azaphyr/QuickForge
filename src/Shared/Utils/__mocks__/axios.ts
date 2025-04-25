const mockRequestUse = jest.fn();
const mockResponseUse = jest.fn();
const mockGet = jest.fn().mockImplementation(() => Promise.resolve({ data: {} }));
const mockPost = jest.fn().mockImplementation(() => Promise.resolve({ data: {} }));

const mockAxiosInstance = {
  interceptors: {
    request: { 
      use: mockRequestUse,
      eject: jest.fn(),
      clear: jest.fn()
    },
    response: { 
      use: mockResponseUse,
      eject: jest.fn(),
      clear: jest.fn()
    }
  },
  get: mockGet,
  post: mockPost
};

export { mockRequestUse, mockResponseUse, mockGet, mockPost, mockAxiosInstance };

export default {
  create: () => mockAxiosInstance
}; 