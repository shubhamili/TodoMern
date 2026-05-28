

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Todo from './pages/Todo';
import FileWala from './pages/file';

function Home() {
  return (
    <>
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

        <div className="text-center max-w-3xl">

          <p className="text-green-400 text-sm mb-4 tracking-widest uppercase">
            Elite Ball Knower Certified
          </p>

          <h1 className="text-6xl md:text-8xl font-black leading-tight mb-6">
            WE ARE SO BACK
          </h1>

          <p className="text-gray-400 text-xl md:text-2xl mb-8">
            67 67 we ball.
            <br />
            Upload files. Ship code. Miss deadlines.
            <br />
            Repeat until generational comeback.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:scale-105 transition">
              Start Cooking
            </button>

            <button className="border border-gray-600 px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-black transition">
              View Files
            </button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">

          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <h2 className="text-2xl font-bold mb-2">
              File Uploads
            </h2>

            <p className="text-gray-400">
              Upload images like a true franchise player.
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <h2 className="text-2xl font-bold mb-2">
              Todo Grindset
            </h2>

            <p className="text-gray-400">
              Stack tasks. Ignore tasks. Elite workflow.
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <h2 className="text-2xl font-bold mb-2">
              MVP Energy
            </h2>

            <p className="text-gray-400">
              Built different. Debugging under pressure.
            </p>
          </div>
        </div>

        <p className="mt-16 text-gray-600 text-sm">
          Powered by late night coding and questionable decisions.
        </p>
      </div>

    </>

  )


}



export default function App() {
  return (
    <BrowserRouter>
      <nav className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-md w-full mx-auto">
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