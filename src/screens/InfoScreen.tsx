import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity,
  Image, ScrollView, Share, Dimensions, Platform, StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, InfoSectionName } from '../types';
import { COLORS } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Info'>;

const { width, height } = Dimensions.get('window');
const isSmall = height < 760;
const isVerySmall = height < 700;
const androidTop = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 20) + 20 : 0;

const INFO: Record<InfoSectionName, { title: string; desc: string }> = {
  Stories:   { title: 'Info', desc: 'This section contains short stories related to construction processes, work situations, and the daily rhythm of building sites. The content is presented in a simple format and is easy to view at any time.' },
  Blog:      { title: 'Info', desc: 'This section includes articles about modern buildings, construction processes, safety principles, and materials. The information is written in a clear and structured way for easy reading.' },
  Locations: { title: 'Info', desc: 'Here you can explore well-known towers and buildings, open separate locations, view short descriptions, and learn more about each place in a convenient format.' },
  Map:       { title: 'Info', desc: 'The map section shows marked building locations. You can open points, view details, and navigate through famous towers presented inside the app.' },
  Facts:     { title: 'Info', desc: 'This section contains short facts about modern buildings, construction ideas, and related topics. Everything is designed for quick reading and easy understanding.' },
  Saved:     { title: 'Info', desc: 'Saved materials are collected in one place so you can return to stories, articles, and facts later without losing important content.' },
};

export default function InfoScreen({ navigation, route }: Props) {
  const info = INFO[route.params.section];

  const onShare = async () => {
    try {
      await Share.share({
        message: `${info.title}\n\n${info.desc}\n\nThis is a simple app about modern buildings, their creation and working at height. It contains stories, articles, facts and famous towers on a map. All content is available in a convenient format without unnecessary actions. The data is stored locally on the device.`,
      });
    } catch {}
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/bg.png')} style={styles.bg} resizeMode="cover" />
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.85}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>{info.title}</Text>
            <View style={styles.textBox}>
              <Text style={styles.desc}>
                This is a simple app about modern buildings, their creation and working at height. It contains stories, articles, facts and famous towers on a map. All content is available in a convenient format without unnecessary actions. The data is stored locally on the device.
              </Text>
            </View>
            <Image source={require('../assets/images/dog_hero.png')} style={styles.dog} resizeMode="contain" />
            <TouchableOpacity style={styles.shareButton} onPress={onShare} activeOpacity={0.88}>
              <Text style={styles.shareButtonText}>Share app</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const panelWidth = width - (isVerySmall ? 30 : 40);

const styles = StyleSheet.create({
  container:       { flex: 1, width: '100%', backgroundColor: COLORS.bgDark },
  bg:              { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' },
  overlay:         { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(13,27,75,0.18)' },
  safeArea:        { flex: 1, width: '100%', paddingTop: androidTop },
  header:          { width: '100%', paddingHorizontal: isVerySmall ? 14 : 16, paddingTop: isVerySmall ? 4 : 6, paddingBottom: 6, alignItems: 'flex-start' },
  backBtn:         { width: isVerySmall ? 38 : 42, height: isVerySmall ? 38 : 42, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.14)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  backIcon:        { color: COLORS.white, fontSize: 20, fontWeight: '700', marginTop: Platform.OS === 'ios' ? -1 : 0 },
  scrollContent:   { flexGrow: 1, width: '100%', alignItems: 'center', paddingHorizontal: isVerySmall ? 15 : 20, paddingTop: isVerySmall ? 6 : 10, paddingBottom: isVerySmall ? 18 : 24 },
  panel:           { width: panelWidth, minHeight: height * 0.82, borderRadius: 0, paddingTop: isVerySmall ? 52 : 58, paddingHorizontal: isVerySmall ? 20 : 28, paddingBottom: isVerySmall ? 28 : 34, alignItems: 'center', overflow: 'hidden' },
  panelTitle:      { color: '#FFFFFF', fontSize: isVerySmall ? 18 : 20, fontWeight: '800', textAlign: 'center', marginBottom: isVerySmall ? 18 : 22 },
  textBox:         { width: '100%', minHeight: isVerySmall ? 180 : 215, marginBottom: isVerySmall ? 18 : 24 },
  desc:            { color: '#FFFFFF', fontSize: isVerySmall ? 13 : isSmall ? 14 : 15, lineHeight: isVerySmall ? 19 : 22, textAlign: 'left', fontWeight: '700' },
  dog:             { width: isVerySmall ? 120 : 145, height: isVerySmall ? 145 : 175, marginBottom: isVerySmall ? 20 : 28, alignSelf: 'flex-start', marginLeft: isVerySmall ? 8 : 14 },
  shareButton:     { width: '100%', backgroundColor: '#FFD40D', borderRadius: 18, paddingVertical: isVerySmall ? 18 : 21, alignItems: 'center', justifyContent: 'center', shadowColor: '#C8A100', shadowOpacity: 0.35, shadowRadius: 10, shadowOffset: { width: 0, height: 8 }, elevation: 8 },
  shareButtonText: { color: '#111111', fontSize: isVerySmall ? 16 : 18, fontWeight: '800' },
});