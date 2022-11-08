const mongoose=require("mongoose");


const ProductSchema = new mongoose.Schema(
        {
            title:{type:String,required:true,unique:true},
            type:{type:Array},
            description:{type:String},
            img:{type:String},
            price:{type:Number,required:true},
            rating:{
                type : Number,
                default : 0
            },
            warranty_years:{
                type : Number,
                default : 1
            },
            available:{
                type : Boolean,
                default : true
            }
        },{timestamps : true}

);
module.exports=mongoose.model("Product",ProductSchema);