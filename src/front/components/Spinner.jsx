// 1.- Importamos


// 5 y 2.- Exportamos y Creamos un componente
export const Spinner = () => {
  // 3. Code JS
  console.log('Spinner')

  // 4. Retornamos un HTML
  return (
    <div className="container d-none">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )

}

