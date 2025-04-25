import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProviderComponent } from '../../../Shared/Contexts/Auth/AuthProvider';
import { Logout } from '../../Auth/Logout';
import axiosInstance from '../../../Shared/Services/AxiosInstance';

// Mock axios
jest.mock('../../../Shared/Services/AxiosInstance', () => ({
  post: jest.fn()
}));

const mockPost = jest.mocked(axiosInstance.post);

describe('Logout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading state and then redirect', async () => {
    mockPost.mockResolvedValueOnce({});

    await act(async () => {
      render(
        <MemoryRouter>
          <AuthProviderComponent>
            <Routes>
              <Route path="/" element={<Logout />} />
            </Routes>
          </AuthProviderComponent>
        </MemoryRouter>
      );
    });

    expect(screen.getByText('Logging out...')).toBeInTheDocument();

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith('/auth/logout');
    });
  });
}); 