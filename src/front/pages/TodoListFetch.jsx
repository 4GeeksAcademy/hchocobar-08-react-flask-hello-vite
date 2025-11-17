import { useEffect, useState } from "react";


export const TodoListFetch = () => {
  const baseURL = 'https://playground.4geeks.com/todo';
  const user = 'spain-123';

  const [ newTask, setNewTask ] = useState('');
  const [ editTask, setEditTask ] = useState('');
  const [ editCompleted, setEditCompleted ] = useState()
  const [ todos, setTodos ] = useState([]);
  const [ editTodo, setEditTodo ] = useState({})
  const [ isEdit, setIsEdit ] = useState(false);

  const handleNewTaskd = event => setNewTask(event.target.value);
  const handleEditTask = event => setEditTask(event.target.value);
  const handleEditCompleted = event => setEditCompleted(event.target.checked);

  useEffect(() => {
    console.log('Inicio')
  }, [])


  return (
    <div className="container my-5">
      <h1 className="text-success">Todo List with Fetch</h1>

      {/* Formu Editar Tarea */}
      <form>
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
        <button type="reset" className="btn btn-secondary">Submit</button>
      </form>
      
      {/* Form Agregar Tarea */}
      <form>
        <div className="text-start mb-3">
          <label htmlFor="exampleTask" className="form-label">Add Task</label>
          <input type="text" className="form-control" id="exampleTask"
            value={newTask} onChange={handleNewTaskd} />
        </div>
      </form>

      <hr className="my-3" />
      <h2 className="text-primary mt-5">List</h2>

      {/* UL con listados */}
      <ul className="text-start list-group">
        <li
          className="list-group-item hidden-icon d-flex justify-content-between">
          <div>
              <i className="far fa-thumbs-up text-success me-2"></i>
              <i className="fas fa-times-circle text-danger me-2"></i>
              Tarea a realizar
          </div>
          <div>
            <span>
              <i className="fas fa-edit text-primary me-2"></i>
            </span>

            <span>
              <i className="fas fa-trash text-danger"></i>
            </span>
          </div>
        </li>

        <li className="list-group-item text-end">{
          'No tasks, please add a nesw taks' 
          + 
          ' tasks'}
        </li>
      </ul>
    </div>
  )
}