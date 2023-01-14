const express = require("express")
const { notesModel} = require("../models/notes.model")
const notesRouter = express.Router()

//for all the following things authentication is required.


notesRouter.get("/", async(req, res) => {
    try {
        let data=await notesModel.find()
        res.send(data)
    } catch (error) {
        console.log(error)
        res.send({"msg":"you are not allowed"})
    }
})

notesRouter.get("/:id", async(req, res) => {
    let id=req.params.id
    let note=await notesModel.findOne({_id:id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
    try {
        if(userID_in_note!==userID_making_req){
            res.send({"msg":"you are not allowed"})
        }else{
            let data=await notesModel.findById({_id:id})
            res.send(data)
        }
        
    } catch (error) {
        console.log(error)
        res.send({"msg":"you are not allowed"})
    }
})

notesRouter.post("/create", async (req, res) => {
    try {
    const payload = req.body
    console.log(payload)
    const new_note = new notesModel(payload)
    await new_note.save()
    res.send({ "msg": "Note Created" })
    } catch (error) {
        console.log(error)
        res.send({"msg":"you are not allowed"})
    }
})

notesRouter.patch("/update/:id", async(req, res) => {
    let id=req.params.id
    let payload=req.body
    let note=await notesModel.findOne({_id:id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
    try {
        if(userID_in_note!==userID_making_req){
            res.send({"msg":"you are not allowed"})
        }else{
            await notesModel.findByIdAndUpdate({_id:id},payload)
            res.send({"msg":"you are allowed"})
        }
        
    } catch (error) {
        console.log(error)
        res.send({"msg":"you are not allowed"})
    }
})

notesRouter.delete("/delete/:id", async(req, res) => {
    let id=req.params.id
    let note=await notesModel.findOne({_id:id})
    const userID_in_note=note.userID
    const userID_making_req=req.body.userID
    try {
        if(userID_in_note!==userID_making_req){
            res.send({"msg":"you are not allowed"})
        }else{
            await notesModel.findByIdAndDelete({_id:id})
            res.send({"msg":"you are allowed"})
        }
        
    } catch (error) {
        console.log(error)
        res.send({"msg":"you are not allowed"})
    }
})


module.exports = {
    notesRouter
}
