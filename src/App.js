import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HistoryForm from './components/HistoryForm';
import ResultDisplay from './components/ResultDisplay';
import SavedStories from './components/SavedStories';
import { getStories } from './utils/storage';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [currentStory, setCurrentStory] = useState(null);
  const [batchPrompt, setBatchPrompt] = useState('');
  const [savedStories, setSavedStories] = useState([]);

  useEffect(() => {
    setSavedStories(getStories());
  }, [prompt, batchPrompt]);

  const handleGenerate = (newPrompt, storyData) => {
    setPrompt(newPrompt);
    setCurrentStory(storyData);
    setBatchPrompt('');
  };

  const handleGenerateBatch = (newBatchPrompt) => {
    setBatchPrompt(newBatchPrompt);
    setPrompt('');
  };

  const handleStorySaved = () => {
    setSavedStories(getStories());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Generador de casos de prueba</h1>
          <p className="text-gray-600">Crea un prompt y envíalo a la IA de tu preferencia</p>
        </div>
        <HistoryForm onGenerate={handleGenerate} />
        <ResultDisplay 
          prompt={prompt} 
          storyData={currentStory} 
          onStorySaved={handleStorySaved}
        />
        {batchPrompt && (
          <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="font-medium text-gray-800">Prompt combinado ({savedStories.length} historias)</h2>
            </div>
            <div className="p-4">
              <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded overflow-auto max-h-[300px]">
                {batchPrompt}
              </pre>
            </div>
          </div>
        )}
        <SavedStories onGenerateBatch={handleGenerateBatch} />
      </div>
    </div>
  );
};

export default App;

// DONE