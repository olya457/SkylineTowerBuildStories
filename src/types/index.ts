export interface Story {
  id: string;
  title: string;
  preview: string;
  image: number;
  content: string;
}

export interface Location {
  id: string;
  title: string;
  subtitle: string;
  coordinates: string;
  lat: number;
  lng: number;
  image: number;
  content: string;
}

export interface BlogPost {
  id: string;
  title: string;
  preview: string;
  content: string;
}

export type SavedItemType = 'story' | 'blog' | 'place' | 'fact';

export interface SavedItem {
  id: string;
  type: SavedItemType;
  title: string;
  content: string;
  image?: number;
  subtitle?: string;
  coordinates?: string;
  lat?: number;
  lng?: number;
  preview?: string;
}

export type RootStackParamList = {
  Splash:      undefined;
  Onboarding:  undefined;
  Main:        undefined;
  Info:        { section: InfoSectionName };
  StoryDetail: { story: Story };
  BlogDetail:  { post: BlogPost };
  PlaceDetail: { place: Location };
};

export type TabParamList = {
  Stories:   undefined;
  Blog:      undefined;
  Locations: undefined;
  Map:       undefined;
  Facts:     undefined;
  Saved:     undefined;
};

export type InfoSectionName =
  | 'Stories'
  | 'Blog'
  | 'Locations'
  | 'Map'
  | 'Facts'
  | 'Saved';