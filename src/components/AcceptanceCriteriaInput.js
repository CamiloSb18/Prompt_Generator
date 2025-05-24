import React from 'react';

const AcceptanceCriteriaInput = ({ value, rawValue, onChange, onRawChange }) => {
  const handleTextChange = (e) => {
    const text = e.target.value;
    onRawChange(text);
    
    // Procesar el texto para separar en Dado/Cuando/Entonces
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const processedLines = lines.map((line, index) => {
      const prefix = index % 3 === 0 ? 'Dado que ' : 
                    index % 3 === 1 ? 'Cuando ' : 'Entonces ';
      return prefix + line.trim();
    });
    
    onChange(processedLines.join('\n\n'));
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Criterios de aceptación</h2>
      <p className="text-sm text-gray-500 mb-2">
        Pega aquí los criterios (cada línea será convertida automáticamente a Dado que/Cuando/Entonces alternadamente)
      </p>
      <textarea
        value={rawValue}
        onChange={handleTextChange}
        rows={6}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={`Ejemplo:\nSe requiere consolidar información\nSe inicia la generación del informe\nSe agrupan y resumen los datos`}
      />
      
      {value && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-1">Previsualización:</h3>
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
            {value.split('\n\n').map((item, i) => (
              <p key={i} className="mb-2 last:mb-0 text-sm">
                {item}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AcceptanceCriteriaInput;

// DONE