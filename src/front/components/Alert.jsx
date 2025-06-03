import useGlobalReducer from "../hooks/useGlobalReducer"


export const Alert = () => {
  const { store } = useGlobalReducer()

  const alertInfo = store.alert

  // 4.- Retorno un solo elemento HTML
  return (
    <div className={`container ${alertInfo.visible ? '' : 'd-none'}`}>
      <div className={`alert alert-${alertInfo.background}`} role="alert">
        {alertInfo.text}
      </div>
    </div>
  )
}

// Además donde lo quiero utlizar...
// 6.- Importar
// 7.- Renderizar