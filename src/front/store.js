export const initialStore = () => {
  return {
    cohorte: 'Spain 123',
    alert: {
      text: '',
      color: '',
      display: false
    },
    message: 'HOla Mundo',
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    token: '',
    current_user: {},
    isLogged: false
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){

    case 'handle_isLogged':
      return { ...store, isLogged: action.payload};

    case 'handle_user':
      return { ...store, current_user: action.payload};

    case 'handle_token':
      return { ...store, token: action.payload};

    case 'handle_alert':
      return { ...store, alert: action.payload};

    case 'set_hello':
      return { ...store, message: action.payload};
      
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
