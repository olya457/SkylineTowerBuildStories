import React, { useState, useRef } from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity,
  FlatList, Dimensions, ListRenderItemInfo,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { COLORS } from '../theme';

const { width } = Dimensions.get('window');

interface Slide {
  id: string;
  title: string;
  body: string;
  button: string;
  image: number;
}

const SLIDES: Slide[] = [
  {
    id: '1',
    title: "Hello, I'm here for construction",
    body: "I'll show you how towers grow and what's behind each structure.",
    button: 'Hello!',
    image: require('../../assets/images/dog_hero.png'),
  },
  {
    id: '2',
    title: 'Here are real situations',
    body: "I've collected short stories from construction sites.",
    button: 'Good',
    image: require('../../assets/images/onboard2.png'),
  },
  {
    id: '3',
    title: 'Understanding the process',
    body: 'From safety to structures — only what is really important.',
    button: 'Continue',
    image: require('../../assets/images/onboard3.png'),
  },
  {
    id: '4',
    title: 'Look at these towers',
    body: 'I marked the places with the tallest buildings on the map.',
    button: 'Next',
    image: require('../../assets/images/onboard4.png'),
  },
  {
    id: '5',
    title: 'Keep the important things to yourself',
    body: 'Short facts easy to remember. Save and come back later.',
    button: 'Start',
    image: require('../../assets/images/onboard5.png'),
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export default function OnboardingScreen({ navigation }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<Slide>>(null);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      const next = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: next });
      setCurrentIndex(next);
    } else {
      navigation.replace('Main');
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<Slide>) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View key={i} style={[styles.dot, i === currentIndex && styles.dotActive]} />
        ))}
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={handleNext} activeOpacity={0.85}>
        <Text style={styles.btnText}>{item.button}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/bg.png')}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <FlatList<Slide>
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(13,27,75,0.55)' },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  image: { width: width * 0.7, height: width * 0.75, position: 'absolute', top: 60 },
  dots: { flexDirection: 'row', marginBottom: 16, gap: 6 },
  dot: { width: 24, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.3)' },
  dotActive: { backgroundColor: COLORS.accent, width: 32 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    padding: 20,
    width: '100%',
    marginBottom: 16,
  },
  title: { color: COLORS.accent, fontSize: 18, fontWeight: '700', marginBottom: 8 },
  body: { color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 20 },
  btn: {
    backgroundColor: COLORS.accent,
    borderRadius: 32,
    width: '100%',
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnText: { color: '#1a1a1a', fontWeight: '800', fontSize: 16 },
});