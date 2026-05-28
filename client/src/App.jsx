

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Todo from './pages/Todo';
import FileWala from './pages/file';

function Home() {
  return <h1>Home Page</h1>;
}



export default function App() {
  return (
    <BrowserRouter>
      <nav className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-md w-fit mx-auto mt-5">
        <Link
          to="/"
          className="px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition"
        >
          Home
        </Link>

        <Link
          to="/file"
          className="px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition"
        >
          File
        </Link>

        <Link
          to="/todo"
          className="px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition"
        >
          Todo
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/file" element={<FileWala />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}