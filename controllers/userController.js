const Users = require("../models/users");
const bcrypt= require('bcrypt');

const createUser = async (user)=>{

    const newUser = new Users(user);
    await newUser.save();

}

const checkExistingUser= async (username)=>{
    const user= await Users.findOne( {username: username} );
    return user;
}

const updatePassword= async (username,password)=>{

    const encryptedPassword= await bcrypt.hash(password,10);
    await Users.findOneAndUpdate({username: username},{ $set: {password:encryptedPassword}});
    console.log("Password updated");

}

module.exports={createUser,checkExistingUser,updatePassword};