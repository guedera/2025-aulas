import axios from "axios";
import Spotify from "./components/Spotify";
import Formulario from "./components/Formulario";
import Artista from "./components/Artista";
import Clima from "./components/Clima";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [spotifys, setSpotifys] = useState([]);
  const [climas, setClimas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/spotify/")
      .then((res) => setSpotifys(res.data));
  }, []);
  console.log(spotifys);

  const carregaFavoritos = () => {
    axios
      .get("http://localhost:8000/api/spotify/")
      .then((res) => setSpotifys(res.data));
  }

  useEffect(() => {
    carregaFavoritos();
  }, []);

  //Questão 2 começa aqui
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/clima/")
      .then((response) => {
        console.log("Daods de SP", response.data);
        setClimas(response.data);
      })
      .catch((error) => {
        console.error("Erro", error);
      });
  }, []);

   // Função chamada ao clicar em um artista
  const artistaDesejado = (id_artista) => {
    console.log("Redirecionando para o artista com ID:", id_artista);
    navigate(`/artista/${id_artista}`); // Redireciona para a página do artista
  };

  return (
    <div className="app-container">
      <div className="title-section">
        <img src="/dog.png" alt="Trackify Logo" className="app-logo" />
        <h1 className="app-title">Trackify</h1>
      </div>
      
      <div className="search-container">
        <Formulario loadArtistas={carregaFavoritos}/>
      </div>
      
      <div className="favorites-container">
        {spotifys.map((spotify) => (
          <Spotify 
            key={`spotify__${spotify.id_artista}`} 
            name={spotify.name} 
            monthly_listeners={spotify.monthly_listeners} 
            world_rank={spotify.world_rank} 
            followers={spotify.followers} 
            loadArtistas={carregaFavoritos}
            onClick={() => artistaDesejado(spotify.id_artista)}
            className="card"
          >
          </Spotify>
        ))}
      </div>
      
      <div className="climas-container">
        <h2>Climas</h2>
        <div className="climas-list">
          {climas.map((clima) => (
            <Clima 
              key={clima.id}
              cidade={clima.cidade}
              minima={clima.minima}
              maxima={clima.maxima}
              chance_chuva={clima.chance_chuva}
              data={clima.data}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;