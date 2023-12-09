// all routes in the home page

const express= require('express');
const router= express.Router();

const loginController= require("../controllers/loginController");
const checkLogStatus= require("../middlewares/LogStatus");
const registerController= require('../controllers/registerController');
const logoutController=require('../controllers/logout');

// routes starts here

router.get("/",checkLogStatus,(req,res)=>{
    res.sendFile('project.html',{root:'./public'});
})

router.get('/login',checkLogStatus,loginController.login_get);
router.post('/login',loginController.login_post);

router.get('/logout',logoutController);

router.get('/register',checkLogStatus,registerController.register_get);
router.post('/register',registerController.register_post);

module.exports= router;

