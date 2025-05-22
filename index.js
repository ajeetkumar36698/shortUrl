const express = require("express")
const urlRouter = require("./routes/url.js");
const path = require("path")
const { connectToMongoDB } = require("./connect.js")
const URL = require("./models/url.js");
const { render } = require("ejs");
const staticRoute=require("./routes/staticRouter.js")
const userRoute=require("./routes/user.js");
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly, CheckAuth } = require("./middlewares/auth.js");
const app = express()

const PORT = 8000
app.set('view engine',"ejs")
app.set('views',path.resolve('./views'))
app.use(express.json())
// app.use("/",CheckAuth,staticRoute)
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use('/url',restrictToLoggedinUserOnly, urlRouter)
app.use('/user', userRoute)
app.use('/',CheckAuth,staticRoute)




app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const enrty = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push: {
                visitHistory:
                    { timestamp: Date.now() }
            }
        }
    )
    res.redirect(enrty.redirectUrl)

})

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(() => 
    console.log("mongodb connect")
);






app.listen(PORT, () => {
    console.log(`server is runnning ${PORT}`)
})