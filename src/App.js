import { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Task from './Components/Task/Task';
import Show from './Components/Show/Show';
import Update from './Components/Update/Update';
import Header from './Components/Header/Header';

function App() {
  const [todolist,setTodolist ] = useState([])
  const [updateObj,setUpdateObj] = useState({})
  const [showPop,setShowPop] = useState(false)
  useEffect(()=>{
    axios.get('http://localhost:8000/api/tasks').then(res=>{
      setTodolist(res.data)
    }).catch((err)=>console.log(err.message))
  },[])
  
  const addTask = (newTask) => {
    setTodolist([...todolist,newTask])
  }

  const isChange = (task) => {
    const newItem = [...todolist]
    newItem.forEach(item=>{
      if(item._id === task._id){
        item.isCompleted = task.isCompleted
      } 
    })
    setTodolist(newItem)
  }

  const deleteItem = (task) => {
    const newItem = todolist.filter(item=> item._id !== task._id)
    setTodolist(newItem)
  }

  const showEdit = (task) => {
    const newItem = [...todolist]
    newItem.forEach(item=>{
      if(item._id === task._id){
        item.todo = task.todo
      }
    })
    setTodolist(newItem)
  }

  console.log(updateObj)
  return (
    <div className="App">
      <Header />
      <Task addTask={addTask} />
      <Show todolist={todolist} isChange={isChange} deleteItem={deleteItem} tasktoUpadate={(task)=>setUpdateObj(task)} showPop={()=>setShowPop(!showPop)}/>

      {showPop && <Update updateObj={updateObj} showEdit={showEdit} removePop={()=>setShowPop(!showPop)} />}
    </div>
  );
}

export default App;
