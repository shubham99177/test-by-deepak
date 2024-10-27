import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogNav from '../components/LogNav';

const AdminAllOrders = () => {
    const [allOrders, setAllOrders] = useState([]); // State for storing orders
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error handling state

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/allorders');
                const data = response.data;

                // Check for users and their orders
                if (data.users && data.users.length > 0) {
                    const orders = data.users.flatMap(user => 
                        user.orders.flatMap(order => 
                            order.items.map(item => ({
                                orderId: order.orderId, // Order ID
                                customerName: user.fullname, // User's full name
                                customerEmail: user.email, // User's full name
                                image: item.productId.image, // Product image
                                name: item.productId.name, // Product image
                                price: item.productId.price, // Product price
                                quantity: item.quantity, // Quantity
                                finalPrice: item.finalPrice, // Order's final price
                                status: order.status // Order status
                            }))
                        )
                    );

                    setAllOrders(orders); // Flatten the orders into a single array
                } else {
                    setAllOrders([]); // No orders found
                }
            } catch (err) {
                setError('Failed to fetch orders. Please try again later.');
                console.error('Error fetching orders:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div className="text-center py-10">Loading...</div>; // Loading state
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>; // Error state
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 mt-20 bg-gray-200">
            <LogNav/>
            
            {Array.isArray(allOrders) && allOrders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allOrders.map((order, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                            <h2 className="text-xl font-semibold">Custermer Name: {order.customerName}</h2>
                            <p className="text-gray-700">Email: {order.customerEmail}</p>
                            <img src={`data:image/png;base64,${order.image}`} alt="Product" className="w-full h-40 object-cover mb-2" />
                            <h2 className="text-xxl font-semibold">Product Name: {order.name}</h2>
                            <p className="text-gray-700">Price: ₹{order.price}</p>
                            <p className="text-gray-700">Quantity: {order.quantity}</p>
                            <p className="text-gray-700 font-semibold">Final Price(with discount): ₹{order.finalPrice}</p>
                            {/* <p className={`text-gray-700 ${order.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>Status: {order.status}</p> */}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No orders found.</p> // Message when no orders are present
            )}
        </div>
    );
};

export default AdminAllOrders;
