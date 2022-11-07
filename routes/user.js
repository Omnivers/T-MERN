const User = require("../models/User");
const {verifyToken,verifyTokenAuth, verifyTokenAdmin} = require("./verifyToken");

const router=require("express").Router();

// EDIT USER
router.put('/:id',verifyTokenAuth,async(req,res)=>{
    if(req.body.password){
        req.body.password= CryptoJS.AES.encrypt(req.body.password, process.env.PASSCRYPT).toString()
    }
    try{
        const updatedUser= await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true});
        res.status(200).json(updatedUser)
    }catch(e){
        res.status(500).json(e)
    }
})

//DELETE USER
router.delete('/:id',verifyTokenAuth,async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted !")
    }catch(e){
        res.json(500).json(e)
    }
})

//GET USER
router.get('/find/:id',verifyTokenAdmin,async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const {password,...others}=user._doc; // to prevent showing the password in our res.json down below
        res.status(200).json(others);
    }catch(e){
        res.json(500).json(e)
    }
})

//GET ALL USERS
router.get('/',verifyTokenAdmin,async(req,res)=>{
    try{
        const users = await User.find()
        res.status(200).json(users);
    }catch(e){
        res.json(500).json(e)
    }
})


module.exports = router;