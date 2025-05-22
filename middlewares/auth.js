const User = require("../models/user");
const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req,res,next) {
    // console.log(req)
    const userId=req.cookies?.uid;
    if(!userId) return res.redirect("/login");
    const user=getUser(userId)
    if(!user) return res.redirect("/login");
    req.user=user;
    next()

}
async function CheckAuth(req,res,next) {
    const userId=req.cookies?.uid;
    const user=getUser(userId)
    req.user=user;
    next()
    
}



module.exports={
    restrictToLoggedinUserOnly,
    CheckAuth
}