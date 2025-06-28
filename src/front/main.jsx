import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  // Estilos globales para nuestra aplicación
// Configuración de Rutas y el Store
import { RouterProvider } from "react-router-dom";  // RouterProvider para uilizar las rutas o paths
import { router } from "./routes.jsx";  // Definición de las rutas o paths
// StoreProvider que gestiona los estados globales
import { StoreProvider } from './hooks/useGlobalReducer.jsx';
// Custom componenets
import { BackendURL } from './components/BackendURL.jsx';


const Main = () => {
    if (!import.meta.env.VITE_BACKEND_URL ||  import.meta.env.VITE_BACKEND_URL == "") {
        // Si no está configurada la ruta del Backend nos muestra un componente que nos indica que hacer
        return (
            <React.StrictMode>
                <BackendURL/ >
            </React.StrictMode>
        );
    }

    // Nuestra aplicación embebida
    return (
        <React.StrictMode>  
            <StoreProvider>  {/* Provee el estado global a todos los componentes */}
                {/* Configura el ruteo de la aplicación */} 
                <RouterProvider router={router}>
                </RouterProvider>
            </StoreProvider>
        </React.StrictMode>
    );
}


// Renderizamos el componente Main dentro del elemento del DOM <div id="root"></div>
ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
