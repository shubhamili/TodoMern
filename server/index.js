import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { connectDB } from "./config/conn.js";
import todoRouter from "./routes/todoRoutes.js";
dotenv.config()

const app = express();
const PORT = 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

//api endpoint
app.use("/api/todo",todoRouter)

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);

})