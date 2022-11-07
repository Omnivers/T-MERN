const router=require("express").Router();
const Product=require('../models/Product');

const {verifyToken,verifyTokenAuth, verifyTokenAdmin} = require("./verifyToken");

router.post("/", verifyTokenAdmin, async(req,res)=>{
    const newProduct = new Product(req.body)
    try{
        const savedProduct= await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(e){
        res.status(500).json(e)
    }
})




module.exports = router;