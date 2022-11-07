// Import
const express = require('express');
const app=express();
const mongoose = require('mongoose');
const dotenv=require('dotenv');
const userRoute=require('./routes/user');
const authRoute=require('./routes/auth');

// Config
dotenv.config();
app.use(express.json());
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Hello DBworld")).catch((e)=>{console.log(e)});

// Launch
app.listen(process.env.PORT,()=>{
    console.log("Hello Server")
})
app.use("/API/auth", authRoute);
app.use("/API/user", userRoute);
