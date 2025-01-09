import './App.css';
import Heures from '../../Components/heures';
import Semaine from '../../Components/semaine';
import Compteur from '../../Components/compteur';

import { useState } from 'react';

// Données d'exemple pour les prévisions horaires
const hourlyDatas = [
  {
    dt: Date.now() / 1000, // Heure actuelle en timestamp
    main: { temp: 22.5 },
    weather: [{ description: 'Ciel dégagé', icon: '01d' }],
  },
  {
    dt: (Date.now() + 3600000) / 1000, // +1 heure
    main: { temp: 23.2 },
    weather: [{ description: 'Quelques nuages', icon: '02d' }],
  },
  {
    dt: (Date.now() + 7200000) / 1000, // +2 heures
    main: { temp: 21.8 },
    weather: [{ description: 'Partiellement nuageux', icon: '03d' }],
  },
];

function App() {
  const [affichage, setAffichage] = useState(false);

  const changeAffichage = () => {
    setAffichage((val) => !val);
  };

  return (
    <div className="App">
      <h1>MÉTÉO</h1>
      <button className="button-85" onClick={changeAffichage}>
        Passer en affichage par {affichage ? 'heures' : 'semaine'}
      </button>

      {!affichage && <Heures datas={hourlyDatas} />}
      {affichage && <Semaine />}

      <hr />

      <Compteur />
    </div>
  );
}

export default App;
