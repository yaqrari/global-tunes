/**
 * Comprehensive list of world regions with coordinates
 * for generating more realistic global popularity data
 */

export interface WorldRegion {
  name: string;
  coordinates: [number, number]; // [lat, lng]
  population: number; // in millions, approximate
  spotifyPenetration: number; // 0-100, estimated market penetration %
}

export const worldRegions: WorldRegion[] = [
  // North America
  { name: 'New York', coordinates: [40.7128, -74.0060], population: 8.4, spotifyPenetration: 85 },
  { name: 'Los Angeles', coordinates: [34.0522, -118.2437], population: 4.0, spotifyPenetration: 82 },
  { name: 'Chicago', coordinates: [41.8781, -87.6298], population: 2.7, spotifyPenetration: 80 },
  { name: 'Toronto', coordinates: [43.6532, -79.3832], population: 2.9, spotifyPenetration: 78 },
  { name: 'Mexico City', coordinates: [19.4326, -99.1332], population: 9.2, spotifyPenetration: 65 },
  { name: 'Miami', coordinates: [25.7617, -80.1918], population: 0.45, spotifyPenetration: 75 },
  { name: 'Vancouver', coordinates: [49.2827, -123.1207], population: 0.68, spotifyPenetration: 76 },
  { name: 'Montreal', coordinates: [45.5017, -73.5673], population: 1.8, spotifyPenetration: 75 },
  { name: 'Houston', coordinates: [29.7604, -95.3698], population: 2.3, spotifyPenetration: 72 },
  { name: 'Havana', coordinates: [23.1136, -82.3666], population: 2.1, spotifyPenetration: 35 },

  // South America
  { name: 'São Paulo', coordinates: [-23.5505, -46.6333], population: 12.3, spotifyPenetration: 70 },
  { name: 'Rio de Janeiro', coordinates: [-22.9068, -43.1729], population: 6.7, spotifyPenetration: 68 },
  { name: 'Buenos Aires', coordinates: [-34.6037, -58.3816], population: 3.1, spotifyPenetration: 65 },
  { name: 'Lima', coordinates: [-12.0464, -77.0428], population: 10.5, spotifyPenetration: 55 },
  { name: 'Santiago', coordinates: [-33.4489, -70.6693], population: 6.8, spotifyPenetration: 62 },
  { name: 'Bogotá', coordinates: [4.7110, -74.0721], population: 7.4, spotifyPenetration: 60 },
  { name: 'Caracas', coordinates: [10.4806, -66.9036], population: 2.9, spotifyPenetration: 45 },
  { name: 'Quito', coordinates: [-0.1807, -78.4678], population: 1.9, spotifyPenetration: 52 },
  { name: 'Montevideo', coordinates: [-34.9011, -56.1645], population: 1.4, spotifyPenetration: 61 },

  // Europe
  { name: 'London', coordinates: [51.5074, -0.1278], population: 9.0, spotifyPenetration: 88 },
  { name: 'Paris', coordinates: [48.8566, 2.3522], population: 2.2, spotifyPenetration: 80 },
  { name: 'Berlin', coordinates: [52.5200, 13.4050], population: 3.7, spotifyPenetration: 82 },
  { name: 'Madrid', coordinates: [40.4168, -3.7038], population: 3.3, spotifyPenetration: 75 },
  { name: 'Rome', coordinates: [41.9028, 12.4964], population: 2.8, spotifyPenetration: 72 },
  { name: 'Amsterdam', coordinates: [52.3676, 4.9041], population: 0.87, spotifyPenetration: 85 },
  { name: 'Stockholm', coordinates: [59.3293, 18.0686], population: 0.97, spotifyPenetration: 90 },
  { name: 'Barcelona', coordinates: [41.3851, 2.1734], population: 1.6, spotifyPenetration: 74 },
  { name: 'Vienna', coordinates: [48.2082, 16.3738], population: 1.9, spotifyPenetration: 78 },
  { name: 'Milan', coordinates: [45.4642, 9.1900], population: 1.4, spotifyPenetration: 70 },
  { name: 'Brussels', coordinates: [50.8476, 4.3572], population: 1.2, spotifyPenetration: 79 },
  { name: 'Prague', coordinates: [50.0755, 14.4378], population: 1.3, spotifyPenetration: 75 },
  { name: 'Copenhagen', coordinates: [55.6761, 12.5683], population: 0.6, spotifyPenetration: 88 },
  { name: 'Dublin', coordinates: [53.3498, -6.2603], population: 0.55, spotifyPenetration: 82 },
  { name: 'Athens', coordinates: [37.9838, 23.7275], population: 0.66, spotifyPenetration: 65 },
  { name: 'Warsaw', coordinates: [52.2297, 21.0122], population: 1.8, spotifyPenetration: 70 },
  { name: 'Moscow', coordinates: [55.7558, 37.6173], population: 12.5, spotifyPenetration: 55 },
  { name: 'Istanbul', coordinates: [41.0082, 28.9784], population: 15.5, spotifyPenetration: 50 },

  // Asia & Pacific
  { name: 'Tokyo', coordinates: [35.6762, 139.6503], population: 13.9, spotifyPenetration: 65 },
  { name: 'Seoul', coordinates: [37.5665, 126.9780], population: 9.8, spotifyPenetration: 70 },
  { name: 'Beijing', coordinates: [39.9042, 116.4074], population: 21.5, spotifyPenetration: 15 },
  { name: 'Shanghai', coordinates: [31.2304, 121.4737], population: 26.3, spotifyPenetration: 15 },
  { name: 'Mumbai', coordinates: [19.0760, 72.8777], population: 20.4, spotifyPenetration: 30 },
  { name: 'Delhi', coordinates: [28.6139, 77.2090], population: 30.3, spotifyPenetration: 28 },
  { name: 'Singapore', coordinates: [1.3521, 103.8198], population: 5.7, spotifyPenetration: 75 },
  { name: 'Bangkok', coordinates: [13.7563, 100.5018], population: 10.5, spotifyPenetration: 60 },
  { name: 'Hong Kong', coordinates: [22.3193, 114.1694], population: 7.5, spotifyPenetration: 65 },
  { name: 'Sydney', coordinates: [-33.8688, 151.2093], population: 5.3, spotifyPenetration: 80 },
  { name: 'Melbourne', coordinates: [-37.8136, 144.9631], population: 5.0, spotifyPenetration: 78 },
  { name: 'Jakarta', coordinates: [-6.2088, 106.8456], population: 10.6, spotifyPenetration: 45 },
  { name: 'Manila', coordinates: [14.5995, 120.9842], population: 13.9, spotifyPenetration: 50 },
  { name: 'Osaka', coordinates: [34.6937, 135.5022], population: 2.7, spotifyPenetration: 62 },
  { name: 'Taipei', coordinates: [25.0330, 121.5654], population: 2.6, spotifyPenetration: 60 },
  { name: 'Kuala Lumpur', coordinates: [3.1390, 101.6869], population: 7.8, spotifyPenetration: 55 },
  { name: 'Auckland', coordinates: [-36.8485, 174.7633], population: 1.5, spotifyPenetration: 78 },

  // Middle East & Africa
  { name: 'Dubai', coordinates: [25.2048, 55.2708], population: 3.3, spotifyPenetration: 60 },
  { name: 'Cairo', coordinates: [30.0444, 31.2357], population: 9.9, spotifyPenetration: 35 },
  { name: 'Riyadh', coordinates: [24.7136, 46.6753], population: 7.7, spotifyPenetration: 45 },
  { name: 'Tel Aviv', coordinates: [32.0853, 34.7818], population: 0.45, spotifyPenetration: 65 },
  { name: 'Lagos', coordinates: [6.5244, 3.3792], population: 14.4, spotifyPenetration: 25 },
  { name: 'Johannesburg', coordinates: [-26.2041, 28.0473], population: 5.8, spotifyPenetration: 45 },
  { name: 'Cape Town', coordinates: [-33.9249, 18.4241], population: 4.6, spotifyPenetration: 50 },
  { name: 'Nairobi', coordinates: [-1.2921, 36.8219], population: 4.4, spotifyPenetration: 30 },
  { name: 'Casablanca', coordinates: [33.5731, -7.5898], population: 3.4, spotifyPenetration: 40 },
  { name: 'Accra', coordinates: [5.6037, -0.1870], population: 2.5, spotifyPenetration: 28 },
  { name: 'Addis Ababa', coordinates: [9.0320, 38.7469], population: 4.8, spotifyPenetration: 20 },
  { name: 'Algiers', coordinates: [36.7538, 3.0588], population: 3.4, spotifyPenetration: 35 },
];