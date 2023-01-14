const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    age:Number
})

const userModel=mongoose.model("users",userSchema)

module.exports={
    userModel
}

// {
//     "name":"",
//     "email":"",
//     "pass":"",
//     "age":23
//   }

// {
//     "email":"raj@gmail.com",
//     "pass":"raj"
//   }