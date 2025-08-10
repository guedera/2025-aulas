import "./index.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function FavoritarPiloto({firstName, lastName }) {
    const [favoritado, setFavoritado] = useState(false);
    const nomeCompleto = `${firstName} ${lastName}`;

    useEffect(() => {
        const verificarFavorito = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get(`http://localhost:8000/api/favoritos/piloto/${encodeURIComponent(nomeCompleto)}/verificar/`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
                setFavoritado(res.data.favoritado);
            } catch (err) {
                console.error("Erro ao verificar favorito:", err);
            }
        };
        verificarFavorito();
    }, [nomeCompleto]);
    
    const definirPilotoFavorito = async () => {
        const novoEstado = !favoritado;
        setFavoritado(novoEstado);
        const token = localStorage.getItem("token");

        try {
            if (novoEstado) {
                await axios.post("http://localhost:8000/api/favoritos/piloto/", {
                    driver_name: nomeCompleto,
                },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                console.log(`Piloto '${nomeCompleto}' favoritado.`);
            } else {
                await axios.post(`http://localhost:8000/api/favoritos/piloto/${encodeURIComponent(nomeCompleto)}/`,
                {
                    driver_name: '',
                },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                console.log(`Piloto '${nomeCompleto}' desfavoritado.`);
            }
        } catch (err) {
            console.error("Erro ao atualizar favorito:", err);
        }
    };

    return (
        <div className="favoritar">
            <img 
                src={favoritado ? "/likered.png" : "/like.png"} 
                alt={favoritado ? "Favoritado" : "Não Favoritado"} 
                onClick={definirPilotoFavorito} 
                className="favoritar-icon"
            />
        </div>
    );
}

