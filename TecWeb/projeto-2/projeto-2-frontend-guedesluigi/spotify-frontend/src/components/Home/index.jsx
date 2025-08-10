import "./index.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
    const navigate = useNavigate();

    const retornarHome = () => {
        navigate("/");
    }

    return (
        <div className="home">
            <img src="/icons8-home-100.png" alt="Icone de Inicio" onClick={retornarHome}/>
        </div>
    );
}