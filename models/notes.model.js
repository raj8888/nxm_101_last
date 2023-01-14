const mongoose=require('mongoose')

const noteSchema=mongoose.Schema({
    title:String,
    note:String,
    category:String,
    userID:String
})

const notesModel=mongoose.model("notes",noteSchema)

module.exports={
   notesModel
}

// {
//     "title":"raj@gmail.com",
//     "note":"raj",
//     "category":"checking"
//   }