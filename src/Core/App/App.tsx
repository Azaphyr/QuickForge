import { Outlet, Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              <Link to="/">RailSync</Link>
            </h1>
            <nav className="space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link to="/auth" className="text-gray-600 hover:text-gray-900">Sign In</Link>
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
            </nav>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default App
