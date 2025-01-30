import { useState, useEffect, useRef } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import { addTodo, deleteTodo, fetchTodos, makeDoneTodo } from '../../data/todos'

import './Todo.css'

function Todo() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos().then((data) => setTodos(data))
    // setTodos(fetchTodos())
  }, [])

  // event handlers
  const deleteClick = async (id) => {

    try {

      await deleteTodo(id)
      const data = await fetchTodos()

      console.log("del data", data);

      setTodos(data)

    } catch (error) {
      console.log(error);
    }


  }

  const waitingClick = async (id) => {

    try {
      await makeDoneTodo(id)
      const data = await fetchTodos()
      setTodos(data)
    } catch (error) {
      console.log(error);
    }

    // const todoSelected = todos.find((todo) => todo.id === id)
    // todoSelected.completed = true
    // setTodos([...todos])
  }

  const addClick = async (title) => {

    try {
      //Post first
      await addTodo(title)
      //Get fetchtodo
      const data = await fetchTodos()
      setTodos(data)

    } catch (error) {
    }
    // const newItem = {
    //   id: todos.reduce((p, t) => (t.id > p ? t.id : p), 0) + 1,
    //   title,
    //   completed: false,
    //   userId: 1,
    // }
    // setTodos([...todos, newItem])
  }

  // modal handlers
  const [show, setShow] = useState(false)
  const newTitleRef = useRef()
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div className='todo-container'>
      {/* modal  */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className='bi bi-plus-lg'>&nbsp;Add todo</span>{' '}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput2'>
              <Form.Label>Title:</Form.Label>
              <Form.Control type='text' autoFocus ref={newTitleRef} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            <span className='bi bi-x-lg'>&nbsp;Cancel</span>
          </Button>
          <Button
            variant='primary'
            onClick={() => {
              const title = newTitleRef.current.value.trim()
              if (title === '') {
                alert('Title cannot be empty')
                newTitleRef.current.value = ''
                newTitleRef.current.focus()
              } else {
                addClick(title)
                handleClose()
              }
            }}
          >
            <span className='bi bi-plus-lg'>&nbsp;Add</span>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* title */}
      <h1>Todos</h1>

      {/* table */}
      <table className='table table-striped todo-table'>
        <thead className='table-dark'>
          <tr>
            <th style={{ width: '5%' }} valign='middle'>
              ID
            </th>
            <th valign='middle'>TITLE</th>
            <th style={{ textAlign: 'right', width: '25%' }} valign='middle'>
              COMPLETED&nbsp;
              <button className='btn btn-primary' onClick={() => handleShow()}>
                <span className='bi bi-plus-lg'></span>
              </button>
            </th>
          </tr>
        </thead>
        {todos.length === 0 ? (
          <tr>
            <td colSpan="3" style={{ textAlign: 'center' }}>
              <h1>Not Have Todoss</h1>
            </td>
          </tr>
        ) : (
          todos.map((todo) => {
            return (
              <tbody>
                <tr key={todo.id}>
                  <td valign='middle'>
                    <span
                      className='badge bg-secondary'
                      style={{ width: '3rem' }}
                    >
                      {todo.id}
                    </span>
                  </td>
                  <td style={{ textAlign: 'left' }} valign='middle'>
                    {todo.title}
                  </td>
                  <td style={{ textAlign: 'right' }} valign='middle'>
                    {todo.completed ? (
                      <span className='badge bg-success'>
                        done&nbsp;
                        <span className='bi bi-check'></span>
                      </span>
                    ) : (
                      <button
                        className='btn btn-warning'
                        onClick={() => waitingClick(todo.id)}
                      >
                        waiting&nbsp;
                        <span className='bi bi-clock'></span>
                      </button>
                    )}
                    &nbsp;
                    <button
                      className='btn btn-danger'
                      onClick={() => deleteClick(todo.id)}
                    >
                      <span className='bi bi-trash'></span>
                    </button>
                  </td>
                </tr>
              </tbody>
            )
          })
        )}
      </table>
    </div>
  )
}

export default Todo
