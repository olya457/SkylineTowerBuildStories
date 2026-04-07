import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, Image,
  TouchableOpacity, Animated, Dimensions, Platform, StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { COLORS } from '../../theme';
import InfoButton from '../../components/InfoButton';
import ShareButton from '../../components/ShareButton';
import SaveHeartButton from '../../components/SaveHeartButton';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const { height } = Dimensions.get('window');
const isSmall = height < 760;
const isVerySmall = height < 700;
const androidTop = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 20) + 20 : 0;

const FACTS: string[] = [
  'The construction of skyscrapers begins long before the first floor appears. The main work takes place underground - on the foundation.',
  'The Eiffel Tower grows by up to 15 cm in summer due to thermal expansion of the metal.',
  'The Great Wall of China used sticky rice mortar to bind the stones.',
  'The Empire State Building was constructed in just 410 days.',
  'Modern skyscrapers are designed to sway slightly in the wind.',
  'The Burj Khalifa has 163 floors and its own weather at the top.',
  'Concrete takes 28 days to reach its design strength.',
  'The Colosseum in Rome was built by approximately 100,000 workers.',
  'Modern buildings use sensors to monitor structural health in real time.',
  'A crane operator may lift materials equivalent to thousands of trucks per year.',
  'The tallest buildings in the world "sway" a little. This is a normal phenomenon that is taken into account when designing so that the structure does not collapse under the influence of wind.',
  'Skyscrapers often use special pendulums inside. They reduce vibrations and make staying on the upper floors more comfortable.',
  'High-rise buildings are built taking into account wind flows. Even the shape of the tower can change to reduce air pressure.',
  'Concrete in the foundation of some towers is poured continuously for several days. This is necessary to avoid weak zones in the structure.',
  'Elevators in modern skyscrapers can move very quickly. In some buildings, they rise to dozens of floors in a matter of seconds.',
  'Construction cranes at height are sometimes dismantled directly from top to bottom. This is done after the construction of the tower itself is completed.',
  'In large buildings, there are special technical floors. They hide engineering systems and help distribute the load evenly.',
  'Glass facades are not just for looks. They help control the temperature inside the building.',
  'During construction, even ground vibrations are taken into account. This is especially important in regions with seismic activity.',
  'Some towers have a shape that tapers upwards. This helps reduce the load on the upper parts.',
  'Workers at height undergo special training. They learn not only to work, but also to react correctly to dangerous situations.',
  'Modern buildings use materials that can withstand extreme conditions. This increases their durability.',
  'During strong winds, construction is often stopped. This is done for the safety of the team and the preservation of the structure.',
  'Metal structures can expand or contract due to temperature. This is taken into account during installation.',
  'Large towers have backup power systems. They ensure operation even in the event of a power outage.',
  'Some buildings have their own air purification systems. This creates comfortable conditions for people inside.',
  'Architects often work together with engineers. This allows you to combine design and functionality.',
  'Construction sites have a clear organization. Each tool and material has its place.',
  'High-rise buildings can create their own microclimate. This affects the wind and temperature around them.',
  'Some towers use double walls. This helps to save energy and reduce noise.',
  'Working at height requires constant concentration. Even a small mistake can have serious consequences.',
  'Construction drawings can change during work. This is a normal part of the process when new solutions arise.',
  'Some buildings have observation decks at high altitude. They allow you to see the city from a different perspective.',
  'The construction of large objects can take years. This is a complex process that includes many stages.',
  'Engineers take into account the loads from people and equipment. This helps to avoid overloading the structure.',
  'Skyscrapers use special fire safety systems. They are designed for quick evacuation.',
  'Some towers have a unique shape for aesthetics. But behind this there are always precise engineering calculations.',
  'Construction is not only about physical work. It is also about planning, calculations and constant monitoring.',
  'Each completed tower is the result of a large team. From engineers to workers, everyone has an impact on the final result.',
];

export default function FactsScreen() {
  const navigation = useNavigation<Nav>();
  const [index, setIndex] = useState(0);
  const fade = useRef(new Animated.Value(1)).current;

  const nextFact = () => {
    Animated.sequence([
      Animated.timing(fade, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
    setTimeout(() => setIndex(i => (i + 1) % FACTS.length), 200);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/bg.png')} style={styles.bg} resizeMode="cover" />
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Facts</Text>
          <InfoButton onPress={() => navigation.navigate('Info', { section: 'Facts' })} />
        </View>
        <View style={styles.body}>
          <Image source={require('../../assets/images/dog_hero.png')} style={styles.dog} resizeMode="contain" />
          <Animated.View style={[styles.card, { opacity: fade }]}>
            <Text style={styles.counter}>{index + 1} / {FACTS.length}</Text>
            <Text style={styles.factText}>{FACTS[index]}</Text>
          </Animated.View>
          <View style={styles.actions}>
            <ShareButton title="Construction Fact" content={FACTS[index]} />
            <SaveHeartButton item={{ id: `fact_${index}`, title: 'Fact', content: FACTS[index], type: 'fact' }} />
          </View>
          <TouchableOpacity style={styles.newFactBtn} onPress={nextFact} activeOpacity={0.85}>
            <Text style={styles.newFactText}>New fact</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, width: '100%', backgroundColor: COLORS.bgDark },
  bg:         { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' },
  overlay:    { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(13,27,75,0.55)' },
  safeArea:   { flex: 1, width: '100%', paddingTop: androidTop },
  header:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: isVerySmall ? 14 : isSmall ? 16 : 20, paddingTop: isVerySmall ? 8 : 10, paddingBottom: isVerySmall ? 10 : 16 },
  headerTitle:{ color: COLORS.white, fontSize: isVerySmall ? 17 : 20, fontWeight: '700' },
  body:       { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: isVerySmall ? 16 : isSmall ? 20 : 24, paddingBottom: isVerySmall ? 18 : isSmall ? 24 : 30, gap: isVerySmall ? 14 : isSmall ? 16 : 20 },
  dog:        { width: isVerySmall ? 140 : isSmall ? 165 : 200, height: isVerySmall ? 155 : isSmall ? 180 : 220 },
  card:       { backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: isVerySmall ? 16 : 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)', padding: isVerySmall ? 16 : isSmall ? 18 : 22, width: '100%' },
  counter:    { color: 'rgba(255,255,255,0.35)', fontSize: isVerySmall ? 10 : 11, textAlign: 'right', marginBottom: isVerySmall ? 6 : 8 },
  factText:   { color: 'rgba(255,255,255,0.9)', fontSize: isVerySmall ? 13 : isSmall ? 14 : 15, lineHeight: isVerySmall ? 19 : isSmall ? 21 : 22, textAlign: 'center' },
  actions:    { flexDirection: 'row', alignItems: 'center', gap: isVerySmall ? 10 : 12 },
  newFactBtn: { backgroundColor: COLORS.accent, borderRadius: 32, width: '100%', paddingVertical: isVerySmall ? 13 : isSmall ? 14 : 15, alignItems: 'center' },
  newFactText:{ color: '#1a1a1a', fontWeight: '800', fontSize: isVerySmall ? 14 : 15 },
});