const router=require("express").Router();
const Product=require('../models/Product');

const {verifyToken,verifyTokenAuth, verifyTokenAdmin} = require("./verifyToken");

//Create product
router.post("/", verifyTokenAdmin, async(req,res)=>{
    const newProduct = new Product(req.body)
    try{
        const savedProduct= await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(e){
        res.status(500).json(e)
    }
})

//Edit product
router.put('/:id',verifyTokenAdmin,async(req,res)=>{
    try{
        const updatedProduct= await Product.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true});
        res.status(200).json(updatedProduct)
    }catch(e){
        res.status(500).json(e)
    }
})

//DELETE Product
router.delete('/:id',verifyTokenAdmin,async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted !")
    }catch(e){
        res.json(500).json(e)
    }
})

//GET Product
router.get('/find/:id',async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json(product);
    }catch(e){
        res.json(500).json(e)
    }
})

//GET ALL Products
router.get('/',async(req,res)=>{
    const queryNew=req.query.new;
    const queryType=req.query.type;
    try{
         let products;
         if(queryNew){
            products=await Product.find().sort({createdAt:-1}).limit(1)
         }else if(queryType){
            products=await Product.find({type:{
                $in:[queryType]
            }})
         }else{
            products= await Product.find()
         }
        res.status(200).json(products);
    }catch(e){
        res.json(500).json(e)
    }
})



module.exports = router;