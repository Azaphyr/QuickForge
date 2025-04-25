import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Shared/Hooks/useAuth';

export const Callback: React.FC = () => {
  const navigate = useNavigate();
  const { refreshToken } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await refreshToken();
        navigate('/');
      } catch {
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate, refreshToken]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
}; 