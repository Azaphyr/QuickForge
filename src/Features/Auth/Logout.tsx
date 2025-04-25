import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Shared/Hooks/useAuth';

export const Logout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      await logout();
      navigate('/');
    };

    handleLogout();
  }, [logout, navigate]);

  return <div>Logging out...</div>;
}; 