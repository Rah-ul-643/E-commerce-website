const mongoose= require("mongoose");

const otpSchema= new mongoose.Schema({

    code:{
        type:String,
        required: true,
    },
    otp: {
        type:String,
        required:true,
    },
    username:{
        type: String,
        required: true
    },
    expiration:{
        type: Date,
        default: Date.now() + 5*60*1000  //5 mins
    }
    
});

module.exports = mongoose.model("otpStorage", otpSchema);