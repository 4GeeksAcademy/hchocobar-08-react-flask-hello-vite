import { useEffect, useState } from "react";
import { getTodos, addTodo, modifyTodo, deleteTodo } from "../services/todos.js";
import useGlobalReducer from '../hooks/useGlobalReducer.jsx'


export const TodoListFetch = () => {
  const { store, dispatch } = useGlobalReducer()
  // const [ todos, setTodos ] = useState([]);
  const todos = store.todos

  useEffect(() => {
    const get = async () => {
      const data = await getTodos()
      if (!data) {
        console.log('error')
        return
      }
      // grabar los datos en el store.todos mediante el dispatch 'getTodos'
      dispatch({
        type: 'getTodos',
        payload: data
      })
    }

    get();
  }, [])


  const [ newTask, setNewTask ] = useState('');
  const [ editTask, setEditTask ] = useState('');
  const [ editCompleted, setEditCompleted ] = useState()
  const [ isEdit, setIsEdit ] = useState(false);
  const [ editTodo, setEditTodo ] = useState({})

  const handleNewTask = event => setNewTask(event.target.value);
  const handleEditTask = event => setEditTask(event.target.value);
  const handleEditCompleted = event => setEditCompleted(event.target.checked);
  
    /* Handles Submit: Formulario ADD - Formulario EDIT */
  const handeSubmitAdd = async (event) => {
    event.preventDefault();
    const dataToSend = {
      label: newTask,
      is_done: false
    }
    console.log(dataToSend)
    // ejecutar la funcion que realiza el fetch POST
    const data = await addTodo(dataToSend);
      if (!data) {
        console.log('error')
      }
      // grabar los datos en el store.todos mediante el dispatch 'getTodos'
      dispatch({
        type: 'getTodos',
        payload: data
      })
    setNewTask('')
  }

  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    const dataToSend = {
      label: editTask,
      is_done: editCompleted
    }
    console.log(editTodo)
    console.log(dataToSend)
    const data = await modifyTodo(editTodo.id, dataToSend)
    dispatch({
        type: 'getTodos',
        payload: data
    })
    setIsEdit(false)

  }


  /* Cancel del Formlario Edit */
  const handleCancel = () => {
    setIsEdit(false);
    setEditTodo({})
    // reseteo los valores de los inputs
    setEditTask('')
    setEditCompleted(false)
  }


  /* Handles de los iconos */
  const handleEdit = (tarea) => {
    console.log(tarea);
    setIsEdit(true);
    setEditTodo(tarea)
    // Estodos de los inputs
    setEditTask(tarea.label);
    setEditCompleted(tarea.is_done)
  }

  const handleDelete = async (tarea) => {
    console.log(tarea)
    console.log(tarea.id)
    // la funcion que borra
    const data = await deleteTodo(tarea.id)
    dispatch({
        type: 'getTodos',
        payload: data
    })

  }


  return (
    <div className="container my-5">
      <h1 className="text-success">Todo List with Fetch</h1>

      {isEdit ? 
        <form onSubmit={handleSubmitEdit}>
          {/* Formu Editar Tarea */}
          <div className="text-start mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Edit Task</label>
            <input type="text" className="form-control" id="exampleInputPassword1" 
              value={editTask} onChange={handleEditTask} />
          </div>
          <div className="text-start mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" 
              checked={editCompleted} onChange={handleEditCompleted}/>
            <label className="form-check-label" htmlFor="exampleCheck1">Completed</label>
          </div>
          <button type="submit" className="btn btn-primary me-2">Submit</button>
          <button type="reset" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
        </form>
      :
        <form onSubmit={handeSubmitAdd}>
          {/* Form Agregar Tarea */}
          <div className="text-start mb-3">
            <label htmlFor="exampleTask" className="form-label">Add Task</label>
            <input type="text" className="form-control" id="exampleTask"
              value={newTask} onChange={handleNewTask} />
          </div>
        </form>
      }
      

      <h2 className="text-primary mt-5">List</h2>

      {/* UL con listados */}
      <ul className="text-start list-group">
        {todos.map((item) => 
          <li key={item.id}
            className="list-group-item hidden-icon d-flex justify-content-between">
            <div>{ item.is_done ? 
                <i className="far fa-thumbs-up text-success me-2"></i>
              :
                <i className="fas fa-times-circle text-danger me-2"></i>
              }
              {item.label}
            </div>
            <div>
              <span onClick={() => handleEdit(item)}>
                <i className="fas fa-edit text-primary me-2"></i>
              </span>
              <span onClick={() => handleDelete(item)}>
                <i className="fas fa-trash text-danger"></i>
              </span>
            </div>
          </li>
        )}

        <li className="list-group-item text-end">{
          todos.length == 0 ? 'No tasks, please add a nesw taks' 
          :
          todos.length + ' tasks'}
        </li>
      </ul>
    </div>
  )
}