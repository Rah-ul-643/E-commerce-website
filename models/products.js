const mongoose= require('mongoose');

const productSchema= new mongoose.Schema({

    heading: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    rating: {
        type: mongoose.Schema.Types.Mixed,
        min: 0,
        max: 5,
    },
    price: {
        type: String,
        required: true,
    },
    category: String,

    features: mongoose.Schema.Types.Mixed,
});

module.exports= mongoose.model('products',productSchema);