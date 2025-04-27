export interface RegionPopularity {
  region: string;
  coordinates: [number, number]; // [lat, lng]
  popularity: number; // 0-100
  listeners: number;
  trend: 'up' | 'down' | 'stable';
  color?: string;
}

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

// Mock regional popularity data
export const regionPopularityData: RegionPopularity[] = [
  { region: 'New York', coordinates: [40.7128, -74.0060], popularity: 85, listeners: 1250000, trend: 'up' },
  { region: 'Los Angeles', coordinates: [34.0522, -118.2437], popularity: 78, listeners: 980000, trend: 'up' },
  { region: 'London', coordinates: [51.5074, -0.1278], popularity: 92, listeners: 1450000, trend: 'up' },
  { region: 'Tokyo', coordinates: [35.6762, 139.6503], popularity: 65, listeners: 890000, trend: 'up' },
  { region: 'Paris', coordinates: [48.8566, 2.3522], popularity: 72, listeners: 760000, trend: 'stable' },
  { region: 'Berlin', coordinates: [52.5200, 13.4050], popularity: 81, listeners: 680000, trend: 'up' },
  { region: 'Sydney', coordinates: [-33.8688, 151.2093], popularity: 58, listeners: 590000, trend: 'stable' },
  { region: 'Rio de Janeiro', coordinates: [-22.9068, -43.1729], popularity: 76, listeners: 720000, trend: 'up' },
  { region: 'Mexico City', coordinates: [19.4326, -99.1332], popularity: 63, listeners: 850000, trend: 'up' },
  { region: 'Mumbai', coordinates: [19.0760, 72.8777], popularity: 48, listeners: 1120000, trend: 'up' },
  { region: 'Seoul', coordinates: [37.5665, 126.9780], popularity: 89, listeners: 1380000, trend: 'up' },
  { region: 'Moscow', coordinates: [55.7558, 37.6173], popularity: 41, listeners: 520000, trend: 'down' },
  { region: 'Toronto', coordinates: [43.6532, -79.3832], popularity: 67, listeners: 540000, trend: 'stable' },
  { region: 'Madrid', coordinates: [40.4168, -3.7038], popularity: 59, listeners: 470000, trend: 'up' },
  { region: 'Cairo', coordinates: [30.0444, 31.2357], popularity: 36, listeners: 620000, trend: 'up' },
  { region: 'Stockholm', coordinates: [59.3293, 18.0686], popularity: 75, listeners: 380000, trend: 'stable' },
  { region: 'Bangkok', coordinates: [13.7563, 100.5018], popularity: 52, listeners: 490000, trend: 'up' },
  { region: 'Singapore', coordinates: [1.3521, 103.8198], popularity: 61, listeners: 320000, trend: 'up' },
  { region: 'Amsterdam', coordinates: [52.3676, 4.9041], popularity: 73, listeners: 290000, trend: 'stable' },
  { region: 'Dubai', coordinates: [25.2048, 55.2708], popularity: 54, listeners: 410000, trend: 'up' },
  { region: 'Shanghai', coordinates: [31.2304, 121.4737], popularity: 44, listeners: 980000, trend: 'up' },
  { region: 'Buenos Aires', coordinates: [-34.6037, -58.3816], popularity: 58, listeners: 420000, trend: 'stable' },
  { region: 'Jakarta', coordinates: [-6.2088, 106.8456], popularity: 39, listeners: 560000, trend: 'up' },
  { region: 'Milan', coordinates: [45.4642, 9.1900], popularity: 65, listeners: 310000, trend: 'stable' },
  { region: 'Cape Town', coordinates: [-33.9249, 18.4241], popularity: 46, listeners: 280000, trend: 'up' },
];

// Helper function to generate random popularity data based on the template
const generateRandomPopularity = (basePop: RegionPopularity[]): RegionPopularity[] => {
  return basePop.map(region => {
    // Add some randomness to each region's popularity
    const randomFactor = Math.random() * 0.4 + 0.8; // 0.8 to 1.2
    let newPopularity = Math.floor(region.popularity * randomFactor);
    newPopularity = Math.min(Math.max(newPopularity, 20), 100); // Keep between 20-100
    
    // Generate random listener count with some relation to popularity
    const randomListeners = Math.floor(region.listeners * (Math.random() * 0.3 + 0.85));
    
    // Randomly assign trend
    const trends: ('up' | 'down' | 'stable')[] = ['up', 'down', 'stable'];
    const randomTrend = trends[Math.floor(Math.random() * trends.length)];
    
    // Generate color based on popularity (red to pink gradient to match the reference images)
    const hue = 350; // Pink/red hue
    const saturation = 70 + newPopularity * 0.2; // 70-90%
    const lightness = 50 + ((100 - newPopularity) * 0.2); // Higher popularity = deeper color
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    return {
      ...region,
      popularity: newPopularity,
      listeners: randomListeners,
      trend: randomTrend,
      color,
    };
  });
};

// Mock songs with popularity data
export const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Cosmic Dream',
    artist: 'Aurora Eclipse',
    album: 'Stellar Journey',
    cover: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 241,
    popularity: generateRandomPopularity(regionPopularityData),
  },
  {
    id: '2',
    title: 'Digital Horizon',
    artist: 'Pixel Wave',
    album: 'Electric Dreams',
    cover: 'https://images.pexels.com/photos/167491/pexels-photo-167491.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 197,
    popularity: generateRandomPopularity(regionPopularityData),
  },
  {
    id: '3',
    title: 'Neon Nights',
    artist: 'Synthwave Collective',
    album: 'Retrowave',
    cover: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 224,
    popularity: generateRandomPopularity(regionPopularityData),
  },
  {
    id: '4',
    title: 'Ocean Whispers',
    artist: 'Aqua Serenity',
    album: 'Deep Blue',
    cover: 'https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 268,
    popularity: generateRandomPopularity(regionPopularityData),
  },
  {
    id: '5',
    title: 'Urban Pulse',
    artist: 'City Lights',
    album: 'Metropolitan',
    cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 184,
    popularity: generateRandomPopularity(regionPopularityData),
  },
  {
    id: '6',
    title: 'Mountain Echo',
    artist: 'Alpine Sound',
    album: 'Summit',
    cover: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 305,
    popularity: generateRandomPopularity(regionPopularityData),
  },
  {
    id: '7',
    title: 'Desert Mirage',
    artist: 'Oasis',
    album: 'Sandstorm',
    cover: 'https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: 212,
    popularity: generateRandomPopularity(regionPopularityData),
  }
];