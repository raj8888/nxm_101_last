const express = require("express")
const { userModel } = require("../models/users.models")
const jwt=require("jsonwebtoken")
const userRouter = express.Router()
const bcrypt = require('bcrypt')
require("dotenv").config()

userRouter.post("/register", async (req, res) => {
    const { name, email, pass, age } = req.body
    try {
        bcrypt.hash(pass, 8, async (err, hash) => {
            const user = new userModel({ name, email, pass: hash, age })
            await user.save()
            res.send("Registered")
        });
    } catch (err) {
        res.send("Error in registering the user")
        console.log(err)
    }
})


userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body
    try {
    const user = await userModel.find({email})
    if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, function (err, result) {
                if (result) {
                    const token = jwt.sign({userID:user[0]._id}, process.env.seckey);
                    res.send({ "msg": "Login Successfull", "token": token })
                } else { res.send("Wrong Credntials") }
            });
        } else {
            res.send("Wrong Credntials")
        }
    } catch (err) {
        res.send("Something went wrong")
        console.log(err)
    }
})


module.exports={
    userRouter
}