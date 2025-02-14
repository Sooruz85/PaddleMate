import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { AnnonceProvider } from "./context/AnnonceContext"; // ✅ Contexte des annonces
import { AuthProvider } from "./context/AuthContext";// ✅ Contexte d'authentification
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Rechercher from "./pages/Rechercher";
import Creer from "./pages/Creer";
import Profil from "./pages/Profil";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // ✅ Ajout de la page d'inscription
import "./styles/global.css";

// ✅ Vérifie si l'utilisateur est connecté avant d'accéder aux pages protégées
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

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

export default function App() {
  return (
    <AuthProvider> {/* ✅ Fournit le contexte d'authentification */}
      <AnnonceProvider> {/* ✅ Fournit le contexte des annonces */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="rechercher" element={<Rechercher />} />
            <Route path="creer" element={<Creer />} />
            <Route path="signup" element={<Signup />} /> {/* ✅ Page d'inscription */}
            <Route path="login" element={<Login />} />
            {/* ✅ Route protégée : le profil est accessible uniquement si connecté */}
            <Route path="profil" element={<PrivateRoute><Profil /></PrivateRoute>} />
          </Route>
        </Routes>
      </AnnonceProvider>
    </AuthProvider>
  );
}
