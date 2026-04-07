import React from 'react';
import {
  View, Text, FlatList, StyleSheet, SafeAreaView,
  Image, ListRenderItemInfo, Dimensions, Platform, StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, BlogPost } from '../../types';
import { COLORS } from '../../theme';
import InfoButton from '../../components/InfoButton';
import ShareButton from '../../components/ShareButton';
import SaveHeartButton from '../../components/SaveHeartButton';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const { height } = Dimensions.get('window');
const isSmall = height < 760;
const isVerySmall = height < 700;
const androidTop = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 20) + 20 : 0;

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Safety at Height',
    preview: 'Working at height is always associated with risk.',
    content: `Working at height is always associated with risk, but most dangerous situations can be predicted before starting work. The main rule is not to trust only experience or "it will happen somehow". Each element must be checked: fastenings, platforms, insurance. Even a slight shift or weak connection can lead to serious consequences.

Our hero knows well that at height it is not speed that is important, but control. Before each climb, he inspects the structure, checks the support points and only after that moves on. Wind, rain or even fatigue can affect coordination, so it is important to work in a stable state.

Safety is not a separate stage of work, but its constant part. And it is it that allows you to work confidently even at high altitude.`,
  },
  {
    id: '2',
    title: 'Why Equipment is Not a Formality',
    preview: 'Protective equipment is often perceived as something mandatory "for show".',
    content: `Protective equipment is often perceived as something mandatory "for show", but in fact it is it that saves in critical situations. Helmet, gloves, shoes with reinforced soles - each element performs its function.

Our builder never ignores equipment. He knows: even a small object falling from above can cause serious injury. The same applies to hands and feet - without proper protection, work quickly becomes dangerous.

Good equipment does not hinder movement, but on the contrary - adds confidence. When you know that you are protected, it is easier to focus on the task. And this is what makes work more stable and predictable.`,
  },
  {
    id: '3',
    title: 'How to Read the Construction Space',
    preview: 'A construction site is an environment that is constantly changing.',
    content: `A construction site is an environment that is constantly changing. Today it is empty, tomorrow there are new structures, tools and equipment. The ability to "read" the space helps to avoid danger.

Our hero always looks not only in front of him, but also around. He assesses where there may be unstable areas, where equipment is moving, and which areas are better to avoid. This is a habit that comes with experience.

Sudden movements, inattention or haste often cause injuries. Therefore, it is important not only to move, but to understand where and why you are going. The construction site is not chaos, but a system that needs to be felt.`,
  },
  {
    id: '4',
    title: 'Weather as a Risk Factor',
    preview: 'Weather conditions can change work in just a few minutes.',
    content: `Weather conditions can change work in just a few minutes. Wind, rain or sudden changes in temperature affect not only comfort, but also safety.

Our construction dog always pays attention to the forecast and real conditions on the site. Strong winds can sway structures, rain makes surfaces slippery, and the cold affects reaction and movements.

In such conditions, it is important not to rush and, if necessary, to suspend work. This is not weakness, but the right decision. Construction is not a race, and a safe approach always wins in the long run.`,
  },
  {
    id: '5',
    title: 'Teamwork and Trust',
    preview: 'Construction is always a team effort.',
    content: `Construction is always a team effort. It's not just what you do that matters, but how you interact with others. Misunderstandings or lack of communication can create dangerous situations.

Our hero knows: it's better to clarify once again than to act blindly. Clear signals, coordinated actions, and mutual attention are the basis of safety. Each team member is responsible not only for themselves, but also for those around them.

Trust is built gradually, through experience and teamwork. And when a team works as a whole, risks are reduced and the result becomes more stable.`,
  },
];

export default function BlogScreen() {
  const navigation = useNavigation<Nav>();

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
      <Image source={require('../../assets/images/bg.png')} style={styles.bg} resizeMode="cover" />
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Blog</Text>
          <InfoButton onPress={() => navigation.navigate('Info', { section: 'Blog' })} />
        </View>
        <FlatList<BlogPost>
          data={BLOG_POSTS}
          keyExtractor={i => i.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          style={styles.flatList}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, width: '100%', backgroundColor: COLORS.bgDark },
  bg:          { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' },
  overlay:     { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(13,27,75,0.55)' },
  safeArea:    { flex: 1, width: '100%', paddingTop: androidTop },
  header:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: isVerySmall ? 14 : isSmall ? 16 : 20, paddingTop: isVerySmall ? 8 : 10, paddingBottom: isVerySmall ? 10 : 16 },
  headerTitle: { color: COLORS.white, fontSize: isVerySmall ? 17 : 20, fontWeight: '700' },
  flatList:    { flex: 1, width: '100%' },
  list:        { paddingHorizontal: isVerySmall ? 12 : 16, paddingBottom: 120, gap: isVerySmall ? 10 : 14 },
  card:        { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: isVerySmall ? 14 : 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', padding: isVerySmall ? 14 : isSmall ? 16 : 18 },
  cardTitle:   { color: COLORS.accent, fontSize: isVerySmall ? 14 : isSmall ? 15 : 16, fontWeight: '700', marginBottom: isVerySmall ? 8 : 10 },
  cardContent: { color: 'rgba(255,255,255,0.82)', fontSize: isVerySmall ? 12 : 13, lineHeight: isVerySmall ? 18 : isSmall ? 19 : 20, marginBottom: isVerySmall ? 14 : 16 },
  actions:     { flexDirection: 'row', alignItems: 'center', gap: isVerySmall ? 8 : 10 },
});