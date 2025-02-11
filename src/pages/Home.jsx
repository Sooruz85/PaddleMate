import "../styles/global.css";

export default function Home() {
  return (
    <div className="scroll-container flex flex-col items-center">
      {/* Section 1 : Bienvenue */}
      <section className="scroll-section flex justify-center items-center min-h-screen w-full bg-transparent">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg border border-white/20 max-w-2xl text-center">
          <h1 className="text-4xl font-bold text-white font-custom">Bienvenue sur PaddelMate</h1>
          <p className="text-lg text-white mt-4 font-custom">
            Trouvez une partie ou créez la vôtre et trouvez des joueurs !
          </p>
          <a href="#section2" className="mt-6 text-white text-3xl animate-bounce block">⬇</a>
        </div>
      </section>

      {/* Section 2 : Rechercher une partie */}
      <section id="section2" className="scroll-section flex justify-center items-center min-h-screen w-full bg-transparent text-white">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg border border-white/20 max-w-2xl text-center">
          <h2 className="text-3xl font-bold font-custom">Rechercher une partie</h2>
          <p className="mt-4 text-lg font-custom">
            Trouvez une partie près de chez vous en fonction de votre disponibilité.
          </p>
          <a href="#section3" className="mt-6 text-white text-3xl animate-bounce block">⬇</a>
        </div>
      </section>

      {/* Section 3 : Créer une partie */}
      <section id="section3" className="scroll-section flex justify-center items-center min-h-screen w-full bg-transparent text-white">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg border border-white/20 max-w-2xl text-center">
          <h2 className="text-3xl font-bold font-custom">Créer une partie</h2>
          <p className="mt-4 text-lg font-custom">
            Créez votre propre partie et invitez d&aposautres joueurs à vous rejoindre.
          </p>
          <a href="#section4" className="mt-6 text-white text-3xl animate-bounce block">⬇</a>
        </div>
      </section>

      {/* Section 4 : Contact */}
      <section id="section4" className="scroll-section flex justify-center items-center min-h-screen w-full bg-transparent text-white">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg border border-white/20 max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4 font-custom">Nous contacter</h2>
          <p className="mb-6 text-lg font-custom">
            Besoin d&aposaide ? Contactez-nous en remplissant ce formulaire.
          </p>

          <form className="bg-gray-800/80 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                Nom
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre nom"
              />
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="w-full px-4 py-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Votre message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Envoyer
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
