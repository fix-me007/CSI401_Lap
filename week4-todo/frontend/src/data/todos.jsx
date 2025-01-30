import axios from "axios"

const todos = [
  {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: true,
  },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
  },
  {
    userId: 1,
    id: 3,
    title: 'fugiat veniam minus',
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: 'et porro tempora',
    completed: true,
  },
  {
    userId: 1,
    id: 5,
    title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
    completed: false,
  },
]

export const fetchTodos = async () => {

  try {

    const res = await axios.get('http://localhost:3000/todos/')
    console.log(res);

    return res.data

  } catch (error) {

    console.log(error);
    return []

  }

}

export const addTodo = async (title) => {

  try {

    await axios.post('http://localhost:3000/todos/', { title })

  } catch (err) {
    throw err
  }

}

export const makeDoneTodo = async (id) => {

  try {
    await axios.put(`http://localhost:3000/todos/${id}`, { completed: true })

  } catch (err) {
    throw err
  }

}

export const deleteTodo = async (id) => {

  try {
    const data = await axios.delete(`http://localhost:3000/todos/${id}`)
    console.log("test", data);
  } catch (error) {
    throw err
  }

}
