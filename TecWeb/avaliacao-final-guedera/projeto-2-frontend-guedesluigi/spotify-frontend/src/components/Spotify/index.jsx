import "./index.css";

export default function Spotify(props) {
  return (
    <div className="card" onClick={props.onClick}>
      <h3 className="card-title">{props.name}</h3>
      <div className="card-content">{props.children}</div>
    </div>
  );
}