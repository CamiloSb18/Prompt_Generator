import React, { useState } from 'react';
import FormSection from './FormSection';
import AcceptanceCriteriaInput from './AcceptanceCriteriaInput';

const HistoryForm = ({ onGenerate }) => {
  const [epicId, setEpicId] = useState('');
  const [storyLinks, setStoryLinks] = useState('');
  const [selectedIA, setSelectedIA] = useState(''); // Estado para la IA seleccionada
  const [selectedEnvironment, setSelectedEnvironment] = useState(''); // Nuevo estado para el ambiente seleccionado
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [acceptanceCriteria, setAcceptanceCriteria] = useState('');
  const [rawCriteria, setRawCriteria] = useState('');
  const [subTasks, setSubTasks] = useState(['']);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const prompt = `Escribir casos de prueba de la siguiente historia de usuario. Por favor generar los casos con epic id, Story Linkages, nombre de caso, precondición y formato dado que, cuando y entonces. organiza los casos en una tabla de la siguiente manera:

Epic Id: "${epicId || 'capturar previamente el epic id'}"
Story Linkages: "${storyLinks || 'capturar previamente el story linkages'}"
columna caso: nombre del caso de prueba
columna sumary: (Epic Id - Story Linkages - Caso)
columna precondición: la precondición
columna priority: MEDIUM para todos los casos
columna status: TO DO para todos los casos
columna Step Summary: el DADO QUE
columna Test Data: el CUANDO
columna Expected Result: el ENTONCES
columna Labels: IA_${selectedIA},${selectedEnvironment},IA 

${name ? `Nombre: ${name}` : ''}

${description ? `Descripción: ${description}` : ''}

${acceptanceCriteria ? `Criterios de aceptación:\n${acceptanceCriteria}` : ''}

${
  subTasks.filter(task => task.trim() !== '').length > 0 
    ? `Sub tareas:\n${subTasks.filter(task => task.trim() !== '').join('\n')}` 
    : ''
}`;

    onGenerate(prompt, { name, epicId, storyLinks, selectedIA, selectedEnvironment }); // Pasando selectedEnvironment
  };

  const handleClearForm = () => {
    setName('');
    setDescription('');
    setAcceptanceCriteria('');
    setRawCriteria('');
    setSubTasks(['']);
    setEpicId('');
    setStoryLinks('');
    setSelectedIA('');
    setSelectedEnvironment(''); // Limpiar el ambiente seleccionado
  };

  const updateSubTasks = (newValue, index, isDelete) => {
    const newSubTasks = [...subTasks];
    if (isDelete && index >= 0) {
      newSubTasks.splice(index, 1);
    } else if (index === -1) {
      newSubTasks.push(newValue);
    } else {
      newSubTasks[index] = newValue;
    }
    setSubTasks(newSubTasks);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      {/* Primera fila: Epic ID y Story Linkages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="epicId" className="block text-sm font-medium text-gray-700 mb-1">Epic ID (opcional)</label>
          <input
            type="text"
            id="epicId"
            value={epicId}
            onChange={(e) => setEpicId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="storyLinks" className="block text-sm font-medium text-gray-700 mb-1">Story Linkages (opcional)</label>
          <input
            type="text"
            id="storyLinks"
            value={storyLinks}
            onChange={(e) => setStoryLinks(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Segunda fila: Selecciona tu IA y Selecciona tu Ambiente */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="selectIA" className="block text-sm font-medium text-gray-700 mb-1">Selecciona tu IA</label>
          <select
            id="selectIA"
            value={selectedIA}
            onChange={(e) => setSelectedIA(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Selecciona una opción</option>
            <option value="Gemini">Gemini</option>
            <option value="ChatGPT">ChatGPT</option>
            <option value="AmazonQ">AmazonQ</option>
          </select>
        </div>
        <div>
          <label htmlFor="selectEnvironment" className="block text-sm font-medium text-gray-700 mb-1">Selecciona tu Ambiente</label>
          <select
            id="selectEnvironment"
            value={selectedEnvironment}
            onChange={(e) => setSelectedEnvironment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Selecciona una opción</option>
            <option value="QA">QA</option>
            <option value="UAT">UAT</option>
            <option value="PROD">PROD</option>
            <option value="ALPHA">ALPHA</option>
          </select>
        </div>
      </div>

      <FormSection 
        title="Nombre" 
        value={name} 
        onChange={setName} 
        placeholder="Ingresa el nombre de la historia de usuario" 
        required 
      />

      <FormSection 
        title="Descripción" 
        value={description} 
        onChange={setDescription} 
        placeholder="Describe la funcionalidad de la historia de usuario" 
      />

      <AcceptanceCriteriaInput 
        value={acceptanceCriteria} 
        rawValue={rawCriteria}
        onChange={setAcceptanceCriteria}
        onRawChange={setRawCriteria} 
      />

      <FormSection 
        title="Sub tareas" 
        value={subTasks} 
        onChange={updateSubTasks} 
        placeholder="Añade una subtarea (opcional)" 
      />

      <div className="mt-6 grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={handleClearForm}
          className="py-3 px-4 rounded-md bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Limpiar formulario
        </button>
        <button
          type="submit"
          disabled={!name}
          className={`py-3 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            !name ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
          }`}
        >
          Generar prompt
        </button>
      </div>
    </form>
  );
};

export default HistoryForm;