// import logoDatos from '../../img/UCU - PAD.png'

export const Card = (person={url: 'https://4geeksacademy.com/static/dc42e38caa9db517ddea28bea5e40d02/74acc/4geeksacademy-logo-old.webp', name: 'Dylan', role:'Developer'}) => {
    console.log(person)


    return (
    <div className="card" style={{width: '18rem'}}>
        <img src={person.url} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{person.name}</h5>
            <p className="card-text">{person.role}</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
    </div>


    )
}


// 0
// 1, 2
