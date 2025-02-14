import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // ✅ Import du contexte

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { signup } = useAuth(); // ✅ Utilisation de la fonction `signup` du contexte

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      alert("Inscription réussie !");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Signup;
