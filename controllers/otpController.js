const { generate } = require("otp-generator");
const otpStorage = require("../models/otp-Storage");

const createObject = async (object)=>{

    const otpCode = new otpStorage(object);
    await otpCode.save();

}

const storedObject= async (username)=>{
    const object= await otpStorage.findOne( {username: username} );
    return object;
}

const updateCode= async (username)=>{
    const newCode= generate(30);
    await otpStorage.findOneAndUpdate({username: username},{ $set: {code:newCode}});
    console.log('Code updated');
}

const deleteObject= async(username)=>{
    await otpStorage.findOneAndDelete({username:username});
    console.log('otp expired');
}

module.exports= {createObject,storedObject,updateCode,deleteObject};