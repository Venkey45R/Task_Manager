import React, { useState } from 'react'
import axios from 'axios';
function  Create() {
  const [task,setTask] = useState();
  const handleAdd = () =>{
    axios.post('http://localhost:3001/add',{task : task})
    .then(result => {console.log(result); setTask("")})
    .catch(err =>{console.log(err)})
  }
  return (
    <div className='flex'>
        <input type='text' className='w-full h-10 px-2 mr-1 bg-gray-400 border-b-2 border-black rounded placeholder:text-gray-800 dark:placeholder:text-white dark:border-white dark:bg-gray-900 focus:outline-none text-gray-50' placeholder='Add New Task' value={task} onChange={(e) =>{setTask(e.target.value)}}/>
        <div className='flex justify-center h-10 '>
            <button className='w-10 h-10 bg-red-500 border-2 border-white rounded-full dark:bg-red-400 ' onClick={handleAdd}><i class="fa-solid font-bold text-center fa-plus text-lg text-white"></i></button>
        </div>
    </div>
  )
}

export default Create;