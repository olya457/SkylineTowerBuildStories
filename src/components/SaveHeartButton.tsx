import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSaved } from '../context/SavedContext';
import { SavedItem } from '../types';
import { COLORS } from '../theme';

interface Props {
  item: SavedItem;
}

export default function SaveHeartButton({ item }: Props) {
  const { toggleSave, isSaved } = useSaved();
  const saved = isSaved(item.id, item.type);

  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={() => toggleSave(item)}
      activeOpacity={0.7}
    >
      <Ionicons
        name={saved ? 'heart' : 'heart-outline'}
        size={22}
        color={saved ? '#ff4d6d' : COLORS.white}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
});