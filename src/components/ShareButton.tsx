import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Share } from 'react-native';
import { COLORS } from '../theme';

interface Props {
  title: string;
  content: string;
}

export default function ShareButton({ title, content }: Props) {
  const handleShare = async () => {
    try {
      await Share.share({ title, message: `${title}\n\n${content}` });
    } catch (_) {}
  };

  return (
    <TouchableOpacity style={styles.btn} onPress={handleShare} activeOpacity={0.8}>
      <Text style={styles.text}>Share</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.accent,
    borderRadius: 22, paddingHorizontal: 28,
    paddingVertical: 10, alignItems: 'center',
    justifyContent: 'center', minWidth: 100,
  },
  text: { color: '#1a1a1a', fontWeight: '700', fontSize: 15 },
});