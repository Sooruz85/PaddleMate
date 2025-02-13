import { useState } from "react";
import { useAnnonces } from "../context/AnnonceContext";
import { useNavigate } from "react-router-dom";

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

export default function ReservationPadel() {
  const [selectedClub, setSelectedClub] = useState(clubs[0]); // Par défaut, premier club
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [players, setPlayers] = useState(2);
  const [level, setLevel] = useState("1");
  const [contact, setContact] = useState("");
  const { ajouterAnnonce } = useAnnonces();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!selectedClub || !date || !time || !contact) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const nouvelleAnnonce = {
      club: selectedClub.name,
      date,
      time,
      players,
      level,
      contact,
      image: selectedClub.image, // Image dynamique selon le club
      createdAt: new Date(),
    };

    await ajouterAnnonce(nouvelleAnnonce);
    navigate("/trouver"); // Redirection après validation
  };

  return (
    <div
      className="h-screen w-full flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="mt-10 backdrop-blur-lg bg-white bg-opacity-10 shadow-lg rounded-lg flex max-w-4xl w-full">

        {/* Image à gauche qui change selon le club sélectionné */}
        <div className="w-1/2">
          <img
            src={selectedClub.image}
            alt={selectedClub.name}
            className="p-[26px] w-full h-full object-cover rounded-l-lg"
          />
        </div>

        {/* Formulaire à droite */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Créer une annonce</h2>

          {/* Sélection du club avec menu déroulant */}
          <label className="block text-sm font-semibold text-white">📍 Club</label>
          <select
            value={selectedClub.name}
            onChange={(e) => {
              const club = clubs.find((c) => c.name === e.target.value);
              setSelectedClub(club);
            }}
            className="w-full p-2 border rounded-md mb-3 bg-black bg-opacity-70 text-white"
          >
            {clubs.map((club) => (
              <option key={club.name} value={club.name}>
                {club.name}
              </option>
            ))}
          </select>

          {/* Date et heure sur une seule ligne */}
          <div className="flex space-x-3 mb-3">
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-white">📅 Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded-md bg-black bg-opacity-70 text-white"
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
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
          >
            Créer
          </button>
        </div>

      </div>
    </div>
  );
}
