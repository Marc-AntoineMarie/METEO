import { useState, useEffect } from "react";
import './semaine.css';



export default function Semaine() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputCity, setInputCity] = useState("Paris"); // Ville par défaut dans l'input
  const [city, setCity] = useState("Paris"); // Ville pour l'API

  const fetchWeatherData = async (city) => {
    const apiKey = "*********************";

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=fr`
      );
      if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);

      const data = await response.json();

      const dailyData = data.list.reduce((acc, curr) => {
        const date = new Date(curr.dt * 1000).toISOString().split("T")[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(curr);
        return acc;
      }, {});

      const sevenDaysForecast = Object.entries(dailyData)
        .slice(0, 7)
        .map(([date, entries]) => {
          const temps = entries.map((entry) => entry.main.temp);
          const avgTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
          const weatherDescription = entries[0].weather[0].description;
          const icon = entries[0].weather[0].icon;

          return {
            date,
            avgTemp: avgTemp.toFixed(1),
            weatherDescription,
            icon,
          };
        });

      setWeatherData(sevenDaysForecast);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const handleInputChange = (e) => {
    setInputCity(e.target.value);
  };

  const handleCitySubmit = () => {
    setCity(inputCity);
  };

  if (loading) return <p className="loading">Chargement...</p>;
  if (error) return <p className="error">Erreur : {error}</p>;

  return (
    <div className="app">
      <div className="search-bar">
        <input
          type="text"
          value={inputCity}
          onChange={handleInputChange}
          placeholder="Entrez le nom de la ville"
          className="input"
        />
        <button onClick={handleCitySubmit} className="button">
          Rechercher
        </button>
      </div>

      <div className="forecast">
        {weatherData &&
          weatherData.map((day, index) => (
            <div key={index} className="forecast-card">
              <div className="date">{new Date(day.date).toLocaleDateString("fr-FR", { weekday: "long", month: "long", day: "numeric" })}</div>
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.weatherDescription}
                className="icon"
              />
              <div className="temp">{day.avgTemp}°C</div>
              <div className="description">{day.weatherDescription}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
