import React, { useState, useEffect } from "react";
import './heures.css';

export default function Heures() {
  const [city, setCity] = useState("Paris"); // Ville par défaut
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputCity, setInputCity] = useState(city); // État pour l'input de la ville
  const apiKey = "*********************";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fr&appid=${apiKey}`
        );
        if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
        const data = await response.json();

        // Récupérer les 3 prochaines heures à partir de l'heure actuelle
        const now = new Date();
        const currentHour = now.getHours();

        // Filtrer les prévisions pour les 3 prochaines heures en utilisant `dt_txt`
        const nextHourData = data.list.filter((entry) => {
          const entryHour = new Date(entry.dt_txt).getHours();
          return entryHour > currentHour && entryHour <= currentHour + 3;
        }).slice(0, 3); // Limiter à 3 prédictions maximum

        setData(nextHourData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  // Mettre à jour la ville lorsque l'utilisateur entre une nouvelle ville
  const handleCityChange = (event) => {
    setInputCity(event.target.value);
  };

  const handleCitySubmit = (event) => {
    event.preventDefault();
    setCity(inputCity);
    setLoading(true); // Réinitialiser l'état de chargement lors du changement de ville
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <h2>Météo pour les 3 prochaines heures</h2>
      <p>Voici les prévisions pour les heures suivantes :</p>

      {/* Input pour choisir la ville */}
      <form onSubmit={handleCitySubmit}>
        <input
          type="text"
          value={inputCity}
          onChange={handleCityChange}
          placeholder="Entrez une ville"
        />
        <button type="submit">Rechercher</button>
      </form>

      <div className="hourly-forecast">
        {data.map((hour, index) => (
          <div key={index} className="hour-card">
            <img
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
              alt={hour.weather[0].description}
              className="icon"
            />
            <div className="temp">{hour.main.temp.toFixed(1)}°C</div>
            <div className="description">{hour.weather[0].description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
    
