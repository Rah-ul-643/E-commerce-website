// all user related routes like profile,dashboard,edit profile...

const express= require('express');
const router= express.Router();
const resetPassword= require('../controllers/resetPassword');
const urlHandler = require('../middlewares/urlHandler');
const cartController= require('../controllers/cartController');

router.get('/profile',(req,res)=>{
    res.sendFile('profile.html',{root:'./public'})
})

router.get('/cart',cartController.getCartPage);

router.get('/reset-password',(req,res)=>{
    res.render('reset-password-email.ejs',{messages:req.flash()});
})

router.post('/reset-password',resetPassword.userVerifier);

router.get('/reset-password/verify-otp', resetPassword.otpVerifierGet);

router.post('/reset-password/verify-otp',resetPassword.otpVerifier);
 
router.get('/reset-password/new-password',urlHandler.verifyCode,resetPassword.changePasswordGet);

router.post('/reset-password/new-password',resetPassword.changePassword);

module.exports= router;