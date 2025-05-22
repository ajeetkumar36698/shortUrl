const express = require("express");
const URL = require("../models/url");
const router=express.Router();
router.get('/',async(req,res)=>{
    if(!req.user) return res.redirect("/login")
    const allurls=await URL.find({createBy:req.user._id})
    // console.log(allurls)
    return res.render('home',{urls:allurls})

})
router.get('/singup',async(req,res)=>{

    return res.render('singup')

})
router.get('/login',async(req,res)=>{

    return res.render('login')

})

module.exports=router