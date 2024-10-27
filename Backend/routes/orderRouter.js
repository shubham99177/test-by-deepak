const express = require('express');
const router = express.Router();
const { placeOrder , getOrders , deleteOrder}  = require("../controllers/orderController");

router.post('/place-order', placeOrder );
router.get('/orders/:userId', getOrders);
router.post('/orders/delete', deleteOrder);

module.exports = router ;