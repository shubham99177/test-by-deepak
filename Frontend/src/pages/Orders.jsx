import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader'; // Assuming you have a Loader component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userid'); // Get userId from localStorage

    useEffect(() => {
        const fetchOrders = async () => {
            if (!userId) {
                navigate('/'); // Redirect to home if userId is not found
                return;
            }

            try {
                const response = await axios.get(`/api/orders/${userId}`);
                setOrders(response.data.orders || []); // Populate orders with response data
            } catch (error) {
                console.error("Error fetching orders:", error);
                toast.error("Failed to fetch orders. Please try again."); // Notify the user of the error
                setOrders([]); // If there's an error, clear the orders list
            } finally {
                setLoading(false); // Stop showing the loader
            }
        };

        fetchOrders();
    }, [userId, navigate]);

    // Function to handle order cancellation for a specific product
   // Function to handle order cancellation for a specific product
const handleCancelOrder = async (orderId, productId) => {
    const confirmToastId = toast.loading("Processing cancellation...", {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        position: "top-center",
    });

    // Listen for user confirmation
    const confirmation = await new Promise((resolve) => {
        toast.info("Click Confirm to cancel or Cancel to keep the order.", {
            onClose: () => resolve(false), // If the user closes, resolve to false
            onClick: () => resolve(true), // If the user confirms, resolve to true
        });
    });

    // Dismiss the loading toast
    toast.dismiss(confirmToastId);

    if (confirmation) {
        try {
            // Call the API to cancel the product from the order
            const response = await axios.post('/api/orders/delete', {
                userId,   // Send userId
                orderId,  // Send orderId
                productId  // Send productId
            });

            // Assuming the API returns the updated orders
            if (response.status === 200) {
                setOrders(prevOrders => 
                    prevOrders.map(order => (order.orderId === orderId
                        ? { ...order, items: order.items.filter(item => item.productId !== productId) }
                        : order
                    )).filter(order => order.items.length > 0) // Remove empty orders
                );

                // Notify the user of successful cancellation
                toast.success("Product canceled successfully!");
            } else {
                throw new Error("Failed to cancel the product.");
            }
        } catch (error) {
            console.error("Error canceling order:", error);
            toast.error("Failed to cancel the product. Please try again.");
        }
    } else {
        toast.info("Cancellation aborted.");
    }
};

    

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {loading ? (
                <Loader /> // Show loader while fetching data
            ) : (
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Your Orders</h1>
                    {orders.length > 0 ? (
                        <div className="space-y-6">
                            {orders.map((order, index) => (
                                <div key={order.orderId} className="bg-white rounded-lg shadow-lg p-5 transition-transform transform hover:scale-105">
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Order #{index + 1}</h2>
                                    <p className="text-gray-600">
                                        Order Date: <span className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</span>
                                    </p>
                                    <ul className="mt-4 space-y-2">
                                        {order.items.map(item => (
                                            <li key={item.productId} className="flex items-center border-b pb-2">
                                                <img 
                                                    src={`data:image/png;base64,${item.productImage}` || `${item.image}`} 
                                                    alt={item.productName}
                                                    className="w-16 h-16 object-cover rounded mr-4" // Styling for the image
                                                />
                                                <span className="text-gray-800">{item.productName} (Qty: {item.quantity})</span>
                                                <span className="text-gray-700 font-medium ml-auto">Price: ₹{item.finalPrice}</span>
                                                <button 
                                                    onClick={() => handleCancelOrder(order.orderId, item.productId)} // Pass orderId and productId
                                                    className="ml-4 bg-red-600 text-white py-1 px-3 rounded hover:bg-red-500"
                                                >
                                                    Cancel
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))} 
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">No orders found.</p>
                    )}
                </div>
            )}
            <ToastContainer /> {/* Include ToastContainer to render toast notifications */}
        </div>
    );
};

export default Orders;
