import { useState } from "react";

export default function Rechercher() {
  const [level, setLevel] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState(10); // Par défaut 10 km

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({
      level,
      date,
      time,
      location,
      radius,
    });
    alert("Recherche envoyée !");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-transparent">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg border border-white/20 max-w-2xl w-full text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Rechercher une partie de Padel</h2>

        <form onSubmit={handleSearch} className="space-y-4">
          {/* Niveau du joueur */}
          <div>
            <label className="block text-white text-sm font-bold mb-2">Niveau du joueur</label>
            <select
              className="w-full p-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              required
            >
              <option value="">Sélectionnez un niveau</option>
              <option value="debutant">Débutant</option>
              <option value="intermediaire">Intermédiaire</option>
              <option value="avance">Avancé</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          {/* Créneau horaire */}
          <div>
            <label className="block text-white text-sm font-bold mb-2">Date et heure</label>
            <div className="flex space-x-2">
              <input
                type="date"
                className="w-1/2 p-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <input
                type="time"
                className="w-1/2 p-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Localisation */}
          <div>
            <label className="block text-white text-sm font-bold mb-2">Localité</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ville, adresse..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          {/* Rayon de recherche */}
          <div>
            <label className="block text-white text-sm font-bold mb-2">Rayon de recherche (km)</label>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              className="w-full"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
            />
            <p className="text-white text-sm mt-2">Distance : {radius} km</p>
          </div>

          {/* Bouton de recherche */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Rechercher
          </button>
        </form>
      </div>
    </div>
  );
}
