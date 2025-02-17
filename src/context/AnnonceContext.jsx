import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";

const AnnonceContext = createContext();

export const AnnonceProvider = ({ children }) => {
  const [annonces, setAnnonces] = useState([]);
  const [reservations, setReservations] = useState([]);

  // ✅ Charger les annonces depuis Firestore
  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "annonces"));
        const annoncesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnnonces(annoncesData);
      } catch (error) {
        console.error("Erreur lors du chargement des annonces :", error);
      }
    };

    fetchAnnonces();
  }, []);

  // ✅ Ajouter une annonce dans Firestore
  const addAnnonce = async (nouvelleAnnonce) => {
    try {
      const docRef = await addDoc(collection(db, "annonces"), nouvelleAnnonce);
      setAnnonces((prevAnnonces) => [...prevAnnonces, { id: docRef.id, ...nouvelleAnnonce }]);
    } catch (error) {
      console.error("Erreur lors de l'ajout d'une annonce :", error);
    }
  };

  // ✅ Modifier une annonce dans Firestore
  const updateAnnonce = async (id, updatedAnnonce) => {
    try {
      const annonceRef = doc(db, "annonces", id);
      await updateDoc(annonceRef, updatedAnnonce);
      setAnnonces((prevAnnonces) =>
        prevAnnonces.map((annonce) => (annonce.id === id ? { id, ...updatedAnnonce } : annonce))
      );
    } catch (error) {
      console.error("Erreur lors de la modification de l'annonce :", error);
    }
  };

  // ✅ Ajouter une réservation et stocker localement
  const addReservation = (annonce) => {
    setReservations((prevReservations) => [...prevReservations, annonce]);
  };

  return (
    <AnnonceContext.Provider value={{ annonces, addAnnonce, updateAnnonce, reservations, addReservation }}>
      {children}
    </AnnonceContext.Provider>
  );
};

AnnonceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// ✅ Hook personnalisé pour utiliser le contexte
export const useAnnonces = () => {
  const context = useContext(AnnonceContext);
  if (!context) {
    throw new Error("useAnnonces doit être utilisé à l'intérieur d'un AnnonceProvider");
  }
  return context;
};
