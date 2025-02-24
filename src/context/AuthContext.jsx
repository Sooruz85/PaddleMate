import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";

// ✅ Création du contexte
const AuthContext = createContext();

// ✅ Fournisseur du contexte d'authentification
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Fonction d'inscription avec email, mot de passe et pseudo
  const signup = async (email, password, username) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // ✅ Mettre à jour le profil utilisateur Firebase avec le pseudo
      await updateProfile(user, {
        displayName: username,
      });

      // ✅ Mettre à jour l'état local pour inclure le pseudo
      setUser({ ...user, displayName: username });

      console.log("Utilisateur créé avec succès :", user);
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      throw error; // ✅ Propager l'erreur pour la gestion dans Signup.jsx
    }
  };

  // ✅ Connexion utilisateur
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  // ✅ Déconnexion utilisateur
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// ✅ Hook personnalisé pour accéder au contexte d'authentification
export function useAuth() {
  return useContext(AuthContext);
}

// ✅ Export du contexte
export { AuthContext };
