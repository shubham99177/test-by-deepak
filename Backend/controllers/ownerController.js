const ownerModel = require("../models/owners-model");
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT token generation

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
