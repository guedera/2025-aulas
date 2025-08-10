import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="title-logo" onClick={() => navigate("/")}>
        <h1 className="clickable">INFÓRMULA 1</h1>
        <img src="/f1500.png" alt="Logo" className="logo clickable" />
      </div>
      <div className="buttons">
        <button onClick={() => navigate("/construtoras")}>Equipes</button>
        <button onClick={() => navigate("/pilotos")}>Pilotos</button>
      </div>
    </header>
  );
}
