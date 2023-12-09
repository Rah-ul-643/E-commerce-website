const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({

    username: {
        type: String,
    },
    products: [{
        id:{
            type: String
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
    
})

module.exports= mongoose.model("cart", cartSchema);
