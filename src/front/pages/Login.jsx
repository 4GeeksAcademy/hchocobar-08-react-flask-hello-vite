import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { login } from "../services/auth.js";
import { useNavigate } from "react-router-dom";

/* Controlando Inputs */
// 1. Debo declarar un 'estado' para cada input
// 2. Vicular el atributo value/cheked del input con el estado
// 3. Declarar la función handleNnnnnn para actualizar el estado con el valor del 
//          event.target.value
// 4. Definir el evento onChange que llama a una función (handle)

// 5 y 2
export const Login = () => {
  const { dispatch } = useGlobalReducer()
  const [ email, setEmail ]  = useState('');
  const [ password, setPassword ] = useState('');
  /* const [ checkMe, setCheckMe ] = useState(false); */
  const navigate = useNavigate()

  const handleEmail = (event) => {setEmail(event.target.value)};
  const handlePassword = event => setPassword(event.target.value);
  /* const handleCheckMe = event => setCheckMe(event.target.checked); */

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Opción 1
    // const dataToSend = {email, password, imAgree: checkMe}
    // Opción 2
    const dataToSend = {
      email: email,
      password: password,
    }
    // console.log(dataToSend)
    // suponemos que tuvo un login exitoso
    const result = await login(dataToSend)
    console.log(result.message)
    console.log(result.access_token)
    // Todo exitoso, que hago con el Token
    // 1. lo grabo en LocalStorage()
    localStorage.setItem('token', result.access_token)
    // 2. lo grabo en el store
    dispatch({
      type: 'token',
      payload: result.access_token
    })

    dispatch({
      type: 'handle_alert',
      payload: {
        text: 'Exclente! Bienvenido a nuestra App',
        background: 'success',
        visible: true
      }
    })
    // navegar al componente (dashboar) utilizando el useNavigate
    navigate('/users')
  }

  const handleReset = () => {
    setEmail('');
    setPassword('');
    setCheckMe(false);
    dispatch({
      type: 'handle_alert',
      payload: {
        text: 'Cronometro detenido',
        background: 'danger',
        visible: true
      }
    })
  }

  // 4
  return (
    <div className="container text-start">
      <h1 className="text-center text-primary">Login</h1>
      <div className="row">
        <div className="col-10 col-sm-8 col-md-6 m-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                value={email} onChange={handleEmail}/>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1"
                value={password} onChange={handlePassword}/>
            </div>
            {/* <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1"
                checked={checkMe} onChange={handleCheckMe}/>
              <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div> */}
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="reset" onClick={handleReset} className="btn btn-secondary ms-2">Reset</button>
          </form>
        </div>
      </div>
    </div>
  )
}