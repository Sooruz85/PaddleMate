import { Route, Routes, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Rechercher from "./pages/Rechercher";
import Creer from "./pages/Creer";
import MesParties from "./pages/MesParties";
import Profil from "./pages/Profil";
import Login from "./pages/Login";
import "./styles/global.css";


function Layout() {
  return (
    <div className="relative h-screen w-screen bg-cover bg-center bg-no-repeat overflow-hidden" style={{ backgroundImage: "url('/background.jpg')" }}>
      <Navbar />
      <div className="absolute inset-0 flex flex-col overflow-y-scroll snap-y snap-mandatory">
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="rechercher" element={<Rechercher />} />
        <Route path="creer" element={<Creer />} />
        <Route path="mes-parties" element={<MesParties />} />
        <Route path="profil" element={<Profil />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}
