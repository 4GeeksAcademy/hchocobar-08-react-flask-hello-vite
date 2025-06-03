// Import los componentes y funciones necesarias desde react-router-dom
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
// Custom components
import { Layout } from "./pages/Layout.jsx";
import { Home } from "./pages/Home.jsx";
import { Error404 } from "./pages/Error404.jsx";
import { Login } from "./pages/Login.jsx";
import { SimpleCounter } from "./pages/SimpleCounter.jsx";
import { TodoList } from "./pages/TodoList.jsx";
import { TodoListFetch } from "./pages/TodoListFetch.jsx";
// Demo components
import { Single } from "./pages/Single.jsx";
import { Demo } from "./pages/Demo.jsx";


export const router = createBrowserRouter(
    // CreateRoutesFromElements: es una función que nos permite definir laas rutas hacia los elementos
    createRoutesFromElements(
        // Aquí creamos nuestras rutas,
        <Route path="/" element={<Layout />} errorElement={<Error404 />}>

            <Route path="/" element={<Home />} />
            <Route path="/single/:theId" element={<Single />} />
            <Route path="/demo" element={<Demo />} />
            <Route path='/login' element={<Login />} />
            <Route path='/simple-counter' element={<SimpleCounter />} />
            <Route path='/todolist' element={<TodoList />} />
            <Route path='/todolist-fetch' element={<TodoListFetch />} />
        </Route>
    )
);