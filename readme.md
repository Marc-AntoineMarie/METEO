# React

Sujet : Application météo

## Prérequis

Vous aurez besoin de vous créer une clé API pour vous servir de l'API d'OpenWeatherMap ! Par ici : https://openweathermap.org/

## Installation

Initialiser l'application react
```
npx create-react-app meteo
```

Lancer l'application
```
npm start
```

## Projet

Faire une application qui demande avec un input une ville. A partir du moment où ce formulaire est soumis, vous devez déclencher un appel API à openweather pour récupérer la météo et l'afficher.
 
Ajouter un bouton pour basculer l'affichage en "heures" ou "semaine".

Si possible, mettre un minimum de design même si non obligatoire.

## Déploiement sur Github Pages

Installer l'utilitaire de mise en prod
```
npm install gh-pages --save-dev
```

Modifier le package.json
```
"homepage": "https://<votre-nom-utilisateur>.github.io/<nom-du-repo>",
"scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
}
```

Lancement du déploiement : 
```
npm run deploy
```



## a garder de coter  =>

<pre>{JSON.stringify(weatherData, null, 2)}</pre>

import { useState, useEffect } from 'react';  

export default function Semaine({ datas }) {  
    const [weatherData, setWeatherData] = useState(null);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    const [city, setCity] = useState('Paris');

    const apiKey = "a0d4afb7a33d65acd407c274c6f11b34";  
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=en&units=metric`;  

    useEffect(() => {  
        const fetchWeatherData = async () => {  
            const apiKey = "a0d4afb7a33d65acd407c274c6f11b34";  
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=en&units=metric`;  
            
            try {  
                setLoading(true);  
                const response = await fetch(url);  

                if (!response.ok) {  
                    throw new Error(`Erreur HTTP: ${response.status}`);  
                }  

                const data = await response.json();  
                setWeatherData(data);  
            } catch (err) {  
                setError(err.message);  
            } finally {  
                setLoading(false);  
            }  
        };  
        
        fetchWeatherData();  
    }, []);  

    if (loading) return <p>Chargement...</p>;  
    if (error) return <p>Erreur : {error}</p>;  

    return (  
        <div>  
            <h1>Données Météo</h1>  
            {weatherData ? (  
                <div>  
                    <p>Ville : {weatherData.name}</p>  
                    <p>Température : {weatherData.main.temp} °C</p>  
                    <p>Conditions : {weatherData.weather[0].description}</p>  
                    <p>Humidité : {weatherData.main.humidity} %</p>  
                    <p>Vitesse du vent : {weatherData.wind.speed} m/s</p>  
                </div>  
            ) : (  
                <p>Aucune donnée disponible</p>  
            )}  
        </div>  
    );  
}





import { useState, useEffect } from 'react';  

export default function Semaine() {  
    const [weatherData, setWeatherData] = useState(null);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    const [inputCity, setInputCity] = useState('Paris'); // Ville par défaut dans l'input  
    const [city, setCity] = useState('Paris'); // Ville pour l'API  

    const fetchWeatherData = async (city) => {  
        const apiKey = "a0d4afb7a33d65acd407c274c6f11b34";  
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=en&units=metric`;  
        
        try {  
            setLoading(true);  
            const response = await fetch(url);  

            if (!response.ok) {  
                throw new Error(`Erreur HTTP: ${response.status}`);  
            }  

            const data = await response.json();  
            setWeatherData(data);  
        } catch (err) {  
            setError(err.message);  
        } finally {  
            setLoading(false);  
        }  
        
    };  
    console.log(fetchWeatherData);
    useEffect(() => {  
        fetchWeatherData(city);  
    }, [city]); // Ajoute 'city' comme dépendance pour changer quand la ville change  

    const handleInputChange = (e) => {  
        setInputCity(e.target.value); // maj etat input 
    };  

    const handleCitySubmit = () => {  
        setCity(inputCity); // maj etat api
    };  

    if (loading) return <p>Chargement...</p>;  
    if (error) return <p>Erreur : {error}</p>;  

    return (  
        <div>  
            <h1>Données Météo</h1>  
            <input type="text" value={inputCity} onChange={handleInputChange} placeholder="Entrez le nom de la ville" />  
            <button onClick={handleCitySubmit}>Afficher</button> 

            {weatherData ? (  
                <div>  
                    <p>Ville : {weatherData.name}</p>  
                    <p>Température : {weatherData.main.temp} °C</p>  
                    <p>Conditions : {weatherData.weather[0].description}</p>  
                    <p>Humidité : {weatherData.main.humidity} %</p>  
                    <p>Vitesse du vent : {weatherData.wind.speed} m/s</p>  
                </div>  
            ) : (  
                <p>Aucune donnée disponible</p>  
            )}  
        </div>  
    );  
}


import { useState, useEffect } from 'react';  

export default function Semaine() {  
    const [weatherData, setWeatherData] = useState(null);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    const [inputCity, setInputCity] = useState('Paris');  
    const [city, setCity] = useState('Paris');  

    const fetchWeatherData = async (city) => {  
        const apiKey = "a0d4afb7a33d65acd407c274c6f11b34";  
        
        // URL pour obtenir les coordonnées de la ville  
        const locationUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;  
        
        try {  
            setLoading(true);  
            const locResponse = await fetch(locationUrl);  

            if (!locResponse.ok) {  
                throw new Error(`Erreur HTTP: ${locResponse.status}`);  
            }  

            const locData = await locResponse.json();  
            const { coord: { lat, lon } } = locData; // Récupérer les coordonnées (lat, lon)  

            // URL pour les prévisions météorologiques sur 7 jours  
            const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;  
            
            const response = await fetch(forecastUrl);  
            if (!response.ok) {  
                throw new Error(`Erreur HTTP: ${response.status}`);  
            }  

            const data = await response.json();  

            setWeatherData(data);  
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

    if (loading) return <p>Chargement...</p>;  
    if (error) return <p>Erreur : {error}</p>;  

    return (  
        <div>  
            <h1>Données Météo</h1>  
            <input type="text" value={inputCity} onChange={handleInputChange} placeholder="Entrez le nom de la ville" />  
            <button onClick={handleCitySubmit}>Afficher</button>   

            {weatherData ? (  
                <div>  
                    <h2>Prévisions Météo sur 7 jours</h2>  
                    <table>  
                        <thead>  
                            <tr>  
                                <th>Date</th>  
                                <th>Température (°C)</th>  
                                <th>Conditions</th>  
                                <th>Humidité (%)</th>  
                                <th>Vitesse du vent (m/s)</th>  
                            </tr>  
                        </thead>  
                        <tbody>  
                            {weatherData.daily.map((day, index) => (  
                                <tr key={index}>  
                                    <td>{new Date(day.dt * 1000).toLocaleDateString()}</td>  
                                    <td>{day.temp.day}</td>  
                                    <td>{day.weather[0].description}</td>  
                                    <td>{day.humidity}</td>  
                                    <td>{day.wind_speed}</td>  
                                </tr>  
                            ))}  
                        </tbody>  
                    </table>  
                </div>  
            ) : (  
                <p>Aucune donnée disponible</p>  
            )}  
        </div>  
    );  
}