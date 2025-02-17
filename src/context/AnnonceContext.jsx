import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";

const AnnonceContext = createContext();

export const AnnonceProvider = ({ children }) => {
  const [annonces, setAnnonces] = useState([]); // ✅ Stocke les parties créées
  const [reservations, setReservations] = useState([]); // ✅ Stocke les parties réservées

  // ✅ Charger les parties créées depuis Firestore au montage
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
        console.error("❌ Erreur lors du chargement des annonces :", error);
      }
    };

    fetchAnnonces();
  }, []);

  // ✅ Ajouter une nouvelle annonce dans Firestore et mettre à jour l'état local
  const addAnnonce = async (nouvelleAnnonce) => {
    try {
      const docRef = await addDoc(collection(db, "annonces"), nouvelleAnnonce);
      const newAnnonce = { id: docRef.id, ...nouvelleAnnonce };

      // ✅ Mise à jour immédiate de l'état local (sans attendre Firestore)
      setAnnonces((prevAnnonces) => [...prevAnnonces, newAnnonce]);

      console.log("✅ Partie créée avec succès :", newAnnonce);
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout d'une annonce :", error);
    }
  };

  // ✅ Modifier une annonce existante dans Firestore et l'état local
  const updateAnnonce = async (id, updatedAnnonce) => {
    try {
      const annonceRef = doc(db, "annonces", id);
      await updateDoc(annonceRef, updatedAnnonce);
      setAnnonces((prevAnnonces) =>
        prevAnnonces.map((annonce) => (annonce.id === id ? { id, ...updatedAnnonce } : annonce))
      );

      console.log("✅ Annonce modifiée :", updatedAnnonce);
    } catch (error) {
      console.error("❌ Erreur lors de la modification de l'annonce :", error);
    }
  };

  // ✅ Charger les réservations depuis Firestore au montage
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reservations"));
        const reservationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReservations(reservationsData);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des réservations :", error);
      }
    };

    fetchReservations();
  }, []);

  // ✅ Ajouter une réservation dans Firestore et mettre à jour l'état local
  const addReservation = async (annonce) => {
    try {
      const docRef = await addDoc(collection(db, "reservations"), annonce);
      const newReservation = { id: docRef.id, ...annonce };

      // ✅ Mise à jour immédiate de l'état local
      setReservations((prevReservations) => [...prevReservations, newReservation]);

      console.log("✅ Réservation ajoutée :", newReservation);
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout d'une réservation :", error);
    }
  };

  return (
    <AnnonceContext.Provider value={{ annonces, addAnnonce, updateAnnonce, reservations, addReservation }}>
      {children}
    </AnnonceContext.Provider>
  );
};

// ✅ Validation des props avec PropTypes
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
