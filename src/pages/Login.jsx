import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ Vérifie que c'est bien importé
import { useNavigate, Link } from "react-router-dom"; // ✅ Ajout de Link pour rediriger vers l'inscription

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth(); // ✅ Assure-toi que `useAuth()` fonctionne ici
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        await login(email, password);
        navigate("/"); // ✅ Redirige vers la Home après connexion
    } catch (err) {
        console.error("Erreur lors de la connexion :", err);
        setError("Email ou mot de passe incorrect.");
    }
};


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Connexion</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Se connecter
          </button>
        </form>

        {/* ✅ Lien vers la page d'inscription */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Pas encore de compte ?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Inscrivez-vous ici
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
