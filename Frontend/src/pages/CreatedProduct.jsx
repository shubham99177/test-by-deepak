import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogNav from '../components/LogNav';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discount: '',
    bgcolor: '',
    panelcolor: '',
    textcolor: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post('/api/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Product created successfully', {
        autoClose: 5000,
        className: 'toast-success',
      });
    } catch (error) {
      toast.error('Error creating product', {
        autoClose: 5000,
        className: 'toast-error',
      });
      console.error('Error creating product:', error);
    }
  };

  return (
    <>
      <LogNav />
      <ToastContainer />
      <div className="min-h-screen flex flex-col justify-center pt-20 bg-gray-200">
        <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row justify-center">
          <main className="w-full lg:w-3/4 bg-white p-6 rounded-lg shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-center">Create New Product</h2>
            <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6 ">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-center">Product Details</h3>
                <div className="mb-4 text-center">
                  <label className="block mb-2 font-medium">Product Image:</label>
                  <input
                    name="image"
                    type="file"
                    onChange={handleChange}
                    className="py-2 px-4 rounded border border-gray-300"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="name"
                    type="text"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                  <input
                    name="price"
                    type="text"
                    placeholder="Product Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                  <input
                    name="discount"
                    type="text"
                    placeholder="Discount Price"
                    value={formData.discount}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-center">Panel Details:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="bgcolor"
                    type="text"
                    placeholder="Background Color"
                    value={formData.bgcolor}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                  <input
                    name="panelcolor"
                    type="text"
                    placeholder="Panel Color"
                    value={formData.panelcolor}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                  <input
                    name="textcolor"
                    type="text"
                    placeholder="Text Color"
                    value={formData.textcolor}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2 rounded mt-3 bg-cyan-400 shadow-cyan-500/50 hover:bg-cyan-600 text-white"
              >
                Create New Product
              </button>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
