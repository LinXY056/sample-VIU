export interface Episode {
  id: string;
  episodeNumber: number;
  title: string;
  duration: number; // in minutes
  watchedMinutes?: number;
  thumbnail: string;
  synopsis: string;
  airDate?: string;
  isVip?: boolean;
}

export interface Show {
  id: string;
  title: string;
  titleHighlight?: string; // word or phrase highlighted in yellow
  originalTitle?: string;
  koreanTitle?: string;
  poster: string;
  backdrop: string;
  bannerImage?: string;
  synopsis: string;
  genres: string[];
  rating: string; // '16+', '13+', 'PG13', '18+'
  episodesCount: number;
  seasonsCount?: number;
  releaseYear: number;
  starring: string[];
  director?: string;
  isOriginal?: boolean;
  isExclusive?: boolean;
  isVipOnly?: boolean;
  isSimulcast?: boolean;
  simulcastSchedule?: string; // e.g. "Every Fri & Sat 22:00"
  latestEpisode?: string; // e.g. "Ep 12"
  resolution?: 'HD' | '4K UHD';
  subtitles: string[]; // ['ENG', 'CHN', 'MALAY']
  rank?: number; // for Top 10
  rankBadge?: string; // e.g. "TRENDING #1", "ALL OUT", "VIP", "NEW EP", "TOP RATED"
  sectionCategory: 'k-drama' | 'variety' | 'originals' | 'anime' | 'movies';
  continueWatching?: {
    episodeNumber: number;
    episodeTitle: string;
    watchedMinutes: number;
    totalMinutes: number;
    leftMinutesText: string;
  };
  episodes: Episode[];
  trailerVideoUrl?: string;
}

export type CategoryFilter = 
  | 'all'
  | 'k-drama'
  | 'originals'
  | 'romance-comedy'
  | 'thriller-crime'
  | 'variety-reality'
  | 'japanese-anime'
  | 'hk-chinese';

export interface VIPPlan {
  id: string;
  name: string;
  period: string;
  price: string;
  priceNum: number;
  billingText: string;
  discountBadge?: string;
  isPopular?: boolean;
  features: string[];
}
