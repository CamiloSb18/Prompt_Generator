const Header = () => {
  return (
    <header className="bg-gradient-to-r from-emerald-500 to-blue-950 py-6 px-4 shadow-lg">
      {/* Contenedor principal que centra el contenido y distribuye los elementos */}
      <div className="max-w-5xl mx-auto flex items-center justify-between w-full"> 
        
        {/* Lado izquierdo: Solo el título "IntelliPrompt" */}
        <h1 className="text-2xl font-bold text-white">IntelliPrompt</h1> 

        {/* Sección central: Contenedor para los dos logos */}
        <div className="flex items-center gap-2"> {/* Puedes ajustar el 'gap' para más o menos espacio entre los logos */}
          {/* Logo de Kushki */}
          {/* Asegúrate que la ruta sea correcta. Si KUSHKI.png está en public/, usa src="KUSHKI.png" */}
          <img src="KUSHKI.png" alt="Logo de Kushki" className="h-14" />

          {/* Logo de IntelliPrompt */}
          {/* Asegúrate que la ruta sea correcta. Si logoIntelliPrompt.png está en public/, usa src="logoIntelliPrompt.png" */}
          <img src="logoIntelliPrompt.png" alt="Logo de IntelliPrompt" className="h-16" />
        </div>

        {/* Lado derecho: El texto de la descripción */}
        <div className="text-white opacity-90">
          Crea un prompt y envíalo a la IA de tu preferencia
        </div>
      </div>
    </header>
  );
};

export default Header;