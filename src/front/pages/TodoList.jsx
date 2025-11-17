// 1.
import { useState } from 'react';

// 5. y 2.
export const TodoList = () => {
  const [ task, setTask ] = useState('')
  const [ listTask, setListTask ] = useState([{id: 1, todo: 'tarea 1'},
                                              {id: 2, todo: 'tarea 2'},
                                              {id: 3, todo: 'tarea 3'}])

  const handleTask = (event) => { setTask(event.target.value)}

  const handleDeleteTask = (deletedTask) => {
    setListTask(listTask.filter(item => item.id != deletedTask.id))
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    // realizo lo necesario con mi dato.
    if (task != '') {
      const dataToSend = {id: listTask.length + 1,todo: task}
      setListTask([...listTask, dataToSend])
      setTask('')
    }
  }

  return (

    <div className="container my-3 text-start">
      <div className="row">
        <div className="col-10 col-sm-8 col-md-6 m-auto">
          <h1 className="text-success text-center">Todo List</h1>
          <div className="row">
            <div className="col m-auto">
              <h2 className="text-primary">Add Task</h2>
              <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                  <label htmlFor="input1" className="form-label">New Task</label>
                  <input type="text" className="form-control" id="input1" placeholder="Add a new task" 
                    value={task} onChange={handleTask}/>
                </div>
              </form>

            </div>
          </div>

          <hr />

          <div className="row">
            <div className="col m-auto">
              <h2 className="text-primary">List</h2>
              <ul className="list-group">
                {listTask.map((item) => {
                  return (
                    <li key={item.id} className="hidden-icon list-group-item d-flex justify-content-between">
                      {item.todo}
                      <span onClick={() => handleDeleteTask(item)}>
                        <i className="fas fa-trash text-danger"/>
                      </span>
                    </li>
                  )
                })}
                <li className="list-group-item text-end bg-body-tertiary">
                  {listTask.length == 0 ? 'No tienes' : listTask.length } tareas pendientes
                </li>
              </ul>
            </div>
          </div>
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