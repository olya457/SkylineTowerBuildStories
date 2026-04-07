import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  Image, TouchableOpacity, Animated,
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, TabParamList } from '../../types';
import { COLORS } from '../../theme';
import { FACTS } from '../../data';
import InfoButton from '../../components/InfoButton';
import ShareButton from '../../components/ShareButton';
import SaveHeartButton from '../../components/SaveHeartButton';

type Props = CompositeScreenProps
  BottomTabScreenProps<TabParamList, 'Facts'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function FactsScreen({ navigation }: Props) {
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const nextFact = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
    setTimeout(() => setIndex(i => (i + 1) % FACTS.length), 200);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/bg.png')}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Facts</Text>
          <InfoButton onPress={() => navigation.navigate('Info', { section: 'Facts' })} />
        </View>
        <View style={styles.body}>
          <Image
            source={require('../../../assets/images/dog_hero.png')}
            style={styles.dog}
            resizeMode="contain"
          />
          <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            <Text style={styles.factText}>{FACTS[index]}</Text>
          </Animated.View>
          <View style={styles.actions}>
            <ShareButton title="Construction Fact" content={FACTS[index]} />
            <SaveHeartButton
              item={{ id: `fact_${index}`, title: 'Fact', content: FACTS[index], type: 'fact' }}
            />
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
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(13,27,75,0.55)' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16,
  },
  headerTitle: { color: COLORS.white, fontSize: 20, fontWeight: '700' },
  body: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 24, paddingBottom: 30, gap: 20,
  },
  dog: { width: 200, height: 220 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 18,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)',
    padding: 22, width: '100%',
  },
  factText: { color: 'rgba(255,255,255,0.9)', fontSize: 15, lineHeight: 22, textAlign: 'center' },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  newFactBtn: {
    backgroundColor: COLORS.accent, borderRadius: 32,
    width: '100%', paddingVertical: 15, alignItems: 'center',
  },
  newFactText: { color: '#1a1a1a', fontWeight: '800', fontSize: 15 },
});