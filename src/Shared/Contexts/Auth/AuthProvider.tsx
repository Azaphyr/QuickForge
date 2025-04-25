import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { AuthContext } from '../../Contexts/Auth';
import { AuthState, OAuthProvider } from '../../Types/auth';
import axiosInstance from '../../Services/AxiosInstance';

interface AuthProviderComponentProps {
  children: React.ReactNode;
}

export const AuthProviderComponent: React.FC<AuthProviderComponentProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const mountedRef = useRef(true);

  const login = useCallback(async (provider: OAuthProvider) => {
    try {
      const response = await axiosInstance.get(`/auth/${provider}/login`);
      window.location.replace(response.data.url);
    } catch (err) {
      console.error('Login failed:', err);
      setState((prev: AuthState) => ({ ...prev, error: 'Failed to initiate login' }));
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await axiosInstance.post('/auth/logout');
      setState((prev: AuthState) => ({ ...prev, user: null, isAuthenticated: false, isLoading: false, error: null }));
    } catch (err) {
      console.error('Logout failed:', err);
      setState((prev: AuthState) => ({ ...prev, error: 'Failed to logout' }));
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const response = await axiosInstance.post('/auth/refresh');
      if (response?.data) {
        setState((prev: AuthState) => ({
          ...prev,
          user: response.data,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        }));
      } else {
        // Don't throw error, just set unauthenticated state
        setState((prev: AuthState) => ({
          ...prev,
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        }));
      }
    } catch (err) {
      // Only log errors in non-test environment
      if (process.env.NODE_ENV !== 'test') {
        console.error('Token refresh failed:', err);
      }

      setState((prev: AuthState) => ({
        ...prev,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      }));
      throw err;
    }
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const response = await axiosInstance.post('/auth/refresh');
      if (!mountedRef.current) return;

      if (response?.data) {
        setState((prev: AuthState) => ({
          ...prev,
          user: response.data,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        }));
      } else {
        // Don't throw error, just set unauthenticated state
        setState((prev: AuthState) => ({
          ...prev,
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        }));
      }
    } catch (err) {
      if (!mountedRef.current) return;

      // Only log errors in non-test environment
      if (process.env.NODE_ENV !== 'test') {
        console.error('Auth check failed:', err);
      }

      setState((prev: AuthState) => ({
        ...prev,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      }));
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
    };

    initAuth();

    return () => {
      mountedRef.current = false;
    };
  }, [checkAuth]);

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
      refreshToken,
    }),
    [state, login, logout, refreshToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 