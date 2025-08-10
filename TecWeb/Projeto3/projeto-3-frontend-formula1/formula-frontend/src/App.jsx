import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const [topDrivers, setTopDrivers] = useState([]);
  const [topConstructors, setTopConstructors] = useState([]);
  const [nextGP, setNextGP] = useState(null);
  const [favoriteDriver, setFavoriteDriver] = useState("");
  const [favoriteTeam, setFavoriteTeam] = useState("");
  const seasonId = "3d24e122-216e-4328-abcf-0af0c5f3fb9e";
  
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    } else {

      const headers = {
        'x-rapidapi-key': '5261b8ccc9msh1c2ed604fa10bc5p190f18jsn8a310f22c849',
        'x-rapidapi-host': 'hyprace-api.p.rapidapi.com'
      };
      

      // Fetch favorite data from backend
      const fetchFavorites = async () => {
        try {
          const token = localStorage.getItem("token");
          const backendHeaders = {
            'Authorization': `Token ${token}`
          };
          
          // Make request to backend to get user favorites
          const response = await axios.get("http://localhost:8000/api/favoritos/", {
            headers: backendHeaders
          });
          
          if (response.data) {
            if (response.data.favpilot && response.data.p_favoritado) {
              setFavoriteDriver(response.data.favpilot);
            }
            
            if (response.data.favteam && response.data.t_favoritado) {
              setFavoriteTeam(response.data.favteam);
            }
          }
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };
      
      fetchFavorites();

      axios.get(`https://hyprace-api.p.rapidapi.com/v1/drivers-standings?isLastStanding=true&seasonId=${seasonId}`, 
        { headers }
      ).then(response => {

        const standings = response.data.items[0].standings;
        const top3Standings = standings.filter(standing => standing.position <= 3);
        

        Promise.all(
          top3Standings.map(standing => 
            axios.get(`https://hyprace-api.p.rapidapi.com/v1/drivers/${standing.driverId}`, { headers })
              .then(driverResponse => ({
                ...driverResponse.data,
                position: standing.position,
                points: standing.points
              }))
          )
        ).then(driversWithDetails => {
          setTopDrivers(driversWithDetails);
        }).catch(error => {
          console.error("Error fetching driver details:", error);
        });
      }).catch(error => {
        console.error("Error fetching standings:", error);
      });


      axios.get(`https://hyprace-api.p.rapidapi.com/v1/constructors-standings?isLastStanding=true&seasonId=${seasonId}`, 
        { headers }
      ).then(response => {

        const standings = response.data.items[0].standings;
        const top3Standings = standings.filter(standing => standing.position <= 3);
        

        Promise.all(
          top3Standings.map(standing => 
            axios.get(`https://hyprace-api.p.rapidapi.com/v1/constructors/${standing.constructor.id}`, { headers })
              .then(constructorResponse => ({
                ...constructorResponse.data,
                position: standing.position,
                points: standing.points
              }))
          )
        ).then(constructorsWithDetails => {
          setTopConstructors(constructorsWithDetails);
        }).catch(error => {
          console.error("Error fetching constructor details:", error);
        });
      }).catch(error => {
        console.error("Error fetching constructor standings:", error);
      });


      axios.get('https://hyprace-api.p.rapidapi.com/v1/grands-prix', { 
        params: { isCurrent: true },
        headers 
      }).then(response => {
        if (response.data.items && response.data.items.length > 0) {
          const grandsPrix = response.data.items;
          
          const now = new Date();
          const upcomingGPs = grandsPrix.filter(gp => new Date(gp.startDate) > now);
          
          if (upcomingGPs.length > 0) {

            upcomingGPs.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
            setNextGP(upcomingGPs[0]);
          } else if (grandsPrix.length > 0) {

            setNextGP(grandsPrix[0]);
          }
        }
      }).catch(error => {
        console.error("Error fetching Grand Prix data:", error);
      });
    }
  }, []);


  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  // Add this function before the return statement
  const getTeamColor = (teamName) => {
    const teamColors = {
      'Red Bull Racing': '#0600EF',
      'Ferrari': '#DC0000',
      'McLaren': '#FF8700',
      'Mercedes': '#00D2BE',
      'Aston Martin': '#006F62',
      'Alpine': '#0090FF',
      'Williams': '#005AFF',
      'AlphaTauri': '#2B4562',
      'Alfa Romeo': '#900000',
      'Haas F1 Team': '#FFFFFF',
    };
    
    return teamColors[teamName] || '#FF1801'; // Default to F1 red if team not found
  };

  return (
    <div className="app-container">
      <Header />
      <div className="content">
        {nextGP && (
          <div className="next-gp-container">
            <h1>Próximo GP</h1>
            <div className="next-gp-card">
              <h2>{nextGP.name}</h2>
              <p>{formatDate(nextGP.startDate)} - {formatDate(nextGP.endDate)}</p>
              <p>{nextGP.circuit?.name || 'Circuito não especificado'}</p>
              <p>{nextGP.circuit?.country?.name || 'País não especificado'}</p>
            </div>
          </div>
        )}
        
        <h1>Top 3 Pilotos da Temporada</h1>
        <div className="top-drivers">
          {topDrivers.map(driver => (
            <button 
              key={driver.id} 
              className="driver-button"
              onClick={() => navigate(`/piloto/${driver.id}`)}
            >
              #{driver.position} {driver.firstName} {driver.lastName} - {driver.points}
            </button>
          ))}
        </div>

        <h1>Top 3 Equipes da Temporada</h1>
        <div className="top-constructors">
          {topConstructors.map(constructor => {
            // Get team color based on constructor name
            const teamColor = getTeamColor(constructor.name);
            return (
              <button 
                key={constructor.id} 
                className="constructor-button"
                onClick={() => navigate(`/construtora/${constructor.id}`)}
                style={{ '--team-color': teamColor }}
              >
                #{constructor.position} - {constructor.name} - {constructor.points}
              </button>
            );
          })}
        </div>
        
        {/* New section for favorites */}
        <div className="user-favorites">
          <h1>Seus Favoritos</h1>
          <div className="favorite-item">
            <h2>Piloto Favorito:</h2>
            <p>{favoriteDriver || "Nenhum piloto favorito selecionado"}</p>
          </div>
          <div className="favorite-item">
            <h2>Equipe Favorita:</h2>
            <p>{favoriteTeam || "Nenhuma equipe favorita selecionada"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;