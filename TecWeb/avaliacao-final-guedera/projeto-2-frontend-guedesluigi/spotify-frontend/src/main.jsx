import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App.jsx'
/* 
import Formulario from './components/Formulario'
*/
import Artistas from './components/Artistas'
import Artista from './components/Artista'
import Home from './components/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "artistas/",
    element: <Artistas />,
  },
  {
    path: "artista/:id",
    element: <Artista />,
  },
  {
    path: "artista/:id_artista",
    element: <Artista />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
