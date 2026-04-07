import React from 'react';
import {
  View, Text, FlatList, StyleSheet, SafeAreaView, Image,
  TouchableOpacity, ListRenderItemInfo, Dimensions, Platform, StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, SavedItem, Story, Location } from '../../types';
import { COLORS } from '../../theme';
import { useSaved } from '../../context/SavedContext';
import InfoButton from '../../components/InfoButton';
import ShareButton from '../../components/ShareButton';
import SaveHeartButton from '../../components/SaveHeartButton';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const { height } = Dimensions.get('window');
const isSmall = height < 760;
const isVerySmall = height < 700;
const androidTop = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 20) + 20 : 0;

export default function SavedScreen() {
  const navigation = useNavigation<Nav>();
  const { savedItems } = useSaved();

  const renderItem = ({ item }: ListRenderItemInfo<SavedItem>) => {
    const hasImage = typeof item.image === 'number';

    const openPlace = () => {
      if (item.type !== 'place' || typeof item.image !== 'number') return;
      const place: Location = {
        id: item.id, title: item.title, subtitle: item.subtitle ?? '',
        coordinates: item.coordinates ?? '', lat: item.lat ?? 0,
        lng: item.lng ?? 0, image: item.image, content: item.content,
      };
      navigation.navigate('PlaceDetail', { place });
    };

    const openStory = () => {
      if (item.type !== 'story' || typeof item.image !== 'number') return;
      const story: Story = {
        id: item.id, title: item.title,
        preview: item.preview ?? item.content.slice(0, 90),
        image: item.image, content: item.content,
      };
      navigation.navigate('StoryDetail', { story });
    };

    return (
      <View style={styles.card}>
        {hasImage && <Image source={item.image} style={styles.image} resizeMode="contain" />}
        <View style={styles.content}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          {!!(item.subtitle || item.content) && (
            <Text style={styles.cardPreview} numberOfLines={item.type === 'place' ? 2 : 4}>
              {item.subtitle || item.content}
            </Text>
          )}
          <View style={styles.actions}>
            <ShareButton title={item.title} content={item.content} />
            <SaveHeartButton item={item} />
            {item.type === 'place' && hasImage && (
              <TouchableOpacity style={styles.openBtn} activeOpacity={0.85} onPress={openPlace}>
                <Text style={styles.openBtnText}>Open</Text>
              </TouchableOpacity>
            )}
            {item.type === 'story' && hasImage && (
              <TouchableOpacity style={styles.openBtn} activeOpacity={0.85} onPress={openStory}>
                <Text style={styles.openBtnText}>Open</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/bg.png')} style={styles.bg} resizeMode="cover" />
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Saved</Text>
          <InfoButton onPress={() => navigation.navigate('Info', { section: 'Saved' })} />
        </View>

        {savedItems.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Saved</Text>
            <Text style={styles.emptyText}>I see something empty here,{'\n'}it needs to be fixed!</Text>
            <Image source={require('../../assets/images/dog_hero.png')} style={styles.emptyDog} resizeMode="contain" />
          </View>
        ) : (
          <FlatList<SavedItem>
            data={savedItems}
            keyExtractor={i => `${i.type}_${i.id}`}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            style={styles.flatList}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, width: '100%', backgroundColor: COLORS.bgDark },
  bg:          { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' },
  overlay:     { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(13,27,75,0.55)' },
  safeArea:    { flex: 1, width: '100%', paddingTop: androidTop },
  header:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: isVerySmall ? 14 : 20, paddingTop: isVerySmall ? 8 : 10, paddingBottom: isVerySmall ? 10 : 16 },
  headerTitle: { color: COLORS.white, fontSize: isVerySmall ? 17 : 20, fontWeight: '700' },
  empty:       { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  emptyTitle:  { color: COLORS.white, fontSize: isVerySmall ? 18 : 20, fontWeight: '700', marginBottom: 16 },
  emptyText:   { color: COLORS.white, fontSize: isVerySmall ? 14 : 18, textAlign: 'center', lineHeight: isVerySmall ? 20 : 26, marginBottom: 20 },
  emptyDog:    { width: isVerySmall ? 160 : 200, height: isVerySmall ? 180 : 220 },
  flatList:    { flex: 1, width: '100%' },
  list:        { paddingHorizontal: isVerySmall ? 12 : 16, paddingBottom: 120, gap: isVerySmall ? 10 : 14 },
  card:        { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: isVerySmall ? 14 : 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', overflow: 'hidden' },
  image:       { width: '100%', height: isVerySmall ? 120 : 140, marginTop: 6 },
  content:     { padding: isVerySmall ? 10 : 14, gap: isVerySmall ? 6 : 8 },
  cardTitle:   { color: COLORS.white, fontSize: isVerySmall ? 13.5 : 15, fontWeight: '700' },
  cardPreview: { color: 'rgba(255,255,255,0.7)', fontSize: isVerySmall ? 11 : 12, lineHeight: isVerySmall ? 15 : 17 },
  actions:     { flexDirection: 'row', alignItems: 'center', gap: isVerySmall ? 8 : 12, marginTop: 6, flexWrap: 'wrap' },
  openBtn:     { backgroundColor: COLORS.accent, borderRadius: 20, paddingHorizontal: isVerySmall ? 14 : 18, paddingVertical: isVerySmall ? 6 : 8 },
  openBtnText: { color: '#1a1a1a', fontWeight: '700', fontSize: isVerySmall ? 12 : 13 },
});