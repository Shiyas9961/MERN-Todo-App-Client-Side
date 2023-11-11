import React from 'react'
import './Show.css';
import axios from 'axios'
import {FaEdit,FaTrashAlt,FaCheckSquare} from 'react-icons/fa'

function Show(props) {
    const todolist = props.todolist.map((task,index)=>{
            const isComplete = (item) => {
                axios.put(`https://todo-app-server-bcrj.onrender.com/api/tasks/${item._id}`,{
                    _id : item._id,
                    todo : item.todo,
                    isCompleted : !item.isCompleted,

                }).then(res=>{
                    props.isChange(res.data)}).catch(err=>console.log(err.message))
            }

            const removeItem = (id) => {
                axios.delete(`https://todo-app-server-bcrj.onrender.com/api/tasks/${id}`).then(res=>{
                    console.log(res)
                    props.deleteItem(res.data)
                }).catch(err=>console.log(err.message))
            }

        return (
            <li key={index}>
                <div className='fisrst-items'>
                    <FaCheckSquare className={task.isCompleted ? 'isComplete' : 'checkIcon'} />
                    <p className={task.isCompleted ? 'completed' : ''} onClick={()=>isComplete(task)}>{task.todo}</p>
                </div>     
                <div>
                    <FaEdit className='edit' onClick={()=>{
                        props.tasktoUpadate(task)
                        props.showPop()
                        }}/>
                    <FaTrashAlt className='trash' onClick={()=>removeItem(task._id)}/>
                </div>
            </li>
        )
    })
  return (
    <div className='showAll'>
        <ul>
            {todolist}
        </ul>
    </div>
  )
}

export default Show
