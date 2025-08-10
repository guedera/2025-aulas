import axios from "axios";
import Spotify from "./components/Spotify";
import Formulario from "./components/Formulario";
import Artista from "./components/Artista";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [spotifys, setSpotifys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://projeto-2-backend-guedesluigi.onrender.com/api/spotify/")
      .then((res) => setSpotifys(res.data));
  }, []);
  console.log(spotifys);

  const carregaFavoritos = () => {
    axios
      .get("https://projeto-2-backend-guedesluigi.onrender.com/api/spotify/")
      .then((res) => setSpotifys(res.data));
  }

  useEffect(() => {
    carregaFavoritos();
  }, []);

   //Função chamada ao clicar em um artista
  const artistaDesejado = (id_artista) => {
    console.log("Redirecionando para o artista com ID:", id_artista);
    navigate(`/artista/${id_artista}`); //Redireciona para a página do artista
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
      
      <h2 className="section-title">
        <img src="/favverd100.png" alt="Favorite Icon" className="section-icon" />
        Liked Artists:
      </h2>
      
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
    </div>
  );
}

export default App;