// import { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const { login } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await login(email, password);
//         navigate("/todo");
//     };

//     return (
//         <div className="flex justify-center items-center h-screen">
//             <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
//                 <h2 className="text-xl mb-4">Login</h2>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     className="border p-2 w-full mb-2"
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     className="border p-2 w-full mb-2"
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button type="submit" className="bg-blue-500 text-white p-2 w-full">
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Login;
