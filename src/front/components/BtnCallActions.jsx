// 1.- 
import { Link } from "react-router-dom"

// 5 y 2 
export const BtnCallActions = () =>{
  // 3
  let btnInfo = {
    text: 'Suscribete',
    bg: 'danger'
  }

  const handleOnClick = () => {}
  
  // 4
  return (
    <Link to='/' className={`btn btn-lg btn-${btnInfo.bg}`}>
      {btnInfo.text}
    </Link>
  )

}

//     <button className="btn btn-{btnInfo.bg}">
