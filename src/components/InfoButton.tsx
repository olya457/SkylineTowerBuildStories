import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

interface Props {
  onPress: () => void;
}

export default function InfoButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.text}>i</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center', justifyContent: 'center',
  },
  text: { color: COLORS.white, fontSize: 14, fontWeight: '700', fontStyle: 'italic' },
});