import React from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const BookInfo = () => {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return (
      <div className="text-center text-gray-500 text-lg mt-20">
        No product data available
      </div>
    );
  }

  const handleAddToCart = (productId) => {
    const userid = localStorage.getItem("userid");
    const data = { productId, userid };

    axios
      .post("/api/add-to-cart", data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Product added to cart");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          toast.error("You need to login first");
        } else {
          toast.error("Something Went Wrong");
        }
        console.log(err);
      });
  };
  return (
    <>
    
      <ToastContainer />
      <div className="book-info-container max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-24">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {product.name}
        </h1>

        <div className="flex flex-col md:flex-row md:items-start">
          <img
            src={`data:image/png;base64,${product.image}`}
            alt={product.name}
            className="w-full md:w-80 h-80 object-cover rounded-lg shadow-md mb-6 md:mb-0"
          />

          <div className="flex flex-col gap-2 text-black md:ml-8">
            <p className="text-xl font-bold text-gray-800 rounded-md  leading-relaxed">
              {product.description}
            </p>

            <p className="text-lg font-semibold text-teal-600">
              Price: ₹{product.price}/-
            </p>
            <p className="text-lg  text-orange-500">
              <span className="font-semibold">Discount:</span> ₹
              {product.discount}/-
            </p>
            <p className="text-lg">
              <span className="font-semibold ">Author:</span> {product.author}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Publisher:</span>{" "}
              {product.publisher}
            </p>
            <p className="text-lg">
              <span className="font-semibold">ISBN:</span> {product.ISBN}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-4 mt-8">
          <Link
            to="/shop"
            className="flex items-center justify-center w-40 p-2 bg-teal-500 text-white rounded-md shadow-lg hover:bg-teal-600"
          >
            <i className="fa-solid fa-arrow-left-long mr-2"></i>
            Go Back
          </Link>
          <button
            onClick={() => handleAddToCart(product._id)}
            className="flex items-center justify-center w-40 p-2 bg-cyan-500 text-white rounded-md shadow-lg hover:bg-cyan-600"
          >
            <i className="fa-solid fa-plus mr-2"></i> Add to Cart
          </button>
          
        </div>
      </div>
    </>
  );
};

export default BookInfo;
