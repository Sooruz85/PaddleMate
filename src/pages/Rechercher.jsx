import { useState } from "react";
import { useAnnonces } from "../context/AnnonceContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";
import fr from "date-fns/locale/fr";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const clubs = [
  { name: "Club Paris", image: "/images/club-paris.jpg" },
  { name: "Club Bordeaux", image: "/images/club-bordeaux.jpg" },
  { name: "Club Marseille", image: "/images/club-marseille.jpg" },
  { name: "Club Lyon", image: "/images/club-lyon.jpg" },
];

export default function Rechercher() {
  const { annonces, addReservation } = useAnnonces();
  const [selectedClub, setSelectedClub] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [players, setPlayers] = useState("");

  // ✅ Fonction de réservation avec pop-up
  const handleReserve = (annonce) => {
    const confirmReservation = window.confirm(`Voulez-vous réserver la partie au ${annonce.club} ?`);
    if (confirmReservation) {
      addReservation(annonce);
      alert("Votre réservation a été enregistrée !");
    }
  };

  // ✅ Filtrage des annonces selon la recherche
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

      <h2 className="text-3xl text-white text-center font-bold mb-6">Rechercher une Partie</h2>

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
                <h2 className="text-xl font-bold text-gray-900">{annonce.club}</h2>
                <p className="text-blue-700 font-semibold">{annonce.players} joueurs</p>
                <p className="text-gray-600">{format(parseISO(annonce.date), "dd/MM/yyyy")} à {annonce.time}</p>
                <button
                  onClick={() => handleReserve(annonce)}
                  className="mt-4 px-6 py-3 border-2 border-blue-700 text-blue-700 font-semibold rounded-full hover:bg-blue-700 hover:text-white transition"
                >
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
