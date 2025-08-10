import "./index.css";
import Home from "../Home";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

/* LISTA OS ARTISTAS ENCONTRADOS */
export default function Artistas() {
    const location = useLocation();
    const navigate = useNavigate();
    const [artistaSelecionado, setArtistaSelecionado] = useState(null);
    const artistasEncontrados = location.state?.artistas ?? [];

    const selecionarArtista = (name) => {
        const artista = artistasEncontrados.find((artista) => artista.name === name);
        if (artista) {
            setArtistaSelecionado(artista.id);
            console.log("Artista selecionado:", artista.name);
            const escolhido = {id: artista.id, name: artista.name};

            navigate(`/artista/${artista.id}`, {
                state: { artista: escolhido },
            });

        }
    };

    return (
        <div className="artistas-container">
            <Home />
            <div className="title-section">
                <img src="/sit.png" alt="Artistas Logo" className="app-logo" />
                <h1 className="app-title">Artists Found</h1>
            </div>
            {artistasEncontrados.length > 0 ? (
                artistasEncontrados.map((artista) => (
                    <div key={artista.id} className="artista-item">
                        <p className="artista-nome">{artista.name}</p>
                        <button onClick={() => selecionarArtista(artista.name)} className="selecionar-btn">Select</button>
                    </div>
                ))
            ) : (
                <p className="artista-nome">Nenhum artista encontrado.</p>
            )}
        </div>
    );
}
