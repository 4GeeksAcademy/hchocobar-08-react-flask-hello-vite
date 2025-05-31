import { Link } from "react-router-dom";


export const Error404 = () => {
  return (
    <div className="d-flex h-100 text-center text-bg-dark">
      <div className="cover-container d-flex w-100 vh-100 p-3 flex-column">
        <main className="m-auto px-3">
          <h1 className="display-1">Error 404</h1>
          <p className="lead display-5 mb-5">
            Page not found
          </p>
          <p className="lead mt-5">
            <Link to='/' className="btn btn-lg btn-light fw-bold border-white bg-white">
              Back Home
            </Link>
          </p>
        </main>
      </div>
    </div>
  )
}
