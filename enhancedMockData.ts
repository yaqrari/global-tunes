/**
 * Enhanced mock song data with realistic global popularity distributions
 */

import { Song, RegionPopularity } from './mockData';
import { generateSongPopularityData } from '../utils/popularityGenerator';

// Enhanced song profiles with more metadata for realistic popularity generation
const songProfiles = [
  {
    id: '1',
    title: 'Cosmic Dream',
    artist: 'Aurora Eclipse',
    genres: ['Electronic', 'Pop'],
    releaseDate: new Date(2025, 0, 15), // January 15, 2025
    language: 'English',
    isGlobalHit: true,
    artistOrigin: 'Europe',
    album: 'Stellar Journey',
    cover: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 241,
  },
  {
    id: '2',
    title: 'Digital Horizon',
    artist: 'Pixel Wave',
    genres: ['Indie', 'Electronic'],
    releaseDate: new Date(2024, 10, 5), // November 5, 2024
    language: 'English',
    isGlobalHit: false,
    artistOrigin: 'North America',
    album: 'Electric Dreams',
    cover: 'https://images.pexels.com/photos/167491/pexels-photo-167491.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 197,
  },
  {
    id: '3',
    title: 'Neon Nights',
    artist: 'Synthwave Collective',
    genres: ['Electronic', 'Synthwave'],
    releaseDate: new Date(2024, 8, 20), // September 20, 2024
    language: 'English',
    isGlobalHit: true,
    artistOrigin: 'Europe',
    album: 'Retrowave',
    cover: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 224,
  },
  {
    id: '4',
    title: 'Ocean Whispers',
    artist: 'Aqua Serenity',
    genres: ['Ambient', 'Classical'],
    releaseDate: new Date(2024, 6, 12), // July 12, 2024
    language: 'Instrumental',
    isGlobalHit: false,
    artistOrigin: 'Oceania',
    album: 'Deep Blue',
    cover: 'https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 268,
  },
  {
    id: '5',
    title: 'Urban Pulse',
    artist: 'City Lights',
    genres: ['Hip Hop', 'R&B'],
    releaseDate: new Date(2025, 2, 3), // March 3, 2025
    language: 'English',
    isGlobalHit: true,
    artistOrigin: 'North America',
    album: 'Metropolitan',
    cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 184,
  },
  {
    id: '6',
    title: 'Sakura Dreams',
    artist: 'Tokyo Drift',
    genres: ['J-Pop', 'Electronic'],
    releaseDate: new Date(2024, 11, 1), // December 1, 2024
    language: 'Japanese',
    isGlobalHit: false,
    artistOrigin: 'East Asia',
    album: 'Cherry Blossom',
    cover: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 198,
  },
  {
    id: '7',
    title: 'Seoul City Pop',
    artist: 'K-Wave',
    genres: ['K-Pop', 'Pop'],
    releaseDate: new Date(2025, 1, 20), // February 20, 2025
    language: 'Korean',
    isGlobalHit: true,
    artistOrigin: 'East Asia',
    album: 'Neon Seoul',
    cover: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 212,
  },
  {
    id: '8',
    title: 'Latin Rhythm',
    artist: 'Salsa Kings',
    genres: ['Latin', 'Reggaeton'],
    releaseDate: new Date(2024, 9, 15), // October 15, 2024
    language: 'Spanish',
    isGlobalHit: true,
    artistOrigin: 'South America',
    album: 'Fuego',
    cover: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 235,
  },
  {
    id: '9',
    title: 'African Beats',
    artist: 'Rhythm Tribe',
    genres: ['Afrobeats', 'World'],
    releaseDate: new Date(2025, 2, 10), // March 10, 2025
    language: 'Mixed',
    isGlobalHit: false,
    artistOrigin: 'Africa',
    album: 'Motherland',
    cover: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 256,
  },
  {
    id: '10',
    title: 'Desert Mirage',
    artist: 'Oasis',
    genres: ['Rock', 'Alternative'],
    releaseDate: new Date(2024, 7, 5), // August 5, 2024
    language: 'English',
    isGlobalHit: true,
    artistOrigin: 'Europe',
    album: 'Sandstorm',
    cover: 'https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 212,
  },
];

// Generate enhanced mock song data with realistic global popularity 
export const enhancedMockSongs: Song[] = songProfiles.map(profile => {
  // Generate realistic popularity data across global regions
  const popularity: RegionPopularity[] = generateSongPopularityData({
    id: profile.id,
    title: profile.title,
    artist: profile.artist,
    genres: profile.genres,
    releaseDate: profile.releaseDate,
    language: profile.language,
    isGlobalHit: profile.isGlobalHit,
    artistOrigin: profile.artistOrigin,
  });

  return {
    id: profile.id,
    title: profile.title,
    artist: profile.artist,
    album: profile.album,
    cover: profile.cover,
    duration: profile.duration,
    popularity,
  };
});