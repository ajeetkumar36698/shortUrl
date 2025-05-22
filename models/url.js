const mongoose=require("mongoose");
const urlSchema=mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectUrl:{
        type:String,
        required:true,


    },
    visitHistory:[{timestamp:{type:Number}}],
    createBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }


},{timestamp:true})

const URL=mongoose.model('url',urlSchema)
module.exports=URL