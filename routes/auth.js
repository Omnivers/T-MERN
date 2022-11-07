const router=require("express").Router();
const User=require('../models/User');
const CryptoJs=require('crypto-js');


router.post('/register',async (req,res)=>{
    const newUser= new User({
        username:req.body.username,
        email:req.body.email,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.PASSCRYPT).toString()
    });
    try{
        const savedUser= await newUser.save();
        res.status(201).json(savedUser);
    }catch(e){
        res.status(500).json(e); //On peut mieux definir l'erreur par exemple username required ou autre
    }
});

//LOGIN

router.post("/login", async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username});
        if(!user){
            res.status(401).json("Wrong Username")
            return;
        }
        const hashedPassword=CryptoJs.AES.decrypt(user.password, process.env.PASSCRYPT);
        const password=hashedPassword.toString(CryptoJs.enc.Utf8);
        if(password !== req.body.password){
            res.status(401).json("Wrong Password");
            return;
        }
        res.status(200).json(user);
    }catch(e){
        res.status(500).json(e);
    }
})



module.exports = router;