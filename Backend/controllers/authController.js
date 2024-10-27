const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Token generation
const generateToken = (user) => {
  return jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_KEY || 'your_jwt_secret_key',
    { expiresIn: '1d' }
  );
};

// Register Logic
module.exports.registerUser = async function (req, res) {
  try {
    const { email, password, fullname } = req.body;

    if (!email || !password || !fullname) {
      return res.status(400).json({ message: 'Please Enter All the Fields' });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      fullname,
      password: hash,
      email,
    });

    if (user) {
      return res.status(201).json({
        fullname: user.fullname,
        email: user.email,
        userid: user._id ,
        token: generateToken(user),
      });
    } else {
      return res.status(400).json({ message: 'User Not Created' });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Login Logic
module.exports.loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Email or Password Incorrect' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.json({
        fullname: user.fullname,
        email: user.email,
        userid: user._id ,
        token: generateToken(user),
      });
    } else {
      return res.status(400).json({ message: 'Email or Password Incorrect' });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
