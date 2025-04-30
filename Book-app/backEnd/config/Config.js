// import mongoose from "mongoose";
// import dotenv from "dotenv";

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDb = async() =>{
    try{        
        console.log(process.env.MONGO_URL)
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connected successfully");
    }
    catch(err){
        console.log("Error connecting to MongoDB:", err.message);
        process.exit(1);
        // console.log(err.massage);
    }
}

// export default connectDb;
module.exports = connectDb;
