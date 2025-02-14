import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig"; // 🔥 Import Firebase
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import PropTypes from "prop-types";

// Création du contexte
const AuthContext = createContext();

// Fournisseur du contexte d'authentification
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Écoute des changements d'état de l'utilisateur
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fonction d'inscription
  const signup = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Fonction de connexion
  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Fonction de déconnexion
  const logout = async () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Validation des types de propriétés
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook personnalisé pour utiliser le contexte facilement
export function useAuth() {
  return useContext(AuthContext);
}
