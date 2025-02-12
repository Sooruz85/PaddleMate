import { useState } from "react";
import { useAnnonces } from "../context/AnnonceContext";
import { useNavigate } from "react-router-dom";

export default function ReservationPadel() {
  const [club, setClub] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [players, setPlayers] = useState(2);
  const [level, setLevel] = useState("1");
  const [contact, setContact] = useState("");
  const { ajouterAnnonce } = useAnnonces();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!club || !date || !time || !contact) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const nouvelleAnnonce = {
      club,
      date,
      time,
      players,
      level,
      contact,
      image: "/background-padel.jpg", // Remplace par une image dynamique plus tard
      createdAt: new Date(),
    };

    await ajouterAnnonce(nouvelleAnnonce);
    navigate("/trouver"); // Redirection après validation
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }}>

      <div className="mt-10 backdrop-blur-lg bg-white bg-opacity-10 shadow-lg rounded-lg flex max-w-4xl w-full">

        {/* Image à gauche */}
        <div className="w-1/2">
          <img
            src="/background-padel.jpg"
            alt="Padel Match"
            className="p-[26px] w-full h-full object-cover rounded-l-lg"
          />
        </div>

        {/* Formulaire à droite */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Créer une annonce</h2>

          {/* Sélection du club */}
          <label className="block text-sm font-semibold text-white">📍 Club</label>
          <input
            type="text"
            placeholder="Rechercher un club..."
            value={club}
            onChange={(e) => setClub(e.target.value)}
            className="w-full p-2 border rounded-md mb-3 bg-black bg-opacity-70 text-white placeholder-gray-300"
          />

          {/* Date et heure sur une seule ligne */}
          <div className="flex space-x-3 mb-3">
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-white">📅 Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded-md bg-black bg-opacity-70 text-white placeholder-gray-300"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-white">⏰ Heure</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border rounded-md bg-black bg-opacity-70 text-white placeholder-gray-300"
              />
            </div>
          </div>

          {/* Nombre de joueurs */}
          <label className="block text-sm font-semibold text-white">👥 Joueurs</label>
          <select
            value={players}
            onChange={(e) => setPlayers(e.target.value)}
            className="w-full p-2 border rounded-md mb-3 bg-black bg-opacity-70 text-white"
          >
            <option value="2">2 joueurs</option>
            <option value="3">3 joueurs</option>
            <option value="4">4 joueurs</option>
          </select>

          {/* Niveau */}
          <label className="block text-sm font-semibold text-white">🏆 Niveau</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full p-2 border rounded-md mb-3 bg-black bg-opacity-70 text-white"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>Niveau {i + 1}</option>
            ))}
          </select>

          {/* Contact */}
          <label className="block text-sm font-semibold text-white">📩 Contact</label>
          <input
            type="text"
            placeholder="Email ou téléphone"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full p-2 border rounded-md mb-4 bg-black bg-opacity-70 text-white placeholder-gray-300"
          />

          {/* Bouton de validation */}
          <button onClick={handleSubmit} className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition">
            Créer
          </button>

        </div>

      </div>
    </div>
  );
}
