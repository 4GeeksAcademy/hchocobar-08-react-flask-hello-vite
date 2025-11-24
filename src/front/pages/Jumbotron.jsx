import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export const Jumbotron = () => {
  // fetch para traer datos de usuarios desde una API.
  // cuando los obtenga:
  //    1.- Guardo en un estado utilizando useState() (Solo dispongo de los datos en el componente y sus children)
  //    2.- Guardar en el store, q me permite disponer de esos datos en cualquier componente que diponga del store.
  //            Nota: 1 y 2 siempre son posibles mientras no cierre mi browser
  //    3.- Guardar los datos en localStorage()
  // lo renderizando mapeando
  const [ users, setUsers ] = useState([])

  const handleImageError = (event) => {
   event.target.src = 'https://starwars.chocobar.net/img/big-placeholder.jpg' 
  }

  const getUsers = async () => {
    const userVerify = localStorage.getItem('local-users')
    if (userVerify) {
      setUsers(JSON.parse(userVerify))      
    } else {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        // trato el error
        console.log('Error', response.status, response.statusText);
        return
      }
      const data = await response.json()
      // Como ejemplo voy a utilizar 1 y 3
      setUsers(data)  // 1.- guardo los datos en un estado
      localStorage.setItem('local-users', JSON.stringify(data))
    }

  }

  useEffect(() => {
    getUsers()
  }, [])


  return (
    <div className="container my-5">
      <div className="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-5">
        <Link to='/' type="button" className="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill" aria-label="Close"></Link>
        <h1 className="text-body-emphasis">Placeholder jumbotron</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
          <div className="col" >
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={`https://randomuser.me/api/portraits/won/7.jpg`} 
                    className="img-fluid rounded-start" alt={"Imagen de perfil"} 
                    onError={handleImageError}/>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{'Name'}</h5>
                    <p className="card-text">{'username'}</p>
                    <p className="card-text"><small className="text-body-secondary">{'website'}</small></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


// https://randomuser.me/api/portraits/women/7${item.id}.jpg