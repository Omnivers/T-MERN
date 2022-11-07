const router=require("express").Router();

router.get("/",(req,res)=>{
    res.send("Hello user !");
});
router.post("/post",(req,res)=>{
    const username=req.body.username;
    console.log(username);
})

module.exports = router;