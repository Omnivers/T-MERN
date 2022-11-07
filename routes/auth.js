const router=require("express").Router();
const User=require('../models/User');

router.post('/',async (req,res)=>{
    const newUser= new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    });
    try{
        const savedUser= await newUser.save();
        res.status(201).json(savedUser);
    }catch(e){
        res.status(500).json(e); //On peut mieux definir l'erreur par exemple username required ou autre
    }
    

});

module.exports = router;