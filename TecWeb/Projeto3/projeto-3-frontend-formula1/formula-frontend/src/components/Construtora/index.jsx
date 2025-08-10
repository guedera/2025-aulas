import "./index.css";
import Header from "../Header";
import FavoritarTime from "../FavoritarTime";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Construtora() {
  const { id } = useParams();
  const [infoBase, setInfoBase] = useState(null);      // dados do /v1/constructors/{id}
  const [infoTemporada, setInfoTemporada] = useState(null); // dados do /v1/seasons/{id}/constructors
  const seasonId = "3d24e122-216e-4328-abcf-0af0c5f3fb9e";

  const headers = {
    'x-rapidapi-key': '5261b8ccc9msh1c2ed604fa10bc5p190f18jsn8a310f22c849',
    'x-rapidapi-host': 'hyprace-api.p.rapidapi.com'
  };

  useEffect(() => {
    // Dados fixos da equipe
    axios.get(`https://hyprace-api.p.rapidapi.com/v1/constructors/${id}`, { headers })
      .then(res => setInfoBase(res.data))
      .catch(err => console.error("Erro ao buscar dados da equipe:", err));

    // Dados da temporada (posição, pontos, pilotos)
    axios.get(`https://hyprace-api.p.rapidapi.com/v1/seasons/${seasonId}/constructors`, { headers })
      .then(res => {
        const equipe = res.data.items.find(e => e.id === id);
        setInfoTemporada(equipe);
      })
      .catch(err => console.error("Erro ao buscar dados da temporada:", err));
  }, [id]);

  if (!infoBase || !infoTemporada) return <p>Carregando construtora...</p>;

  // Get the team color for styling
  const teamColor = infoBase.color || "#FF1801";

  return (
    <div>
      <Header />
      <div className="construtora-content" style={{ "--team-color": teamColor }}>
        <h1>{infoBase.fullName}</h1>
        <p><strong>Nome curto:</strong> {infoBase.shortName}</p>
        <p><strong>País:</strong> {infoBase.nationality ?? "N/A"}</p>
        <p><strong>Posição:</strong> {infoTemporada.standing?.position ?? "N/A"}</p>
        <p><strong>Pontos:</strong> {infoTemporada.standing?.points ?? "N/A"}</p>
        <p>
          <strong>Cor oficial:</strong>{" "}
          <span className="team-color-display" style={{ backgroundColor: infoBase.color }}>
          </span>
          {" "}{infoBase.color}
        </p>
        <p><strong>Pilotos:</strong></p>
        <div className="drivers-list">
          {infoTemporada.drivers?.filter(driver => driver.driverStatus === "Main")
          .map(driver => (
            <span key={driver.id} className="driver-item">
              {driver.firstName} {driver.lastName}
            </span>
          ))}
        </div>
        <div className="favoritar-container">
          <FavoritarTime constructorId={id} shortName={infoTemporada.shortName}/>
        </div>
      </div>
    </div>
  );
}
