import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Image,
  StyleSheet, SafeAreaView, ListRenderItemInfo,
  Dimensions, Platform, StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Location } from '../../types';
import { COLORS } from '../../theme';
import { LOCATIONS } from '../../data';
import InfoButton from '../../components/InfoButton';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const { height } = Dimensions.get('window');
const isSmall = height < 760;
const isVerySmall = height < 700;
const androidTop = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 20) + 20 : 0;

export default function LocationsScreen() {
  const navigation = useNavigation<Nav>();

  const renderItem = ({ item }: ListRenderItemInfo<Location>) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
      <View style={styles.cardBody}>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          <Text style={styles.cardCoords}>📍 {item.coordinates}</Text>
        </View>
        <TouchableOpacity
          style={styles.openBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('PlaceDetail', { place: item })}
        >
          <Text style={styles.openBtnText}>Open</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/bg.png')} style={styles.bg} resizeMode="cover" />
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Buildings</Text>
          <InfoButton onPress={() => navigation.navigate('Info', { section: 'Locations' })} />
        </View>
        <FlatList<Location>
          data={LOCATIONS}
          keyExtractor={i => i.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          style={styles.flatList}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, width: '100%', backgroundColor: COLORS.bgDark },
  bg:           { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' },
  overlay:      { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(13,27,75,0.55)' },
  safeArea:     { flex: 1, width: '100%', paddingTop: androidTop },
  header:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: isVerySmall ? 14 : isSmall ? 16 : 20, paddingTop: isVerySmall ? 8 : 10, paddingBottom: isVerySmall ? 10 : 16 },
  headerTitle:  { color: COLORS.white, fontSize: isVerySmall ? 17 : 20, fontWeight: '700' },
  flatList:     { flex: 1, width: '100%' },
  list:         { paddingHorizontal: isVerySmall ? 12 : 16, paddingBottom: 120, gap: isVerySmall ? 10 : 14 },
  card:         { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: isVerySmall ? 14 : 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', overflow: 'hidden' },
  cardImage:    { width: '100%', height: isVerySmall ? 130 : isSmall ? 145 : 160, marginTop: isVerySmall ? 6 : 8 },
  cardBody:     { flexDirection: 'row', alignItems: 'center', padding: isVerySmall ? 10 : 14, gap: isVerySmall ? 8 : 12 },
  cardText:     { flex: 1 },
  cardTitle:    { color: COLORS.white, fontSize: isVerySmall ? 13.5 : 15, fontWeight: '700', marginBottom: 2 },
  cardSubtitle: { color: 'rgba(255,255,255,0.55)', fontSize: isVerySmall ? 11 : 12, marginBottom: 4 },
  cardCoords:   { color: COLORS.accent, fontSize: isVerySmall ? 10.5 : 11 },
  openBtn:      { backgroundColor: COLORS.accent, borderRadius: 20, paddingHorizontal: isVerySmall ? 14 : 18, paddingVertical: isVerySmall ? 6 : 8, alignItems: 'center', justifyContent: 'center' },
  openBtnText:  { color: '#1a1a1a', fontWeight: '700', fontSize: isVerySmall ? 12 : 13 },
});