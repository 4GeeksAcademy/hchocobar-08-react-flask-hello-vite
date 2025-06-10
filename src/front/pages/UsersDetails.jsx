import { Link, useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"


export const UsersDetails = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate()

  const user = store.currentUser;

  const handleReturn = () => {
    dispatch({type: 'currentUser', payload: {}})
    navigate("/users");
  }

  return (
    <div className="container">
      <h1 className="text-center">Perfil del Usurio</h1>

      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="..." class="img-fluid rounded-start" alt="..." />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{user.name}</h5>
              <p class="card-text">item 12</p>
          <p class="card-text">itme 2</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">An item</li>
          <li class="list-group-item">A second item</li>
          <li class="list-group-item">A third item</li>
        </ul>
        <div class="card-body">
          <span class="btn btn-success" onClick={handleReturn}>Regresar</span>
          {/* <a href="#" class="card-link">Another link</a> */}
        </div>
            </div>
        </div>
      </div>

    </div>
  )
}