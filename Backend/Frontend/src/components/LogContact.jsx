import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS
import LogNav from './LogNav';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send the data to the backend API
      const res = await axios.post('/api/contact', formData);
      
      if (res.status === 201) {
        setSubmitted(true);
        setError('');  // Clear any previous error

        // Show success toast
        toast.success('Message sent successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFormData({
            name: '',
            email: '',
            message: ''
          });
      }
    } catch (err) {
      console.error(err);
      setError('Failed to submit the form. Please try again.');

      // Show error toast
      toast.error('Failed to submit the form. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
    <LogNav />
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4 mt-10 pt-18">
      <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>

       
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="5"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-400 shadow-cyan-500/50 hover:bg-cyan-600 text-white font-medium py-3 rounded-lg transition duration-300 shadow-lg"
            >
              Send
            </button>
          </form>
        
      </div>

      {/* ToastContainer is necessary to display toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
    </>
  );
};

export default Contact;
