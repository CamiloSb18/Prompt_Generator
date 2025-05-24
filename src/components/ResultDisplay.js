import React, { useState, useEffect } from 'react';
import { saveStory } from '../utils/storage';

const ResultDisplay = ({ prompt, storyData, onStorySaved }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // Estado para el feedback de guardado
  const [showSavedFeedback, setShowSavedFeedback] = useState(false); // Nuevo estado para la animación de guardado

  // useEffect que se ejecuta una sola vez al montar el componente,
  // o cuando prompt o storyData cambian, si no ha sido guardado
  useEffect(() => {
    // Si tienes una lógica para guardar automáticamente al renderizar,
    // asegúrate de que sea la deseada. El problema del doble guardado
    // que mencionaste puede ser debido a cómo se llama a onStorySaved o cómo
    // se maneja el estado del padre.
    // Por ahora, he ajustado la lógica para que el botón sea el principal trigger.
    // Si quieres que se guarde automáticamente al cargar si no está guardado,
    // esta lógica es correcta.
    // if (prompt && storyData && !isSaved) {
    //   handleSaveStory();
    // }
  }, [prompt, storyData, isSaved]); // Agregado isSaved como dependencia si la lógica de autoguardado permanece

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSaveStory = async () => { // Hecho async para posible manejo de errores
    if (prompt && storyData) {
      try {
        await saveStory({ // Usar await si saveStory es async
          prompt,
          name: storyData.name, // Asegúrate de que storyData.name exista
          date: new Date().toISOString()
        });
        setIsSaved(true); // Marca como guardado para evitar re-guardado con el mismo prompt/storyData
        setShowSavedFeedback(true); // Activa el feedback visual
        setTimeout(() => setShowSavedFeedback(false), 2000); // Oculta el feedback después de 2 segundos

        if (onStorySaved) {
          onStorySaved(); // Notifica al componente padre si es necesario
        }
      } catch (error) {
        console.error("Error al guardar la historia:", error);
        // Puedes agregar una notificación al usuario aquí
      }
    }
  };

  // Si no hay prompt, no renderiza nada
  if (!prompt) return null;

  return (
    <div className="mt-10 bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-b border-gray-200">
        <h2 className="font-medium text-gray-800">Prompt generado</h2>
        <div className="flex space-x-2">
          {/* Botón Guardar HU */}
          <button
            onClick={handleSaveStory}
            className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
              showSavedFeedback ? 'bg-green-100 text-green-700' : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {/* Texto del botón condicional */}
            <span>{showSavedFeedback ? '¡Prompt Guardado!' : 'Guardar HU'}</span>
          </button>
          
          {/* Botón Copiar */}
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
          >
            <span>{isCopied ? '¡Copiado!' : 'Copiar'}</span>
          </button>
        </div>
      </div>
      <div className="p-4">
        <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded overflow-auto max-h-[300px]">
          {prompt}
        </pre>
      </div>
    </div>
  );
};

export default ResultDisplay;