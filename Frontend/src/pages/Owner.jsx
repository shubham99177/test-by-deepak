import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import LogNav from '../components/LogNav';

const Owner = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [isLogin, setIsLogin] = useState(false); // Toggle between login and owner creation forms

  // Handle input changes for both forms
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Submit handler for owner creation
  const handleCreateOwner = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/owner', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        toast.success('Owner created successfully');
        setFormData({ fullname: '', email: '', password: '' }); // Reset form after success
        navigate('/shop'); // Redirect to the shop page
      } else {
        toast.error('Error: ' + (response.data.error || 'Unknown error'));
      }
    } catch (error) {
      toast.error('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  // Submit handler for login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const { token, owner } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('owner', JSON.stringify(owner));
        localStorage.setItem('id', owner.id); // Assuming owner object has an id property
        toast.success(`Welcome, ${owner.fullname}`);
        setLoginData({ email: '', password: '' }); // Reset form after success
        navigate('/create'); // Redirect to the create page
      } else {
        toast.error('Login failed');
      }
    } catch (error) {
      toast.error('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  // Toggle between forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
    if (!isLogin) {
      // Clear the login data when switching to owner creation
      setLoginData({ email: '', password: '' });
    } else {
      // Clear the owner creation data when switching to login
      setFormData({ fullname: '', email: '', password: '' });
    }
  };

  return (

    <div className="max-w-md mx-auto p-4 shadow-2xl  rounded-lg mt-36 pt-16 mb-24">
      <LogNav />
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Create Owner'}</h1>
      <form onSubmit={isLogin ? handleLogin : handleCreateOwner} className="space-y-4 bg-white">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name:</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={isLogin ? loginData.email : formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            value={isLogin ? loginData.password : formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full  text-white py-2 px-4 rounded-md bg-cyan-400 shadow-cyan-500/50 hover:bg-cyan-600 focus:ring-cyan-500"
        >
          {isLogin ? 'Login' : 'Create Owner'}
        </button>
      </form>
      <button
        className="mt-4 text-indigo-600 hover:underline focus:outline-none"
        onClick={toggleForm}
      >
        {isLogin ? 'Switch to Create Owner' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default Owner;
