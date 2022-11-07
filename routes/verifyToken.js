const JWT=require("jsonwebtoken");

const verifyToken =(req,res,next)=>{
    const authHeader = req.headers.token
    if(authHeader){
        const token=authHeader.split(" ")[1];
        JWT.verify(token,process.env.PASSJWT,(e,user)=>{
            if(e){return res.status(401).json("Wrong Token")}
            req.user=user;
            next();
        })
    }else{
        return res.status(401).json("You're not authentificated")
    }
}
const verifyTokenAuth=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(401).json("You're not allowed to do this action")
        }
    })
}
const verifyTokenAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(401).json("You're not allowed to do this action")
        }
    })
}

module.exports={verifyToken, verifyTokenAuth, verifyTokenAdmin};