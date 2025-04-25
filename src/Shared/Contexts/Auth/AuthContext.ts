import { createContext } from 'react';
import { AuthContextType } from '../../Types/auth';

const defaultContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async () => {},
  logout: async () => {},
  refreshToken: async () => {}
};

export const AuthContext = createContext<AuthContextType>(defaultContext);

export type { AuthContextType }; 