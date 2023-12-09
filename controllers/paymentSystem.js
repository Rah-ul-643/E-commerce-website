const cart = require('../models/cart');
const productController = require('./ProductController');
const stripe = require('stripe')('sk_test_51O5R0TSAkB7uOgPdwNGm5d8QBxsokGMhLOLwMh6seJSkq9WlyjYYiV6P9X8GN6SQWbpK4wryGGMOIKvl6uPHSnVs00aFLsEmUo');


const getDetails = async (items) => {

    cartItems = []
    for (let item of items) {

        const id = item.id;
        const productObject = await productController.getOne(id);

        //converting price from string to number for stripe

        let price=productObject.price;
        const tempArr=price.split(',');
            let newPrice='';
            tempArr.forEach(char=>{
                newPrice+=char;
            });

            price=Number(newPrice)*100;

        cartItems.push(
        {
            price_data: {
                currency: "INR",
                product_data: {
                    name: productObject.heading + " "+ (productObject.category).toUpperCase(),
                },
                unit_amount: price,
            },
            quantity: item.quantity,
        });
    }

    return cartItems;
}

const makePayment = async (req, res) => {
    const user = req.session.user;
    const username = user.username;
    const object = await cart.findOne({ 'username': username });
    const items = object.products;

    try {
        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: await getDetails(items),
            success_url: 'http://localhost:8000/success.html',
            cancel_url: 'http://localhost:8000/cancel.html',
    
        })
    
        res.json({ url: stripeSession.url })

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
    
}

module.exports = { makePayment };