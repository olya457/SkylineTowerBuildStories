import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ListRenderItemInfo,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { COLORS } from '../theme';

const { width, height } = Dimensions.get('window');
const isSmall = height < 760;
const isVerySmall = height < 700;

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
    image: require('../assets/images/dog_hero.png'),
  },
  {
    id: '2',
    title: 'Here are real situations',
    body: "I've collected short stories from construction sites.",
    button: 'Good',
    image: require('../assets/images/onboard2.png'),
  },
  {
    id: '3',
    title: 'Understanding the process',
    body: 'From safety to structures — only what is really important.',
    button: 'Continue',
    image: require('../assets/images/onboard3.png'),
  },
  {
    id: '4',
    title: 'Look at these towers',
    body: 'I marked the tallest buildings on the map.',
    button: 'Next',
    image: require('../assets/images/onboard4.png'),
  },
  {
    id: '5',
    title: 'Keep the important things to yourself',
    body: 'Short facts easy to remember. Save and come back later.',
    button: 'Start',
    image: require('../assets/images/onboard5.png'),
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export default function OnboardingScreen({ navigation }: Props) {
  const [idx, setIdx] = useState(0);
  const ref = useRef<FlatList<Slide>>(null);

  const next = () => {
    if (idx < SLIDES.length - 1) {
      const nextIndex = idx + 1;
      ref.current?.scrollToIndex({ index: nextIndex, animated: true });
      setIdx(nextIndex);
    } else {
      navigation.replace('Main');
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<Slide>) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />

      <View style={styles.bottomContent}>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View key={i} style={[styles.dot, i === idx && styles.dotActive]} />
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body}>{item.body}</Text>
        </View>

        <TouchableOpacity style={styles.btn} onPress={next} activeOpacity={0.85}>
          <Text style={styles.btnText}>{item.button}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/bg.png')}
        style={styles.bg}
        resizeMode="cover"
      />
      <View style={styles.overlay} />

      <FlatList<Slide>
        ref={ref}
        data={SLIDES}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.bgDark,
  },

  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(13,27,75,0.55)',
  },

  list: {
    flex: 1,
    width: '100%',
  },

  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: isVerySmall ? 18 : isSmall ? 20 : 24,
    paddingBottom: isVerySmall ? 22 : isSmall ? 28 : 40,
  },

  image: {
    width: isVerySmall ? width * 0.62 : isSmall ? width * 0.66 : width * 0.7,
    height: isVerySmall ? width * 0.64 : isSmall ? width * 0.69 : width * 0.75,
    position: 'absolute',
    top: isVerySmall ? 80 : isSmall ? 95 : 110,
  },

  bottomContent: {
    width: '100%',
    transform: [{ translateY: -120 }],
  },

  dots: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: isVerySmall ? 10 : 16,
    gap: 6,
  },

  dot: {
    width: isVerySmall ? 20 : 24,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  dotActive: {
    backgroundColor: COLORS.accent,
    width: isVerySmall ? 28 : 32,
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: isVerySmall ? 16 : 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    paddingVertical: isVerySmall ? 16 : 20,
    paddingHorizontal: isVerySmall ? 16 : 20,
    width: '100%',
    marginBottom: isVerySmall ? 12 : 16,
  },

  title: {
    color: COLORS.accent,
    fontSize: isVerySmall ? 16 : isSmall ? 17 : 18,
    fontWeight: '700',
    marginBottom: 8,
  },

  body: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: isVerySmall ? 13 : 14,
    lineHeight: isVerySmall ? 18 : 20,
  },

  btn: {
    backgroundColor: COLORS.accent,
    borderRadius: 32,
    width: '100%',
    paddingVertical: isVerySmall ? 13 : isSmall ? 14 : 16,
    alignItems: 'center',
  },

  btnText: {
    color: '#1a1a1a',
    fontWeight: '800',
    fontSize: isVerySmall ? 15 : 16,
  },
});