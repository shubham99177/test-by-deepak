
// // isAuthenticated.js
// const jwt = require('jsonwebtoken');

// module.exports.isAuthenticate = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1]; // Get the token from the Authorization header
  
//   console.log("Received token:", token); // Debug log for the received token

//   if (!token) {
//     console.error("No token provided."); // Log if no token is found
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   try {
//     const verified = jwt.verify(token, process.env.JWT_KEY || "dhdbhjvh"); // Verify the token
//     console.log("Token verified:", verified); // Log the verified token payload
//     req.user = verified; // Attach the verified user info to the request
//     next(); // Call the next middleware
//   } catch (error) {
//     console.error("Token verification failed:", error); // Log the error
//     return res.status(400).json({ message: 'Invalid token' });
//   }
// };




