import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, Image, Modal,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, TabParamList, Location } from '../../types';
import { COLORS } from '../../theme';
import { LOCATIONS } from '../../data';
import InfoButton from '../../components/InfoButton';

type Props = CompositeScreenProps
  BottomTabScreenProps<TabParamList, 'Map'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function MapScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<Location | null>(null);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MAP</Text>
          <InfoButton onPress={() => navigation.navigate('Info', { section: 'Map' })} />
        </View>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 25.2, longitude: 55.27,
            latitudeDelta: 60, longitudeDelta: 60,
          }}
        >
          {LOCATIONS.map(loc => (
            <Marker
              key={loc.id}
              coordinate={{ latitude: loc.lat, longitude: loc.lng }}
              pinColor="#FFD700"
              onPress={() => setSelected(loc)}
            />
          ))}
        </MapView>

        <Modal
          visible={!!selected}
          transparent
          animationType="slide"
          onRequestClose={() => setSelected(null)}
        >
          <View style={styles.backdrop}>
            <View style={styles.popup}>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setSelected(null)}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
              {selected && (
                <>
                  <Image source={selected.image} style={styles.popupImage} resizeMode="cover" />
                  <Text style={styles.popupTitle}>{selected.title}</Text>
                  <Text style={styles.popupSub}>{selected.subtitle}</Text>
                  <TouchableOpacity
                    style={styles.openBtn}
                    onPress={() => { setSelected(null); navigation.navigate('PlaceDetail', { place: selected }); }}
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
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16,
    backgroundColor: 'rgba(13,27,75,0.9)',
  },
  headerTitle: { color: COLORS.white, fontSize: 20, fontWeight: '700' },
  map: { flex: 1 },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  popup: {
    backgroundColor: '#1a2a6c',
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 20, paddingBottom: 36,
  },
  closeBtn: {
    alignSelf: 'flex-end', width: 32, height: 32, borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  closeText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  popupImage: { width: '100%', height: 160, borderRadius: 12, marginBottom: 14 },
  popupTitle: { color: COLORS.white, fontSize: 18, fontWeight: '700', marginBottom: 4 },
  popupSub: { color: 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 16 },
  openBtn: { backgroundColor: COLORS.accent, borderRadius: 24, paddingVertical: 13, alignItems: 'center' },
  openBtnText: { color: '#1a1a1a', fontWeight: '700', fontSize: 15 },
});