import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; // ✅ Contexte d'authentification
import { AnnonceProvider } from "./context/AnnonceContext"; // ✅ Contexte des annonces
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Rechercher from "./pages/Rechercher";
import Creer from "./pages/Creer";
import Profil from "./pages/Profil";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./styles/global.css";

// ✅ Écran de chargement temporaire pendant l'authentification
function LoadingScreen() {
  return <div className="flex h-screen items-center justify-center text-xl">Chargement...</div>;
}

// ✅ Vérifie si l'utilisateur est connecté avant d'accéder aux pages protégées
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />; // ✅ Afficher un écran de chargement pendant la vérification
  return user ? children : <Navigate to="/login" />;
}

// ✅ Layout principal avec la navbar et fond d'écran
function Layout() {
  return (
    <div className="relative h-screen w-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/images/background.jpg')" }}>
      <Navbar />
      <div className="absolute inset-0 flex flex-col overflow-y-scroll snap-y snap-mandatory">
        <Outlet />
      </div>
    </div>
  );
}

// ✅ Structure de l'application avec AuthProvider & AnnonceProvider
export default function App() {
  return (
    <AuthProvider> {/* Fournit le contexte d'authentification */}
      <AnnonceProvider> {/* Fournit le contexte des annonces */}
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* 🔹 Routes publiques */}
            <Route index element={<Home />} />
            <Route path="rechercher" element={<Rechercher />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />

            {/* 🔹 Route protégée : uniquement accessibles si connecté */}
            <Route path="creer" element={<PrivateRoute><Creer /></PrivateRoute>} />
            <Route path="profil" element={<PrivateRoute><Profil /></PrivateRoute>} />
          </Route>
        </Routes>
      </AnnonceProvider>
    </AuthProvider>
  );
}
