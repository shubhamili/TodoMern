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
    console.log(resp);
  }

  const addTodo = async () => {
    const res = await axios.post("http://localhost:5000/api/todo/post", { todo: newTodosText })
    console.log("res.status", res.status);
    console.log("newTodosText", newTodosText);

    if (res.status === 201) {
      setTodoText([...todosText, { todo: newTodosText }])
    }

  }
  console.log(newTodosText);


  return (
    <>
      <div>
        <input
          style={{ padding: 15, borderRadius: 5, fontSize: 25 }}
          type="text"
          placeholder='enter todo'
          id='input'
          value={newTodosText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />

        <button onClick={addTodo}>Add</button>
      </div>
      <div>
        {/* <h1>List :</h1> */}
        {/* <button onClick={addTodo}>click</button> */}
        <ul>
          {todosText.map((one) => {
            return (
              <li key={one._id}>{one.todo}</li>
            )
          })}
        </ul>

      </div>
    </>
  )
}

export default App