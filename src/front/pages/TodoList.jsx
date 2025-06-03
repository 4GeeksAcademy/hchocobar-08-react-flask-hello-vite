//
import { useState } from "react"


export const TodoList = () => {
  const [ task, setTask ]= useState('');
  const [ todos, setTodos ] = useState([    
    {id: 1, todo: 'tarea 1'},
    {id: 2, todo: 'tarea 2'},
    {id: 3, todo: 'tarea 3'}
  ])

  const handleTask = (event) => {
    setTask(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task.trim() != '') {
      setTodos([...todos, {id: todos.length + 1, todo: task}])
    }
    setTask('')
  }

  const handleDelete = (tarea) => {
    console.log(tarea)
    console.log(todos.filter((item) => item.id != tarea.id))
    setTodos(todos.filter((item) => item.id != tarea.id))
  }

  return (

    <div className="container my-3 text-start">
      <div className="row">
        <div className="col-10 col-sm-8 col-md-6 m-auto">
          <h1 className="text-success text-center">Todo List</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-10 col-sm-8 col-md-6 m-auto">
          <h2 className="text-primary">Add Task</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="taskInput" className="form-label">New Task</label>
              <input type="text" className="form-control" id="taskInput" placeholder="add new task" 
                value={task} onChange={handleTask}/>
            </div>
          </form>

        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col-10 col-sm-8 col-md-6 m-auto">
          <h2 className="text-primary">List</h2>

          <ul className="list-group">

            {todos.map((item) => 
              <li key={item.id} className="list-group-item d-flex justify-content-between hidden-icon">
                {item.todo}
                <span onClick={() => handleDelete(item)}>
                  <i class="fa-solid fa-trash text-danger"></i>
                </span>
              </li>
            )}

            <li className="list-group-item text-end">
              {todos.length ? todos.length + ' tareas' : 'No tienes tareas'}
            </li>
          </ul>

        </div>
      </div>

    </div>
  )
}


/* 
    {id: 1, todo: 'tarea 1'},
    {id: 2, todo: 'tarea 2'},
    {id: 3, todo: 'tarea 3'}
     */