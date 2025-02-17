import { useState } from "react";
import { useAnnonces } from "../context/AnnonceContext";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";

export default function MesPartiesCreees() {
  const { annonces, updateAnnonce } = useAnnonces();
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // États pour la modification
  const [updatedClub, setUpdatedClub] = useState("");
  const [updatedDate, setUpdatedDate] = useState(null);
  const [updatedTime, setUpdatedTime] = useState("");
  const [updatedPlayers, setUpdatedPlayers] = useState("");

  // 🔹 Ouvrir la modal et charger les valeurs existantes
  const handleEdit = (annonce) => {
    console.log("Modification de l'annonce :", annonce); // ✅ Vérifie si la fonction est bien appelée
    setSelectedAnnonce(annonce);
    setUpdatedClub(annonce.club);
    setUpdatedDate(annonce.date ? parseISO(annonce.date) : new Date()); // ✅ Vérification pour éviter `null`
    setUpdatedTime(annonce.time);
    setUpdatedPlayers(annonce.players);
    setModalOpen(true);
  };

  // 🔹 Envoyer la mise à jour
  const handleUpdateAnnonce = async () => {
    if (!selectedAnnonce) return;

    const updatedAnnonce = {
      club: updatedClub,
      date: updatedDate.toISOString(),
      time: updatedTime,
      players: updatedPlayers,
    };

    console.log("Annonce mise à jour :", updatedAnnonce); // ✅ Vérification

    await updateAnnonce(selectedAnnonce.id, updatedAnnonce);
    setModalOpen(false); // ✅ Fermer la modal après mise à jour
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat p-10 mt-16"
      style={{ backgroundImage: "url('/images/background.jpg')" }}>

      <h2 className="text-3xl text-white text-center font-bold mb-6">Mes Parties Créées</h2>

      {!annonces || annonces.length === 0 ? (
        <p className="text-white text-center bg-black bg-opacity-50 py-2 rounded-md">
          Aucune partie créée.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {annonces.map((annonce) => (
            <div key={annonce.id} className="bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden p-6 text-center">
              <h2 className="text-xl font-bold text-gray-900">{annonce.club}</h2>
              <p className="text-blue-700 font-semibold">{annonce.players} joueurs</p>
              <p className="text-gray-600">{format(parseISO(annonce.date), "dd/MM/yyyy")} à {annonce.time}</p>

              {/* 🔹 Bouton Modifier */}
              <button
                onClick={() => handleEdit(annonce)}
                className="mt-3 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
              >
                Modifier
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Modal pour la modification */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Modifier la partie</h2>

            {/* Sélection du club */}
            <label className="block text-gray-700 font-semibold">Club</label>
            <input
              type="text"
              value={updatedClub}
              onChange={(e) => setUpdatedClub(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />

            {/* Sélection de la date */}
            <label className="block text-gray-700 font-semibold">Date</label>
            <input
              type="date"
              value={updatedDate ? format(updatedDate, "yyyy-MM-dd") : ""}
              onChange={(e) => setUpdatedDate(new Date(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />

            {/* Sélection de l'heure */}
            <label className="block text-gray-700 font-semibold">Heure</label>
            <input
              type="time"
              value={updatedTime}
              onChange={(e) => setUpdatedTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />

            {/* Nombre de joueurs */}
            <label className="block text-gray-700 font-semibold">Joueurs</label>
            <input
              type="number"
              value={updatedPlayers}
              onChange={(e) => setUpdatedPlayers(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            {/* Boutons de validation */}
            <div className="flex justify-between">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleUpdateAnnonce}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Bouton Retour (Ajout `mb-16`) */}
      <div className="text-center mt-10 mb-16">
        <Link to="/mes-parties" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition">
          ← Retour
        </Link>
      </div>
    </div>
  );
}
