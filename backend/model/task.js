let mongoose=require("mongoose")
let task=new mongoose.Schema({
    "_id":String,
    "tsk":String,
    "time":String,
    "status":String
})
let tskmodel=mongoose.model("tasks",task)
module.exports=tskmodel