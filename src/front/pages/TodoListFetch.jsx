import { useEffect, useState } from "react";


export const TodoListFetch = () => {
  const host = 'https://playground.4geeks.com/todo';
  const user = 'spain-108';

  const [ newTask, setNewTask ] = useState('');
  const [ editTask, setEditTask ] = useState('');
  const [ editCompleted, setEditCompleted ] = useState()
  const [ isEdit, setIsEdit ] = useState(false);
  const [ editTodo, setEditTodo ] = useState({})
  const [ todos, setTodos ] = useState([]);

  const handleNewTask = event => setNewTask(event.target.value);
  const handleEditTask = event => setEditTask(event.target.value);
  const handleEditCompleted = event => setEditCompleted(event.target.checked);
  
  
  /* Fetchs: addUser() - getTodos() - addTodo() - modifyTodo() - deleteTodo() */
  const addUser = async () => {
    const uri = `${host}/users/${user}`
    const options = {method: 'POST'}
    const response = await fetch(uri, options )
    getTodos()
  }

  const getTodos = async () => {
    const uri = `${host}/users/${user}`
    const options = {method: 'GET'}
    try {
      const response = await fetch(uri, options);
      if (!response.ok) {
        if (response.status == 404) {
          // tengo que crear el usuario
          addUser();
        }
        return
      }
      const data = await response.json()
      console.log(data)
      setTodos(data.todos)
    } catch {
      console.log('error')
    }
  }

  const addTodo = async (dataToSend) => {
    const uri = `${host}/todos/${user}`;
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(dataToSend)
    }
    try {
      const response = await fetch(uri, options)
      getTodos();
    } catch {
      console.log('error')
    }

  }

  const modifyTodo = async (id, dataToSend) => {
    const uri = `${host}/todos/${id}`;
    const options = {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(dataToSend)
    };
    try {
      const response = await fetch(uri, options)
      getTodos()
    } catch {
      console.log('error');
      
    }
  }

  const deleteTodo = async (id) => {
    const uri = `${host}/todos/${id}`;
    const options = {method: 'DELETE'}
    try {
      const response = await fetch(uri, options)
      getTodos();
    } catch {
      console.log('error')
    }
  }


  /* Handles Submit: Formulario ADD - Formulario EDIT */
  const handeSubmitAdd = (event) => {
    event.preventDefault();
    const dataToSend = {
      label: newTask,
      is_done: false
    }
    console.log(dataToSend)
    // ejecutar la funcion que realiza el fetch POST
    addTodo(dataToSend);
    setNewTask('')
  }

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    const dataToSend = {
      label: editTask,
      is_done: editCompleted
    }
    console.log(editTodo)
    console.log(dataToSend)
    modifyTodo(editTodo.id, dataToSend)
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

  const handleDelete = (tarea) => {
    console.log(tarea)
    console.log(tarea.id)
    // la funcion que borra
    deleteTodo(tarea.id)
  }


  useEffect(() => {
    getTodos()
  }, [])


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