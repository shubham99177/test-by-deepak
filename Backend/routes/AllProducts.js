const express = require('express');
const router = express.Router();
const Product = require('../models/product-model');

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});
module.exports = router;
