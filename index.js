const express = require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const { connection } = require("./config/db")
const{notesRouter}=require("./routes/notes.route")
const{userRouter}=require("./routes/users.route")
const{authenticate}=require("./middleware/authentication.middleware")
require("dotenv").config()
const app = express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})


app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",notesRouter)



app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Connected to the db")
    }catch(err){
        console.log(err)
    }
    console.log(`Running at Port ${process.env.port}`)
})