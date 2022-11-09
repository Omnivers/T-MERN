// Import
const express = require('express');
const app=express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv=require('dotenv');
const userRoute=require('./routes/user');
const authRoute=require('./routes/auth');
const prodRoute=require('./routes/product');
const port =3000;

// Config
dotenv.config();
app.use(cors('*'));
app.use(express.json());
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Hello DBworld")).catch((e)=>{console.log(e)});

// Launch
app.get('/',(req,res)=>{
    res.json("Hello World")
})
app.listen(process.env.PORT || port,()=>{
    console.log("Hello Server")
})
app.use("/API/auth", authRoute);
app.use("/API/user", userRoute);
app.use("/API/products",prodRoute);