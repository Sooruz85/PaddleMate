import { useState } from "react";
import { useAnnonces } from "../context/AnnonceContext";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Importer Framer Motion
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import fr from "date-fns/locale/fr"; // ✅ Localisation française

const clubs = [
  { name: "Club Paris", image: "/images/club-paris.jpg" },
  { name: "Club Bordeaux", image: "/images/club-bordeaux.jpg" },
  { name: "Club Roubaix", image: "/images/club-marseille.jpg" },
  { name: "Club Lyon", image: "/images/club-lyon.jpg" },
  { name: "Club Toulouse", image: "/images/club-toulouse.jpg" },
  { name: "Club Lille", image: "/images/club-lille.jpg" },
  { name: "Club Nantes", image: "/images/club-nantes.jpg" },
  { name: "Club Nice", image: "/images/club-nice.jpg" },
  { name: "Club Strasbourg", image: "/images/club-strasbourg.jpg" },
  { name: "Club Montpellier", image: "/images/club-montpellier.jpg" },
];

export default function Creer() {
  const [selectedClub, setSelectedClub] = useState(clubs[0]);
  const [date, setDate] = useState(null); // ✅ Par défaut null pour éviter les erreurs
  const [time, setTime] = useState("");
  const [players, setPlayers] = useState(1);
  const [level, setLevel] = useState("1");
  const [contact, setContact] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { ajouterAnnonce } = useAnnonces();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedClub || !date || !time || !contact) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const nouvelleAnnonce = {
      club: selectedClub.name,
      date: format(date, "dd/MM/yyyy"), // ✅ Formatage JJ/MM/AAAA
      time,
      players,
      level,
      contact,
      image: selectedClub.image,
      createdAt: new Date(),
    };

    await ajouterAnnonce(nouvelleAnnonce);
    setShowModal(true); // ✅ Afficher le popup après la création de la partie
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-cover bg-center"
    style={{ backgroundImage: "url('/images/background.jpg')" }}
>

      <div className="mt-10 backdrop-blur-lg bg-white bg-opacity-10 shadow-lg rounded-lg flex max-w-4xl w-full">

        {/* Image à gauche qui change selon le club sélectionné */}
        <div className="w-1/2">
          <img
            src={selectedClub.image}
            alt={selectedClub.name}
            className="p-6 w-full h-full object-cover rounded-l-lg"
          />
        </div>

        {/* Formulaire à droite */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Créer une partie</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Sélection du club */}
            <label className="block text-sm font-semibold text-white">📍 Club</label>
            <select
              value={selectedClub.name}
              onChange={(e) => {
                const club = clubs.find((c) => c.name === e.target.value);
                setSelectedClub(club);
              }}
              className="w-full p-2 border rounded-md bg-black bg-opacity-70 text-white"
            >
              {clubs.map((club) => (
                <option key={club.name} value={club.name}>
                  {club.name}
                </option>
              ))}
            </select>

            {/* Date et heure */}
            <div className="flex space-x-3">
              <div className="w-1/2">
                <label className="block text-sm font-semibold text-white">📅 Date</label>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  dateFormat="dd/MM/yyyy" // ✅ Format correct
                  locale={fr} // ✅ Localisation en français
                  className="w-full p-2 border rounded-md bg-black bg-opacity-70 text-white"
                  placeholderText="JJ/MM/AAAA"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-semibold text-white">⏰ Heure</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-2 border rounded-md bg-black bg-opacity-70 text-white"
                />
              </div>
            </div>

            {/* Nombre de joueurs */}
            <label className="block text-sm font-semibold text-white">👥 Joueurs</label>
            <select
              value={players}
              onChange={(e) => setPlayers(e.target.value)}
              className="w-full p-2 border rounded-md bg-black bg-opacity-70 text-white"
            >
              <option value="1">1 joueur</option>
              <option value="2">2 joueurs</option>
              <option value="3">3 joueurs</option>
            </select>

            {/* Contact */}
            <label className="block text-sm font-semibold text-white">📩 Contact</label>
            <input
              type="text"
              placeholder="Email ou téléphone"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full p-2 border rounded-md bg-black bg-opacity-70 text-white placeholder-gray-300"
            />

            {/* Bouton de validation */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
            >
              Créer
            </button>
          </form>
        </div>
      </div>

      {/* ✅ Popup animé avec Framer Motion */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold text-gray-900">🎾 Partie créée !</h2>
              <p className="text-gray-600 mt-2">Votre partie a bien été ajoutée.</p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
