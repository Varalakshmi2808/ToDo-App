const tskmodel=require("../model/task")
let {v4:uuid}=require("uuid")
let add=async(req,res)=>{
    try{
        let data=new tskmodel({...req.body,"_id":uuid()})
        await data.save()
        res.json({"msg":"saved"})      
    }
    catch(err){
        res.json({"msg":"not saved"})
        
    }
}
let getdata=async(req,res)=>{
    try{
        let data=await tskmodel.find({})
        res.json(data)
    }
    
    catch{

    }
}
let getres=async(req,res)=>{
    try {
        let data=await tskmodel.findById({"_id":req.params.id})
        res.json(data)
    } catch (error) {
        
    }
}

let getupd=async(req,res)=>{
    let data={...req.body}
    delete data._id
    try{
        await tskmodel.findByIdAndUpdate({"_id":req.body._id},data)
        res.json("update done")
    }
    catch(err){
        console.log(err)
        res.json("not done")
    }
}
let done=async(req,res)=>{
    let data={...req.body}
    delete data._id
    try{
        await tskmodel.findByIdAndUpdate({"_id":req.body._id},data)
        console.log(req.body)
        res.json("status updated")
    }
    catch(err){
        console.log(err)
        res.json("not updated status")
    }
}
module.exports={add,getdata,getres,getupd,done}

