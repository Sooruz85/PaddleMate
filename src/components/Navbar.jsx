import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Utilisation du contexte d'authentification
import { motion, AnimatePresence } from "framer-motion"; // ✅ Animation du menu

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { currentUser, logout } = useAuth(); // ✅ Vérifie si un utilisateur est connecté
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // ✅ Ferme le menu si l'utilisateur clique en dehors
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Gestion de la déconnexion
  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
    navigate("/login"); // Redirige vers la page de connexion
  };

  return (
    <nav className="fixed top-0 left-0 w-full p-4 flex justify-between items-center bg-black bg-opacity-70 z-50">
      <Link to="/" className="text-white text-2xl font-bold font-sarto">
        PaddelMate
      </Link>

      <div className="flex space-x-6 relative">
        <Link to="/rechercher" className="text-white hover:text-gray-400 transition duration-300">
          Rechercher
        </Link>
        <Link to="/creer" className="text-white hover:text-gray-400 transition duration-300">
          Créer une partie
        </Link>

        {/* ✅ Menu déroulant Profil */}
        {currentUser ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="text-white hover:text-gray-400 transition duration-300 focus:outline-none"
            >
              Profil ▼
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50"
                >
                  <Link to="/profil" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Mon profil
                  </Link>
                  <Link to="/mes-parties" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Mes parties
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-200"
                  >
                    Déconnexion
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link to="/login" className="text-white hover:text-gray-400 transition duration-300">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
