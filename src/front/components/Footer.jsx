import useGlobalReducer from "../hooks/useGlobalReducer.jsx"

// 1 y 2 Creo el componente y lo exporto
export const Footer = () => {
  const { store } = useGlobalReducer()

  // Renderizo un solo elemento HTML
  return (
    <div className="text-center mt-auto bg-dark text-light">
      <p>{store.message}</p>
        <p className="my-4">
          Made by{": "}
          <a href="http://www.4geeksacademy.com">4Geeks Academy</a> and Héctor, with	love!
          para la cohorte {store.cohorte}
        </p>
    </div>
  )
}

