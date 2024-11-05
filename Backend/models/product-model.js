// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//     image: String,
//     name: String,
//     price: Number,
//     discount: {
//         type: Number,
//         default: 0,
//     },
//     bgcolor: String,
//     panelcolor: String,
//     textcolor: String,
// });

// module.exports = mongoose.model('Product', productSchema);

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: String,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0,
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String,
    isDeleted: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('Product', productSchema);

