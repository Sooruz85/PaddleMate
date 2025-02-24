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

// ✅ Création du contexte d'authentification
const AuthContext = createContext();

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

  // ✅ Fonction d'inscription avec pseudo (displayName)
  const signup = async (email, password, username) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      if (user) {
        await updateProfile(user, {
          displayName: username, // ✅ Définit le pseudo dans Firebase
        });

        // ✅ Forcer la mise à jour de l'utilisateur avec auth.currentUser.reload()
        await auth.currentUser.reload();
        const updatedUser = auth.currentUser;
        setUser(updatedUser);

        console.log("✅ Pseudo enregistré :", updatedUser.displayName);
      }
    } catch (error) {
      console.error("❌ Erreur lors de l'inscription :", error.message);
      throw error; // ✅ Propager l'erreur pour la gestion dans Signup.jsx
    }
  };

  // ✅ Connexion utilisateur avec mise à jour du contexte
  const login = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      await auth.currentUser.reload(); // ✅ Assure que le displayName est chargé
      const updatedUser = auth.currentUser;
      setUser(updatedUser);

      console.log("✅ Connexion réussie :", updatedUser.displayName || updatedUser.email);
    } catch (error) {
      console.error("❌ Erreur lors de la connexion :", error.message);
    }
  };

  // ✅ Déconnexion utilisateur
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("✅ Déconnexion réussie");
    } catch (error) {
      console.error("❌ Erreur lors de la déconnexion :", error.message);
    }
  };

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

export { AuthContext };
