const bcrypt= require("bcrypt");
const registerUser= require("./userController");

const register_get= (req,res)=>{
    res.render('register.ejs',{messages: req.flash()});
}

const register_post = async (req,res)=>{

    let user = req.body;
    const reqFields= ['firstname','username','password'];

    for (const field of reqFields){
        
        if (!user[field]){
            req.flash('error', ` * (Required) fields cannot be empty!`);
            res.redirect('/register');
            return;
        }
    }

    const duplicateUser= await registerUser.checkExistingUser(user.username);

    if (duplicateUser) {
        req.flash('emailError','Email already in use!!!');
        res.redirect('/register');
    }

    else
    {
        try {
            const encryptedPassword = await bcrypt.hash(user.password,10);
            user.password=encryptedPassword;

            await registerUser.createUser(user);
            console.log("New User Created");
            res.redirect('/login');

        } catch (error) {
            const message = error.message;
            req.flash('error',message);
            res.redirect('/register');

        }
    }
}

module.exports = {
    register_post,
    register_get
};
