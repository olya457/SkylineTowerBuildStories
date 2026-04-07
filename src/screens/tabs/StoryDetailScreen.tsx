import React from 'react';
import {
  View, Text, Image, ScrollView, StyleSheet,
  SafeAreaView, TouchableOpacity, Dimensions, Platform, StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { COLORS } from '../../theme';
import ShareButton from '../../components/ShareButton';
import SaveHeartButton from '../../components/SaveHeartButton';

type Props = NativeStackScreenProps<RootStackParamList, 'StoryDetail'>;

const { width, height } = Dimensions.get('window');
const isSmall = height < 760;
const isVerySmall = height < 700;
const androidTop = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 30) + 20 : 0;

export default function StoryDetailScreen({ navigation, route }: Props) {
  const { story } = route.params;

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/bg.png')} style={styles.bg} resizeMode="cover" />
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Build-stories</Text>
          <View style={styles.headerSpacer} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          style={styles.scrollView}
        >
          <Image source={story.image} style={styles.heroImage} resizeMode="contain" />
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
  container:    { flex: 1, width: '100%', backgroundColor: COLORS.bgDark },
  bg:           { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' },
  overlay:      { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(13,27,75,0.55)' },
  safeArea:     { flex: 1, width: '100%', paddingTop: androidTop },
  header:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: isVerySmall ? 14 : 16, paddingVertical: isVerySmall ? 10 : 14 },
  backBtn:      { width: isVerySmall ? 36 : 40, height: isVerySmall ? 36 : 40, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  backIcon:     { color: COLORS.white, fontSize: isVerySmall ? 18 : 20, fontWeight: '700' },
  headerTitle:  { color: COLORS.white, fontSize: isVerySmall ? 16 : 18, fontWeight: '700' },
  headerSpacer: { width: isVerySmall ? 36 : 40 },
  scrollView:   { flex: 1, width: '100%' },
  scrollContent:{ paddingBottom: 80 },
  heroImage:    { width: width, height: isVerySmall ? 180 : isSmall ? 200 : 220, alignSelf: 'center', marginTop: isVerySmall ? 2 : 4 },
  body:         { paddingHorizontal: isVerySmall ? 16 : 20, paddingTop: isVerySmall ? 14 : 20 },
  title:        { color: COLORS.accent, fontSize: isVerySmall ? 18 : isSmall ? 20 : 22, fontWeight: '800', marginBottom: isVerySmall ? 12 : 16, lineHeight: isVerySmall ? 24 : 28 },
  content:      { color: 'rgba(255,255,255,0.85)', fontSize: isVerySmall ? 13 : isSmall ? 14 : 15, lineHeight: isVerySmall ? 21 : isSmall ? 22 : 24, marginBottom: isVerySmall ? 22 : 28 },
  actions:      { flexDirection: 'row', alignItems: 'center', gap: isVerySmall ? 10 : 12, paddingBottom: Platform.OS === 'ios' ? 8 : 0 },
});