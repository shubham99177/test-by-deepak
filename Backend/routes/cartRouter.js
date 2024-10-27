// routes/cart.js
const express = require('express');
const router = express.Router();
const {addtoCart , Cart , updatequantity , deleteCart}  = require("../controllers/cartController");


router.post('/add-to-cart', addtoCart )
router.post('/cart', Cart)
router.post('/cart/update-quantity', updatequantity);
router.post('/cart/delete',deleteCart );
  
module.exports = router;
