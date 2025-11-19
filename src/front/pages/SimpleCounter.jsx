// import react - no es necesario con Vite
// 0.- import
import { useEffect, useState } from "react"


// 5 y 1
export const SimpleCounter = () => {
  // 2. Code JS
  const [ counter, setCounter ] = useState(0)
  const [ textButton, setTextButton ] = useState('Start')
  const [ icon, setIcon ] = useState('clock')
  const [ title, setTitle ] = useState({text: 'Clock',
                                        background: 'primary',
                                        align: 'center'})
  const [ isRunning, setIsRunning ] = useState(false)

  const handleStart = () => {
    setTextButton('Pause')
    setIcon('stopwatch')
    setTitle({text: 'Chronometer', align: 'start', background: 'danger'})
    if (isRunning) {
      setTextButton('Continue')
      setIsRunning(false)
    } else {
      setIsRunning(true)
    }
  }

  const handleReset = () => {
    setCounter(0)
    setTextButton('Start')
    setIcon('clock')
    setTitle({text: 'Clock',
              align: 'center',
              background: 'primary'})
    setIsRunning(false)
  }

  // hook (funcion, array de dependencias)
  useEffect(() => {
  		if (isRunning) {
        const newInterval = setInterval(() => { setCounter(counter => counter + 1);	}, 10);

        return () => clearInterval(newInterval);
      }
  }, [isRunning])

  /*   	
  useEffect(() => {
		if (isRunning) {
			const newInterval = setInterval(() => {
				setCounter(counter => counter + 1);
			}, 10);

			return () => clearInterval(newInterval);
		}
	}, [isRunning]); 
  */

  // Retornaremos un solo elemento HTML
  return (
    <div className="container">
      <h1 className="text-success text-center">Simple Counter</h1>
      <h2 className={`text-${title.align} text-${title.background}`}>
        {title.text}
      </h2>
      <div className="big-counter">
        <div><i className={`fas fa-${icon} fa-lg`}></i></div>
        <div>{Math.floor(counter / 100000000 % 10)}</div>
        <div>{Math.floor(counter / 10000000 % 10)}</div>
        <div>{Math.floor(counter / 1000000 % 10)}</div>
        <div>{Math.floor(counter / 100000 % 10)}</div>
        <div>{Math.floor(counter / 10000 % 10)}</div>
        <div>{Math.floor(counter / 1000 % 10)}</div>
        <div>{Math.floor(counter / 100 % 10)}</div>
        <div>,</div>
        <div>{Math.floor(counter / 10 % 10)}</div>
        <div>{Math.floor(counter / 1 % 10)}</div>
        <div>
          <div class="btn-group-vertical" role="group" aria-label="Vertical button group">
            <button onClick={handleStart} type="button" class="btn btn-outline-success">
              {textButton}
            </button>
            <button onClick={handleReset} type="button" class="btn btn-outline-danger">
              Reset
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}