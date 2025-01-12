const express = require("express")
const router = express.Router();
const { registerUser , loginUser , forgetPassword , ResetPassword } = require("../controllers/authController");

router.post("/register", registerUser )
router.post("/login", loginUser )
router.post("/forget-password", forgetPassword)
router.post("/reset-password/:token", ResetPassword)

  
module.exports = router;