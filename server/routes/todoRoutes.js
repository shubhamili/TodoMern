
import express from "express"
import { addTodo, deleteTodo, editTodo, getTodos } from "../controllers/todoController.js";

const todoRouter = express.Router();

todoRouter.get("/todos", getTodos)
todoRouter.post("/post", addTodo)
todoRouter.delete("/delete/:id", deleteTodo)
todoRouter.put("/update/:id", editTodo);

export default todoRouter;