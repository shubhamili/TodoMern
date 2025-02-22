
import Todo from "../models/todoModels.js"


// app.get("/todos",)
const getTodos = async (req, res) => {
    await Todo.find({})
        .then((todos) => {
            res.json(todos)
        })
        .catch((err) => {
            res.json(err)
        })
}

// app.post("/post",)

const addTodo = async (req, res) => {
    const { todo } = req.body

    Todo.create({ todo })
        .then((newTodo) => {
            res.status(201).json(newTodo); // Send the created Todo as a response
        })
        .catch((err) => {
            console.error("Error creating todo:", err.message);
            res.status(500).json({ error: "Failed to create Todo" });
        });
}





// app.delete("/delete/:id", )
const deleteTodo = async (req, res) => {
    const { id } = req.params
    Todo.findByIdAndDelete(id)
        .then((deletedTodo) => {
            res.json(deletedTodo)
        })
        .catch((err) => {
            res.json(err)
        })
}



// app.put("/update/:id",);


const editTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { todo } = req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { todo },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: "Error updating todo", error });
    }
}


export { getTodos, addTodo, deleteTodo, editTodo }