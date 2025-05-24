import React, { useState } from 'react';

const FormSection = ({ title, value, onChange, placeholder, required = false }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">{title}{required && <span className="text-red-500 ml-1">*</span>}</h2>
      {title === 'Sub tareas' ? (
        <div className="space-y-2">
          {value.map((task, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={task}
                onChange={(e) => onChange(e.target.value, index)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={placeholder}
              />
              <button
                onClick={() => onChange('', index, true)}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            onClick={() => onChange('', -1, false)}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
          >
            + Añadir subtarea
          </button>
        </div>
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={title === 'Descripción' ? 4 : 2}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default FormSection;