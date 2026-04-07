import React from 'react';
import {
  View, Text, FlatList, StyleSheet,
  SafeAreaView, Image, ListRenderItemInfo,
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, TabParamList, BlogPost } from '../../types';
import { COLORS } from '../../theme';
import { BLOG_POSTS } from '../../data';
import InfoButton from '../../components/InfoButton';
import ShareButton from '../../components/ShareButton';
import SaveHeartButton from '../../components/SaveHeartButton';

type Props = CompositeScreenProps
  BottomTabScreenProps<TabParamList, 'Blog'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function BlogScreen({ navigation }: Props) {
  const renderItem = ({ item }: ListRenderItemInfo<BlogPost>) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardContent}>{item.content}</Text>
      <View style={styles.actions}>
        <ShareButton title={item.title} content={item.content} />
        <SaveHeartButton item={{ ...item, type: 'blog' }} />
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
          <Text style={styles.headerTitle}>Blog</Text>
          <InfoButton onPress={() => navigation.navigate('Info', { section: 'Blog' })} />
        </View>
        <FlatList<BlogPost>
          data={BLOG_POSTS}
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
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', padding: 18,
  },
  cardTitle: { color: COLORS.accent, fontSize: 16, fontWeight: '700', marginBottom: 10 },
  cardContent: { color: 'rgba(255,255,255,0.82)', fontSize: 13, lineHeight: 20, marginBottom: 16 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
});