import React from 'react';
import {
  View, Text, FlatList, StyleSheet, SafeAreaView,
  Image, TouchableOpacity, ListRenderItemInfo,
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, TabParamList, SavedItem } from '../../types';
import { COLORS } from '../../theme';
import { useSaved } from '../../context/SavedContext';
import InfoButton from '../../components/InfoButton';
import ShareButton from '../../components/ShareButton';
import SaveHeartButton from '../../components/SaveHeartButton';

type Props = CompositeScreenProps
  BottomTabScreenProps<TabParamList, 'Saved'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function SavedScreen({ navigation }: Props) {
  const { savedItems } = useSaved();

  const renderItem = ({ item }: ListRenderItemInfo<SavedItem>) => {
    if (item.type === 'place') {
      return (
        <View style={styles.card}>
          {item.image && <Image source={item.image} style={styles.placeImage} resizeMode="cover" />}
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardPreview} numberOfLines={2}>{item.subtitle}</Text>
            </View>
            <TouchableOpacity
              style={styles.openBtn}
              onPress={() => navigation.navigate('PlaceDetail', {
                place: {
                  id: item.id, title: item.title,
                  subtitle: item.subtitle ?? '',
                  coordinates: item.coordinates ?? '',
                  lat: item.lat ?? 0, lng: item.lng ?? 0,
                  image: item.image!, content: item.content,
                },
              })}
            >
              <Text style={styles.openBtnText}>Open</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.card}>
        <Text style={[styles.cardTitle, styles.cardPadding]}>{item.title}</Text>
        <Text style={[styles.cardPreview, styles.cardPadding]} numberOfLines={4}>{item.content}</Text>
        <View style={[styles.row, styles.cardPadding]}>
          <ShareButton title={item.title} content={item.content} />
          <SaveHeartButton item={item} />
        </View>
      </View>
    );
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
          <Text style={styles.headerTitle}>Saved</Text>
          <InfoButton onPress={() => navigation.navigate('Info', { section: 'Saved' })} />
        </View>

        {savedItems.length === 0 ? (
          <View style={styles.empty}>
            <Image
              source={require('../../../assets/images/dog_hero.png')}
              style={styles.emptyDog}
              resizeMode="contain"
            />
            <Text style={styles.emptyText}>
              I see something empty here,{'\n'}it needs to be fixed!
            </Text>
          </View>
        ) : (
          <FlatList<SavedItem>
            data={savedItems}
            keyExtractor={item => `${item.type}_${item.id}`}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
          />
        )}
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
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  emptyDog: { width: 200, height: 220, marginBottom: 20 },
  emptyText: { color: COLORS.white, fontSize: 18, fontWeight: '700', textAlign: 'center', lineHeight: 26 },
  list: { paddingHorizontal: 16, paddingBottom: 24, gap: 14 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', overflow: 'hidden',
  },
  placeImage: { width: '100%', height: 140 },
  row: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  cardPadding: { paddingHorizontal: 14, paddingTop: 14 },
  cardTitle: { color: COLORS.white, fontSize: 15, fontWeight: '700', marginBottom: 4 },
  cardPreview: { color: 'rgba(255,255,255,0.65)', fontSize: 12, lineHeight: 17 },
  openBtn: { backgroundColor: COLORS.accent, borderRadius: 20, paddingHorizontal: 18, paddingVertical: 8 },
  openBtnText: { color: '#1a1a1a', fontWeight: '700', fontSize: 13 },
});