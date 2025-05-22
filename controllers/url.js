const shortid = require('shortid');
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req,res) {
    // console.log(req.body)
    const body=req.body
    // console.log(body)

    if(!body.url) {
        return res.status(404).json({error:"url is require"})
    }
    const shortID=shortid();

    await URL.create({
    shortId:shortID,
    redirectUrl:body.url,
    visitHistory:[],
    createBy:req.user._id
    })
    return res.render('home',{id:shortID})
    // return res.json({id:shortID})

    
}

async function handleAnalytics(req,res) {
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId})
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory
    })
}

module.exports={handleGenerateNewShortUrl,handleAnalytics}