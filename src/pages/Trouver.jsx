import { useAnnonces } from "../context/AnnonceContext";

export default function Trouver() {
  const { annonces } = useAnnonces(); // ✅ Récupère les annonces

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-10 mt-16"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <h1 className="text-white text-3xl font-bold text-center mt-10 mb-6  py-2 rounded-md">
        Trouver une Partie
      </h1>

      {annonces.length === 0 ? (
        <p className="text-white text-center bg-black bg-opacity-50 py-2 rounded-md">
          Aucune partie disponible pour le moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {annonces.map((annonce) => (
            <div key={annonce.id} className="bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden">
              <img src={annonce.image} alt={annonce.club} className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <p className="text-orange-500 font-semibold text-sm mb-2">NEW</p>
                <h2 className="text-xl font-bold text-gray-900">{annonce.club}</h2>
                <p className="text-blue-700 font-semibold text-sm mt-2">{annonce.players} Players</p>
                <p className="text-gray-600 mt-2">{annonce.date} at {annonce.time}</p>
                <p className="text-gray-600">🏆 Level {annonce.level}</p>
                <button className="mt-4 px-6 py-3 border-2 border-blue-700 text-blue-700 font-semibold rounded-full hover:bg-blue-700 hover:text-white transition">
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
