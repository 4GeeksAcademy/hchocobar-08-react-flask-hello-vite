// import React from "react";
// 1.- Importamos todo lo necesario
import { Link, useNavigate } from "react-router-dom";
import { BtnCallActions } from "./BtnCallActions";
import useGlobalReducer from "../hooks/useGlobalReducer";


// 2.- Creo el componente (función)
export const Navbar = () => {
  const { store } = useGlobalReducer();
  const navigate = useNavigate()

  const cohorte = store.cohorte;

  const handleOnSubmint = (event) => {
    event.preventDefault()
    // mostar el componente login
    navigate('/login')
  }

  // 4.- Retorno un solo elemento HTML 
  return (
    <div>
      <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">{cohorte}</Link>
          <Link to='/login' className="btn btn-outline-success">Login</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-sm-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Item Menu</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/todolist">Todo List</Link></li>
                  <li><Link className="dropdown-item" to="/todolist-fetch#">Todo List Fetch</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="simple-counter">Simple Counter</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link disabled" aria-disabled="true">Disabled</Link>
              </li>
            </ul>
            <form onSubmit={handleOnSubmint} className="d-flex" role="search">
              <BtnCallActions />
              {/* <button className="btn btn-outline-success" type="submit">Login</button> */}
            </form>


            <div className="dropdown me-3">
              <button className="btn btn-secondary dropdown-toggle position-relative" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown button
                <span class="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger">
                  {store.favorites.length}
                  <span class="visually-hidden">unread messages</span>
                </span>
              </button>
              <ul className="dropdown-menu">
                {store.favorites.map(item => 
                  <li className="dropdown-item">{item}</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

// 5.- Exporto mi componente



// Además, en el componente donde lo quiero utilizar
// 6.- Importar el componente
// 7.- Renderizamos el componente en la parte HTML