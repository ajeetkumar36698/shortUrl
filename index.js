const express = require("express")
const urlRouter = require("./routes/url.js")
const { connectToMongoDB } = require("./connect.js")
const URL = require("./models/url.js")
const app = express()

const PORT = 8000

app.use(express.json())
app.use('/url', urlRouter)

app.get('/:shortId', async (req, res) => {
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

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(() => console.log("mongodb connect"))




app.listen(PORT, () => {
    console.log(`server is runnning ${PORT}`)
})