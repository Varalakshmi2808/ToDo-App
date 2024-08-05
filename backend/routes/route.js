const {add,getdata,getres,getupd,done}=require("../controller/control")
let express=require("express")
let route=new express.Router()
route.post("/add",add)
route.get("/getdata",getdata)
route.get("/getres/:id",getres)
route.put("/getupd",getupd)
route.put("/done",done)
module.exports=route