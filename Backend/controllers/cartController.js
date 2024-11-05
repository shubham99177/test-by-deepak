const userModel = require('../models/user-model');

module.exports.addtoCart = async (req, res) => {
  try {
    const { userid, productId } = req.body;

    // Validate user ID
    const user = await userModel.findById(userid);
    if (!user) {
      return res.status(404).send({ code: 404, message: "User not found" });
    }

    // Check if the product already exists in the user's cart
    const productInCart = user.cart.find(item => item.productId.toString() === productId);

    if (productInCart) {
      // If product exists, increment its quantity
      productInCart.quantity += 1;
    } else {
      // If product does not exist, add new product with quantity 1
      user.cart.push({ productId, quantity: 1 });
    }

    await user.save();

    return res.send({ code: 200, message: "Added to cart or updated quantity" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).send({ code: 500, message: "Server error" });
  }
};

module.exports.Cart = async (req, res) => {
  const { userid } = req.body;

  try {
    const user = await userModel.findById(userid).populate('cart.productId'); // Populate product details

    if (user) {
      // Return the cart as is, without filtering by isDeleted
      return res.send({ code: 200, message: "Fetched cart", data: user.cart });
    } else {
      return res.status(404).send({ code: 404, message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).send({ code: 500, message: "Server error" });
  }
};


module.exports.updatequantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Find the user by ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the product in the user's cart array
    const productInCart = user.cart.find(item => item.productId.equals(productId));

    if (productInCart) {
      productInCart.quantity = quantity;
      await user.save();

      return res.status(200).json({ message: "Quantity updated successfully", cart: user.cart });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error updating quantity:", error);
    return res.status(500).json({ message: "Server error" });
  }
}


module.exports.deleteCart = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: 'User ID and Product ID are required.' });
  }

  try {
    // Find the user by userId
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Find the index of the product in the cart array
    const productIndex = user.cart.findIndex(item => item.productId.toString() === productId);

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart.' });
    }

    // Remove the product from the cart array
    user.cart.splice(productIndex, 1);

    // Save the updated user document
    await user.save();

    return res.status(200).json({ message: 'Product removed from cart successfully.' });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    return res.status(500).json({ message: 'An error occurred while removing the product.' });
  }
}