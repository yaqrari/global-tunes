/**
 * Utility for generating realistic song popularity data across the globe
 */

import { RegionPopularity } from '../data/mockData';
import { worldRegions } from '../data/worldRegions';
import { getCityRegion, genreInfluences } from '../data/genreInfluence';

interface SongProfile {
  id: string;
  title: string;
  artist: string;
  genres: string[];
  releaseDate: Date;
  language: string;
  isGlobalHit: boolean;
  artistOrigin?: string; // region where the artist is from, influences popularity
}

// Generate popularity data for a song across all world regions
export const generateSongPopularityData = (songProfile: SongProfile): RegionPopularity[] => {
  return worldRegions.map(region => {
    // Start with base popularity calculation
    let popularity = calculateBasePopularity(songProfile, region.name);
    
    // Apply regional genre influence
    popularity = applyGenreInfluence(popularity, songProfile.genres, region.name);
    
    // Apply language factor
    popularity = applyLanguageFactor(popularity, songProfile.language, region.name);
    
    // Apply artist origin factor
    if (songProfile.artistOrigin) {
      popularity = applyArtistOriginFactor(popularity, songProfile.artistOrigin, region.name);
    }
    
    // Apply spotify penetration factor
    popularity = popularity * (region.spotifyPenetration / 100);
    
    // Apply market size factor (based on population)
    const marketFactor = Math.log10(region.population) / 2;
    const listeners = Math.floor(popularity * marketFactor * 10000 * (0.8 + Math.random() * 0.4));
    
    // Determine trend based on release date and random factor
    const trend = determineTrend(songProfile.releaseDate);
    
    // Generate color based on popularity (red to pink gradient)
    const hue = 350; // Pink/red hue
    const saturation = 70 + popularity * 0.2; // 70-90%
    const lightness = 50 + ((100 - popularity) * 0.2); // Higher popularity = deeper color
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    return {
      region: region.name,
      coordinates: region.coordinates,
      popularity: Math.round(popularity),
      listeners,
      trend,
      color,
    };
  });
};

// Calculate base popularity based on general characteristics
const calculateBasePopularity = (songProfile: SongProfile, regionName: string): number => {
  // Start with random base between 40-60 for non-hits, 70-90 for global hits
  const basePopularity = songProfile.isGlobalHit 
    ? 70 + Math.random() * 20 
    : 40 + Math.random() * 20;
  
  // Apply some randomness to simulate real-world variability
  return basePopularity * (0.85 + Math.random() * 0.3);
};

// Apply genre influence factor based on region
const applyGenreInfluence = (basePopularity: number, genres: string[], regionName: string): number => {
  if (!genres || genres.length === 0) return basePopularity;
  
  // Get the broad region for the city
  const broadRegion = getCityRegion(regionName);
  
  // Calculate average genre influence in this region
  let totalInfluence = 0;
  let genresFound = 0;
  
  genres.forEach(genre => {
    const genreData = genreInfluences.find(g => g.genre.toLowerCase() === genre.toLowerCase());
    if (genreData) {
      const regionInfluence = genreData.regions.find(r => r.region === broadRegion);
      if (regionInfluence) {
        totalInfluence += regionInfluence.influence;
        genresFound++;
      }
    }
  });
  
  if (genresFound === 0) return basePopularity;
  
  // Average influence for the genres in this region (0-100)
  const avgInfluence = totalInfluence / genresFound;
  
  // Apply influence - scale it to have a reasonable impact
  // If influence is high (90+), boost popularity by up to 30%
  // If influence is low (<30), reduce popularity by up to 30%
  const influenceFactor = 0.7 + ((avgInfluence / 100) * 0.6);
  
  return basePopularity * influenceFactor;
};

// Apply language factor
const applyLanguageFactor = (basePopularity: number, language: string, regionName: string): number => {
  // Map regions to their dominant languages
  const regionLanguageMap: { [key: string]: string[] } = {
    'North America': ['English', 'Spanish'],
    'South America': ['Spanish', 'Portuguese'],
    'Europe': ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese'],
    'East Asia': ['Japanese', 'Korean', 'Mandarin', 'Cantonese'],
    'Southeast Asia': ['English', 'Malay', 'Indonesian', 'Thai', 'Vietnamese'],
    'South Asia': ['Hindi', 'Bengali', 'Urdu', 'English'],
    'Oceania': ['English'],
    'Middle East': ['Arabic', 'Hebrew', 'Persian', 'Turkish'],
    'Africa': ['English', 'French', 'Arabic', 'Swahili', 'Yoruba']
  };
  
  const broadRegion = getCityRegion(regionName);
  const dominantLanguages = regionLanguageMap[broadRegion] || ['English'];
  
  // Language match bonus
  if (dominantLanguages.includes(language)) {
    return basePopularity * (1.1 + Math.random() * 0.1); // 10-20% boost
  } 
  // English gets a smaller bonus in non-English regions as it's often understood
  else if (language === 'English' && !dominantLanguages.includes('English')) {
    return basePopularity * (1.05 + Math.random() * 0.05); // 5-10% boost
  }
  // Non-matching languages get a penalty
  else {
    return basePopularity * (0.85 + Math.random() * 0.1); // 5-15% reduction
  }
};

// Apply artist origin factor 
const applyArtistOriginFactor = (basePopularity: number, artistOrigin: string, regionName: string): number => {
  const broadRegion = getCityRegion(regionName);
  
  // Artists are more popular in their home region
  if (artistOrigin === broadRegion) {
    return basePopularity * (1.2 + Math.random() * 0.1); // 20-30% boost
  }
  
  // Artists from neighboring regions get a small boost
  // This is a simplified model - in reality this would be more complex
  const neighborRegions: { [key: string]: string[] } = {
    'North America': ['South America'],
    'South America': ['North America'],
    'Europe': ['Middle East', 'North Africa'],
    'East Asia': ['Southeast Asia'],
    'Southeast Asia': ['East Asia', 'South Asia', 'Oceania'],
    'South Asia': ['Southeast Asia', 'Middle East'],
    'Oceania': ['Southeast Asia'],
    'Middle East': ['South Asia', 'Europe', 'Africa'],
    'Africa': ['Middle East', 'Europe']
  };
  
  if (neighborRegions[broadRegion]?.includes(artistOrigin)) {
    return basePopularity * (1.05 + Math.random() * 0.05); // 5-10% boost
  }
  
  return basePopularity;
};

// Determine song trend
const determineTrend = (releaseDate: Date): 'up' | 'down' | 'stable' => {
  const now = new Date();
  const daysSinceRelease = Math.floor((now.getTime() - releaseDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // New songs (less than 30 days) tend to trend up
  if (daysSinceRelease < 30) {
    return Math.random() < 0.8 ? 'up' : 'stable';
  }
  
  // Songs between 30-120 days old have mixed trends
  if (daysSinceRelease < 120) {
    const rand = Math.random();
    if (rand < 0.4) return 'up';
    if (rand < 0.7) return 'stable';
    return 'down';
  }
  
  // Older songs (120+ days) tend to trend down or stay stable
  const rand = Math.random();
  if (rand < 0.2) return 'up';
  if (rand < 0.6) return 'stable';
  return 'down';
};