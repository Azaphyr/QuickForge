import { AxiosError, InternalAxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios';
import axios from 'axios';

/**
 * Mock localStorage implementation
 */
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

/**
 * Mock window.location implementation
 */
Object.defineProperty(window, 'location', {
  value: { href: '' },
  writable: true,
});

/**
 * Mock axios implementation
 */
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  })),
}));

describe('AxiosInstance', () => {
  let requestInterceptor: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  let responseInterceptor: (error: AxiosError) => Promise<never>;
  let responseSuccessInterceptor: (response: AxiosResponse) => AxiosResponse;

  beforeEach(() => {
    jest.clearAllMocks();
    window.location.href = ''; // Reset location before each test
    
    // Set up mock implementations
    const mockInstance = (axios.create as jest.Mock)();
    const mockRequestUse = mockInstance.interceptors.request.use;
    const mockResponseUse = mockInstance.interceptors.response.use;

    // Set up request interceptor implementation
    requestInterceptor = (config: InternalAxiosRequestConfig) => {
      const token = localStorageMock.getItem('token');
      const newConfig = { ...config };
      if (token) {
        newConfig.headers = { ...newConfig.headers } as AxiosRequestHeaders;
        newConfig.headers.Authorization = `Bearer ${token}`;
      }
      return newConfig;
    };
    mockRequestUse.mockImplementation((onFulfilled: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig) => {
      return onFulfilled;
    });

    // Set up response interceptor implementation
    responseSuccessInterceptor = (response: AxiosResponse) => response;
    responseInterceptor = async (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorageMock.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    };
    mockResponseUse.mockImplementation((
      onFulfilled: (response: AxiosResponse) => AxiosResponse,
      onRejected: (error: AxiosError) => Promise<never>
    ) => {
      return { onFulfilled, onRejected };
    });
  });

  describe('Request Interceptor', () => {
    it('should add authorization token to requests when token exists', () => {
      const token = 'test-token';
      localStorageMock.getItem.mockReturnValue(token);

      const config: InternalAxiosRequestConfig = {
        headers: {} as AxiosRequestHeaders,
        method: 'get',
        url: '/test'
      };

      const modifiedConfig = requestInterceptor(config);

      expect(modifiedConfig.headers.Authorization).toBe(`Bearer ${token}`);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('token');
      expect(modifiedConfig).not.toBe(config);
    });

    it('should not add authorization token when no token exists', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const config: InternalAxiosRequestConfig = {
        headers: {} as AxiosRequestHeaders,
        method: 'get',
        url: '/test'
      };

      const modifiedConfig = requestInterceptor(config);

      expect(modifiedConfig.headers.Authorization).toBeUndefined();
      expect(localStorageMock.getItem).toHaveBeenCalledWith('token');
      expect(modifiedConfig).not.toBe(config);
    });
  });

  describe('Response Interceptor', () => {
    it('should handle successful responses', () => {
      const response: AxiosResponse = {
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
      };

      const result = responseSuccessInterceptor(response);
      expect(result).toBe(response);
    });

    it('should handle 401 unauthorized errors', async () => {
      const error: AxiosError = {
        response: {
          status: 401,
          statusText: 'Unauthorized',
          data: {},
          headers: {},
          config: {} as InternalAxiosRequestConfig
        },
        config: {} as InternalAxiosRequestConfig,
        isAxiosError: true,
        name: 'AxiosError',
        message: 'Unauthorized',
        toJSON: () => ({})
      };

      await expect(responseInterceptor(error)).rejects.toEqual(error);
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
      expect(window.location.href).toBe('/login');
    });

    it('should not handle non-401 errors', async () => {
      const error: AxiosError = {
        response: {
          status: 404,
          statusText: 'Not Found',
          data: {},
          headers: {},
          config: {} as InternalAxiosRequestConfig
        },
        config: {} as InternalAxiosRequestConfig,
        isAxiosError: true,
        name: 'AxiosError',
        message: 'Not Found',
        toJSON: () => ({})
      };

      await expect(responseInterceptor(error)).rejects.toEqual(error);
      expect(localStorageMock.removeItem).not.toHaveBeenCalled();
      expect(window.location.href).not.toBe('/login');
    });
  });
}); 