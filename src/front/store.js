
export const initialStore = () => {
  return {
    message: null,
    cohorte: 'Spain-108',
    alert: {
      text: '',
      background: '',
      visible: false
    },
    todos: [],
    users: [],
    currentUser: {},
    favorites: ['favorito 1', 'otro favorito', 'uno mas']
  }
}

export default function storeReducer(store, action={}) {
  switch (action.type) {

    case 'favorites':
      return { ...store, favorites: action.payload}

    case 'currentUser':
      return { ...store, currentUser: action.payload }

    case 'users':
      return { ...store, users: action.payload}
      
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
