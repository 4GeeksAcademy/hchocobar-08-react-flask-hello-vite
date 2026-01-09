import React from 'react';  // 0.- Importamos React
import { BtnCallAction } from './BtnCallAction.jsx';
import { Link, useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer.jsx';


// 1.- Creo el componente 
export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (store.isLogged) {
      // Estoy logueado
      // 1. Borrar el token en el localStorage()
      localStorage.removeItem('token')
      // 2. Borrar el token en el store (contexto)
      dispatch({type: 'handle_token', payload: ''})
      // 3. Borrar los datos del usuario en el store (contexto) / opcional localStorage()
      dispatch({type: 'handle_user', payload: {}})
      // 4. Setear en false el isLogged en el store
      dispatch({type: 'handle_isLogged', payload: false})
      navigate('/')
    } else {
      // Estoy deslogueado
      // 1. que ponga el Alert en d-none 
      dispatch({
        type: 'handle_alert',
        payload: {
          text: '',
          color: '',
          display: false
        }
      })
      // 2. que navegue al componente Login
      navigate('/login')
    }

  }

  // 3. Retornar un solo elemento HTML
  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">{store.cohorte}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            { store.isLogged ? 
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/jumbotron">Jumbotron</Link>
              </li>

              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Proyectos
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/cards">Users</Link></li>
                  <li><Link className="dropdown-item" to="/todo-list">Todo List</Link></li>
                  <li><Link className="dropdown-item" to="/simple-counter">Simple Counter</Link></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><Link className="dropdown-item" to="/example-use-state">Example useState</Link></li>
                  <li><Link className="dropdown-item" to="/example-fetch">{'Example fetch() async/await'}</Link></li>
                </ul>
              </li>
            </>
            : ''
            }
          </ul>
          {/* 1. que navegue al componente Login
              2. que ponga el Alert en d-none 
              <Link className='btn btn-warning' to='/login'>Login</Link>
          */}
          <span onClick={handleLogin} className='btn btn-warning'>{store.isLogged ? 'Logout' : 'Login'}</span>
        </div>
      </div>
    </nav>
  )
}
