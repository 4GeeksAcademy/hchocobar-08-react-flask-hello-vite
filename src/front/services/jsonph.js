const host = 'https://jsonplaceholder.typicode.com';


export const test = () => {
  console.log('test')
}

export const getUsers = async () => {
    try {
      const response = await fetch(`${host}/users`);
      const data = await response.json()
      console.log(data)
      return data
    } catch(error) {
      console.log('Error', error)
    }
  }
