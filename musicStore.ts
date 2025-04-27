import { create } from 'zustand';
import { regionPopularityData, type RegionPopularity } from '../data/mockData';
import { enhancedMockSongs } from '../data/enhancedMockData';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  audio?: string;
  duration: number;
  popularity: RegionPopularity[];
}

interface TimeRange {
  id: string;
  label: string;
}

interface MusicState {
  songs: Song[];
  currentSong: Song | null;
  currentTime: number;
  isPlaying: boolean;
  volume: number;
  searchQuery: string;
  selectedTimeRange: TimeRange;
  timeRanges: TimeRange[];
  setCurrentSong: (song: Song | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
  setSearchQuery: (query: string) => void;
  setSelectedTimeRange: (range: TimeRange) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
}

// Use our enhanced mock data instead of the original mock data
export const useMusicStore = create<MusicState>((set, get) => ({
  songs: enhancedMockSongs,
  currentSong: null,
  currentTime: 0,
  isPlaying: false,
  volume: 0.8,
  searchQuery: '',
  selectedTimeRange: { id: 'week', label: 'This Week' },
  timeRanges: [
    { id: 'day', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'year', label: 'This Year' },
    { id: 'all', label: 'All Time' },
  ],
  setCurrentSong: (song) => set({ currentSong: song, currentTime: 0, isPlaying: !!song }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setVolume: (volume) => set({ volume }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedTimeRange: (range) => set({ selectedTimeRange: range }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  nextSong: () => {
    const { songs, currentSong } = get();
    if (!currentSong || songs.length <= 1) return;
    
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    set({ 
      currentSong: songs[nextIndex], 
      currentTime: 0,
      isPlaying: true 
    });
  },
  prevSong: () => {
    const { songs, currentSong } = get();
    if (!currentSong || songs.length <= 1) return;
    
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    set({ 
      currentSong: songs[prevIndex], 
      currentTime: 0,
      isPlaying: true 
    });
  }
}));