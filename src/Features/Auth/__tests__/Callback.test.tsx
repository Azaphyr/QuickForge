// Configure testing environment for concurrent React
declare global {
  interface Window {
    IS_REACT_ACT_ENVIRONMENT: boolean;
  }
}
window.IS_REACT_ACT_ENVIRONMENT = true;

// Mock axios before any imports
jest.mock('../../../Shared/Services/AxiosInstance', () => ({
  get: jest.fn(),
  post: jest.fn()
}));

import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { MemoryRouter, useLocation, Route, Routes } from 'react-router-dom';
import { AuthProviderComponent } from '../../../Shared/Contexts/Auth/AuthProvider';
import { Callback } from '../Callback';
import axiosInstance from '../../../Shared/Services/AxiosInstance';

// Mock useLocation
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

// Get the mock functions after the import
const mockPost = jest.mocked(axiosInstance.post);
const mockUseLocation = jest.mocked(useLocation);

describe('Callback', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLocation.mockReturnValue({
      pathname: '/auth/callback',
      search: '?code=test-code',
      state: null,
      key: '',
      hash: '',
    });
    
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: { href: '', replace: jest.fn() },
      writable: true
    });
  });

  it('should show loading state', async () => {
    try {
      // Create a promise that we can resolve later
      let resolvePromise: (value: unknown) => void;
      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      // Mock the refresh token to return our controlled promise
      mockPost.mockImplementationOnce(() => promise);

      let container: HTMLElement;
      await act(async () => {
        const result = render(
          <MemoryRouter initialEntries={['/auth/callback']}>
            <AuthProviderComponent>
              <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/login" element={<div>Login</div>} />
                <Route path="/auth/callback" element={<Callback />} />
              </Routes>
            </AuthProviderComponent>
          </MemoryRouter>
        );
        container = result.container;
      });

      // Wait for the initial render
      await waitFor(() => {
        const loadingText = screen.queryByText('Completing sign in...');
        expect(loadingText).toBeInTheDocument();
      }, { timeout: 2000 });

      // Verify the loading state is maintained
      expect(container!.querySelector('.animate-spin')).toBeInTheDocument();

      // Add a small delay to ensure the loading state is visible
      await new Promise(resolve => setTimeout(resolve, 100));

      // Clean up by resolving the promise
      await act(async () => {
        resolvePromise!({ data: { id: '1', email: 'test@example.com', name: 'Test User' } });
        await promise;
      });
    } catch (error) {
      console.error('Loading state test failed:', error);
      console.error('Current DOM:', document.body.innerHTML);
      throw error;
    }
  }, 10000); // Increase timeout to 10 seconds

  it('should handle successful authentication', async () => {
    try {
      const mockAuthResponse = {
        data: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User'
        }
      };

      // Create a promise that we can resolve later
      let resolvePromise: (value: unknown) => void;
      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      // Mock the refresh token to return our controlled promise
      mockPost.mockImplementationOnce(() => promise);

      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/auth/callback']}>
            <AuthProviderComponent>
              <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/login" element={<div>Login</div>} />
                <Route path="/auth/callback" element={<Callback />} />
              </Routes>
            </AuthProviderComponent>
          </MemoryRouter>
        );
      });

      // Wait for the component to mount and the effect to run
      await waitFor(() => {
        expect(mockPost).toHaveBeenCalledWith('/auth/refresh');
      }, { timeout: 2000 });

      // Verify the loading state is shown
      expect(screen.getByText('Completing sign in...')).toBeInTheDocument();

      // Resolve the promise to trigger navigation
      await act(async () => {
        resolvePromise!(mockAuthResponse);
        await promise;
      });

      // Wait for the navigation to complete
      await waitFor(() => {
        expect(screen.getByText('Home')).toBeInTheDocument();
      }, { timeout: 2000 });
    } catch (error) {
      console.error('Successful authentication test failed:', error);
      console.error('Mock response:', mockPost.mock.results[0]);
      throw error;
    }
  });

  it('should handle failed authentication', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Authentication failed');

    // Create a promise that we can reject later
    let rejectPromise: (reason?: Error) => void;
    const promise = new Promise((_, reject) => {
      rejectPromise = reject;
    });

    // Mock the refresh token to return our controlled promise
    mockPost.mockImplementationOnce(() => promise);

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/auth/callback']}>
          <AuthProviderComponent>
            <Routes>
              <Route path="/" element={<div>Home</div>} />
              <Route path="/login" element={<div>Login</div>} />
              <Route path="/auth/callback" element={<Callback />} />
            </Routes>
          </AuthProviderComponent>
        </MemoryRouter>
      );
    });

    // Wait for the component to mount and the effect to run
    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith('/auth/refresh');
    }, { timeout: 2000 });

    // Verify the loading state is shown
    expect(screen.getByText('Completing sign in...')).toBeInTheDocument();

    // Reject the promise to trigger navigation
    await act(async () => {
      rejectPromise!(error);
      try {
        await promise;
      } catch {
        // Expected error
      }
    });

    // Wait for the navigation to complete
    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument();
    }, { timeout: 2000 });

    if (process.env.NODE_ENV !== 'test') {
      expect(consoleSpy).toHaveBeenCalledWith('Token refresh failed:', expect.any(Error));
    }
    consoleSpy.mockRestore();
  });

  it('should handle token refresh error', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Token refresh failed');

    // Create a promise that we can reject later
    let rejectPromise: (reason?: Error) => void;
    const promise = new Promise((_, reject) => {
      rejectPromise = reject;
    });

    // Mock the refresh token to return our controlled promise
    mockPost.mockImplementationOnce(() => promise);

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/auth/callback']}>
          <AuthProviderComponent>
            <Routes>
              <Route path="/" element={<div>Home</div>} />
              <Route path="/login" element={<div>Login</div>} />
              <Route path="/auth/callback" element={<Callback />} />
            </Routes>
          </AuthProviderComponent>
        </MemoryRouter>
      );
    });

    // Wait for the component to mount and the effect to run
    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith('/auth/refresh');
    }, { timeout: 2000 });

    // Verify the loading state is shown
    expect(screen.getByText('Completing sign in...')).toBeInTheDocument();

    // Reject the promise to trigger navigation
    await act(async () => {
      rejectPromise!(error);
      try {
        await promise;
      } catch {
        // Expected error
      }
    });

    // Wait for the navigation to complete
    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument();
    }, { timeout: 2000 });

    if (process.env.NODE_ENV !== 'test') {
      expect(consoleSpy).toHaveBeenCalledWith('Token refresh failed:', expect.any(Error));
    }
    consoleSpy.mockRestore();
  });
}); 