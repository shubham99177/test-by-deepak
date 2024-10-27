const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/product-model');
const userModel = require('../models/user-model');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/create', upload.single('image') , async (req, res) => {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    // Create new product instance
    const newProduct = new Product({
      image: req.file.buffer.toString('base64'), // Save image as a base64 string
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });

    // Save to database
    await newProduct.save();
    let success = req.flash("success");
    res.status(201).json({ message: 'Product created successfully', success });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;
