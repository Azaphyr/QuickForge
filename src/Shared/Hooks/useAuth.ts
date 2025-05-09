import { useContext } from 'react';
import { AuthContext } from '../Contexts/Auth';
import { AuthContextType } from '../Types/auth';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 