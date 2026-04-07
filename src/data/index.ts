
import { Story, Location, BlogPost } from '../types';

export const STORIES: Story[] = [
  {
    id: '1',
    title: 'Night Shift',
    preview: 'Construction never stops completely, even when the city falls asleep.',
    image: require('../assets/images/story1.png'),
    content: `Construction never stops completely, even when the city falls asleep. In the silence of the night air, only the light of searchlights and the hum of machinery remind us that work continues. Our construction dog stands at a height, looking down at the street lights and checking the plan for the next stage.

It is easier to concentrate at night: less noise, less haste, more precision. Every movement becomes deliberate, every step is important. He is used to this rhythm, where darkness does not scare, but helps.

At such moments, a sense of control over space appears. Height no longer seems dangerous - it becomes a familiar part of the work. And while most people are sleeping, here, among steel and light, another floor of the future tower is being born.`,
  },
  {
    id: '2',
    title: 'The First Climb',
    preview: 'The first climb is always memorable.',
    image: require('../assets/images/story2.png'),
    content: `The first climb is always memorable. When the elevator is not working yet, and you have to climb on temporary stairs and metal structures, every meter feels different.

Our hero remembers this moment well. Then everything seemed higher, more complicated and a little scary. But along with this came the excitement. The higher he climbed, the wider the horizon opened. The city shrank, the details disappeared, only the big picture remained.

This sense of scale changes thinking. Since then, he knows: height is not about fear, but about perspective. And each new tower is another chance to see the world differently.`,
  },
  {
    id: '3',
    title: 'Drawing Mistake',
    preview: 'Sometimes even the most accurate plans can fail.',
    image: require('../assets/images/story3.png'),
    content: `Sometimes even the most accurate plans can fail. It was a normal day until the team noticed a discrepancy in the dimensions of the structure. Our dog quickly looked over the drawings and found a mistake.

A small one, almost imperceptible, but one that could change the entire stability of the floor. There are no trifles in construction. Every line matters. He calmly explained the situation and, together with the team, found a solution.

The work had to be redone a little, but it's better than taking risks. It is moments like these that show how important attentiveness is. You can't act randomly here - only accuracy and verification. And there is also a professional peace of mind in this.`,
  },
  {
    id: '4',
    title: 'Construction in a Storm',
    preview: "The weather doesn't always play by the rules.",
    image: require('../assets/images/story4.png'),
    content: `The weather doesn't always play by the rules. Once the wind rose so much that the work had to be temporarily stopped. But even in such moments, the team doesn't just wait.

Our hero checks the fasteners, sees if everything is in place, if the structures can withstand the load. The rain beats on the metal, the wind swings the cranes, but this is where the quality of the work is tested.

The building must be ready for any conditions. And when the storm passes, there remains a feeling of confidence: everything was done correctly. It's not just a process - it's a responsibility for each element.`,
  },
  {
    id: '5',
    title: 'The Old Master',
    preview: 'On every construction site there is someone who knows more than others.',
    image: require('../assets/images/story5.png'),
    content: `On every construction site there is someone who knows more than others. The old master does not say too much, but his advice is always accurate. Our dog often remembers conversations with him.

He taught us not to rush, to double-check and to trust not only plans, but also experience. Once the master said: "The tower stands not because of the concrete, but because of the mind of those who build it."

These words remained for a long time. Since then, every project is not just a job, but a process where every detail and every decision is important. And even when the master is no longer around, his approach lives on in every new construction.`,
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
    image: require('../assets/images/place1.png'),
    content: `The Burj Khalifa is not just the tallest building in the world, but a true symbol of modern engineering and ambition. Located in Dubai, this tower reaches a height of over 828 meters and changes the idea of how far architecture can go. Its shape is inspired by natural structures, which allows it to reduce the impact of wind at such a height.

The construction required complex calculations and new technologies, because standard approaches simply do not work at such a level. Particular attention was paid to the foundation, which must withstand enormous weight and loads. Inside the building are residential premises, offices, hotels and observation decks.

Burj Khalifa is an example of how precision, planning and technology allow you to create something that recently seemed impossible. It has become a reference point for new projects and has shown that the height limit is constantly moving.`,
  },
  {
    id: '2',
    title: 'Shanghai Tower',
    subtitle: 'Shanghai, China',
    coordinates: '31.2336, 121.5055',
    lat: 31.2336,
    lng: 121.5055,
    image: require('../assets/images/place2.png'),
    content: `Shanghai Tower is one of the tallest buildings in the world, distinguished by its spiral shape. It was created not only for its impressive appearance, but also to reduce wind load. This design allows the building to more effectively withstand natural conditions, which is especially important at high altitude.

The tower consists of several vertical zones, each of which has its own function: offices, commercial spaces, hotels and recreation areas. It is actually a “city inside a building”. A feature is the double facade, which helps to save energy and create comfortable conditions inside.

Shanghai Tower demonstrates a modern approach to construction, where not only height and shape are important, but also efficiency, environmental friendliness and comfort. This is an example of how engineering adapts to the future.`,
  },
  {
    id: '3',
    title: 'One World Trade Center',
    subtitle: 'New York, USA',
    coordinates: '40.7127, -74.0134',
    lat: 40.7127,
    lng: -74.0134,
    image: require('../assets/images/place3.png'),
    content: `One World Trade Center is not just a skyscraper, but a building with a deep symbolic meaning. It was built in New York as part of the recovery after the events that changed the city. The height of 541 meters (1,776 feet) was not chosen by chance - it is connected with the history of the country.

Special attention was paid to safety: the building has a reinforced structure, modern evacuation systems and additional protective elements. The architecture combines simplicity and strength, creating a sense of stability.

Inside are offices, observation decks and public spaces. One World Trade Center is an example of how architecture can be not only functional, but also symbolic, conveying ideas of sustainability and recovery.`,
  },
  {
    id: '4',
    title: 'Taipei 101',
    subtitle: 'Taipei, Taiwan',
    coordinates: '25.0330, 121.5654',
    lat: 25.0330,
    lng: 121.5654,
    image: require('../assets/images/place4.png'),
    content: `Taipei 101 was the tallest building in the world for a long time and is still one of the most recognizable. Its design is inspired by traditional Asian architecture, combining modern technology with cultural elements.

One of the key features is a huge damper (pendulum) located inside the building. It helps reduce vibrations during strong winds or earthquakes. This makes the building more stable and safe.

Taipei 101 shows how engineering can take into account natural factors and adapt to difficult conditions. It is an example of a balance between tradition and modern solutions.`,
  },
  {
    id: '5',
    title: 'Petronas Towers',
    subtitle: 'Kuala Lumpur, Malaysia',
    coordinates: '3.1579, 101.7116',
    lat: 3.1579,
    lng: 101.7116,
    image: require('../assets/images/place5.png'),
    content: `The Petronas Towers are two twin towers in Kuala Lumpur that have become a symbol of the city. They are connected by a high-altitude bridge that not only looks impressive, but also performs a functional role.

The construction of these towers required precision and synchronization, as both parts must be identical. Special attention was paid to the materials and the foundation, which is located on complex soil.

The Petronas Towers combine engineering precision and aesthetics. They show that even complex structures can look light and harmonious. This is an example of how architecture becomes part of the identity of a city.`,
  },
];

export const BLOG_POSTS: BlogPost[] = [
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