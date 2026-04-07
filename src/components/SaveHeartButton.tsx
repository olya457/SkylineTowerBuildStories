import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSaved } from '../context/SavedContext';
import { SavedItem } from '../types';

interface Props {
  item: SavedItem;
}

export default function SaveHeartButton({ item }: Props) {
  const { toggleSave, isSaved } = useSaved();
  const saved = isSaved(item.id, item.type);

  return (
    <TouchableOpacity style={styles.btn} onPress={() => toggleSave(item)} activeOpacity={0.7}>
      <Text style={[styles.icon, saved && styles.iconActive]}>♥</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)',
  },
  icon: { fontSize: 20, color: 'rgba(255,255,255,0.6)' },
  iconActive: { color: '#ff4d6d' },
});