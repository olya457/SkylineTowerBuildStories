import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SavedItem } from '../types';

interface SavedContextValue {
  savedItems: SavedItem[];
  toggleSave: (item: SavedItem) => Promise<void>;
  isSaved: (id: string, type: string) => boolean;
  hydrated: boolean;
}

const STORAGE_KEY = 'saved_items_storage_v1';

const SavedContext = createContext<SavedContextValue>({
  savedItems: [],
  toggleSave: async () => {},
  isSaved: () => false,
  hydrated: false,
});

export function SavedProvider({ children }: { children: ReactNode }) {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loadSavedItems = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: SavedItem[] = JSON.parse(stored);
          setSavedItems(parsed);
        }
      } catch {
        setSavedItems([]);
      } finally {
        setHydrated(true);
      }
    };

    loadSavedItems();
  }, []);

  const persistItems = async (items: SavedItem[]) => {
    setSavedItems(items);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const toggleSave = async (item: SavedItem) => {
    try {
      const exists = savedItems.find(i => i.id === item.id && i.type === item.type);
      const updated = exists
        ? savedItems.filter(i => !(i.id === item.id && i.type === item.type))
        : [item, ...savedItems];

      await persistItems(updated);
    } catch {}
  };

  const isSaved = (id: string, type: string): boolean =>
    savedItems.some(i => i.id === id && i.type === type);

  return (
    <SavedContext.Provider value={{ savedItems, toggleSave, isSaved, hydrated }}>
      {children}
    </SavedContext.Provider>
  );
}

export const useSaved = () => useContext(SavedContext);