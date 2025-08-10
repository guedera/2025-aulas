import "./index.css";
import Header from "../Header";
import FavoritarPiloto from "../FavoritarPiloto";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Piloto() {
  const { id } = useParams();
  const [pilotoInfo, setPilotoInfo] = useState(null);
  const [seasonData, setSeasonData] = useState(null);

  const headers = {
    'x-rapidapi-key': '5261b8ccc9msh1c2ed604fa10bc5p190f18jsn8a310f22c849',
    'x-rapidapi-host': 'hyprace-api.p.rapidapi.com'
  };

  useEffect(() => {
    // Busca as infos fixas do piloto
    axios.get(`https://hyprace-api.p.rapidapi.com/v1/drivers/${id}`, { headers })
      .then(res => setPilotoInfo(res.data))
      .catch(err => console.error("Erro ao buscar piloto base:", err));

    // Busca os dados da temporada para posição, pontos e equipe
    const seasonId = "3d24e122-216e-4328-abcf-0af0c5f3fb9e";
    axios.get(`https://hyprace-api.p.rapidapi.com/v1/seasons/${seasonId}/drivers`, { headers })
      .then(res => {
        const encontrado = res.data.items.find(p => p.id === id);
        setSeasonData(encontrado);
      })
      .catch(err => console.error("Erro ao buscar dados da temporada:", err));
  }, [id]);

  if (!pilotoInfo) return null;

  // Get the team color for the styling
  const teamColor = seasonData?.constructors?.[0]?.color || "#FF1801";

  return (
    <div>
      <Header />
      <div className="piloto-content" style={{ "--team-color": teamColor }}>
        <h1>{pilotoInfo.firstName} {pilotoInfo.lastName}</h1>
        <p><strong>Número:</strong> {pilotoInfo.number}</p>
        <p><strong>Código:</strong> {pilotoInfo.code}</p>
        <p><strong>Nacionalidade:</strong> {pilotoInfo.nationality}</p>
        <p><strong>Nascimento:</strong> {
          new Date(pilotoInfo.birthDate).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
          })
        }</p>
        <p><strong>Posição:</strong> {seasonData?.standing?.position ?? "N/A"}</p>
        <p><strong>Pontos:</strong> {seasonData?.standing?.points ?? "N/A"}</p>
        <p><strong>Equipe:</strong> {seasonData?.constructors?.[0]?.name ?? "N/A"}</p>
        <p>
          <strong>Cor da equipe:</strong>{" "}
          <span className="team-color" style={{ backgroundColor: seasonData?.constructors?.[0]?.color }}>
          </span>
          {" "}{seasonData?.constructors?.[0]?.color ?? "N/A"}
        </p>
        <div className="favoritar-container">
          <FavoritarPiloto driverId={id} firstName={pilotoInfo.firstName} lastName={pilotoInfo.lastName}/>
        </div>
      </div>
    </div>
  );
}
