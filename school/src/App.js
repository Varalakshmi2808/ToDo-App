// import React, {useState} from 'react'
import './App.css'
// import axios from 'axios'
// const App = () => {

//   let [data,setData]=useState("")
//   let [list,setList]=useState([])
//   let [f,setF]=useState(true)
//   let [ip,setIp]=useState()
//   let [d,setD]=useState([])
//   let [s,setS]=useState(false)
//   let [fil,setFil]=useState([])
//   let [dt,setDt] = useState([])
//   let fun=(e)=>{
//     setData(e.target.value)
//   }
//   let add=()=>{
//     const time = new Date()
//     if(data!==""){
//       axios.post("http://localhost:5000/add",data).then((res)=>{})
//     setList([...list,data])
//     setD([...d,false])
//     setData("")
//     setS(false)
//     setDt([...dt,time.toLocaleTimeString()])
//     }
//   }
//   let edit=(ind)=>{
//     setData(list[ind])
//     setF(false)
//     setIp(ind)
//   }
//   let upd=()=>{
//     const time = new Date()
//     list[ip]=data
//     setList([...list])
//     setData("")
//     setF(true)
//     dt[ip]=time.toLocaleTimeString()
//     setDt([...dt])
//   }
//   let done=(ind)=>{
//     d[ind]=true
//     setD([...d])
//   }
//   let search=()=>{
//     console.log(list)
//     let l=[]
//     list.map((i)=>{
//       if(i.startsWith(data)===true){
//         l.push(i)
//       }
//     })
//     setFil([...l])
//     setS(true)
//   }
//   return (
//     <div className='main'><span>TO-DO List</span>
//     <div className='inp'>
//     <p>--Add your tasks here--</p>
//       <input type="text" onChange={fun} value={data}/>
//       <div className='btn'>
//       {f&&<button onClick={add}>Add</button>}
//       {!f&&<button onClick={upd}>Update</button>}
//       <button onClick={search}>search</button>
//       </div>
//       </div>
//       {list.length!=0&&<div>
//       {!s&&<table className='tab1'>
//         <thead><th>Your Tasks</th></thead>
//       {
//         list.map((item,index)=>{
//           return(
//           <tr>
//          <td>{item}</td>
//           {!d[index]&&<td><button onClick={()=>edit(index)}>Edit</button></td>}
//           {!d[index]&&<td><button onClick={()=>done(index)}>done</button></td>}
//           {d[index]&&<td><i class="fa-solid fa-square-check tik"></i></td>}
//           {!d[index] && <td>{dt[index]}</td> }
//           </tr>
//         )
//         })
//       }
//       </table>}
//       </div>}
//       {s&&<table className='tab2'>
//         <thead><th>Filtered Tasks</th></thead>
//         {
//           fil.map((item)=>{
//             return(
//             <tr><td>{item}</td></tr>)
//           })
//         }
//         </table>}
//     </div>
//   )
// }

// export default App

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
    let t=new Date()
    setData({...data,"time":t.toLocaleTimeString()})
        axios.post("http://localhost:5000/add",data).then((res)=>{
          if(res.data.msg!=="not saved"){
            setData({"tsk":"","time":"","status":"pending"})
            setF((f)=>!f)
          }
        })
        setS(false)
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
            {item.status!=="done"&&<td><button onClick={()=>{edit(index)}}>edit</button></td>}
            {item.status!=="done" &&<td><button onClick={()=>done(index)}>Done</button></td>}
            {item.status=="done" &&<td><i class="fa-solid fa-square-check tik"></i></td>}
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