import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState(null); // Track which todo is being edited
  const [updatedText, setUpdatedText] = useState(""); // Store updated text

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return alert("Todo cannot be empty!");

    try {
      const response = await axios.post("http://localhost:5000/post", {
        todo: newTodo,
      });

      setTodos([...todos, response.data]);
      setNewTodo(""); // Clear the input
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const startEditing = (todo) => {
    setEditTodo(todo._id);
    setUpdatedText(todo.todo);
  };

  const updateTodo = async (id) => {
    if (!updatedText.trim()) return alert("Todo cannot be empty!");

    try {
      const response = await axios.put(`http://localhost:5000/update/${id}`, {
        todo: updatedText,
      });

      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setEditTodo(null); // Reset edit mode
      setUpdatedText("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>

      {/* Add Todo Input */}
      <div className="input-wrapper">
        <input
          type="text"
          className="todo-input"
          placeholder="Enter a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="add-btn" onClick={addTodo}>
          Add Todo
        </button>
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">


            {editTodo === todo._id ? (
              <input
                type="text"
                value={updatedText}
                onChange={(e) => setUpdatedText(e.target.value)}
                className="edit-input"
              />
            ) : (
              <span>{todo.todo}</span>
            )}

            <div>
              {editTodo === todo._id ? (
                <button className="save-btn" onClick={() => updateTodo(todo._id)}>
                  Save
                </button>
              ) : (
                <button className="edit-btn" onClick={() => startEditing(todo)}>
                  <FaEdit />
                </button>
              )}
              <button className="delete-btn" onClick={() => deleteTodo(todo._id)}>
                <MdDelete />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
