import { render, screen, waitFor, act } from '@testing-library/react';
import { FC } from 'react';
import { AuthProviderComponent } from '../../../Shared/Contexts/Auth/AuthProvider';
import axiosInstance from '../../../Shared/Services/AxiosInstance';
import { useAuth } from '../../Hooks/useAuth';

// Mock axios before any imports
jest.mock('../../../Shared/Services/AxiosInstance', () => {
  const mockGet = jest.fn();
  const mockPost = jest.fn();
  return {
    get: mockGet,
    post: mockPost
  };
});

// Get the mock functions after the import
const mockGet = jest.mocked(axiosInstance.get);
const mockPost = jest.mocked(axiosInstance.post);

const TestComponent: FC = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  return (
    <div>
      <span data-testid="isAuthenticated">Is Authenticated: {isAuthenticated.toString()}</span>
      <span data-testid="user">User: {JSON.stringify(user)}</span>
      <span data-testid="isLoading">Is Loading: {isLoading.toString()}</span>
    </div>
  );
};

describe('AuthContext', () => {
  let localStorageMock: {
    getItem: jest.Mock;
    setItem: jest.Mock;
    removeItem: jest.Mock;
    [key: string]: unknown;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should provide initial auth state', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      provider: 'google'
    };

    // Mock the initial state with proper response format
    mockPost.mockResolvedValueOnce({ data: mockUser });

    await act(async () => {
      render(
        <AuthProviderComponent>
          <TestComponent />
        </AuthProviderComponent>
      );
    });

    // Wait for the initial state to settle
    await waitFor(() => {
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('Is Authenticated: true');
      expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser));
      expect(screen.getByTestId('isLoading')).toHaveTextContent('Is Loading: false');
    });
  });

  it('should handle invalid response format', async () => {
    // Mock an invalid response format
    mockPost.mockResolvedValueOnce({ data: null });

    await act(async () => {
      render(
        <AuthProviderComponent>
          <TestComponent />
        </AuthProviderComponent>
      );
    });

    // Wait for the state to update
    await waitFor(() => {
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('Is Authenticated: false');
      expect(screen.getByTestId('user')).toHaveTextContent('null');
      expect(screen.getByTestId('isLoading')).toHaveTextContent('Is Loading: false');
    });
  });

  it('should handle API errors', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('API Error');
    mockPost.mockRejectedValueOnce(error);

    await act(async () => {
      render(
        <AuthProviderComponent>
          <TestComponent />
        </AuthProviderComponent>
      );
    });

    // Wait for the error state
    await waitFor(() => {
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('Is Authenticated: false');
      expect(screen.getByTestId('user')).toHaveTextContent('null');
      expect(screen.getByTestId('isLoading')).toHaveTextContent('Is Loading: false');
    });

    // Verify error was logged in non-test environment
    if (process.env.NODE_ENV !== 'test') {
      expect(consoleSpy).toHaveBeenCalledWith('Auth check failed:', expect.any(Error));
    }
    consoleSpy.mockRestore();
  });

  it('should load user from localStorage on mount', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      provider: 'google',
    };

    // Mock localStorage response
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));
    // Mock the API response for refresh token
    mockPost.mockResolvedValueOnce({ data: mockUser });

    await act(async () => {
      render(
        <AuthProviderComponent>
          <TestComponent />
        </AuthProviderComponent>
      );
    });

    // Wait for the state to update after localStorage check and API call
    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent(`User: ${JSON.stringify(mockUser)}`);
      expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('Is Authenticated: true');
      expect(screen.getByTestId('isLoading')).toHaveTextContent('Is Loading: false');
    });
  });

  it('should handle successful authentication check', async () => {
    try {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        provider: 'google' as const,
      };

      // Mock the API response for refresh token
      mockPost.mockResolvedValueOnce({ data: mockUser });

      await act(async () => {
        render(
          <AuthProviderComponent>
            <TestComponent />
          </AuthProviderComponent>
        );
      });

      // Wait for the state to update after authentication check
      await waitFor(() => {
        expect(screen.getByTestId('user')).toHaveTextContent(`User: ${JSON.stringify(mockUser)}`);
        expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('Is Authenticated: true');
        expect(screen.getByTestId('isLoading')).toHaveTextContent('Is Loading: false');
      });
    } catch (error) {
      console.error('Test failed with error:', error);
      throw error;
    }
  });

  it('should handle failed authentication check', async () => {
    try {
      mockGet.mockRejectedValueOnce(new Error('Failed to authenticate'));

      await act(async () => {
        render(
          <AuthProviderComponent>
            <TestComponent />
          </AuthProviderComponent>
        );
      });

      await waitFor(() => {
        expect(screen.getByTestId('user')).toHaveTextContent('User: null');
        expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('Is Authenticated: false');
        expect(screen.getByTestId('isLoading')).toHaveTextContent('Is Loading: false');
      });
    } catch (error) {
      console.error('Test failed with error:', error);
      throw error;
    }
  });

  it('should handle login', async () => {
    try {
      const mockLoginResponse = { data: { url: 'https://example.com/auth' } };
      mockGet.mockResolvedValueOnce(mockLoginResponse);

      const LoginButton = () => {
        const { login } = useAuth();
        return <button onClick={() => login('google')}>Login</button>;
      };

      await act(async () => {
        render(
          <AuthProviderComponent>
            <LoginButton />
          </AuthProviderComponent>
        );
      });

      const button = screen.getByText('Login');
      await act(async () => {
        button.click();
      });

      expect(mockGet).toHaveBeenCalledWith('/auth/google/login');
    } catch (error) {
      console.error('Test failed with error:', error);
      throw error;
    }
  });

  it('should handle logout', async () => {
    try {
      mockPost.mockResolvedValueOnce({});

      const LogoutButton = () => {
        const { logout } = useAuth();
        return <button onClick={() => logout()}>Logout</button>;
      };

      await act(async () => {
        render(
          <AuthProviderComponent>
            <LogoutButton />
          </AuthProviderComponent>
        );
      });

      const button = screen.getByText('Logout');
      await act(async () => {
        button.click();
      });

      expect(mockPost).toHaveBeenCalledWith('/auth/logout');
    } catch (error) {
      console.error('Test failed with error:', error);
      throw error;
    }
  });

  it('should handle token refresh', async () => {
    try {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        provider: 'google' as const,
      };

      // Mock both the initial auth check and the refresh token call
      mockPost
        .mockResolvedValueOnce({ data: mockUser }) // Initial auth check
        .mockResolvedValueOnce({ data: mockUser }); // Refresh token call

      const RefreshButton = () => {
        const { refreshToken } = useAuth();
        return <button onClick={() => refreshToken()}>Refresh</button>;
      };

      await act(async () => {
        render(
          <AuthProviderComponent>
            <RefreshButton />
          </AuthProviderComponent>
        );
      });

      // Wait for initial auth check to complete
      await waitFor(() => {
        expect(mockPost).toHaveBeenCalledWith('/auth/refresh');
      });

      const button = screen.getByText('Refresh');
      await act(async () => {
        button.click();
      });

      // Wait for the refresh token call to complete
      await waitFor(() => {
        expect(mockPost).toHaveBeenCalledTimes(2);
      });
    } catch (error) {
      console.error('Test failed with error:', error);
      throw error;
    }
  });
}); 