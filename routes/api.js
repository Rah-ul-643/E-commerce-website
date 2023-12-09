// all api endpoints defined here

const express= require('express');
const router= express.Router();
const apiControllers= require("../controllers/apiControllers")
const cartController= require('../controllers/cartController');
const { makePayment } = require('../controllers/paymentSystem');

router.get('/products',apiControllers.getProducts);

router.get('/authStatus',apiControllers.getAuthStatus);

router.post('/addProductToCart/:id',cartController.addToCart);
router.get('/getCartCount',cartController.getCartCount);

router.get('/deleteItemFromCart/:id',cartController.deleteFromCart);

router.get('/updateQuantity/:id/:quantity',cartController.updateQuantity);

router.post('/create-checkout-session',makePayment);


module.exports= router;