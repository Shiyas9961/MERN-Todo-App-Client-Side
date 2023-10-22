import React, { useState } from 'react'
import axios from 'axios'
import './Task.css'

function Task(props) {
    const [task,setTask] = useState('')
    const addTask = () => {
        if(task.trim()===''){
            return
        }else{
            axios.post('http://localhost:8000/api/tasks',{
                todo : task,
                isCompleted : false
            }).then(res=>{
                props.addTask(res.data)
                setTask("")
            }).catch(err=>console.log(err.message))
        }
    }
  return (
    <div className='addTask'>
        <input type="text" value={task} placeholder='Type task...' onChange={(e)=>setTask(e.target.value)}/>
        <button onClick={()=>addTask()}>Add Task</button>
    </div>
  )
}

export default Task