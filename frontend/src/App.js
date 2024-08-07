import './App.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  let [data,setData]=useState({"tsk":"","time":"","status":"pending"})
  let [tdata,setTdata]=useState([])
  let [f,setF]=useState(true)
  let [u,setU]=useState(true)
  let [id,setId]=useState()
  let [s,setS]=useState(false)
  let [fil,setFil]=useState([])
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  useEffect(()=>{
    axios.get("http://localhost:5000/getdata").then((res)=>{
      setTdata(res.data)
    })
  },[f])
  let add=()=>{
    if(data.tsk!==""){
    let t=new Date()
        axios.post("http://localhost:5000/add",{...data,"time":t.toLocaleTimeString()}).then((res)=>{
          if(res.data.msg!=="not saved"){
            setData({"tsk":"","time":"","status":"pending"})
            setF((f)=>!f)
          }
        })
        setS(false)
      }
      }

      let edit=(ind)=>{
        setData(tdata[ind])
        setU(false)
        setId(tdata[ind]._id)
      }

      let upd=()=>{
        axios.put("http://localhost:5000/getupd",{"_id":id,...data}).then(()=>{
          setF(f=>!f)
          setU(true)
          setData({"tsk":"","time":"","status":"pending"})

        })
        
      }

      let done=(ind)=>{
        let d={...tdata[ind],"status":"done"}
        console.log(d)
        axios.put("http://localhost:5000/done",{"_id":id,...d}).then(()=>{
          setF((f)=>!f)
          
        })
      }

      let search=()=>{
        let st=data.tsk
        let l=[]
        tdata.map((item)=>{
          if(item.tsk.startsWith(st)===true){
            l.push(item.tsk)
          }
        })
        setFil([...l])
        console.log(fil)
        setS(true)
      }

  return (
        <div className='main'><span>TO-DO List</span>
    <div className='inp'>
    <p>--Add your tasks here--</p>
      <input type="text" name="tsk" onChange={fun} value={data.tsk}/>
      <div className='btn'>
      {u&&<button onClick={add}>Add</button>}
      {!u&&<button onClick={upd}>Update</button>}
      {<button onClick={search}>search</button> } 
      </div>
      </div>
      <div>
      {!s&&<table className='tab1'>
        <thead><th>Your Tasks</th></thead>
        {
          tdata.map((item,index)=>{
            return(<tr>
            <td>{item.tsk}</td>
            <td>{item.time}</td>
            <td>{item.status!=="done"&&<button onClick={()=>{edit(index)}}>edit</button>}
            {item.status!=="done" &&<button onClick={()=>done(index)}>Done</button>}
            {item.status=="done" &&<i class="fa-solid fa-square-check tik"></i>}</td>
            </tr>
            )
          })
        }
      </table>}
      {s&& <ol className='tab2'>
        {
          fil.map((item)=>{
            return(
              <li>{item}</li>)
          })
        } 
      </ol>
      }
      </div>
     
    </div>
  )
}
export default App
