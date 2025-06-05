export const initialStore = () => {
  return {
    message: null,
    cohorte: 'Cohorte Spain-108',
    alert: {
      text: '',
      background: '',
      visible: false
    },
    todos: []
  }
}

export default function storeReducer(store, action={}) {
  switch (action.type) {

    case 'getTodos':
      return { ...store, todos: action.payload }

    case 'handle_alert':
      console.log(action)
      return { ...store, alert: action.payload }
  
    case 'set_hello':
      return { ...store, message: action.payload };
      
    case 'add_task':
      const { id,  color } = action.payload
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

      default:
      throw Error('Unknown action.');
  }    
}
