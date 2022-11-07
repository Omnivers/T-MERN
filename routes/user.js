const User = require("../models/User");
const {verifyToken,verifyTokenAuth} = require("./verifyToken");

const router=require("express").Router();

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


module.exports = router;