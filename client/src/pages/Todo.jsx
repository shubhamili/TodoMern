import React from 'react'
import axios from 'axios'
import { useEffect } from 'react';

export default function Todo() {
    const [todosText, setTodoText] = React.useState([]);
    const [newTodosText, setNewTodoText] = React.useState('')
    const [selected, setSelected] = React.useState('todo');





    useEffect(() => {
        getTodo()
    }, [])




    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    console.log('API_URL', API_URL)

    if (!API_URL) {
        console.error("API_URL is not defined. Please set VITE_API_URL in your .env file.");
    }

    const getTodo = async () => {
        console.log('Fetching todos...');
        const resp = await axios.get(`${API_URL}/api/todo/todos`)

        setTodoText(resp.data)
    }



    const addTodo = async () => {
        const res = await axios.post(`${API_URL}/api/todo/post`, { todo: newTodosText })
        if (res.status === 201) {
            setTodoText([...todosText, { todo: newTodosText }])
        }
        setNewTodoText("")
    }


    const deleteTodo = async (id) => {
        const res = await axios.delete(`${API_URL}/api/todo/delete/${id}`)
        if (res.status === 200) {
            setTodoText(todosText.filter((one) => one._id !== id))
        }
    }




    return (

        <div className="min-h-screen relative bg-gray-400 flex gap-3 flex-col items-center justify-center">

          
            <div className=" m-10 shadow-lg flex flex-col  rounded-2xl p-6 w-full max-w-md">

                <div>


                    <div className="flex flex-col md:flex-row gap-2 mb-4">
                        <input
                            className="flex-1 px-4 py-2 text-lg border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Enter todo..."
                            value={newTodosText}
                            onChange={(e) => setNewTodoText(e.target.value)}
                        />

                        <button
                            onClick={addTodo}
                            className="bg-blue-500 hover:bg-blue-600 text-gray-100 px-4 py-2 rounded-lg font-semibold transition"
                        >
                            +
                        </button>
                    </div>

                    <ul className="flex flex-col gap-3 w-full">
                        {todosText.map((one, i) => {
                            return (
                                <li
                                    key={i}
                                    className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg flex justify-between items-center w-full h-full"
                                >
                                    <span className="text-gray-700 wrap-break-word overflow-hidden">{one.todo}</span>
                                    <button
                                        onClick={() => deleteTodo(one._id)}
                                        className=" hover:bg-red-600 text-gray-100 px-3 py-1 rounded-lg font-semibold transition"
                                    >
                                        🗑️
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>



            </div>
        </div>

    )
}
