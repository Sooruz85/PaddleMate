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
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);

  // ✅ Filtrer les annonces selon les critères de recherche
  const filteredAnnonces = annonces.filter((annonce) => {
    return (
      (!selectedClub || annonce.club === selectedClub) &&
      (!selectedDate || format(parseISO(annonce.date), "dd/MM/yyyy") === format(selectedDate, "dd/MM/yyyy")) &&
      (!selectedTime || annonce.time === format(selectedTime, "HH:mm")) &&
      (!players || annonce.players.toString() === players)
    );
  });

  // ✅ Gérer la réservation et afficher le pop-up de confirmation
  const handleReservation = (annonce) => {
    setSelectedAnnonce(annonce);
    setShowPopup(true);
  };

  // ✅ Confirmer la réservation et ajouter à la liste
  const confirmReservation = () => {
    if (selectedAnnonce) {
      addReservation(selectedAnnonce);
    }
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat p-10 mt-16"
      style={{ backgroundImage: "url('/images/background.jpg')" }}>

      {/* ✅ Liste des annonces filtrées */}
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
                <p className="text-blue-700 font-semibold text-sm mt-2">{annonce.players} joueurs</p>
                <p className="text-gray-600 mt-2">{format(parseISO(annonce.date), "dd/MM/yyyy")} à {annonce.time}</p>
                <p className="text-gray-500 italic mt-2">
                  Créé par : {annonce.username || "Utilisateur inconnu"}
                </p>
                <button
                  onClick={() => handleReservation(annonce)}
                  className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
                >
                  Réserver
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Pop-up de confirmation */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Confirmer la réservation</h2>
            <p className="text-gray-700 mb-4">
              Voulez-vous réserver la partie à <strong>{selectedAnnonce?.club}</strong> ?
            </p>
            <p className="text-gray-600">
              <strong>Date :</strong> {selectedAnnonce?.date} à {selectedAnnonce?.time}
            </p>
            <p className="text-gray-600">
              <strong>Créateur :</strong> {selectedAnnonce?.username || "Utilisateur inconnu"}
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={() => setShowPopup(false)}
                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-full hover:bg-gray-600 transition"
              >
                Annuler
              </button>
              <button
                onClick={confirmReservation}
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
