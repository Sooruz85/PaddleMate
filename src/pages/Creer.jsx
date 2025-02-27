import { useState } from "react";
import { useAnnonces } from "../context/AnnonceContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
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

export default function Creer() {
  const { addAnnonce, updateAnnonce } = useAnnonces();

  const [selectedClub, setSelectedClub] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [players, setPlayers] = useState("");
  const [createdAnnonce, setCreatedAnnonce] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleCreate = async () => {
    if (!selectedClub || !selectedDate || !selectedTime || !players) {
      alert("❌ Veuillez remplir tous les champs !");
      return;
    }

    const nouvelleAnnonce = {
      club: selectedClub,
      date: selectedDate.toISOString(),
      time: format(selectedTime, "HH:mm"),
      players: players,
      image: clubs.find((c) => c.name === selectedClub)?.image || "/images/default.jpg",
      creator: "Etienne Gaumery",
    };

    await addAnnonce(nouvelleAnnonce);
    setCreatedAnnonce(nouvelleAnnonce);

    setSelectedClub("");
    setSelectedDate(null);
    setSelectedTime(null);
    setPlayers("");
  };

  const handleReturn = () => {
    setCreatedAnnonce(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/background.jpg')" }}>

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
          placeholderText=" Date"
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
          placeholderText=" Heure"
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

        <button onClick={handleCreate} className="bg-green-500 text-white p-3 rounded-full ml-2 hover:bg-green-600 transition hover:scale-105">
          Créer
        </button>
      </div>

      {createdAnnonce && (
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden w-96 relative mb-4">
          <img src={createdAnnonce.image} alt={createdAnnonce.club} className="w-full h-64 object-cover" />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <p className="text-white text-2xl font-bold">Partie créée !</p>
          </div>
          <div className="p-6 text-center">
            <h2 className="text-xl font-bold text-gray-900">{createdAnnonce.club}</h2>
            <p className="text-blue-700 font-semibold">{createdAnnonce.players} joueurs</p>
            <p className="text-gray-600">{format(new Date(createdAnnonce.date), "dd/MM/yyyy")} à {createdAnnonce.time}</p>
          </div>
        </div>
      )}

      {createdAnnonce && (
        <button onClick={handleReturn} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition mt-4">
          Créer une autre partie
        </button>
      )}
    </div>
  );
}
