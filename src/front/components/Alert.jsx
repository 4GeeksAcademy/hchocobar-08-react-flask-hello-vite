import useGlobalReducer from "../hooks/useGlobalReducer.jsx"


export const Alert = () => {
  const { store } = useGlobalReducer();

  const alerContent = store.alert;

  return (
    <div className={`container ${alerContent.display ? '' : 'd-none'}`}>
      <div className={`alert alert-${alerContent.color}`} role="alert">
        {alerContent.text}
      </div>
    </div>

  )
}