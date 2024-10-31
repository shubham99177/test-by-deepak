import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import LogNav from "../components/LogNav";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import CategoryFilter from "../components/CategoryFilter";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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
      finally {
        setLoading(false);
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
          <div className="flex flex-col space-y-6">
            {/* Unique Section with images and hover effects */}
            <div className="space-y-4">
            <h2 className="text-3xl md:text-2xl items-center font-bold text-gray-800 hover:text-cyan-400 text-center  tracking-wide   px-4">
  Varieties of Books
</h2>

              <Link to="/shop" className="relative group block overflow-hidden rounded-lg shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" 
                  alt="Reading Books" 
                  className="w-full h-36 object-cover transition-transform transform group-hover:scale-110 duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Reading Books
                </div>
              </Link>

              <Link to="/shop" className="relative group block overflow-hidden rounded-lg shadow-lg">
                <img 
                  src="https://i.etsystatic.com/13702629/r/il/067798/1979047720/il_1588xN.1979047720_kthx.jpg" 
                  alt="Comic Books" 
                  className="w-full h-36 object-cover transition-transform transform group-hover:scale-110 duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Comic Books
                </div>
              </Link>

              <Link to="/shop" className="relative group block overflow-hidden rounded-lg shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" 
                  alt="Self Help" 
                  className="w-full h-36 object-cover transition-transform transform group-hover:scale-110 duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Self Help
                </div>
              </Link>

              <Link to="/shop" className="relative group block overflow-hidden rounded-lg shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1517433456452-f9633a875f6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" 
                  alt="Programming Books" 
                  className="w-full h-36 object-cover transition-transform transform group-hover:scale-110 duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Programming Books
                </div>
              </Link>

              <Link to="/shop" className="relative group block overflow-hidden rounded-lg shadow-lg">
                <img 
                  src="https://asset22.ckassets.com/blog/wp-content/uploads/sites/5/2019/05/Autobiography.jpg" 
                  alt="Biography Books" 
                  className="w-full h-36  object-center transition-transform transform group-hover:scale-110 duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Biography Books
                </div>
              </Link>

            </div>
          </div>
        </aside>
          <main className="md:w-3/4">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
             {loading ? (
        <Loader />
      ) : (
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
      )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
