import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import LogNav from "../components/LogNav";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const userRole = localStorage.getItem("owner"); // Retrieve the user role from local storage

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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
      <div className="min-h-screen bg-gray-100 ">
        <ToastContainer />
        <div className="flex flex-col md:flex-row md:space-x-8 p-4">
          <aside className="md:w-1/4 mb-4 md:mb-0">
            {/* Sidebar content with categories */}
          </aside>
          <main className="md:w-3/4">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
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
                    <p className="text-gray-600">₹ {product.price}</p>
                    {/* Conditionally render Add to Cart button if user is not owner */}
                    {!userRole && (
                      <button
                        className="mt-4 flex items-center justify-center w-full p-2 bg-cyan-400 shadow-cyan-500/50 text-white rounded-md hover:bg-cyan-600"
                        onClick={() => handleAddToCart(product._id)}
                      >
                        <i className="fa-solid fa-plus mr-2"></i> Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
