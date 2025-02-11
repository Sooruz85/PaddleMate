import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full p-4 flex justify-between items-center bg-black bg-opacity-70 z-50">
      <Link to="/" className="text-white text-2xl font-bold font-sarto">
        PaddelMate
      </Link>
      <div className="flex space-x-6">
        <Link to="/rechercher" className="text-white hover:text-gray-400 transition duration-300">
          Rechercher
        </Link>
        <Link to="/creer" className="text-white hover:text-gray-400 transition duration-300">
          Créer une partie
        </Link>
        <Link to="/mes-parties" className="text-white hover:text-gray-400 transition duration-300">
          Mes parties
        </Link>
        <Link to="/profil" className="text-white hover:text-gray-400 transition duration-300">
          Profil
        </Link>
        <Link to="/login" className="text-white hover:text-gray-400 transition duration-300">
          Login
        </Link>
      </div>
    </nav>
  );
}
