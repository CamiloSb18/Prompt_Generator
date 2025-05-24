const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-800 py-6 px-4 shadow-lg">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Prompt Generator</h1>
        <div className="text-white opacity-90">
          Crea un prompt y envíalo a la IA de tu preferencia
        </div>
      </div>
    </header>
  );
};

export default Header;