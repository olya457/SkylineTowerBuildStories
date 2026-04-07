import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, Image, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, TabSectionName } from '../types';
import { COLORS } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Info'>;

const INFO: Record<TabSectionName, { title: string; desc: string }> = {
  Stories: {
    title: 'Build-stories',
    desc: 'Real stories from construction sites. Each story is a moment from the life of a construction professional.',
  },
  Blog: {
    title: 'Blog',
    desc: 'Educational articles about construction processes, safety rules, and materials.',
  },
  Map: {
    title: 'Map',
    desc: "Explore the world's most remarkable buildings. Tap any marker to discover details.",
  },
  Facts: {
    title: 'Facts',
    desc: 'Quick construction facts one at a time. Save the ones you like.',
  },
  Saved: {
    title: 'Saved',
    desc: 'All your saved stories, blog posts, and facts in one place.',
  },
};

export default function InfoScreen({ navigation, route }: Props) {
  const info = INFO[route.params.section];

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/bg.png')}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{info.title}</Text>
          <View style={{ width: 40 }} />
        </View>
        <ScrollView contentContainerStyle={styles.body}>
          <Image
            source={require('../../assets/images/dog_hero.png')}
            style={styles.dog}
            resizeMode="contain"
          />
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{info.title}</Text>
            <Text style={styles.cardDesc}>{info.desc}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(13,27,75,0.6)' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { color: COLORS.white, fontSize: 18, fontWeight: '700' },
  body: { alignItems: 'center', padding: 24, paddingTop: 40 },
  dog: { width: 200, height: 220, marginBottom: 24 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 18,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)',
    padding: 24, width: '100%',
  },
  cardTitle: { color: COLORS.accent, fontSize: 20, fontWeight: '700', marginBottom: 12 },
  cardDesc: { color: 'rgba(255,255,255,0.85)', fontSize: 15, lineHeight: 22 },
});