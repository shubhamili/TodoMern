import React from 'react'
import axios from 'axios'
import { useEffect } from 'react';
const App = () => {
  const [todosText, setTodoText] = React.useState([]);
  const [newTodosText, setNewTodoText] = React.useState(null)

  useEffect(() => {
    getTodo()
  }, [])

  const getTodo = async () => {
    const resp = await axios.get("http://localhost:5000/api/todo/todos")
    setTodoText(resp.data)
    // console.log(resp);
  }

  const addTodo = async () => {
    const res = await axios.post("http://localhost:5000/api/todo/post", { todo: newTodosText })
    // console.log("res.status", res.status);
    // console.log("newTodosText", newTodosText);

    if (res.status === 201) {
      setTodoText([...todosText, { todo: newTodosText }])
    }

  }
  // console.log(newTodosText);


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Todo App
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter todo..."
            value={newTodosText}
            onChange={(e) => setNewTodoText(e.target.value)}
          />

          <button
            onClick={addTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todosText.map((one) => {
            return (
              <li
                key={one._id}
                className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg flex justify-between items-center"
              >
                <span className="text-gray-700 w-3">{one.todo}</span>
              </li>
            );
          })}
        </ul>

      </div>
    </div>
  )
}

export default App