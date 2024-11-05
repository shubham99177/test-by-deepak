// Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice'; // Import the logout action
import { toast } from 'react-toastify';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
  
    localStorage.removeItem('token'); 
    localStorage.removeItem('userid'); 
    localStorage.removeItem('userInfo');
    // Dispatch logout action
    dispatch(logout()); 
    // Notify user and navigate
    toast.success('Logged out successfully'); 
    navigate('/'); // Redirect to the home page or login page
  };

  return (
    <button
      className="py-2 px-4 bg-red-500 shadow-lg shadow-red-500/50 hover:bg-red-600 text-white font-semibold rounded-md cursor-pointer"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
