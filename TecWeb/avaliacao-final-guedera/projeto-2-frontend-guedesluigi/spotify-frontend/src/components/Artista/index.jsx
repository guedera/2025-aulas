import "./index.css";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Favoritar from "../Favoritar";
import Home from "../Home";

export default function Artista() {
  const { id } = useParams();
  const location = useLocation();
  const [artistData, setArtistData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtistData = async () => {
      if (location.state?.artista) {
        const artistId = location.state.artista.id;
        try {
          setLoading(true);
          const url = `https://spotify-statistics-and-stream-count.p.rapidapi.com/artist/${artistId}`;
          const headers = {
            "X-RapidAPI-Key": "5966c16704msh8e37c63f00f7617p170407jsnd345548acce4",
            "x-rapidapi-host": "spotify-statistics-and-stream-count.p.rapidapi.com"
          };
          
          const response = await axios.get(url, { headers });

          console.log("Dados detalhados do artista:", response.data);
          
		  setArtistData(response.data);
         
		  setLoading(false);
        } catch (err) {
          console.error("Error fetching detailed artist data:", err);
          
		  setError("Failed to load detailed artist data");
		  
		  setLoading(false);
        }
        return;
      }
      
      try {
        setLoading(true);
        const url = `https://spotify-statistics-and-stream-count.p.rapidapi.com/artist/${id}`;
        const headers = {
          "X-RapidAPI-Key": "5966c16704msh8e37c63f00f7617p170407jsnd345548acce4",
          "x-rapidapi-host": "spotify-statistics-and-stream-count.p.rapidapi.com"
        };
        
        const response = await axios.get(url, { headers });
        
		console.log("Dados do artista:", response.data);
        
		setArtistData(response.data);
        
		setLoading(false);

      } catch (err) {
        
		console.error("Error fetching artist data:", err);
        
		setError("Failed to load artist data");
        
		setLoading(false);
      }
    };

    fetchArtistData();
  }, [id, location.state]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="artist-container">
      <Home />
      <div className="title-section">
        <img src="/eating.png" alt="Artist Info Logo" className="app-logo" />
        <h1 className="app-title">Artist Information</h1>
      </div>

      {loading ? (
        <div className="loading-container">
          <p className="loading-text">Loading artist information...</p>
          <img src="/jumpy.png" alt="Carregando" className="loading-spinner" />
        </div>
      ) : artistData && (
        <div className="artist-info">
          <h2>{artistData.name}</h2>

          <div className="content-container">
            {artistData.coverArt && artistData.coverArt.length > 0 && (
              <div className="image-container">
                <img
                  src={artistData.coverArt[0].url} 
                  alt={`${artistData.name} cover art`} 
                  height={artistData.coverArt[0].height} 
                  width={artistData.coverArt[0].width}
                />
              </div>
            )}

            <div className="stats-container">
              <p className="stats-item">
                Verified: {artistData.verified ? "Yes" : "No"}
                {artistData.verified && <img src="/verified.gif" alt="Verified" className="verified-icon" />}
              </p>
              <p className="stats-item">Followers: {artistData.followers.toLocaleString()}</p>
              <p className="stats-item">Monthly Listeners: {artistData.monthlyListeners.toLocaleString()}</p>
              <p className="stats-item">World Rank: {artistData.worldRank ? `#${artistData.worldRank}` : "No Rank"}</p>
              
              {artistData.topTracks && artistData.topTracks.length > 0 && (
                <p className="stats-item">Top Track: {artistData.topTracks[0].name}</p>
              )}
              
              {}
              <div className="favoritar-container">
                <Favoritar artistId={artistData.id} artistName={artistData.name} monthlyListeners={artistData.monthlyListeners} worldRank={artistData.worldRank} followers={artistData.followers} />
              </div>
              
              {}
              <div className="spotify-link-container">
                <a href={`https://open.spotify.com/artist/${artistData.id}`} target="_blank" rel="noopener noreferrer">
                  <img src="/headphone.png" alt="Listen on Spotify" className="spotify-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}