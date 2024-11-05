const ownerModel = require("../models/owners-model");
const Product = require('../models/product-model');
const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

module.exports.Owner = async (req, res) => {
  try {
    // Check if an owner already exists
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.status(400).json({ message: "An owner already exists" });
    }

    const { fullname, email, password } = req.body;

    // Check if the required fields are provided
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds (strength)

    // Create a new owner with the hashed password
    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password: hashedPassword, // Store the hashed password
    });

    return res
      .status(201)
      .json({ message: "Owner created successfully", owner: createdOwner });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


module.exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the required fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find the owner by email
    const owner = await ownerModel.findOne({ email });
    if (!owner) {
      return res.status(401).json({ message: "Email or Password Incorrect" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email or Password Incorrect" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: owner._id, email: owner.email }, // Payload
      process.env.JWT_KEY, // Secret key from environment variables
      { expiresIn: '1h' } // Token expiration time
    );

    // Check if JWT_KEY is set in your environment
    

    // Respond with the token
    return res.status(200).json({
      message: "Login successful",
      token,
      owner: { fullname: owner.fullname, email: owner.email , id: owner._id } // You can send any owner info back if needed
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.allOrder = async (req, res) => {
  try {
      // Fetch all users and their orders
      const usersWithOrders = await User.find({ "orders.0": { $exists: true } }, 'fullname email orders') // Only fetch users who have orders
          .populate('orders.productId'); // Populate product details if needed

      if (usersWithOrders.length === 0) {
          return res.status(404).json({ message: "No orders found." });
      }

      // Return all users with their orders
      res.status(200).json({ users: usersWithOrders });
  } catch (error) {
      console.error('Error fetching users\' orders:', error);
      res.status(500).json({ message: "Internal server error." });
  }
}
module.exports.RemoveProduct = async (req, res) => {
  try {
    const { ownerid, productId } = req.body;

    // Check if owner exists
    const owner = await ownerModel.findById(ownerid);
    if (!owner) {
      return res.status(404).send({ code: 404, message: "Owner not found" });
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ code: 404, message: 'Product not found' });
    }

    // Set isDeleted to true instead of deleting the product
    if (!product.isDeleted) {
      product.isDeleted = true;
      await product.save();

      return res.send({ code: 200, message: "Product removed successfully (marked as deleted)" });
    } else {
      return res.status(400).json({ code: 400, message: "Product is already marked as deleted" });
    }
  } catch (error) {
    console.error("Error removing a Product:", error);
    return res.status(500).send({ code: 500, message: "Server error" });
  }
};
