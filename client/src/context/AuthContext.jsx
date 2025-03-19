import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser({ token });
        }
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:5000/api/login", {
                email,
                password,
            });
            localStorage.setItem("token", res.data.token);
            setUser({ token: res.data.token });
        } catch (error) {
            console.error("Login failed:", error.response.data);
        }
    };

    const signup = async (email, password) => {
        try {
            await axios.post("http://localhost:5000/api/signup", {
                email,
                password,
            });
            await login(email, password);
        } catch (error) {
            console.error("Signup failed:", error.response.data);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
