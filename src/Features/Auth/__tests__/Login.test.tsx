// Mock axios before any imports
jest.mock('../../../Shared/Services/AxiosInstance', () => ({
  get: jest.fn(),
  post: jest.fn()
}));

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProviderComponent } from '../../../Shared/Contexts/Auth/AuthProvider';
import { Login } from '../Login';
import axiosInstance from '../../../Shared/Services/AxiosInstance';

// Configure testing environment for concurrent React
declare global {
  interface Window {
    IS_REACT_ACT_ENVIRONMENT: boolean;
  }
}
window.IS_REACT_ACT_ENVIRONMENT = true;

// Get the mock functions after the import
const mockGet = jest.mocked(axiosInstance.get);

describe('Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: { href: '', replace: jest.fn() },
      writable: true
    });
  });

  it('renders login buttons', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProviderComponent>
            <Login />
          </AuthProviderComponent>
        </BrowserRouter>
      );
    });

    expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
    expect(screen.getByText('Sign in with Microsoft')).toBeInTheDocument();
    expect(screen.getByText('Sign in with Discord')).toBeInTheDocument();
  });

  it('should handle login for Google provider', async () => {
    mockGet.mockResolvedValueOnce({ data: { url: 'http://localhost:3000/auth/google' } });

    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProviderComponent>
            <Login />
          </AuthProviderComponent>
        </BrowserRouter>
      );
    });

    const googleButton = screen.getByText('Sign in with Google');
    await act(async () => {
      fireEvent.click(googleButton);
    });

    expect(mockGet).toHaveBeenCalledWith('/auth/google/login');
    expect(window.location.replace).toHaveBeenCalledWith('http://localhost:3000/auth/google');
  });

  it('should handle login for Microsoft provider', async () => {
    mockGet.mockResolvedValueOnce({ data: { url: 'http://localhost:3000/auth/microsoft' } });

    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProviderComponent>
            <Login />
          </AuthProviderComponent>
        </BrowserRouter>
      );
    });

    const microsoftButton = screen.getByText('Sign in with Microsoft');
    await act(async () => {
      fireEvent.click(microsoftButton);
    });

    expect(mockGet).toHaveBeenCalledWith('/auth/microsoft/login');
    expect(window.location.replace).toHaveBeenCalledWith('http://localhost:3000/auth/microsoft');
  });

  it('should handle login for Discord provider', async () => {
    mockGet.mockResolvedValueOnce({ data: { url: 'http://localhost:3000/auth/discord' } });

    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProviderComponent>
            <Login />
          </AuthProviderComponent>
        </BrowserRouter>
      );
    });

    const discordButton = screen.getByText('Sign in with Discord');
    await act(async () => {
      fireEvent.click(discordButton);
    });

    expect(mockGet).toHaveBeenCalledWith('/auth/discord/login');
    expect(window.location.replace).toHaveBeenCalledWith('http://localhost:3000/auth/discord');
  });

  it('should display error message on login failure', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockGet.mockRejectedValueOnce(new Error('Login failed'));

    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProviderComponent>
            <Login />
          </AuthProviderComponent>
        </BrowserRouter>
      );
    });

    const googleButton = screen.getByText('Sign in with Google');
    await act(async () => {
      fireEvent.click(googleButton);
    });

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Login failed:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  it('should render login buttons', async () => {
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: { href: 'http://localhost:3000' },
      writable: true
    });

    await act(async () => {
      render(
        <BrowserRouter>
          <AuthProviderComponent>
            <Login />
          </AuthProviderComponent>
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
      expect(screen.getByText('Sign in with Microsoft')).toBeInTheDocument();
      expect(screen.getByText('Sign in with Discord')).toBeInTheDocument();
    });
  });
}); 