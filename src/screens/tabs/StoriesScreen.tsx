import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  Image, StyleSheet, SafeAreaView, ListRenderItemInfo,
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, TabParamList, Story } from '../../types';
import { COLORS } from '../../theme';
import { STORIES } from '../../data';
import InfoButton from '../../components/InfoButton';

type Props = CompositeScreenProps
  BottomTabScreenProps<TabParamList, 'Stories'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function StoriesScreen({ navigation }: Props) {
  const renderItem = ({ item }: ListRenderItemInfo<Story>) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardContent}>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardPreview} numberOfLines={2}>{item.preview}</Text>
        </View>
        <TouchableOpacity
          style={styles.openBtn}
          onPress={() => navigation.navigate('StoryDetail', { story: item })}
        >
          <Text style={styles.openBtnText}>Open</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
          <Text style={styles.headerTitle}>Build-stories</Text>
          <InfoButton onPress={() => navigation.navigate('Info', { section: 'Stories' })} />
        </View>
        <FlatList<Story>
          data={STORIES}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
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
  list: { paddingHorizontal: 16, paddingBottom: 24, gap: 14 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', overflow: 'hidden',
  },
  cardImage: { width: '100%', height: 160 },
  cardContent: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  cardText: { flex: 1 },
  cardTitle: { color: COLORS.white, fontSize: 15, fontWeight: '700', marginBottom: 4 },
  cardPreview: { color: 'rgba(255,255,255,0.65)', fontSize: 12, lineHeight: 17 },
  openBtn: { backgroundColor: COLORS.accent, borderRadius: 20, paddingHorizontal: 18, paddingVertical: 8 },
  openBtnText: { color: '#1a1a1a', fontWeight: '700', fontSize: 13 },
});