import "./index.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function FavoritarTime({shortName}) {
    const [favoritado, setFavoritado] = useState(false);
    

    useEffect(() => {
        const verificarFavorito = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get(`http://localhost:8000/api/favoritos/time/${encodeURIComponent(shortName)}/verificar/`,
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
    }, [shortName]);
    

    const definirTimeFavorito = async () => {
        const novoEstado = !favoritado;
        setFavoritado(novoEstado);
        const token = localStorage.getItem("token");

        try {
            if (novoEstado) {
                await axios.post("http://localhost:8000/api/favoritos/time/", {
                    constructor_name: shortName,
                },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                console.log(`Time '${shortName}' favoritado.`);
            } else {
                await axios.post(`http://localhost:8000/api/favoritos/time/${encodeURIComponent(shortName)}/`,
                {
                    constructor_name: '',
                },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                console.log(`Time '${shortName}' desfavoritado.`);
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
                onClick={definirTimeFavorito} 
                className="favoritar-icon"
            />
        </div>
    );
}

