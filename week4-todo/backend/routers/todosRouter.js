import { Router } from "express";
import { saveTodo, todos } from "../data/todos.js";

const defaultUserId = 1;
const todosRouter = Router();

todosRouter.post('/', (req, res) => {
    // Retrieve data
    const title = req.body.title;

    console.log("res from POST method; title is => ", title);

    // Validation
    if (!title || title === '') {
        return res.status(400).json({ message: 'title is required and not empty' });
    }

    // Process data
    const newTodo = {
        userId: defaultUserId,
        id: todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1,
        title,
        completed: false,
    };
    todos.push(newTodo);

    // save data to json jaa
    saveTodo()

    // Generate response
    const response = newTodo;

    // Return response
    res.status(201).json(response);

    // Log response
    console.log("res form POST method => ", response);
});
todosRouter.get("/", (req, res) => {

    const response = todos;

    if (!response || response.length === 0) {
        return res.status(404).json({ message: "No todos" });
    }

    res.status(200).json(response);
    console.log("res length from GET method '/' todos length => ", response.length);
});

todosRouter.get("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    if (id <= 0) {
        return res.status(400).json({ error: ' id must be greater than 0' })
    }

    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    const response = todo

    res.status(200).json(response);

    console.log("res from GET method '/:id' => ", response);
});

todosRouter.put("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    if (id < 0) {
        return res.status(400).json({ message: 'id must be a positive number' });
    }

    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    const { title, completed } = req.body;

    if (title !== undefined) {
        todo.title = title;
    }

    if (completed !== undefined) {
        todo.completed = completed;
    }

    saveTodo()

    const response = todo

    res.status(200).json(response);

    console.log("res from PUT method => ", response);
});

todosRouter.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    // Validation
    if (id < 0) {
        return res.status(400).json({ message: 'id must be a positive number' });
    }

    // find id num for del
    const index = todos.findIndex(todo => todo.id === id);

    // if found del data from id
    if (index === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    todos.splice(index, 1);

    saveTodo()

    // response
    const response = index

    res.status(200).json(response);

    console.log("res from DELETE method => ", response);

});

export default todosRouter;