import { useAuth } from "../context/AuthContext"; // ✅ Import du contexte

const Profil = () => {
  const { user, logout } = useAuth(); // ✅ Récupère l'utilisateur et `logout`

  return (
    <div>
      <h2>Profil</h2>
      {user ? (
        <>
          <p>Connecté en tant que : {user.email}</p>
          <button onClick={logout}>Se déconnecter</button>
        </>
      ) : (
        <p>Veuillez vous connecter.</p>
      )}
    </div>
  );
};

export default Profil;
