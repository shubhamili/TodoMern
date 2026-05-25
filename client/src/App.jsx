import React from 'react'
import axios from 'axios'
import { useEffect } from 'react';
const App = () => {
  const [todosText, setTodoText] = React.useState([]);
  const [newTodosText, setNewTodoText] = React.useState(null)
  const [selected, setSelected] = React.useState('todo');
  const [file, setFile] = React.useState('');
  const [preview, setPreview] = React.useState('');


  useEffect(() => {
    getTodo()
  }, [])



  const API_URL = import.meta.env.VITE_API_URL;
  console.log('API_URL', API_URL)

  if (!API_URL) {
    console.error("API_URL is not defined. Please set VITE_API_URL in your .env file.");
  }

  const getTodo = async () => {
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


  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };


  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    alert("Uploading file: " + file.name);
  };

  return (
    <div className="min-h-screen relative bg-gray-400 flex gap-3 flex-col items-center justify-center">

      <div className="flex gap-3  absolute top-2">

        <button onClick={() => setSelected('image')} className='bg-gray-700 text-white px-4 py-2  rounded-lg font-semibold transition hover:bg-gray-800 text-sm md:px-4 md:py-2'>
          Image Section
        </button>
        <button onClick={() => setSelected('todo')} className='bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition hover:bg-gray-800 text-sm md:px-4 md:py-2'>
          Todo Section
        </button>
      </div>
      <div className=" m-10 shadow-lg flex flex-col  rounded-2xl p-6 w-full max-w-md">

        {selected === 'todo' ?
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
              {todosText.map((one) => {
                return (
                  <li
                    key={one._id}
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

          :
          <>
            <div className="flex flex-col gap-3">
              <input type="file" onChange={handleFileChange} className='border border-gray-500 p-2' />

              {preview &&
                <>
                  <div className='relative'>
                    <span

                      onClick={() => {
                        setFile('')
                        setPreview('')
                      }}
                      className='absolute top-1 right-1 text-white p-1  rounded-full w-6 h-6 font-semibold transition'>
                      <img src="/remove.png" alt="" />

                    </span>
                    {preview && <img src={preview} alt={`${file?.name || 'Preview'}`} />}
                  </div>
                  <button onClick={handleUpload} className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition'>
                    Upload
                  </button>
                </>
              }


            </div>
          </>
        }
      </div>
    </div>
  )
}

export default App;