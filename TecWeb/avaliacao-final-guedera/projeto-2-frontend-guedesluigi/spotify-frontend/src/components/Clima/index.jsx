import "./index.css";

export default function Clima(props) {
  const { cidade, minima, maxima, chance_chuva, data } = props;
  
  return (
    <div className="clima-card">
      <h3 className="clima-cidade">{cidade}</h3>
      <div className="clima-info">
        <p>Mínima de {minima} graus</p>
        <p>Máxima de {maxima} graus</p>
        <p>Chance de Chuva é de {chance_chuva} %</p>
        <p>Data: {data}</p>
      </div>
    </div>
  );
}
