import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Utilisation du contexte d'authentification

export default function Navbar() {
  const { user, logout } = useAuth(); // ✅ Vérifie si l'utilisateur est connecté
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ✅ Gestion de la déconnexion
  const handleLogout = async () => {
    await logout();
    navigate("/"); // ✅ Redirige vers la Home après déconnexion
  };

  // ✅ Ferme le menu si on clique en dehors
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Basculer l'ouverture du menu quand on clique sur "Mon compte"
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="fixed top-0 left-0 w-full p-4 flex justify-between items-center bg-black bg-opacity-70 z-50">
      <Link to="/" className="text-white text-2xl font-bold font-sarto">PadelMate</Link>

      <div className="flex space-x-6 relative">
        <Link to="/rechercher" className="text-white hover:text-gray-400 transition duration-300">
          Rechercher
        </Link>
        <Link to="/creer" className="text-white hover:text-gray-400 transition duration-300">
          Créer une partie
        </Link>

        {/* ✅ "Mon compte" ouvre seulement le menu déroulant au clic */}
        {user && (
          <div className="relative" ref={menuRef}>
            <span
              className="text-white hover:text-gray-400 transition duration-300 cursor-pointer"
              onClick={toggleDropdown} // ✅ Gère l'ouverture/fermeture du menu
            >
              Mon compte
            </span>

            {/* ✅ Menu déroulant avec liens qui ferment le menu au clic */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                <Link
                  to="/mes-parties"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => setIsDropdownOpen(false)} // ✅ Ferme le menu au clic
                >
                  Mes parties
                </Link>
                <Link
                  to="/historique"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => setIsDropdownOpen(false)} // ✅ Ferme le menu au clic
                >
                  Historique
                </Link>
                <Link
                  to="/mes-contacts"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => setIsDropdownOpen(false)} // ✅ Ferme le menu au clic
                >
                  Mes contacts
                </Link>
                <Link
                  to="/messagerie"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => setIsDropdownOpen(false)} // ✅ Ferme le menu au clic
                >
                  Messagerie
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ✅ Login / Logout toujours visibles */}
        {user ? (
          <Link
            to="/"
            onClick={handleLogout}
            className="text-white hover:text-gray-400 transition duration-300"
          >
            Logout
          </Link>
        ) : (
          <Link to="/login" className="text-white hover:text-gray-400 transition duration-300">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
