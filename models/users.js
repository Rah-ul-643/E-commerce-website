const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({

    username:{
        type:String,
        required: true,
    },
    password: {
        type:String,
        required:true,
        minLength: 8
    },
    firstname:{
        type: String,
        required: true
    },
    
    lastname: String,

    dob: Date
});

module.exports = mongoose.model("users", userSchema);