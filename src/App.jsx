import { Route, Routes, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Option1 from "./pages/Option1";
import Option2 from "./pages/Option2";
import Login from "./pages/Login";

function Layout() {
  return (
    <div className="relative h-screen w-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background.jpg')" }}>
      <Navbar />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<h1 className='text-4xl font-bold'>Bienvenue sur PaddelMate</h1>} />
        <Route path="option1" element={<Option1 />} />
        <Route path="option2" element={<Option2 />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}
