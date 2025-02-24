import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ Contexte d'authentification
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState(""); // ✅ État pour le pseudo
  const [email, setEmail] = useState(""); // ✅ État pour l'email
  const [password, setPassword] = useState(""); // ✅ État pour le mot de passe
  const [error, setError] = useState(null); // ✅ État pour les erreurs

  const { signup } = useAuth(); // ✅ Récupération de la fonction signup depuis le contexte d'authentification
  const navigate = useNavigate(); // ✅ Pour rediriger après l'inscription

  // ✅ Fonction de gestion de l'inscription
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null); // ✅ Réinitialise l'erreur à chaque tentative

    try {
      await signup(email, password, username); // ✅ Envoi des données à la fonction signup
      navigate("/"); // ✅ Redirection vers la page d'accueil après inscription
    } catch (err) {
      setError("Erreur lors de l'inscription.");
      console.error("Erreur lors de l'inscription :", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Créer un compte
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Champ Pseudo */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Pseudo
            </label>
            <input
              type="text"
              placeholder="Entrez votre pseudo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Champ Email */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Champ Mot de passe */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bouton S'inscrire */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition"
          >
            S&apos;inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
