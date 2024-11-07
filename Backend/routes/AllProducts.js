const express = require('express');
const router = express.Router();
const {AllProducts , Infoproduct} =  require("../controllers/productController");

router.get('/products', AllProducts);
router.post('/get-product', Infoproduct);

module.exports = router;
