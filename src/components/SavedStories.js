import React, { useState } from 'react';
import { getStories, clearStories } from '../utils/storage';

const SavedStories = ({ onGenerateBatch }) => {
  const [isCopied, setIsCopied] = useState(false);
  const stories = getStories();

  const handleGenerateBatch = () => {
    const batchPrompt = stories.map(story => story.prompt).join('\n\n---\n\n');
    onGenerateBatch(batchPrompt);
  };

  const handleCopyBatch = async () => {
    const batchPrompt = stories.map(story => story.prompt).join('\n\n---\n\n');
    await navigator.clipboard.writeText(batchPrompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClearStories = () => {
    clearStories();
    onGenerateBatch('');
  };

  if (stories.length === 0) return null;

  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-b border-gray-200">
        <h2 className="font-medium text-gray-800">Historias guardadas ({stories.length})</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleClearStories}
            className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
          >
            Limpiar todo
          </button>
          <button
            onClick={handleGenerateBatch}
            className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
          >
            Generar lote
          </button>
          <button
            onClick={handleCopyBatch}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
          >
            {isCopied ? '¡Copiado!' : 'Copiar lote'}
          </button>
        </div>
      </div>
      <div className="p-4">
        <ul className="divide-y divide-gray-200">
          {stories.map((story, index) => (
            <li key={index} className="py-2">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{story.name || 'Historia sin nombre'}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(story.date).toLocaleString()}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SavedStories;