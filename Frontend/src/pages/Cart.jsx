import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify"; 
import { FaTrash } from "react-icons/fa"; 

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

useEffect(() => {
  const fetchCartData = async () => {
    const userid = localStorage.getItem("userid");

    if (!userid) {
      navigate("/");
      return;
    }

    try {
      const response = await axios.post("/api/cart", { userid });

      if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        // Filter out products that are null or marked as deleted
        const processedData = response.data.data.map((item) => {
          if (!item.product || item.product.isDeleted) {
            return {
              ...item,
              product: {
                name: "This product is no longer available",
                price: null,
                image: null,
              },
              isUnavailable: true,
            };
          }
          return item;
        });

        setData(processedData);
      } else {
        console.warn("Unexpected cart data structure:", response.data);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  fetchCartData();
}, [navigate]);


  const calculateTotal = (price, quantity, discount) => {
    const totalPrice = price * quantity;
    const totalDiscount = discount * quantity;
    const finalPrice = totalPrice - totalDiscount;
    return { totalPrice, totalDiscount, finalPrice };
  };

  const updateQuantityInDatabase = async (userId, productId, newQuantity) => {
    try {
      const response = await axios.post("/api/cart/update-quantity", {
        userId,
        productId,
        quantity: newQuantity,
      });

      // if (response.status === 200) {
      //   console.log("Quantity updated successfully in database");
      // } else {
      //   console.error("Failed to update quantity in database");
      // }
    } catch (error) {
      console.error("Error updating quantity in database:", error);
    }
  };

  const deleteItemFromDatabase = async (userId, productId) => {
    try {
      const response = await axios.post("/api/cart/delete", {
        userId,
        productId,
      });

    } catch (error) {
      console.error("Error deleting item from database:", error);
    }
  };

  const handleQuantityChange = async (index, action) => {
    const userId = localStorage.getItem("userid");
    const item = data[index];
    const currentQuantity = item.quantity;
    let updatedQuantity;

    if (action === "increment") {
      updatedQuantity = currentQuantity + 1;
    } else {
      updatedQuantity = Math.max(1, currentQuantity - 1);
    }

    setData((prevData) =>
      prevData.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            quantity: updatedQuantity,
          };
        }
        return item;
      })
    );

    await updateQuantityInDatabase(userId, item.productId._id, updatedQuantity);
  };

  const handleDelete = async (index) => {
    const userId = localStorage.getItem("userid");
    const item = data[index];

    setData((prevData) => prevData.filter((_, idx) => idx !== index));

    await deleteItemFromDatabase(userId, item.productId._id);
  };

  const handlePlaceOrder = async (index) => {
    const userId = localStorage.getItem("userid");
    const item = data[index];

    const { finalPrice } = calculateTotal(
      item.productId.price || 0,
      item.quantity || 1,
      item.productId.discount || 0
    );

    try {
      const response = await axios.post("/api/place-order", {
        userId,
        productId: item.productId._id,
        finalPrice,
      });

      if (response.status === 201) {
        toast.success("Order placed successfully!");

        setData((prevData) => prevData.filter((_, idx) => idx !== index));

        await deleteItemFromDatabase(userId, item.productId._id);
      } else {
        toast.error("Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred while placing the order.");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-8">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-4xl">
          <ToastContainer />
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Cart Items
          </h1>
          {data.length > 0 ? (
            <div className="flex flex-col items-center space-y-4">
              {data.map((item, index) => {
                const { totalPrice, totalDiscount, finalPrice } =
                  calculateTotal(
                    item.productId.price || 0,
                    item.quantity || 1,
                    item.productId.discount || 0
                  );

                return (
                  <div
                    key={index}
                    className="w-full border rounded-lg shadow-md p-4 bg-white flex flex-col lg:flex-row items-center justify-between mt-4 max-w-3xl"
                  >
                    <div className="flex flex-row lg:flex-row items-center lg:items-start">
                      {item.productId.image ? (
                        <img
                          src={`data:image/png;base64,${item.productId.image}` || `${item.productId.image}`}
                          alt={item.productId.name}
                          className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg mr-4 mb-4 lg:mb-0"
                        />
                      ) : (
                        <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      )}
                      <div className="flex flex-col">
                        <h2 className="text-lg md:text-xl font-semibold">
                          {item.productId.name}
                        </h2>
                        <p className="text-gray-700 mt-2">
                          Price: ₹ {item.productId.price || "N/A"}
                        </p>
                        <p className="text-gray-800 mt-1">
                          Discount: ₹ {item.productId.discount || "N/A"}
                        </p>
                        <div className="flex items-center mt-2">
                          <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-l"
                            onClick={() => handleQuantityChange(index, "decrement")}
                          >
                            -
                          </button>
                          <span className="text-xl mx-4">{item.quantity}</span>
                          <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-r"
                            onClick={() => handleQuantityChange(index, "increment")}
                          >
                            +
                          </button>
                        </div>
                        <p className="text-gray-800 mt-1">Total Price: ₹ {totalPrice}</p>
                        <p className="text-gray-800 mt-1">Total Discount: ₹ {totalDiscount}</p>
                        <p className="text-gray-800 font-bold mt-2">Final Price: ₹ {finalPrice}</p>
                      </div>
                    </div>
                    <div className="flex flex-row justify-end gap-1 items-end mt-3">
                      <button
                        className="bg-cyan-400 text-white py-2 px-4 rounded hover:bg-cyan-600 shadow-cyan-500/50"
                        onClick={() => handlePlaceOrder(index)}
                      >
                        Place Order
                      </button>
                      <button
                        className="bg-red-500 text-white py-3 px-4 rounded hover:bg-red-600"
                        onClick={() => handleDelete(index)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-600  pt-6">No items in cart</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;