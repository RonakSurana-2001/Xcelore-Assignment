const express=require("express")
const app=express()
const port=process.env.PORT || 4000
const cors=require("cors")
const dotenv=require("dotenv")
const connectToDb=require("./db/db.js")

dotenv.config()

connectToDb()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.use("/user",require("./routes/user"))

app.listen(port,()=>{
    console.log("Backend is Working on PORT",port)
})