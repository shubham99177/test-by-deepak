import React, { useState } from 'react';
import LogNav from '../components/LogNav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify"; // Import toast

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/forget-password', { email });
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error sending reset password link:', error);
      toast.error('Failed to send reset password link.');
    }
  };

  return (
    <>
      <LogNav />
       <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            Forgot Password
          </h2>
          <p className="mt-2 text-sm text-gray-600 text-center font-semibold">
            Enter your email address to receive a reset password link.
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-cyan-400 rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            >
              Send Reset Link
            </button>
          </form>
          <div className="mt-2 text-center">
            <Link to="/login" className="text-xs hover:underline focus:outline-none">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
