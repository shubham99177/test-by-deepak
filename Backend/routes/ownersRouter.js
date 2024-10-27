const express = require("express");
const router = express.Router();
const { Owner , loginAdmin } =  require('../controllers/ownerController')


router.post("/owner", Owner);
router.post("/admin", loginAdmin );



// Assuming you are using Express.js and have User model imported

const User = require('../models/user-model'); // Adjust path to your model

// Route to get all users' orders for the owner/admin
router.get('/allorders', async (req, res) => {
    try {
        // Fetch all users and their orders
        const usersWithOrders = await User.find({ "orders.0": { $exists: true } }, 'fullname email orders') // Only fetch users who have orders
            .populate('orders.productId'); // Populate product details if needed

        if (usersWithOrders.length === 0) {
            return res.status(404).json({ message: "No orders found." });
        }

        // Return all users with their orders
        res.status(200).json({ users: usersWithOrders });
    } catch (error) {
        console.error('Error fetching users\' orders:', error);
        res.status(500).json({ message: "Internal server error." });
    }
});


module.exports = router;
