import { createBrowserRouter } from 'react-router-dom'
import App from './App/App.tsx'
import Home from '../Features/Home/Home.tsx'
import Auth from '../Features/Auth/Auth.tsx'
import Dashboard from '../Features/Dashboard/Dashboard.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'auth',
        element: <Auth />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
  // Add more routes here as needed
]) 