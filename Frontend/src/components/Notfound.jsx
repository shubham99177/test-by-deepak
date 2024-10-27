import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h2 className="text-5xl font-extrabold text-gray-800 mb-4">404</h2>
      <h3 className="text-2xl font-semibold text-gray-700">Page Not Found</h3>
      <p className="mt-3 text-gray-500 text-center">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="mt-6 px-4 py-2 bg-cyan-400 shadow-cyan-500/50 text-white text-lg font-semibold rounded-md hover:bg-cyan-600 transition duration-300"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default NotFound;
