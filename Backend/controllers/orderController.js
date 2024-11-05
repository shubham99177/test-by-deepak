const User = require("../models/user-model");
const { v4: uuidv4 } = require("uuid");

module.exports.placeOrder = async (req, res) => {
  const { userId, productId, finalPrice } = req.body;

  try {
    const user = await User.findById(userId).populate('cart.productId');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const cartItem = user.cart.find(
      (item) => item.productId && item.productId._id.toString() === productId
    );

    if (!cartItem) {
      return res.status(400).json({ message: 'Product is not in cart' });
    }
    const orderId = uuidv4();
    const order = {
      orderId, // Assign the unique orderId
      items: [
        {
          productId: cartItem.productId, 
          quantity: cartItem.quantity, 
          finalPrice, 
        },
      ],
      orderDate: new Date(),
    };
    user.orders.push(order);
    await user.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


module.exports.getOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find user and populate orders with productId details
    const user = await User.findById(userId).populate("orders.items.productId");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the user has orders
    if (!user.orders || user.orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    // Map orders to ensure orderId and items are included
    const orders = user.orders.map((order) => ({
      orderId: order.orderId || "No order ID found", // Use orderId directly from your schema
      orderDate: order.orderDate,
      items: order.items.map((item) => ({
        productId: item.productId._id, // Assuming this is the correct reference
        productName: item.productId.name, // Fetch product name
        productImage: item.productId.image, // Fetch product image
        finalPrice: item.finalPrice || item.productId.price, // Use finalPrice if available, otherwise fallback to price
        quantity: item.quantity,
      })),
    }));

    // Return orders
    return res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching orders." });
  }
};

module.exports.deleteOrder = async (req, res) => {
  const { userId, orderId } = req.body;

  // Validate input
  if (!userId || !orderId) {
      return res.status(400).json({ message: "User ID and Order ID are required." });
  }

  try {
      // Find the user by userId
      const user = await User.findById(userId);

      // Check if user exists
      if (!user) {
          return res.status(404).json({ message: "User not found." });
      }

      // Find the index of the order in the orders array based on orderId
      const orderIndex = user.orders.findIndex(order => order.orderId === orderId);

      // Check if order exists
      if (orderIndex === -1) {
          return res.status(404).json({ message: "Order not found." });
      }

      // Remove the order from the orders array
      user.orders.splice(orderIndex, 1);

      // Save the updated user document
      await user.save();

      // Return the updated orders
      return res.status(200).json({ message: "Order deleted successfully.", orders: user.orders });
  } catch (error) {
      console.error("Error deleting order:", error);
      return res.status(500).json({ message: "An error occurred while deleting the order." });
  }
};
