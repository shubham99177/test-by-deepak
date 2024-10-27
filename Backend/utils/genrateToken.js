const jwt = require ("jsonwebtoken")


const generateToken = (user) => {
    return jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_KEY ,  // Make sure this is defined
      { expiresIn: '1d' }
    );
  };
  
  module.exports = { generateToken };
