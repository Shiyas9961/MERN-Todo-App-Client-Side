import React,{useState} from 'react'
import "./Update.css"
import axios from 'axios'

function Update(props) {
    const [updateVal,setrUpdateVal] = useState(props.updateObj.todo)


    const updateItem = () => {
        if(updateVal.trim() === '' || props.updateObj.todo === updateVal){
            props.removePop()
            return
        }else{
            axios.put(`http://localhost:8000/api/tasks/${props.updateObj._id}`,{
                _id : props.updateObj.id,
                todo : updateVal,
                isCompleted : props.updateObj.isCompleted
            }).then(res=>{
                props.showEdit(res.data)
                props.removePop()
            })
        }
    }
  return (
    <div className='popUp'>
        <div className='popUp-Content'>
            <input type="text" value={updateVal} onChange={(e)=>setrUpdateVal(e.target.value)}/>
            <button onClick={updateItem}>Update</button>
        </div>
    </div>
  )
}

export default Update