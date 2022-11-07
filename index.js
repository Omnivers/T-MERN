const express = require('express');
const app=express();
const mongoose = require('mongoose');
const dotenv=require('dotenv');
const userRoute=require('./routes/user');
const authRoute=require('./routes/auth');

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Hello DBworld")).catch((e)=>{console.log(e)});

app.listen(process.env.PORT,()=>{
    console.log("Hello Server")
})
app.use(express.json());
app.use("/API/auth", authRoute);
