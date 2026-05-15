import { useEffect } from "react"

export const Users = () => {
  
    const getUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      console.log(response)
      if (!response.ok) {
        console.log('el ok es falso')
        console.log('tengo que hacer algo con el error ', response.status)
      }
      const data = await response.json()
      console.log(data)
      console.log('Datos de Patricia')
      console.log(data[3].name)

    }

    useEffect(() => {
      getUsers()
    }, [])

    return (
      <div className="container">
        <h1 className="text-center text-primary">
          Users
        </h1>

      </div>
    )

}