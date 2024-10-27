// OwnerLogout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OwnerLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the local storage
    localStorage.removeItem('token');
    localStorage.removeItem('owner');
    localStorage.removeItem('id');
    localStorage.removeItem('userid'); 

    // Show a success message
    toast.success('You have been logged out successfully.');

    // Redirect to the login page after a brief delay
    setTimeout(() => {
      navigate('/'); // Redirect to the home or login page
    }, 2000); // 2 seconds delay
  };

  return (
    <div className="flex flex-col items-center justify-center mb-4">
      <ToastContainer />
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Logout
      </button>
    </div>
  );
};

export default OwnerLogout;
