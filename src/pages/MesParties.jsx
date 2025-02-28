import { useState } from "react";
import { useAnnonces } from "../context/AnnonceContext";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // ✅ Icônes d'édition et suppression

export default function MesParties() {
  const { annonces, reservations: initialReservations, updateAnnonce, deleteReservation } = useAnnonces();
  const [affichage, setAffichage] = useState("creees");
  const navigate = useNavigate();

  // États locaux pour les annonces et réservations
  const [reservations, setReservations] = useState(initialReservations);

  // États pour la modification
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);
  const [updatedDate, setUpdatedDate] = useState("");
  const [updatedTime, setUpdatedTime] = useState("");
  const [updatedPlayers, setUpdatedPlayers] = useState("");

  // États pour la confirmation de suppression
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  // Ouvrir la modal avec les valeurs actuelles
  const handleEdit = (annonce) => {
    setSelectedAnnonce(annonce);
    setUpdatedDate(format(parseISO(annonce.date), "yyyy-MM-dd"));
    setUpdatedTime(annonce.time);
    setUpdatedPlayers(annonce.players);
    setModalOpen(true);
  };

  // Mettre à jour l'annonce
  const handleUpdateAnnonce = async () => {
    if (!selectedAnnonce) return;

    const updatedAnnonce = {
      ...selectedAnnonce,
      date: updatedDate,
      time: updatedTime,
      players: updatedPlayers,
    };

    await updateAnnonce(selectedAnnonce.id, updatedAnnonce);
    setModalOpen(false);
  };

  // Ouvrir la confirmation de suppression
  const handleDeleteClick = (id) => {
    setSelectedDeleteId(id);
    setConfirmDelete(true);
};

  // Confirmer la suppression
  const confirmDeleteAnnonce = async () => {
    if (selectedDeleteId) {
        try {
            const response = await deleteReservationAPI(selectedDeleteId); // Utilise la fonction renommée

            if (response.ok) {
                console.log("Annonce supprimée côté serveur :", selectedDeleteId);

                // Mettre à jour l'état local pour supprimer la card de l'affichage
                const updatedAnnonces = annonces.filter(
                    (annonce) => annonce.id !== selectedDeleteId
                );

                setConfirmDelete(false);
                setSelectedDeleteId(null);
                setAffichage("creees");

                // Met à jour les annonces localement pour forcer le re-rendu
                setAnnonces(updatedAnnonces);
            } else {
                console.error("Erreur lors de la suppression : ", response.statusText);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'annonce :", error);
        }
    }
};




// Exemple de fonction de suppression côté serveur avec fetc
const deleteReservationAPI = async (reservationId) => {
  try {
      const response = await fetch(`/api/reservations/${reservationId}`, {
          method: 'DELETE',
      });

      if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      console.log("Réservation supprimée avec succès !");
      return response;
  } catch (error) {
      console.error("Erreur lors de la suppression de la réservation :", error);
      throw error;
  }
};





  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat p-10 mt-16"
      style={{ backgroundImage: "url('/images/background.jpg')" }}>

      <h2 className="text-3xl text-white text-center font-bold mb-6">Mes Parties</h2>

      {/* Boutons pour basculer entre affichages */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setAffichage("creees")}
          className={`px-6 py-3 font-semibold rounded-full transition ${
            affichage === "creees" ? "bg-blue-700 text-white" : "bg-white text-gray-900"
          }`}
        >
          Parties Créées
        </button>

        <button
          onClick={() => setAffichage("reservees")}
          className={`px-6 py-3 font-semibold rounded-full transition ${
            affichage === "reservees" ? "bg-blue-700 text-white" : "bg-white text-gray-900"
          }`}
        >
          Parties Réservées
        </button>
      </div>

      {/* Affichage des parties créées */}
      {affichage === "creees" && (
        <>
          <h3 className="text-2xl text-white text-center mb-4">Mes Parties Créées</h3>
          {annonces.length === 0 ? (
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

                  {/* Bouton Modifier */}
                  <button
                    onClick={() => handleEdit(annonce)}
                    className="mt-3 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition flex items-center justify-center mx-auto"
                  >
                    <FiEdit className="mr-2" /> Modifier
                  </button>

                  <button
    onClick={() => handleDeleteClick(annonce.id)}
    className="mt-3 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition flex items-center justify-center mx-auto"
>
    <FiTrash2 className="mr-2" /> Supprimer
</button>
                   {/* Pop-up confirmation suppression */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <p className="text-gray-800 mb-4 font-semibold">Confirmer la suppression ?</p>
            <div className="flex justify-between">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
              >
                Annuler
              </button>
              <button
    onClick={confirmDeleteAnnonce}
    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
>
    Supprimer
</button>
            </div>
          </div>
        </div>
      )}

              </div>


              ))}
            </div>
          )}
        </>
      )}

      {/* Affichage des parties réservées */}
      {affichage === "reservees" && (
        <>
          <h3 className="text-2xl text-white text-center mb-4">Mes Parties Réservées</h3>
          {reservations.length === 0 ? (
            <p className="text-white text-center bg-black bg-opacity-50 py-2 rounded-md">
              Aucune partie réservée.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reservations.map((annonce) => (
                <div key={annonce.id} className="bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden p-6 text-center">
                  <h2 className="text-xl font-bold text-gray-900">{annonce.club}</h2>
                  <p className="text-blue-700 font-semibold">{annonce.players} joueurs</p>
                  <p className="text-gray-600">{format(parseISO(annonce.date), "dd/MM/yyyy")} à {annonce.time}</p>

                  {/* Bouton Annuler la réservation */}
                  <button
                    onClick={() => handleDeleteClick(annonce.id)}
                    className="mt-3 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition flex items-center justify-center mx-auto"
                  >
                    <FiTrash2 className="mr-2" /> Annuler
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal de modification */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Modifier la partie</h2>

            {/* Sélection de la date */}
            <label className="block text-gray-700 font-semibold">Date</label>
            <input
              type="date"
              value={updatedDate}
              onChange={(e) => setUpdatedDate(e.target.value)}
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
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition">Annuler</button>
              <button onClick={handleUpdateAnnonce} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">Sauvegarder</button>
            </div>
          </div>
        </div>
      )}

      {/* Bouton retour */}
      <div className="flex justify-center mt-10 mb-16">
        <button onClick={() => navigate(-1)} className="px-6 py-3 bg-red-500 text-white font-semibold rounded-full hover:bg-red-700 transition">
          Retour
        </button>
      </div>

      {/* Pop-up confirmation suppression */}
{confirmDelete && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
      <p className="text-gray-800 mb-4 font-semibold">Confirmer l&apos;annulation ?</p>
      <div className="flex justify-between">
        <button
          onClick={() => setConfirmDelete(false)}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
        >
          Non
        </button>
        <button
          onClick={confirmDeleteReservation}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Oui
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
}
