/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    // Si tu styles.css está en src/, también es buena práctica incluir src/ aquí.
    // Tailwind buscará las clases en estos archivos.
    // Si tu index.html está en la raíz, "./index.html" es suficiente.
    // Si tu código de React o JS está en src/, asegúrate de que esté aquí.
    // Por ejemplo: "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kushki-green': '#00D58C', // Verde/Turquesa de Kushki
        'kushki-blue': '#00263E',  // Azul oscuro de Kushki
      },
    },
  },
  plugins: [],
}