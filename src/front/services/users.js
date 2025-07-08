let host =  import.meta.env.VITE_BACKEND_URL


export const modifyUser = async (id, dataToSend) => {
  console.log(id)
  const uri = `${host}/api/users/${id}`
  const options = {
    method: 'PUT',
    headers: {
      "Content-Type": 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(dataToSend)
  }
  const response = await fetch(uri, options)
  if (!response.ok) {
    // tratamos el error
    console.log('Error: ', response.status, response.statusText)
    return false
  }
  const data = await response.json()
  return data
}