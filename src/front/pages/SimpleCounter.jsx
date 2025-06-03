// 1. import (opcional con vite)
import { useEffect, useState } from "react"


// 5 y 2
export const SimpleCounter = () => {
  // 3 Code JS (opcional)
  const [ counter, setCounter ] = useState(0);
  const [ isRunning, setIsRunnig] = useState(false);
  const [ textButton, setTextButton ] = useState('Start');
  const [ icon, setIcon ] = useState('fa-clock');
  const [ title, setTitle ] = useState({text: 'Clock',
                                        color: 'primary',
                                        align: 'center',
                                      });

  
  const handleStart = () => {
    setCounter(counter => counter +1);
    // Opción 1
    if (isRunning) {
      setIsRunnig(false);
      setTextButton('Continue');
    } else {
      setIsRunnig(true);
      setTextButton('Pause');
    }

    setIcon('fa-stopwatch');
    setTitle({
      text: 'Chronometer',
      color: 'danger',
      align: 'start'
    });
  }

  const handleReset = () => {
    setCounter(0);
    setIsRunnig(false)
    setTextButton('Start');
    setIcon('fa-clock');
    setTitle({
      text: 'Clock',
      color: 'success',
      align: 'end'
    });
  }


  // sintaxis useEffect
  // useEffect recibe dos parámetros:
  //   1. Función flecha, q ejecuta nuestra lógica  || Qué ejecutamos 
  //   2. Array de dependencias                     || Cuándo ejecutamos
  //      2.1 Si el array está vacío, 
  //             se ejecuta al montar el componente
  //      2.2 si el array contiene dependencias, 
  //             entonces se ejecuta cada vez que cambian de 
  //             valor esas dependencias
  //      2.3 si no hay array de dependencias.
  useEffect(() => {
    console.log('Hola mundo desde el useEffect', isRunning)
    if (isRunning) {
        const newInterval = setInterval(() => {
            setCounter(counter => counter + 1);
        }, 1);

        return () => clearInterval(newInterval);
		}
  }, [isRunning])


  // 4 Retornamos un elemento HTM
  return (
    <div className="container">
      <h1 className="text-center">Simple Counter</h1>
      <h2 className={`text-${title.color} text-${title.align}`}>{title.text}</h2>
      <div className="big-counter">
        <div><i className={`fas ${icon} fa-lg`}></i></div>
        <div>{Math.floor(counter / 100000000) % 10}</div>
        <div>{Math.floor(counter / 10000000) % 10}</div>
        <div>{Math.floor(counter / 1000000) % 10}</div>
        <div>{Math.floor(counter / 100000) % 10}</div>
        <div>{Math.floor(counter / 10000) % 10}</div>
        <div>{Math.floor(counter / 1000) % 10}</div>
        <div>{Math.floor(counter / 100) % 10 }</div>
        <div>,</div>
        <div>{Math.floor(counter / 10) % 10}</div>
        <div>{Math.floor(counter % 10)}</div>
        <div>
          <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
            <button onClick={handleStart} type="button" className="btn btn-outline-success">
              {textButton}
            </button>
            <button onClick={handleReset} type="button" className="btn btn-outline-danger">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


