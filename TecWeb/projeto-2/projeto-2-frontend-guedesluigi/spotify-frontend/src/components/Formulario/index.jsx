import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Formulario() {
    const [artista, setArtista] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const buscarArtista = async () => {
        console.log("Função buscarArtista foi chamada");
        setIsLoading(true);
        const url = "https://spotify-statistics-and-stream-count.p.rapidapi.com/search";
        const trimmedSearch = artista.replace(/\s+/g, '');
        const searchTerm = trimmedSearch.charAt(0).toUpperCase() + trimmedSearch.slice(1);
        const params = { q: searchTerm };
        const headers = {
            "X-RapidAPI-Key": "5966c16704msh8e37c63f00f7617p170407jsnd345548acce4",
        };

        try {
            const response = await axios.get(url, { params, headers });
            console.log("Dados do artista:", response.data);
            navigate("/artistas", {
                state: { artistas: response.data.artists },
            });
        } catch (error) {
            console.error("Erro ao buscar dados do artista:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="form-card" onSubmit={(e) => e.preventDefault()}>
            <input
                className="form-card-title"
                type="text"
                name="artista"
                placeholder="Nome do artista"
                onChange={(event) => setArtista(event.target.value)}
                value={artista}
            />
            <button 
                className="btn"
                type="button"
                onClick={async (event) => {
                    if (!artista.trim()) {
                        event.preventDefault();
                        return;
                    }
                    buscarArtista();
                }}
            >
                {isLoading ? 
                  <img src="/loading.gif" alt="Carregando" className="btn-icon" /> : 
                  <img src="/search.gif" alt="Buscar" className="btn-icon" />
                }
            </button>      
        </form>
    );
}
