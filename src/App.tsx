import { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';
import { useLocalStorage } from './lib/hooks/useLocalStorage';
import { getTotal, isValid } from './lib/utils';

const Level = ({ level, onDelete }: { level: number; onDelete: () => void }) => {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-200 rounded-md">
      <span>{level}</span>
      <button
        onClick={onDelete}
        className="ml-2 px-2 py-1 text-xs bg-red-400 text-white rounded hover:bg-red-500 transition"
      >
        ✕
      </button>
    </div>
  );
};

export default function App() {
  const [levels, setStoredLevels] = useLocalStorage<number[]>('levels', []);
  const [total, setTotal] = useState<{ level: number; xp: number } | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  const addLevel = useCallback(() => {
    if (inputRef.current) {
      const value = inputRef.current.valueAsNumber;
      if (isValid(value)) {
        setStoredLevels((prev) => [...prev, value]);
      }
      inputRef.current.value = '';
    }
  }, [setStoredLevels]);

  const clearLevels = useCallback(() => {
    setStoredLevels([]);
  }, [setStoredLevels]);

  const deleteLevel = useCallback((index: number) => {
    setStoredLevels((prev) => prev.filter((_, i) => i !== index));
  }, [setStoredLevels]);

  useEffect(() => {
    setTotal(getTotal(levels));
  }, [levels]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') addLevel();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [addLevel]);

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md mb-4 space-y-2">
        {levels.map((level, index) => (
          <Level key={index} level={level} onDelete={() => deleteLevel(index)} />
        ))}
      </div>

      <div className="fixed bottom-20 w-full flex flex-col items-center">
        {total && <div className="mb-2 text-lg font-semibold">Total: {JSON.stringify(total)}</div>}
        <input
          ref={inputRef}
          className="w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-center hide-spin-button"
          autoFocus
          type="number"
          inputMode="numeric"
          placeholder="Enter level"
        />
        <button
          onClick={clearLevels}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition cursor-pointer"
        >
          Clear Levels
        </button>
      </div>
    </main>
  );
}