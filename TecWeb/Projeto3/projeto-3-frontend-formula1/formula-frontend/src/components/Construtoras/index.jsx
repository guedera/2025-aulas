import "./index.css";
import Header from "../Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

/* LISTA OS TIMES ENCONTRADOS */
export default function Construtoras() {
    const [construtoras, setConstrutoras] = useState([]);
    const navigate = useNavigate();
    const seasonId = "3d24e122-216e-4328-abcf-0af0c5f3fb9e";
    const url = `https://hyprace-api.p.rapidapi.com/v1/seasons/${seasonId}/constructors`;
    
    useEffect(() => {
        const headers = {
          'x-rapidapi-key': '5261b8ccc9msh1c2ed604fa10bc5p190f18jsn8a310f22c849',
          'x-rapidapi-host': 'hyprace-api.p.rapidapi.com'
        };

        axios
            .get(url, { headers })
            .then((response) => {
                console.log("Dados da API: ", response.data.items);
                setConstrutoras(response.data.items);
            
            })
            .catch((error) => {
                console.error('Erro ao buscar construtoras:', error);
            });
    }, []);

    const getTeamColor = (teamName) => {
      const teamColors = {
        'Red Bull': '#0600EF',
        'Ferrari': '#DC0000',
        'McLaren': '#FF8700',
        'Mercedes': '#00D2BE',
        'Aston Martin': '#006F62',
        'Alpine F1 Team': '#0090FF',
        'Williams': '#005AFF',
        'RB F1 Team': '#2B4562',
        'Sauber': '#52e252',
        'Haas F1 Team': '#FFFFFF',
        // Add more teams as needed
      };
      
      return teamColors[teamName] || '#FF1801'; // Default to F1 red if team not found
    };
    
    // Helper function to convert hex to RGB
    const hexToRgb = (hex) => {
      // Remove # if present
      hex = hex.replace('#', '');
      
      // Parse the hex values
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      
      return `${r}, ${g}, ${b}`;
    };

  return (
    <div className="construtoras-page-wrapper">
      <Header />
      <div className="construtoras-container">
        <div className="content-construtoras">
          <h1 className="construtoras-title">Construtoras</h1>
          <ul className="construtoras-list">
            {construtoras.map((team) => (
              <li key={team.id}>
                <button 
                  className="construtoras-navigation-button"
                  onClick={() => navigate(`/construtora/${team.id}`,
                  { state: { name: team.name,
                      shortName: team.shortName,
                      color: team.color,
                      nationality: team.nationality,
                   } }
                  )}
                  style={{ 
                    '--team-color': getTeamColor(team.name),
                    '--team-color-rgb': hexToRgb(getTeamColor(team.name))
                  }}
                >
                  {team.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
