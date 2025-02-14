import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig"; // 🔥 Assure-toi que ce fichier existe
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import PropTypes from "prop-types";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Écoute des changements d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Fonction de connexion
  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ Fonction d'inscription
  const signup = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ✅ Fonction de déconnexion
  const logout = async () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// ✅ Définition des PropTypes pour éviter les erreurs ESLint
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// ✅ Hook personnalisé pour utiliser le contexte plus facilement
export function useAuth() {
  return useContext(AuthContext);
}
