import { useState } from "react"


export const ExampleUseState = () => {
  //      variable   setter           valor inicial (cualquier valor)
  const [ textAlert, setTextAlert ] = useState('')
  const [ background, setBackground ] = useState('warning')
  const [ number, setNumber ] = useState(10)
  // textAlert = 'Hola Europa'   Nunca mas

  const handleCambiar = () => {
    console.log('hice click en cambiar')
    setTextAlert('Hola Europa')
    setBackground('danger')
  }

  const handleReset = () => {
    setTextAlert('Hola Spain-123')
    setBackground('warning')
  }

  const handleDuplicar = () => { 
    setNumber(number * 2) 
  }
  
  const handlePotencia = () => setNumber(number * number)

  return (
    <div className="container">
      <h1 className="text-center text-danger">Hooks: useState</h1>
      <div className={`alert alert-${background} display-1`} role="alert">
        {textAlert}
      </div>
      <div className="container m-3">
        <button onClick={handleCambiar} type="button" className="btn btn-primary">Cambiar</button>
        <button onClick={handleReset} type="button" className="btn btn-secondary">Reset</button>
      </div>
      <div className="container">
        <button onClick={() => setTextAlert(textAlert.toUpperCase())} type="button" className="btn btn-success">Mayúsculas</button>
        <button onClick={() => setTextAlert(textAlert.toLowerCase())} type="button" className="btn btn-danger">Minúsculas</button>
      </div>
      <div className="container d-none">
        <button type="button" className="btn btn-info">Info</button>
        <button type="button" className="btn btn-light">Light</button>
        <button type="button" className="btn btn-dark">Dark</button>
      </div>

      <div className={`alert alert-${background} display-1 mt-5`} role="alert">
        {number}
      </div>
      <div className="container m-3">
        <button onClick={handleDuplicar} type="button" className="btn btn-primary">Duplicar</button>
        <button onClick={handlePotencia}  type="button" className="btn btn-secondary">Elevar al cuadrado</button>
      </div>
    </div>
  )
}