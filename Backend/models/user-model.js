

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: [
        {
            productId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product' 
            },
            quantity: { 
                type: Number, 
                default: 1 
            }
        }
    ],
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String,
});

module.exports = mongoose.model('User', userSchema);
