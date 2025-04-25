// Mock axios before any imports
jest.mock('../../Services/AxiosInstance', () => ({
  get: jest.fn(),
  post: jest.fn()
}));

import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute';
import { AuthProviderComponent } from '../../Contexts/Auth/AuthProvider';
import axiosInstance from '../../Services/AxiosInstance';

// Get the mock function after the import
const mockPost = jest.mocked(axiosInstance.post);

// Component to test location state
const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{JSON.stringify(location)}</div>;
};

describe('ProtectedRoute', () => {
  let localStorageMock: {
    getItem: jest.Mock;
    setItem: jest.Mock;
    removeItem: jest.Mock;
    [key: string]: unknown;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock localStorage
    localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true
    });
  });

  it('should show loading state while checking authentication', () => {
    try {
      mockPost.mockImplementationOnce(() => new Promise(() => {})); // Never resolves

      render(
        <MemoryRouter>
          <AuthProviderComponent>
            <ProtectedRoute>
              <div>Protected Content</div>
            </ProtectedRoute>
          </AuthProviderComponent>
        </MemoryRouter>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    } catch (error) {
      console.error('Test failed with error:', error);
      throw error;
    }
  });

  it('should redirect to login when not authenticated and preserve location state', async () => {
    try {
      // Mock the refresh token to fail
      mockPost.mockImplementationOnce(() => Promise.reject(new Error('Not authenticated')));

      await act(async () => {
        render(
          <MemoryRouter initialEntries={['/protected']}>
            <AuthProviderComponent>
              <Routes>
                <Route
                  path="/protected"
                  element={
                    <ProtectedRoute>
                      <div>Protected Content</div>
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<LocationDisplay />} />
              </Routes>
            </AuthProviderComponent>
          </MemoryRouter>
        );
      });

      // Wait for the redirect to happen
      await waitFor(() => {
        const locationDisplay = screen.getByTestId('location-display');
        const location = JSON.parse(locationDisplay.textContent || '{}');
        expect(location.pathname).toBe('/login');
        expect(location.state?.from?.pathname).toBe('/protected');
      }, { timeout: 1000 });

      // Verify the mock was only called once
      expect(mockPost).toHaveBeenCalledTimes(1);
    } catch (error) {
      console.error('Test failed with error:', error);
      throw error;
    }
  });

  it('should render protected content when authenticated', async () => {
    try {
      // Mock successful authentication with proper response structure
      mockPost.mockResolvedValueOnce({
        data: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User',
          provider: 'google'
        }
      });

      await act(async () => {
        render(
          <MemoryRouter>
            <AuthProviderComponent>
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            </AuthProviderComponent>
          </MemoryRouter>
        );
      });

      // Wait for the content to appear
      await waitFor(() => {
        expect(screen.getByText('Protected Content')).toBeInTheDocument();
      }, { timeout: 1000 });
    } catch (error) {
      console.error('Test failed with error:', error);
      throw error;
    }
  });

  it('should render children when authenticated', async () => {
    // Mock successful authentication
    mockPost.mockResolvedValueOnce({
      data: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User'
      }
    });

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/protected']}>
          <AuthProviderComponent>
            <Routes>
              <Route
                path="/protected"
                element={
                  <ProtectedRoute>
                    <div>Protected Content</div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthProviderComponent>
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });
}); 