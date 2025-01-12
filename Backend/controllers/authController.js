const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

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

module.exports.forgetPassword = async function (req, res){
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if(!user){
      return res.status(400).json({ message: 'User Not Found' });
    }
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_KEY ,
      { expiresIn: '1d' }
    );
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true, 
      auth: {
        user: process.env.MY_GMAIL ,
        pass: process.env.MY_GMAIL_PASS ,
      },
    });
    const receiver = {
      from : process.env.MY_GMAIL ,
      to : email ,
      subject : "Password Reset Request" ,
      text : `Click on this link to generate new Password ${process.env.CLIENT_URL}/reset-password/${token}`
    };
    await transporter.sendMail(receiver);
    return res.status(200).send({ message: "Password Reset Link Sent Sucessfully"})
  }
  catch ( err ){
    console.error("Something went wrong", err)
  }
}

module.exports.ResetPassword = async function(req, res)
{
  try{
    const {token} = req.params ;
    const {password} = req.body ;
    if(!password){
    return res.status(400).send( { message: "Please Provide Password"})
    }
    const decode = jwt.verify(token , process.env.JWT_KEY)
    const user =  await userModel.findOne({email:decode.email})
   
    const salt = await bcrypt.genSalt(10);
    const newhashpassword = await bcrypt.hash(password, salt);
    user.password = newhashpassword ;
    await user.save();

    return res.status(200).send( { message: "password reset Sucessfully"})
  }
  catch(err){
  console.error("Something went wrong", err)}
}