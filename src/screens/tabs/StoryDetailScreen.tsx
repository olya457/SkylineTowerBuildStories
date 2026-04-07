import React from 'react';
import {
  View, Text, Image, ScrollView,
  StyleSheet, SafeAreaView, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { COLORS } from '../../theme';
import ShareButton from '../../components/ShareButton';
import SaveHeartButton from '../../components/SaveHeartButton';

type Props = NativeStackScreenProps<RootStackParamList, 'StoryDetail'>;

export default function StoryDetailScreen({ navigation, route }: Props) {
  const { story } = route.params;

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
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Build-stories</Text>
          <View style={{ width: 40 }} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={story.image} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.body}>
            <Text style={styles.title}>{story.title}</Text>
            <Text style={styles.content}>{story.content}</Text>
            <View style={styles.actions}>
              <ShareButton title={story.title} content={story.content} />
              <SaveHeartButton item={{ ...story, type: 'story' }} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(13,27,75,0.55)' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { color: COLORS.white, fontSize: 18, fontWeight: '700' },
  heroImage: { width: '100%', height: 220 },
  body: { padding: 20 },
  title: { color: COLORS.accent, fontSize: 22, fontWeight: '800', marginBottom: 16 },
  content: { color: 'rgba(255,255,255,0.85)', fontSize: 15, lineHeight: 24, marginBottom: 28 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
});