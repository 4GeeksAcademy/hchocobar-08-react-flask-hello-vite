import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	//  const { store, dispatch } = useGlobalReducer();
	const { store, dispach } = useGlobalReducer()

	return (
		<nav className="navbar navbar-light bg-light">
			Cohorte {store.cohorte}
				<div className="ml-auto">
					<Link to="/users">
						<button className="btn btn-primary">Users</button>
					</Link>
				</div>

			{/* 
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
 			*/}		
 		</nav>
	);
};