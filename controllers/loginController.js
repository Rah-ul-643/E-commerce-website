const userController= require("./userController");
const bcrypt = require("bcrypt");

const login_get = (req,res)=>{
    res.render('login.ejs', {messages: req.flash()});
}

const login_post= async (req,res)=>{
    const {username,password}= req.body;

    if (!username || !password){
       
        req.flash('error', 'Username or Password cannot be empty!');
        res.redirect('/login');
        return;
    }

    const existing_user= await userController.checkExistingUser(username);
    
    if (existing_user){

        if (await bcrypt.compare(password,existing_user.password)){
            
            req.session.user=existing_user;
            console.log("successfully logged in");
            res.redirect('/');
        }
        
        else{
            req.flash('error',"Invalid Password");
            res.redirect('/login');
        }
    }

    else{
        req.flash('error', 'No account exists for the given credentials');
        res.redirect('/login');
    }
    
}

module.exports={
    login_get,
    login_post
};