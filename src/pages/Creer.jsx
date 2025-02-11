import { useState } from "react";

export default function ReservationPadel() {
  const [club, setClub] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [players, setPlayers] = useState(2);
  const [level, setLevel] = useState("1");
  const [contact, setContact] = useState("");

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full">

        {/* Image */}
        <img
          src="/background-padel.jpg"
          alt="Padel Match"
          className="w-full h-auto max-h-[500px] object-cover rounded-l-lg"
        />

        {/* Formulaire à droite */}
        <div className="w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-4 text-center">Créer une annonce</h2>

          {/* Sélection du club */}
          <label className="block text-sm font-semibold">📍 Club</label>
          <input
            type="text"
            placeholder="Rechercher un club..."
            value={club}
            onChange={(e) => setClub(e.target.value)}
            className="w-full p-1 border rounded-md mb-2 text-sm"
          />

          {/* Date et heure sur une seule ligne */}
          <div className="flex space-x-2 mb-2">
            <div className="w-1/2">
              <label className="block text-sm font-semibold">📅 Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-1 border rounded-md text-sm"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-semibold">⏰ Heure</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-1 border rounded-md text-sm"
              />
            </div>
          </div>

          {/* Nombre de joueurs */}
          <label className="block text-sm font-semibold">👥 Joueurs</label>
          <select
            value={players}
            onChange={(e) => setPlayers(e.target.value)}
            className="w-full p-1 border rounded-md mb-2 text-sm"
          >
            <option value="2">2 joueurs</option>
            <option value="3">3 joueurs</option>
            <option value="4">4 joueurs</option>
          </select>

          {/* Niveau */}
          <label className="block text-sm font-semibold">🏆 Niveau</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full p-1 border rounded-md mb-2 text-sm"
          >
            <option value="1">Niveau 1</option>
            <option value="2">Niveau 2</option>
            <option value="3">Niveau 3</option>
            <option value="4">Niveau 4</option>
            <option value="5">Niveau 5</option>
            <option value="6">Niveau 6</option>
            <option value="7">Niveau 7</option>
            <option value="8">Niveau 8</option>
            <option value="9">Niveau 9</option>
            <option value="10">Niveau 10</option>
            <option value="11">Niveau 11</option>
            <option value="12">Niveau 12</option>
          </select>

          {/* Contact */}
          <label className="block text-sm font-semibold">📩 Contact</label>
          <input
            type="text"
            placeholder="Email ou téléphone"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full p-1 border rounded-md mb-4 text-sm"
          />

          {/* Bouton de validation */}
          <button className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">
            Créer
          </button>
        </div>

      </div>
    </div>
  );
}
