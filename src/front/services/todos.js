const host = 'https://playground.4geeks.com/todo';
const user = 'spain-108';


/* Fetchs: addUser() - getTodos() - addTodo() - modifyTodo() - deleteTodo() */
export const addUser = async () => {
    const uri = `${host}/users/${user}`
    const options = {method: 'POST'}
    const response = await fetch(uri, options )
    getTodos()
  }

export const getTodos = async () => {
    const host = 'https://playground.4geeks.com/todo';
    const user = 'spain-108';
    const uri = `${host}/users/${user}`
    const options = {method: 'GET'}

    try {
      const response = await fetch(uri, options);
      if (!response.ok) {
        if (response.status == 404) {
          // tengo que crear el usuario
          addUser();
        }
        return false
      }
      const data = await response.json()
      console.log(data)
      // setTodos(data.todos)
      return data.todos
    } catch {
      console.log('error')
      return false
    }
  }

export const addTodo = async (dataToSend) => {
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
      return await getTodos()


    } catch {
      console.log('error')
    }

  }

export const modifyTodo = async (id, dataToSend) => {
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
      return await getTodos()
    } catch {
      console.log('error');
      
    }
  }

export const deleteTodo = async (id) => {
    const uri = `${host}/todos/${id}`;
    const options = {method: 'DELETE'}
    try {
      const response = await fetch(uri, options)
      return await getTodos();
    } catch {
      console.log('error')
    }
  }
