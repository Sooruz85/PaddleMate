import "../styles/global.css";

export default function Home() {
  return (
    <div className="scroll-container">
      {/* Section 1 : Bienvenue */}
      <section className="scroll-section flex flex-col justify-center items-center bg-transparent">
        <h1 className="text-4xl font-bold text-white">Bienvenue sur PadelMate</h1>
        <p className="text-lg text-white mt-4">Trouvez une partie ou créez la vôtre et trouvez des joueurs !</p>
        <a href="#section2" className="mt-6 text-white text-3xl animate-bounce">⬇</a>
      </section>

      {/* Section 2 : Rechercher une partie */}
      <section id="section2" className="scroll-section flex flex-col justify-center items-center bg-transparent text-white">
        <h2 className="text-3xl font-bold">Rechercher une partie</h2>
        <p className="mt-4 text-lg">Trouvez une partie près de chez vous en fonction de votre disponibilité.</p>
        <a href="#section3" className="mt-6 text-white text-3xl animate-bounce">⬇</a>
      </section>

      {/* Section 3 : Créer une partie */}
      <section id="section3" className="scroll-section flex flex-col justify-center items-center bg-transparent text-white">
        <h2 className="text-3xl font-bold">Créer une partie</h2>
        <p className="mt-4 text-lg">Créez votre propre partie et invitez d&apos;autres joueurs à vous rejoindre.</p>
        <a href="#section4" className="mt-6 text-white text-3xl animate-bounce">⬇</a>
      </section>

      {/* Section 4 : Contact */}
      <section id="section4" className="scroll-section flex flex-col justify-center items-center bg-transparent text-white">
        <h2 className="text-3xl font-bold">Nous contacter</h2>
        <p className="mt-4 text-lg">Besoin d&apos;aide ? Contactez-nous à <a href="mailto:contact@padelmate.com" className="underline">contact@padelmate.com</a>.</p>
      </section>
    </div>
  );
}
