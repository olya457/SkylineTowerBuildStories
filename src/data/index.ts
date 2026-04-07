import { Story, Location, BlogPost } from '../types';

export const STORIES: Story[] = [
  {
    id: '1',
    title: 'Night Shift',
    preview: 'Construction never stops completely, even when the city falls asleep.',
    image: require('../../assets/images/story1.png'),
    content: `Construction never stops completely, even when the city falls asleep...`,
  },
  {
    id: '2',
    title: 'The First Climb',
    preview: 'The first climb is always memorable.',
    image: require('../../assets/images/story2.png'),
    content: `The first climb is always memorable...`,
  },
  {
    id: '3',
    title: 'Drawing Mistake',
    preview: 'Sometimes even the most accurate plans can fail.',
    image: require('../../assets/images/story3.png'),
    content: `Sometimes even the most accurate plans can fail...`,
  },
  {
    id: '4',
    title: 'Construction in a Storm',
    preview: "The weather doesn't always play by the rules.",
    image: require('../../assets/images/story4.png'),
    content: `The weather doesn't always play by the rules...`,
  },
  {
    id: '5',
    title: 'The Old Master',
    preview: 'On every construction site there is someone who knows more.',
    image: require('../../assets/images/story5.png'),
    content: `On every construction site there is someone who knows more...`,
  },
];

export const LOCATIONS: Location[] = [
  {
    id: '1',
    title: 'Burj Khalifa',
    subtitle: 'Dubai, UAE',
    coordinates: '25.1972, 55.2744',
    lat: 25.1972,
    lng: 55.2744,
    image: require('../../assets/images/place1.png'),
    content: `The Burj Khalifa is the tallest building in the world...`,
  },
  {
    id: '2',
    title: 'Shanghai Tower',
    subtitle: 'Shanghai, China',
    coordinates: '31.2338, 121.5056',
    lat: 31.2338,
    lng: 121.5056,
    image: require('../../assets/images/place2.png'),
    content: `The Shanghai Tower stands at 632 meters...`,
  },
  {
    id: '3',
    title: 'Empire State Building',
    subtitle: 'New York, USA',
    coordinates: '40.7484, -73.9857',
    lat: 40.7484,
    lng: -73.9857,
    image: require('../../assets/images/place3.png'),
    content: `The Empire State Building was built in just 410 days...`,
  },
  {
    id: '4',
    title: 'Petronas Towers',
    subtitle: 'Kuala Lumpur, Malaysia',
    coordinates: '3.1579, 101.7116',
    lat: 3.1579,
    lng: 101.7116,
    image: require('../../assets/images/place4.png'),
    content: `The Petronas Twin Towers held the title of world tallest...`,
  },
  {
    id: '5',
    title: 'Sagrada Família',
    subtitle: 'Barcelona, Spain',
    coordinates: '41.4036, 2.1744',
    lat: 41.4036,
    lng: 2.1744,
    image: require('../../assets/images/place5.png'),
    content: `The Sagrada Família has been under construction since 1882...`,
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Safety at Height',
    preview: 'Working at height is always associated with risk.',
    content: `Working at height is always associated with risk...`,
  },
  {
    id: '2',
    title: 'Understanding Blueprints',
    preview: 'A blueprint is the language of construction.',
    content: `A blueprint is the language of construction...`,
  },
  {
    id: '3',
    title: 'Materials Matter',
    preview: 'Not all materials are created equal.',
    content: `Not all materials are created equal...`,
  },
  {
    id: '4',
    title: 'Teamwork on Site',
    preview: 'A construction site is one of the most complex team environments.',
    content: `A construction site is one of the most complex team environments...`,
  },
  {
    id: '5',
    title: 'Foundation First',
    preview: 'Every great tower begins underground.',
    content: `Every great tower begins not with what you can see...`,
  },
];

export const FACTS: string[] = [
  'The construction of skyscrapers begins long before the first floor appears. The main work takes place underground - on the foundation.',
  'The Eiffel Tower grows by up to 15 cm in summer due to thermal expansion of the metal.',
  'The Great Wall of China used sticky rice mortar to bind the stones.',
  'The Empire State Building was constructed in just 410 days.',
  'Modern skyscrapers are designed to sway slightly in the wind.',
  'The Burj Khalifa has 163 floors and its own weather at the top.',
  'Concrete takes 28 days to reach its design strength.',
  'The Colosseum in Rome was built by approximately 100,000 workers.',
  'Modern buildings use sensors to monitor structural health in real time.',
  'A crane operator may lift materials equivalent to thousands of trucks per year.',
];