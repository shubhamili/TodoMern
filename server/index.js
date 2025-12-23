import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { connectDB } from "./config/conn.js";
import todoRouter from "./routes/todoRoutes.js";
import userRouter from "./routes/userRoutes.js";
// import morgan from "morgan";
dotenv.config()

const app = express();
const PORT = 5000

// app.use(morgan(':method :url :status :response-time ms'));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

app.use((req,res,next)=>{
console.log(` api ${req.method} ${req.originalUrl} `);
next()
})

//api endpoint
app.use("/api/todo",todoRouter)
app.use("/api/user",userRouter)




app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);

})