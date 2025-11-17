import { useEffect, useState } from "react"


export const ExampleFetch = () => {
  const host = 'https://jsonplaceholder.typicode.com'
  const [ users, setUsers ] = useState([])
  const [ todos, setTodos ] = useState([])

  // 0. defino una función asincrona
  const getUsers = async () => {
    // 1. defino la url de la api
    const uri = `${host}/users`  // string, cadena
    // https://jsonplaceholder.typicode.com/users
    // 2. defino las options del request (petición)
    const options = {
      methods: 'GET'
    }  // un objeto
    // 3. realizo la peticion (fetch)
    // Fetch tiene dos paramentros, la url y las opciones
    const response = await fetch(uri, options)
    // 4. Evalúo si la petición fue exitosa ? (del response)
    if (!response.ok) {
      // 4.1. Si tengo un error, entonces trato ese error
      console.log('Error', response.status, response.statusText)
      return
    }
    // 5. Si no tengo error, extraigo la información (json) de la respuesta (response)
    const data = await response.json() 
    // 6. Hago algo con los datos .....
    setUsers(data)
  }

  const getTodos = async () => {
    // 1. uri
    const uri = `${host}/todos`
    const options = {
      methods: 'GET'
    }
    const response = await fetch(uri, options)
    if (!response.ok) {
      // 4.1. Si tengo un error, entonces trato ese error
      console.log('Error', response.status, response.statusText)
      return
    }
    const data = await response.json();
    console.log(data)
    // 6.
    setTodos(data)

  }

  // El useEffect recibe dos parametros
  // El primero es una funcion flecha
  // El segundo es un array de dependencias
  useEffect(() => {
    getUsers()
    getTodos()
  }, [])

  return (
    <div className="container my-3 text-start">
      <div className="row">
        <div className="col-10 col-sm-8 col-md-6 m-auto">
          <h1 className="text-danger text-center">Example Fetch</h1>
          <ul className="list-group">
            {users.map((item) => 
              <li className="list-group-item">{item.name}</li>
            )}
          </ul>
          <hr />
          <ul className="list-group">
            {todos.map((todo) => 
              <li key={todo.id} className="list-group-item">
                {todo.completed ? 'ok - ' : 'false - '}
                {todo.title}
              </li>)
            }
          </ul>
        </div>
      </div>
    </div>
  )
}