import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '../Shared/Components/ProtectedRoute';
import Home from '../Features/Home/Home';
import Dashboard from '../Features/Dashboard/Dashboard';
import { Login } from '../Features/Auth/Login';
import { Logout } from '../Features/Auth/Logout';
import { Callback } from '../Features/Auth/Callback';

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/logout', element: <Logout /> },
  { path: '/auth/callback', element: <Callback /> },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]); 