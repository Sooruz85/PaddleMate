import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full p-4 flex justify-between items-center bg-black bg-opacity-70 z-50">
      <Link to="/" className="text-white text-2xl font-bold hover:text-gray-400 transition duration-300">
        PaddelMate
      </Link>
      <div className="flex space-x-6">
        <Link to="/option1" className="text-white hover:text-gray-400 transition duration-300">
          Option 1
        </Link>
        <Link to="/option2" className="text-white hover:text-gray-400 transition duration-300">
          Option 2
        </Link>
        <Link to="/login" className="text-white hover:text-gray-400 transition duration-300">
          Login
        </Link>
      </div>
    </nav>
  );
}
