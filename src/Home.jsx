    import React, { useEffect, useState } from 'react';
    import Create from './Create';
    import axios from 'axios';
    import '../src/index.css';

    function Home() {
        const [todos, setTodos] = useState([]);
        const [dark, setDark] = useState(false);

        const toggleDarkmode = () =>{
            setDark(!dark);
        }

        const handleCheck = (id) => {
            axios.put('http://localhost:3001/update/', { id })
                .then(result => console.log(result))
                .catch(err => console.log(err));
        }


        const handleDelete = (id) => {
            axios.put('http://localhost:3001/delete/', {todo_id: id})
            .then(() => {
                axios.get('http://localhost:3001/get')
                .then(result => setTodos(result.data))
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        }

        useEffect(() => {
            axios.get('http://localhost:3001/get')
                .then(result => setTodos(result.data))
                .catch(err => console.log(err));
        }, [todos]);

        useEffect(()=>{
            axios.put('http://localhost:3001/refresh')
            .then(result => console.log(result))
            .catch(err => console.log(err))
        },[])

        return (
            <div className={`${dark && "dark"}`} >
                <div className='flex justify-between px-6 text-black bg-gray-200 lg:px-40 dark:bg-black dark:text-white'>
                    <h1 className='py-4 text-2xl font-bold '>Task Tracker</h1>
                    <button className='px-3 py-1 my-4 text-gray-900 border-2 border-gray-900 dark:text-white dark:border-gray-300 rounded-xl' onClick={toggleDarkmode}>{dark ? <i class="fa-regular fa-lightbulb"></i> : <i class="fa-solid fa-lightbulb"></i>}</button>
                </div>
                <div className='flex justify-center min-h-screen px-10 py-4 text-black bg-gray-200 dark:text-white dark:bg-black'>
                    <div className='block w-full py-6 lg:py-20 lg:w-1/4'>
                        <div className='my-6'>
                            <Create />
                        </div>
                        <div className='mx-auto my-10'>
                        {
                            todos.length === 0 ? (
                                <div className='text-xl font-bold text-center'>No Records Found</div>
                            ) : (
                                todos.map((todo) => (
                                    <div key={todo._id} className='flex justify-between py-3 pl-2 pr-4 my-4 text-black bg-gray-400 dark:text-white dark:bg-gray-900 rounded-xl'>
                                        <div className='flex justify-around '>
                                            {todo.done ? 
                                            <i class="fa-regular fa-circle-dot mr-6 text-xl -mt-1"></i> :
                                            <div className='w-5 h-5 mr-6 bg-white border-2 border-black rounded-full dark:border-white dark:bg-gray-900' onClick={() => handleCheck(todo._id)}></div>}
                                            {todo.done ? <div className='-mt-1 text-lg'><s>{todo.task}</s></div> : <div className='-mt-1 text-lg'>{todo.task}</div>}
                                        </div>
                                        <i class="fa-solid fa-trash-can text-red-500 dark:text-red-400 text-lg mr-2 -mt-1 cursor-pointer" onClick={() =>handleDelete(todo._id)}></i>
                                    </div>
                                ))
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    export default Home;
