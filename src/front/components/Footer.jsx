import useGlobalReducer from "../hooks/useGlobalReducer"


export const Footer = () => {
  const { store } = useGlobalReducer()

  return (
    <div className="mt-auto">
      <hr />
      <p className="alert alert-secondary mb-0">
        Made with ❤️ by <a href="http://www.4geeksacademy.com">4Geeks Academy</a>
        , Héctor y Álvaro para la {store.cohorte}
      </p>
    </div>
  )
}