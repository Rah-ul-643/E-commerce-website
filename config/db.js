const mongoose = require("mongoose");
const dbURI= process.env.dbURI;
const connectdb= async ()=>{
    try {
        await mongoose.connect(dbURI);
        console.log("Successfully Connected to Database");

    } catch (error) {
        console.log("There has been an error in connecting to the database:/n "+ error);
    }
    
}

module.exports= connectdb;
