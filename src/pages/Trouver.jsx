import { useAnnonces } from "../context/AnnonceContext";

export default function Trouver() {
  const { annonces } = useAnnonces(); // ✅ Récupère les annonces

  return (
    <div className="min-h-screen bg-gray-900 p-10">
      <h1 className="text-white text-3xl font-bold text-center mb-6">📋 Trouver une Partie</h1>

      {annonces.length === 0 ? (
        <p className="text-white text-center">Aucune partie disponible pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {annonces.map((annonce) => (
            <div key={annonce.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={annonce.image} alt={annonce.club} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold">{annonce.club}</h2>
                <p className="text-gray-600">{annonce.date} à {annonce.time}</p>
                <p className="text-gray-600">👥 {annonce.players} joueurs</p>
                <p className="text-gray-600">🏆 Niveau {annonce.level}</p>
                <p className="text-gray-600">📩 {annonce.contact}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
