let host = import.meta.env.VITE_BACKEND_URL

export const login = async (dataToSend) => {
  // enviar el email y pass al back para recibir el token o no.... 
  console.log(dataToSend)
  const url = `${host}/api/login`
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(dataToSend)
  }
  const response = await fetch(url, options)
  if (!response.ok) {
    console.log('Error', response.status, response.statusText)
    return false
  }
  const data = await response.json()
  return data
}

export const protect = async () => {
  console.log('función protect')
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
  console.log(options)
  const response = await fetch(`${host}/api/protected`, options);
  if (!response.ok) {
    console.log('Error', response.status, response.statusText)
    return false
  }
  const data = await response.json()
  console.log(data)
  return data

}