const express = require("express");
const router = express.Router();
const { Owner , loginAdmin , RemoveProduct , allOrder} =  require('../controllers/ownerController')


router.post("/owner", Owner);
router.post("/admin", loginAdmin );
router.get('/allorders',allOrder);
router.delete("/RemoveProduct", RemoveProduct );

module.exports = router;
