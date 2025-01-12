import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from '../components/SearchBar'; // Import the SearchBar component
import CategoryFilter from '../components/CategoryFilter'; // Import the CategoryFilter component
import ImageSlider from '../components/ImageSlider';
import Loader from "../components/Loader";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleInfo = async (productId) => {
    try {
      const data = { productId };
      const response = await axios.post('/api/get-product', data);
      navigate('/info', { state: { product: response.data } });
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  const handleAddToCart = (productId) => {
    const _productId = productId;
    const userid = localStorage.getItem('userid');
    const data = { productId: _productId, userid };

    axios.post('/api/add-to-cart', data)
      .then(res => {
        if (res.status === 200) {
          toast.success('Product added to cart');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.name.toLowerCase().includes(selectedCategory.toLowerCase())
      : true;
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });
 

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />
      <ImageSlider />
      <div className="flex flex-col md:flex-row md:space-x-8 p-4">
        {/* Sidebar with unique interactive section */}
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

        <main className="md:w-3/4 ">
          {/* SearchBar Component */}
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {/* CategoryFilter Component */}
          <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          {loading ? (
        <Loader />
      ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-2xl overflow-hidden">
                <img
                  src={`data:image/png;base64,${product.image}`}
                  alt={product.name}
                  className="w-full h-52 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-teal-600 font-bold">₹ {product.price}/-</p>
                  <div className='flex justify-center items-center space-x-4'>
                  <button
                    className="mt-4 flex items-center justify-center w-full p-2 bg-cyan-400 shadow-cyan-500/50 hover:bg-cyan-600  text-white rounded-md"
                    onClick={() => handleAddToCart(product._id)}
                  >
                    <i className="fa-solid fa-plus mr-2"></i> Add 
                  </button>
                  <button
                              className="mt-4 flex items-center justify-center w-full p-2 bg-teal-500 shadow-teal-500/50 text-white rounded-md hover:bg-teal-600"
                              onClick={() => handleInfo(product._id)}
                            >
                              <i className="fa-solid fa-info mr-1"></i>
                              info
                            </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
