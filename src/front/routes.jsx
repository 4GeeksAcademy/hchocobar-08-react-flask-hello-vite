// Import necessary components and functions from react-router-dom.
import { createBrowserRouter, createRoutesFromElements, Route,} from "react-router-dom";
import { Layout } from "./pages/Layout.jsx";
import { Home } from "./pages/Home.jsx";
import { Single } from "./pages/Single.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Error404 } from "./pages/Error404.jsx";
import { Jumbotron } from './pages/Jumbotron.jsx';
import { TodoList } from './pages/TodoList.jsx'
import { SimpleCounter } from './pages/SimpleCounter.jsx'
import { ExampleUseState } from './pages/ExampleUseState.jsx'
import { ExampleFetch } from './pages/ExampleFetch.jsx'
import { Login } from './pages/Login.jsx'

export const router = createBrowserRouter(
    createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.

      // Root Route: All navigation will start from here.
      <Route path="/" element={<Layout />} errorElement={<Error404/>} >

        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        <Route path= "/" element={<Home />} />
        <Route path="/single/:theId" element={ <Single />} />  {/* Dynamic route for single items */}
        <Route path="/demo" element={<Demo />} />
        <Route path='/jumbotron' element={<Jumbotron/>} />
        <Route path="/todo-list" element={<TodoList/>} />
        <Route path="/simple-counter" element={<SimpleCounter/>} />
        <Route path="/example-use-state" element={<ExampleUseState/>} />
        <Route path="/example-fetch" element={<ExampleFetch/>} />
        <Route path="/login" element={<Login/>} />
      </Route>
    )
);