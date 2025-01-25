import express from "express";
import mongoose from "mongoose";
import dotenv, { parse } from "dotenv";
import Todo from "./models/todoModels.js";
import cors from "cors"
dotenv.config()
const app = express();


mongoose.connect(`mongodb+srv://shubhamsinghia160:${process.env.DB_PASS}@cluster0.dupow.mongodb.net/TodosCollection`)
    .then(() => {
        console.log("database connected");
    })
    .catch((err) => {
        console.log("mongodb connection error ======>  ", err);
    })


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/todos", (req, res) => {
    Todo.find({})
        .then((todos) => {
            res.json(todos)
        })
        .catch((err) => {
            res.json(err)
        })
})

app.post("/post", async (req, res) => {
    const { todo } = req.body

    Todo.create({ todo })
        .then((newTodo) => {
            res.status(201).json(newTodo); // Send the created Todo as a response
        })
        .catch((err) => {
            console.error("Error creating todo:", err.message);
            res.status(500).json({ error: "Failed to create Todo" });
        });
})


app.delete("/delete/:id", async (req, res) => {
    const { id } = req.params
    Todo.findByIdAndDelete(id)
        .then((deletedTodo) => {
            res.json(deletedTodo)
        })
        .catch((err) => {
            res.json(err)
        })


})


const PORT = 5000

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);

})