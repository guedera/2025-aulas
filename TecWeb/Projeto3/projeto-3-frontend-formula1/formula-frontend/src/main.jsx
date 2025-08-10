import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App.jsx';
import Login from './components/Login';
import Construtora from './components/Construtora';
import Construtoras from './components/Construtoras';
import Cadastro from './components/Cadastro';
import Pilotos from './components/Pilotos';
import Piloto from './components/Piloto';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "construtoras/",
    element: <Construtoras />,
  },
  {
    path: "construtora/:id",
    element: <Construtora />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "pilotos/",
    element: <Pilotos />,
  },
  {
    path: "piloto/:id",
    element: <Piloto />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
