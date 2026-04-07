import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { COLORS } from '../../theme';
import ShareButton from '../../components/ShareButton';
import SaveHeartButton from '../../components/SaveHeartButton';

type Props = NativeStackScreenProps<RootStackParamList, 'BlogDetail'>;

export default function BlogDetailScreen({ navigation, route }: Props) {
  const { post } = route.params;
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/bg.png')} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
      <View style={styles.overlay} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Blog</Text>
          <View style={{ width: 40 }} />
        </View>
        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.content}>{post.content}</Text>
          <View style={styles.actions}>
            <ShareButton title={post.title} content={post.content} />
            <SaveHeartButton item={{ ...post, type: 'blog' }} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: COLORS.bgDark },
  overlay:     { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(13,27,75,0.55)' },
  header:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 },
  backBtn:     { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  backIcon:    { color: COLORS.white, fontSize: 20 },
  headerTitle: { color: COLORS.white, fontSize: 18, fontWeight: '700' },
  body:        { padding: 20, paddingBottom: 40 },
  title:       { color: COLORS.accent, fontSize: 22, fontWeight: '800', marginBottom: 16 },
  content:     { color: 'rgba(255,255,255,0.85)', fontSize: 15, lineHeight: 24, marginBottom: 28 },
  actions:     { flexDirection: 'row', alignItems: 'center', gap: 12 },
});