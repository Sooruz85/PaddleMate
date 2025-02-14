import { useState } from "react";
import { useAnnonces } from "../context/AnnonceContext";

const clubs = [
  { name: "Club Paris", image: "/images/club-paris.jpg" },
  { name: "Club Bordeaux", image: "/images/club-bordeaux.jpg" },
  { name: "Club Marseille", image: "/images/club-marseille.jpg" },
  { name: "Club Lyon", image: "/images/club-lyon.jpg" },
  { name: "Club Toulouse", image: "/images/club-toulouse.jpg" },
  { name: "Club Lille", image: "/images/club-lille.jpg" },
  { name: "Club Nantes", image: "/images/club-nantes.jpg" },
  { name: "Club Nice", image: "/images/club-nice.jpg" },
  { name: "Club Strasbourg", image: "/images/club-strasbourg.jpg" },
  { name: "Club Montpellier", image: "/images/club-montpellier.jpg" },
];

export default function Rechercher() {
  const { annonces } = useAnnonces();

  // États du formulaire de recherche
  const [selectedClub, setSelectedClub] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [players, setPlayers] = useState("");

  // Filtrage des annonces selon la recherche
  const filteredAnnonces = annonces.filter((annonce) => {
    return (
      (!selectedClub || annonce.club === selectedClub) &&
      (!date || annonce.date === date) &&
      (!time || annonce.time === time) &&
      (!players || annonce.players.toString() === players)
    );
  });

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat p-10 mt-16" style={{ backgroundImage: "url('/images/background.jpg')" }}
>
      {/* Barre de recherche */}
      <div className="bg-white flex items-center rounded-full shadow-lg px-4 py-2 max-w-3xl mx-auto mb-10">
        {/* Club */}
        <select
          className="flex-1 p-2 text-gray-900 font-semibold bg-transparent outline-none"
          value={selectedClub}
          onChange={(e) => setSelectedClub(e.target.value)}
        >
          <option value="">N'importe où</option>
          {clubs.map((club) => (
            <option key={club.name} value={club.name}>
              {club.name}
            </option>
          ))}
        </select>

        <span className="text-gray-400">|</span>

        {/* Date */}
        <input
          type="date"
          className="flex-1 p-2 bg-transparent text-gray-900 font-semibold outline-none"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <span className="text-gray-400">|</span>

        {/* Heure */}
        <input
          type="time"
          className="flex-1 p-2 bg-transparent text-gray-900 font-semibold outline-none"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <span className="text-gray-400">|</span>

        {/* Joueurs */}
        <select
          className="flex-1 p-2 text-gray-900 font-semibold bg-transparent outline-none"
          value={players}
          onChange={(e) => setPlayers(e.target.value)}
        >
          <option value="">Ajouter des joueurs</option>
          <option value="2">2 joueurs</option>
          <option value="3">3 joueurs</option>
          <option value="4">4 joueurs</option>
        </select>

        {/* Bouton recherche */}
        <button className="bg-red-500 text-white p-3 rounded-full ml-2 hover:bg-red-600 transition">
          🔍
        </button>
      </div>

      {/* Liste des annonces filtrées */}
      {filteredAnnonces.length === 0 ? (
        <p className="text-white text-center bg-black bg-opacity-50 py-2 rounded-md">
          Aucune partie trouvée.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnnonces.map((annonce) => (
            <div key={annonce.id} className="bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden">
              <img src={annonce.image} alt={annonce.club} className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <p className="text-orange-500 font-semibold text-sm mb-2">NEW</p>
                <h2 className="text-xl font-bold text-gray-900">{annonce.club}</h2>
                <p className="text-blue-700 font-semibold text-sm mt-2">{annonce.players} joueurs</p>
                <p className="text-gray-600 mt-2">{annonce.date} à {annonce.time}</p>
                <button className="mt-4 px-6 py-3 border-2 border-blue-700 text-blue-700 font-semibold rounded-full hover:bg-blue-700 hover:text-white transition">
                  Réserver
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
