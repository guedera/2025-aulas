import "./index.css";
import Header from "../Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

/* LISTA OS PILOTOS ENCONTRADOS */
export default function Pilotos() {
  const [pilotos, setPilotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const seasonId = "3d24e122-216e-4328-abcf-0af0c5f3fb9e";

  useEffect(() => {
    const headers = {
      'x-rapidapi-key': '5261b8ccc9msh1c2ed604fa10bc5p190f18jsn8a310f22c849',
      'x-rapidapi-host': 'hyprace-api.p.rapidapi.com'
    };

    // Use pageSize parameter to get all drivers
    const fetchAllDrivers = async () => {
      try {
        setIsLoading(true);
        const response1 = await axios.get(
          `https://hyprace-api.p.rapidapi.com/v1/seasons/${seasonId}/drivers`,
          {
            headers,
            params: {
              pageSize: 25  // Use pageSize instead of limit
            }
          }
        );
        console.log("Dados da API: ", response1.data.items);
        const mainDrivers1 = response1.data.items.filter(driver => driver.constructors && driver.constructors.some(constructor => constructor.driverStatus === "Main"));

        const response2 = await axios.get(
          `https://hyprace-api.p.rapidapi.com/v1/seasons/${seasonId}/drivers`,
          {
            headers,
            params: {
              pageSize: 25,
              pageNumber: 2
            }
          }
        );
        const mainDrivers2 = response2.data.items.filter(driver =>
          driver.constructors && driver.constructors.some(constructor => constructor.driverStatus === "Main")
        );

        const allMainDrivers = mainDrivers1.concat(mainDrivers2);
        setPilotos(allMainDrivers);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar pilotos:', error);
        setIsLoading(false);
      }
      setPilotos(allMainDrivers);
      setIsLoading(false);
    };

    fetchAllDrivers();
  }, []);

  return (
    <div>
      <Header />
      <div className="pilotos-page-wrapper">
        <div className="content-pilotos">
          <h1 className="pilots-title">Pilotos</h1>
          {isLoading ? (
            <p>Carregando pilotos...</p>
          ) : (
            <ul className="pilots-list">
              {pilotos.map((driver) => (
                <li key={driver.id}>
                  <button
                    className="pilots-navigation-button"
                    onClick={() => navigate(`/piloto/${driver.id}`,
                      {
                        state: {
                          firstName: driver.firstName,
                          lastName: driver.lastName,
                          code: driver.code,
                          number: driver.number,
                          nationality: driver.nationality,
                        }
                      }
                    )}>{driver.firstName} {driver.lastName}</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
