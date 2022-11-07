const mongoose=require("mongoose");

const productSchema = new mongoose.Schema(
        {
            title:{type:String,required:true,unique:true},
            description:{type:String,required:true,unique:true},
            img:{type:String,required:true},
            price:{type:String,required:true},
            isAsmin: {
                type : Boolean,
                default : false
            }
        },{timestamps : true}

);
modules.exports=mongoose.model("Product",productSchema);