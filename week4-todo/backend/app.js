import express from 'express';
import cors from 'cors';

import { logReq } from './middlewares/logReq.js';
import todosRouter from './routers/todosRouter.js';
import { loadTodo } from './data/todos.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logReq);

// this bug from match route
// app.use(todosRouter)

// routers
app.use('/todos', todosRouter);


// Server info
const host = 'localhost';
const port = 3000;

// Start server
app.listen(port, host, async () => {
    loadTodo()
    console.log(`Server is running on http://${host}:${port}`);
});
