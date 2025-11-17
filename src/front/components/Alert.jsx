

export const Alert = () => {
  const alerContent = {
    text: 'Hola, soy el alert. A simple primary alert—check it out!',
    color: 'danger',
    display: true
  }

  return (
    <div className={`container ${alerContent.display ? '' : 'd-none'}`}>
      <div className={`alert alert-${alerContent.color}`} role="alert">
        {alerContent.text}
      </div>
    </div>

  )
}