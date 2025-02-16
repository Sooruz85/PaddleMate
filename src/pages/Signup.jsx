import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ Import du contexte
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { signup } = useAuth(); // ✅ Utilisation de `signup` du contexte
  const navigate = useNavigate(); // ✅ Redirection après inscription

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      navigate("/profil"); // ✅ Redirige l'utilisateur vers son profil après inscription
    } catch (err) {
      setError("Une erreur est survenue. Vérifiez vos informations.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Créer un compte</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
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
            S'inscrire
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Déjà un compte ?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Connectez-vous
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
