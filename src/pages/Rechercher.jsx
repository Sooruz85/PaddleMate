import { useState } from "react";
import { useAnnonces } from "../context/AnnonceContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";
import fr from "date-fns/locale/fr";

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
  const { annonces, addReservation } = useAnnonces();
  const [selectedClub, setSelectedClub] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [players, setPlayers] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const filteredAnnonces = annonces.filter((annonce) => {
    return (
      (!selectedClub || annonce.club === selectedClub) &&
      (!selectedDate || format(parseISO(annonce.date), "dd/MM/yyyy") === format(selectedDate, "dd/MM/yyyy")) &&
      (!selectedTime || annonce.time === format(selectedTime, "HH:mm")) &&
      (!players || annonce.players.toString() === players)
    );
  });

  const handleReservation = (id) => {
    addReservation(id);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat p-10 mt-16"
      style={{ backgroundImage: "url('/images/background.jpg')" }}>

      <h2 className="text-3xl text-white text-center font-bold mb-6">Rechercher des Parties</h2>

      {showPopup && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50">
          Réservation réussie !
        </div>
      )}

      {/* ✅ Barre de recherche */}
      <div className="bg-white flex items-center rounded-full shadow-lg px-6 py-3 max-w-5xl mx-auto mb-10 w-full space-x-3">
        <select
          className="flex-1 text-center p-3 text-gray-900 font-semibold bg-transparent outline-none hover:bg-gray-100 transition rounded-lg w-40"
          value={selectedClub}
          onChange={(e) => setSelectedClub(e.target.value)}
        >
          <option value="">Sélectionnez un club</option>
          {clubs.map((club) => (
            <option key={club.name} value={club.name}>
              {club.name}
            </option>
          ))}
        </select>

        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          locale={fr}
          className="text-center text-gray-900 font-semibold bg-transparent outline-none rounded-lg w-40 p-3 hover:bg-gray-100 transition"
          placeholderText="Date"
        />

        <DatePicker
          selected={selectedTime}
          onChange={(time) => setSelectedTime(time)}
          showTimeSelect
          showTimeSelectOnly
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="HH:mm"
          locale={fr}
          className="text-center text-gray-900 font-semibold bg-transparent outline-none rounded-lg w-40 p-3 hover:bg-gray-100 transition"
          placeholderText="Heure"
        />

        <select
          className="flex-1 text-center p-3 text-gray-900 font-semibold bg-transparent outline-none hover:bg-gray-100 transition rounded-lg w-40"
          value={players}
          onChange={(e) => setPlayers(e.target.value)}
        >
          <option value="">Joueurs</option>
          <option value="1">1 joueur</option>
          <option value="2">2 joueurs</option>
          <option value="3">3 joueurs</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnnonces.map((annonce) => (
          <div key={annonce.id} className="bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden">
            <img src={annonce.image} alt={annonce.club} className="w-full h-64 object-cover" />
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-gray-900">{annonce.club}</h2>
              <p className="text-blue-700 font-semibold text-sm mt-2">{annonce.players} joueurs</p>
              <p className="text-gray-600 mt-2">
                {annonce.date ? format(parseISO(annonce.date), "dd/MM/yyyy") : "Date inconnue"} à {annonce.time || "Heure inconnue"}
              </p>
              <p className="text-gray-500 italic mt-2">
                Créé par : {annonce.username || "Utilisateur inconnu"}
              </p>
              <button
                onClick={() => handleReservation(annonce.id)}
                className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
              >
                Réserver
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
