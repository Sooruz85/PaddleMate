import { useAnnonces } from "../context/AnnonceContext";
import { format, parseISO } from "date-fns";

export default function MesParties() {
  const { annonces, reservations } = useAnnonces();

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat p-10 mt-16"
      style={{ backgroundImage: "url('/images/background.jpg')" }}>

      <h2 className="text-3xl text-white text-center font-bold mb-6">Mes Parties</h2>

      {/* 🔹 Affichage des parties créées */}
      <h3 className="text-2xl text-white mb-4">Mes Parties Créées</h3>
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
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Affichage des parties réservées */}
      <h3 className="text-2xl text-white mt-10 mb-4">Mes Parties Réservées</h3>
      {!reservations || reservations.length === 0 ? (
        <p className="text-white text-center bg-black bg-opacity-50 py-2 rounded-md">
          Aucune réservation.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservations.map((annonce) => (
            <div key={annonce.id} className="bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden p-6 text-center">
              <h2 className="text-xl font-bold text-gray-900">{annonce.club}</h2>
              <p className="text-blue-700 font-semibold">{annonce.players} joueurs</p>
              <p className="text-gray-600">{format(parseISO(annonce.date), "dd/MM/yyyy")} à {annonce.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
