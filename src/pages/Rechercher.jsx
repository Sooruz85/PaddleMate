import { useState } from "react";
import { useAnnonces } from "../context/AnnonceContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";
import fr from "date-fns/locale/fr";
import { FaCalendarAlt, FaClock } from "react-icons/fa"; // Icônes pour date et heure

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
  const [selectedClub, setSelectedClub] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [players, setPlayers] = useState("");

  const filteredAnnonces = annonces.filter((annonce) => {
    return (
      (!selectedClub || annonce.club === selectedClub) &&
      (!selectedDate || format(parseISO(annonce.date), "dd/MM/yyyy") === format(selectedDate, "dd/MM/yyyy")) &&
      (!selectedTime || annonce.time === format(selectedTime, "HH:mm")) &&
      (!players || annonce.players.toString() === players)
    );
  });

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat p-10 mt-16"
      style={{ backgroundImage: "url('/images/background.jpg')" }}>

      {/* Barre de recherche */}
      <div className="bg-white flex items-center rounded-full shadow-lg px-6 py-2 max-w-[750px] mx-auto mb-10 space-x-4">

        {/* Club (agrandi pour être plus visible) */}
        <select
          className="w-[180px] min-w-[180px] text-center p-2 text-gray-900 font-semibold bg-transparent outline-none hover:bg-gray-100 transition rounded-lg hover:scale-105"
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
        <div className="relative flex items-center space-x-2 w-[140px]">
          <FaCalendarAlt className="text-red-500" />
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            locale={fr}
            className="w-full text-center text-gray-900 font-semibold bg-transparent outline-none rounded-lg hover:bg-gray-100 transition hover:scale-105"
            placeholderText="Date"
          />
        </div>

        <span className="text-gray-400">|</span>

        {/* Heure */}
        <div className="relative flex items-center space-x-2 w-[140px]">
          <FaClock className="text-blue-500" />
          <DatePicker
            selected={selectedTime}
            onChange={(time) => setSelectedTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="HH:mm"
            locale={fr}
            className="w-full text-center text-gray-900 font-semibold bg-transparent outline-none rounded-lg hover:bg-gray-100 transition hover:scale-105"
            placeholderText="Heure"
          />
        </div>

        <span className="text-gray-400">|</span>

        {/* Joueurs */}
        <select
          className="w-[140px] min-w-[140px] text-center p-2 text-gray-900 font-semibold bg-transparent outline-none hover:bg-gray-100 transition rounded-lg hover:scale-105"
          value={players}
          onChange={(e) => setPlayers(e.target.value)}
        >
          <option value="">Joueurs</option>
          <option value="1">1 joueur</option>
          <option value="2">2 joueurs</option>
          <option value="3">3 joueurs</option>
        </select>


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
                <p className="text-gray-600 mt-2">{format(parseISO(annonce.date), "dd/MM/yyyy")} à {annonce.time}</p>
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
