import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Utilisation du contexte d'authentification

export default function Navbar() {
  const { user, logout } = useAuth(); // ✅ Vérifie si l'utilisateur est connecté
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // ✅ Gestion de la déconnexion
  const handleLogout = async () => {
    await logout();
    navigate("/"); // ✅ Redirige vers la Home après déconnexion
  };

  return (
    <nav className="fixed top-0 left-0 w-full p-4 flex justify-between items-center bg-black bg-opacity-70 z-50">
      <Link to="/" className="text-white text-2xl font-bold font-sarto">PaddelMate</Link>

      <div className="flex space-x-6 relative">
        <Link to="/rechercher" className="text-white hover:text-gray-400 transition duration-300">
          Rechercher
        </Link>
        <Link to="/creer" className="text-white hover:text-gray-400 transition duration-300">
          Créer une partie
        </Link>

        {/* ✅ Si l'utilisateur est connecté, afficher "Logout", sinon "Login" */}
        {user ? (
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-400 transition duration-300 focus:outline-none"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="text-white hover:text-gray-400 transition duration-300">
  Login
</Link>
        )}
      </div>
    </nav>
  );
}
