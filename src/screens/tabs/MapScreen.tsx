import React, { useMemo, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity,
  Image, Modal, Dimensions, Platform, StatusBar,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
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

const INITIAL_REGION: Region = {
  latitude: 25.2,
  longitude: 55.27,
  latitudeDelta: 60,
  longitudeDelta: 60,
};

export default function MapScreen() {
  const navigation = useNavigation<Nav>();
  const [selected, setSelected] = useState<Location | null>(null);
  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const mapRef = useRef<MapView>(null);

  const controlsStep = useMemo(() => ({
    zoomInLat:  Math.max(region.latitudeDelta * 0.55, 0.01),
    zoomInLng:  Math.max(region.longitudeDelta * 0.55, 0.01),
    zoomOutLat: Math.min(region.latitudeDelta * 1.8, 120),
    zoomOutLng: Math.min(region.longitudeDelta * 1.8, 120),
  }), [region.latitudeDelta, region.longitudeDelta]);

  const animateTo = (nextRegion: Region) => {
    setRegion(nextRegion);
    mapRef.current?.animateToRegion(nextRegion, 250);
  };

  const zoomIn  = () => animateTo({ ...region, latitudeDelta: controlsStep.zoomInLat,  longitudeDelta: controlsStep.zoomInLng });
  const zoomOut = () => animateTo({ ...region, latitudeDelta: controlsStep.zoomOutLat, longitudeDelta: controlsStep.zoomOutLng });
  const resetMap = () => animateTo(INITIAL_REGION);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MAP</Text>
          <InfoButton onPress={() => navigation.navigate('Info', { section: 'Locations' })} />
        </View>

        <View style={styles.mapWrap}>
          <MapView ref={mapRef} style={styles.map} initialRegion={INITIAL_REGION} onRegionChangeComplete={setRegion}>
            {LOCATIONS.map(loc => (
              <Marker key={loc.id} coordinate={{ latitude: loc.lat, longitude: loc.lng }} pinColor="#FFD700" onPress={() => setSelected(loc)} />
            ))}
          </MapView>

          <View style={styles.mapControls}>
            <TouchableOpacity style={styles.controlBtn} activeOpacity={0.85} onPress={zoomIn}>
              <Text style={styles.controlText}>＋</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlBtn} activeOpacity={0.85} onPress={zoomOut}>
              <Text style={styles.controlText}>－</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlBtn} activeOpacity={0.85} onPress={resetMap}>
              <Text style={styles.controlText}>◎</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal visible={!!selected} transparent animationType="fade" onRequestClose={() => setSelected(null)}>
          <View style={styles.modalOverlay}>
            <View style={styles.popup}>
              <TouchableOpacity style={styles.closeBtn} activeOpacity={0.85} onPress={() => setSelected(null)}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
              {selected && (
                <>
                  <Image source={selected.image} style={styles.popupImage} resizeMode="contain" />
                  <Text style={styles.popupTitle}>{selected.title}</Text>
                  <Text style={styles.popupSub}>{selected.subtitle}</Text>
                  <Text style={styles.popupCoords}>📍 {selected.coordinates}</Text>
                  <TouchableOpacity
                    style={styles.openBtn}
                    activeOpacity={0.88}
                    onPress={() => { const cur = selected; setSelected(null); navigation.navigate('PlaceDetail', { place: cur }); }}
                  >
                    <Text style={styles.openBtnText}>Open</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: COLORS.bgDark },
  safeArea:     { flex: 1, paddingTop: androidTop },
  header:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: isVerySmall ? 14 : isSmall ? 16 : 20, paddingTop: isVerySmall ? 8 : 10, paddingBottom: isVerySmall ? 10 : 16, backgroundColor: 'rgba(13,27,75,0.92)' },
  headerTitle:  { color: COLORS.white, fontSize: isVerySmall ? 17 : 20, fontWeight: '700' },
  mapWrap:      { flex: 1, position: 'relative' },
  map:          { flex: 1 },
  mapControls:  { position: 'absolute', right: isVerySmall ? 10 : 14, top: '50%', transform: [{ translateY: -78 }], gap: isVerySmall ? 10 : 12 },
  controlBtn:   { width: isVerySmall ? 40 : 46, height: isVerySmall ? 40 : 46, borderRadius: 999, backgroundColor: 'rgba(13,27,75,0.88)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  controlText:  { color: '#FFFFFF', fontSize: isVerySmall ? 18 : 20, fontWeight: '800', lineHeight: isVerySmall ? 20 : 22 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.48)', alignItems: 'center', justifyContent: 'center', paddingHorizontal: isVerySmall ? 14 : 20 },
  popup:        { width: '100%', maxWidth: 420, backgroundColor: '#1a2a6c', borderRadius: isVerySmall ? 18 : 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', paddingHorizontal: isVerySmall ? 14 : 18, paddingTop: isVerySmall ? 12 : 14, paddingBottom: isVerySmall ? 16 : 20 },
  closeBtn:     { alignSelf: 'flex-end', width: isVerySmall ? 30 : 32, height: isVerySmall ? 30 : 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', marginBottom: isVerySmall ? 10 : 12 },
  closeText:    { color: '#fff', fontSize: isVerySmall ? 13 : 14, fontWeight: '700' },
  popupImage:   { width: '100%', height: isVerySmall ? 150 : isSmall ? 165 : 180, borderRadius: 12, marginBottom: isVerySmall ? 10 : 14 },
  popupTitle:   { color: COLORS.white, fontSize: isVerySmall ? 16 : 18, fontWeight: '700', marginBottom: 4 },
  popupSub:     { color: 'rgba(255,255,255,0.68)', fontSize: isVerySmall ? 12 : 13, marginBottom: 6 },
  popupCoords:  { color: COLORS.accent, fontSize: isVerySmall ? 11 : 12, marginBottom: isVerySmall ? 14 : 16 },
  openBtn:      { backgroundColor: COLORS.accent, borderRadius: 24, paddingVertical: isVerySmall ? 11 : 13, alignItems: 'center', justifyContent: 'center' },
  openBtnText:  { color: '#1a1a1a', fontWeight: '700', fontSize: isVerySmall ? 14 : 15 },
});