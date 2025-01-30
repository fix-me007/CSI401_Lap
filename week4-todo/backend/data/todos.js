import fs from 'node:fs';

const todosPath = './data/todos.json'

export let todos = []

// load todo.json
export const loadTodo = () => {

    if (!fs.existsSync(todosPath)) {
        todos = []
        fs.writeFileSync(todosPath, JSON.stringify(todos, null))
    } else {
        const todoJson = fs.readFileSync(todosPath)
        // change wtf data to json data
        todos = JSON.parse(todoJson)
        console.log("res from json format =>", todos);
    }
    console.log("todos loaded.. len >> ", todos.length);
}

// save todo.json * post get put
export const saveTodo = async () => {
    try {
        // format json use (item, null, 1,2)
        // เขียนไฟล์ลง json แบบ มาฟัคเกอมาฟัคโต้ด
        fs.writeFileSync(todosPath, JSON.stringify(todos, null, 2));
        console.log("todos have save to json => ", todos);
    } catch (error) {
        console.error("Error saving todos:", error);
    }
};
