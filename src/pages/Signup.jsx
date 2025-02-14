import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/profil");
    } catch (err) {
      setError("Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Inscription</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSignup} className="space-y-4">
          <input type="email" className="w-full p-2 border rounded-md" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" className="w-full p-2 border rounded-md" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" className="w-full p-2 border rounded-md" placeholder="Confirmer le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Créer un compte</button>
        </form>
        <p className="text-center mt-4">Déjà inscrit ? <Link to="/login" className="text-blue-500">Se connecter</Link></p>
      </div>
    </div>
  );
}
