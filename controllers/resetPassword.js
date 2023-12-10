const userController= require("./userController");
const otpController= require('./otpController');
const urlHandler= require('../middlewares/urlHandler');

const otpGenerator = require('otp-generator');

const nodemailer= require('nodemailer');


const gmail= process.env.gmail;
const password= process.env.password;

const sendMail= (otp,username,gmail,password)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        secure: true,
        auth: {
            user: gmail,
            pass: password,
        },
    });

    const htmlContent=
    `<p> Use the OTP below to reset your Password: </p>
    <h1> ${otp} </h1>
    <p> Don't share this OTP with anyone. 
    Our customer service team will never ask you for your password, OTP, credit card, or banking info.
    </p>`  

    // Email content
    const mailOptions = {
        from: "theborginandburkesstore@gmail.com",
        to: username,
        subject: "Password Reset Assistant",
        html:htmlContent
    };

    
    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
        console.error("Error sending email: ", error);
        } else {
        console.log("Email sent: " + info.response);
        }
    });  
}

const userVerifier= async (req,res)=>{
    
    const username= req.body.username;

    if (await userController.checkExistingUser(username)){

        const securityObject= await otpController.storedObject(username);

        if (!securityObject){
            console.log("username verified");
            const otp= otpGenerator.generate(6,{specialChars:false});
            const code= otpGenerator.generate(30);

            const newsecurityObject= {'code':code,'username':username,'otp':otp};
            await otpController.createObject(newsecurityObject);

            sendMail(otp,username,gmail,password);
            console.log("OTP: "+otp);

            const encodedCode = encodeURIComponent(code);
            const encodedUsername= encodeURIComponent(username);
            res.redirect(`/user/reset-password/verify-otp?code=${encodedCode}&username=${encodedUsername}`);
        }
        else{
            const code=securityObject.code;
            const encodedCode = encodeURIComponent(code);
            const encodedUsername= encodeURIComponent(username);
            res.redirect(`/user/reset-password/verify-otp?code=${encodedCode}&username=${encodedUsername}`);
        }
        
    }
    else{
        req.flash('error','No user found with the entered email id');
        res.redirect('/user/reset-password');
    }
    

}
const otpVerifierGet= async (req,res)=>{
    const urlObject= urlHandler.urlDecoder(req);
    const username= urlObject.searchParams.get('username');
    await otpController.updateCode(username);
    res.render('reset-password-verifyotp.ejs',{messages:req.flash(),username:username});
}

const otpVerifier=async (req,res)=>{
    
    const enteredOtp = req.body.otp;
    const username= req.body.username;
    const storedObject= await otpController.storedObject(username);
    const code= storedObject.code;
    const otp= storedObject.otp;

    const encodedCode = encodeURIComponent(code);
    const encodedUsername= encodeURIComponent(username);

    if (enteredOtp===otp){
        
        if (storedObject.expiration > Date.now()){
            console.log("Otp Verified");
            res.redirect(`/user/reset-password/new-password?code=${encodedCode}&username=${encodedUsername}`);
        }
        else{
            await otpController.deleteObject(username);
            req.flash('error',"OTP expired. Go back to resend otp");
            res.redirect(`/user/reset-password`);
        }
    }
    else{
        req.flash('error','Otp does not match');
        res.redirect(`/user/reset-password/verify-otp?code=${encodedCode}&username=${encodedUsername}`);
    }

}
const changePasswordGet= async (req,res)=>{
    const urlObject= urlHandler.urlDecoder(req);
    const username= urlObject.searchParams.get('username');
    res.render('reset-password.ejs',{messages:req.flash(),username:username});

}
const changePassword= async (req,res)=>{

    const fieldValues= req.body;
    const username= fieldValues.username;
    const storedObject= await otpController.storedObject(username);
    const code=storedObject.code;

    const encodedCode = encodeURIComponent(code);
    const encodedUsername= encodeURIComponent(username);

    await otpController.deleteObject(username);

    if (fieldValues.password===fieldValues.rePassword){
        await userController.updatePassword(username,fieldValues.password);
        res.redirect('/');
    }

    else{
        req.flash('error','Password and Re-entered Password do not match!');
        res.redirect(`/user/reset-password/new-password?code=${encodedCode}&username=${encodedUsername}`);
    }
}


module.exports={changePassword,changePasswordGet,userVerifier,otpVerifier,otpVerifierGet};
