import "./index.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Favoritar({ artistId, artistName, monthlyListeners, worldRank, followers }) {
    const [favoritado, setFavoritado] = useState(false);
    

    useEffect(() => {
        const verificarFavorito = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/spotify/${artistId}/`);
                
                // Verifica se a resposta contém os dados esperados
                if (response.data && response.data.id_artista === artistId) {
                    setFavoritado(true); // Artista já está favoritado
                } else {
                    setFavoritado(false); // Artista não está no banco de dados
                }
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setFavoritado(false); // Artista não está no banco de dados
                } else {
                    console.error("Erro ao verificar se o artista está favoritado:", err);
                }
            }
        };
        
        verificarFavorito();
    }, [artistId]);
    
        // Atualiza o estado no banco de dados
    const definirFavorito = () => {
        const novoEstado = !favoritado;
        setFavoritado(novoEstado);
        if (novoEstado) {
            axios
            .post(`http://localhost:8000/api/spotify/${artistId}/`, { name: artistName, monthlyListeners: monthlyListeners, worldRank: worldRank, followers: followers, favoritado: novoEstado })
            .then(() => {
                console.log("Artista favoritado!");
            });
        } else {
            axios
            .delete(`http://localhost:8000/api/spotify/${artistId}/`)
            .then(() => {
                console.log("Artista desfavoritado!");
            });
        }
        
    };

    return (
        <div className="favoritar">
            <img 
                src={favoritado ? "/favverd100.png" : "/icons8-favorite-100.png"} 
                alt={favoritado ? "Favoritado" : "Não Favoritado"} 
                onClick={definirFavorito} 
                className="favoritar-icon"
            />
        </div>
    );
}

