import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyLO2B1MKioonoDM7xiMbge59P09ZpQl8",
  authDomain: "padelmate-3f83e.firebaseapp.com",
  projectId: "padelmate-3f83e",
  storageBucket: "padelmate-3f83e.appspot.com",
  messagingSenderId: "665287295300",
  appId: "1:665287295300:web:3c96e74379c27a11265711"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
