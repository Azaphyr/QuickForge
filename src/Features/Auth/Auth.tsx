export default function Auth() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h2>
      <div className="space-y-4">
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Sign in with Google
        </button>
        <button className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900">
          Sign in with Microsoft
        </button>
      </div>
    </div>
  )
} 