import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import LogNav from "../components/LogNav";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../components/SearchBar";
import CardSkeleton from "../components/CardSkelton";
import CategoryFilter from "../components/CategoryFilter";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const userRole = localStorage.getItem("owner");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        console.log("API Response:", response.data); // Debug log
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
          setProducts([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleRemoveProduct = (productId) => {
    // Your existing code for removing a product
  };

  const handleInfo = async (productId) => {
    // Your existing code for handling product info
  };

  const handleAddToCart = (productId) => {
    // Your existing code for adding to cart
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.name.toLowerCase().includes(selectedCategory.toLowerCase())
      : true;
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  return (
    <>
      <LogNav />
      <ImageSlider />
      <div className="min-h-screen bg-gray-100">
        <ToastContainer />
        <div className="flex flex-col md:flex-row md:space-x-8 p-4">
          <aside className="md:w-1/4 mb-4 md:mb-0">
            {/* Your existing code for sidebar */}
          </aside>
          <main className="md:w-3/4">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            {loading ? (
              <CardSkeleton />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow-2xl overflow-hidden"
                  >
                    <img
                      src={`data:image/png;base64,${product.image}`}
                      alt={product.name}
                      className="w-full h-52 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {product.name}
                      </h3>
                      <p className="text-teal-500 font-bold">₹ {product.price}/-</p>
                      {userRole ? (
                        <div className="flex justify-center items-center space-x-2">
                          <button
                            className="mt-4 flex items-center justify-center w-full p-2 bg-red-500 shadow-red-500/50 text-white rounded-md hover:bg-red-600"
                            onClick={() => handleRemoveProduct(product._id)}
                          >
                            <i className="fa-solid fa-trash mr-2"></i> Remove
                          </button>
                          <button
                            className="mt-4 flex items-center justify-center w-full p-2 bg-teal-500 shadow-teal-500/50 text-white rounded-md hover:bg-teal-600"
                            onClick={() => handleInfo(product._id)}
                          >
                            <i className="fa-solid fa-info mr-1"></i> info
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-center items-center space-x-2">
                          <button
                            className="mt-4 flex items-center justify-center w-full p-2 bg-cyan-400 shadow-cyan-500/50 text-white rounded-md hover:bg-cyan-600"
                            onClick={() => handleAddToCart(product._id)}
                          >
                            <i className="fa-solid fa-plus mr-1"></i> Add
                          </button>
                          <button
                            className="mt-4 flex items-center justify-center w-full p-2 bg-teal-500 shadow-teal-500/50 text-white rounded-md hover:bg-teal-600"
                            onClick={() => handleInfo(product._id)}
                          >
                            <i className="fa-solid fa-info mr-1"></i> info
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
