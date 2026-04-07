import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SavedItem } from '../types';

interface SavedContextValue {
  savedItems: SavedItem[];
  toggleSave: (item: SavedItem) => void;
  isSaved: (id: string, type: string) => boolean;
}

const SavedContext = createContext<SavedContextValue>({
  savedItems: [],
  toggleSave: () => {},
  isSaved: () => false,
});

export function SavedProvider({ children }: { children: ReactNode }) {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  const toggleSave = (item: SavedItem) => {
    setSavedItems(prev => {
      const exists = prev.find(i => i.id === item.id && i.type === item.type);
      if (exists) return prev.filter(i => !(i.id === item.id && i.type === item.type));
      return [...prev, item];
    });
  };

  const isSaved = (id: string, type: string): boolean =>
    savedItems.some(i => i.id === id && i.type === type);

  return (
    <SavedContext.Provider value={{ savedItems, toggleSave, isSaved }}>
      {children}
    </SavedContext.Provider>
  );
}

export const useSaved = () => useContext(SavedContext);