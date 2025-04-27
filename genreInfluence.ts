/**
 * Define genre influence patterns for different regions of the world
 * This will help generate more realistic song popularity distributions
 */

export interface GenreInfluence {
  genre: string;
  regions: {
    region: string;
    influence: number; // 0-100
  }[];
}

export const genreInfluences: GenreInfluence[] = [
  {
    genre: 'Pop',
    regions: [
      { region: 'North America', influence: 90 },
      { region: 'Europe', influence: 85 },
      { region: 'East Asia', influence: 80 },
      { region: 'Southeast Asia', influence: 75 },
      { region: 'Oceania', influence: 88 },
      { region: 'South America', influence: 75 },
      { region: 'Middle East', influence: 60 },
      { region: 'Africa', influence: 55 },
    ]
  },
  {
    genre: 'Hip Hop',
    regions: [
      { region: 'North America', influence: 95 },
      { region: 'Europe', influence: 80 },
      { region: 'East Asia', influence: 65 },
      { region: 'Southeast Asia', influence: 60 },
      { region: 'Oceania', influence: 75 },
      { region: 'South America', influence: 70 },
      { region: 'Middle East', influence: 45 },
      { region: 'Africa', influence: 70 },
    ]
  },
  {
    genre: 'Rock',
    regions: [
      { region: 'North America', influence: 85 },
      { region: 'Europe', influence: 90 },
      { region: 'East Asia', influence: 60 },
      { region: 'Southeast Asia', influence: 55 },
      { region: 'Oceania', influence: 85 },
      { region: 'South America', influence: 80 },
      { region: 'Middle East', influence: 50 },
      { region: 'Africa', influence: 40 },
    ]
  },
  {
    genre: 'Electronic/Dance',
    regions: [
      { region: 'North America', influence: 80 },
      { region: 'Europe', influence: 95 },
      { region: 'East Asia', influence: 75 },
      { region: 'Southeast Asia', influence: 70 },
      { region: 'Oceania', influence: 85 },
      { region: 'South America', influence: 70 },
      { region: 'Middle East', influence: 40 },
      { region: 'Africa', influence: 45 },
    ]
  },
  {
    genre: 'Latin',
    regions: [
      { region: 'North America', influence: 75 },
      { region: 'Europe', influence: 70 },
      { region: 'East Asia', influence: 30 },
      { region: 'Southeast Asia', influence: 25 },
      { region: 'Oceania', influence: 50 },
      { region: 'South America', influence: 98 },
      { region: 'Middle East', influence: 20 },
      { region: 'Africa', influence: 25 },
    ]
  },
  {
    genre: 'K-Pop',
    regions: [
      { region: 'North America', influence: 65 },
      { region: 'Europe', influence: 60 },
      { region: 'East Asia', influence: 98 },
      { region: 'Southeast Asia', influence: 90 },
      { region: 'Oceania', influence: 60 },
      { region: 'South America', influence: 55 },
      { region: 'Middle East', influence: 40 },
      { region: 'Africa', influence: 30 },
    ]
  },
  {
    genre: 'R&B/Soul',
    regions: [
      { region: 'North America', influence: 90 },
      { region: 'Europe', influence: 75 },
      { region: 'East Asia', influence: 65 },
      { region: 'Southeast Asia', influence: 60 },
      { region: 'Oceania', influence: 70 },
      { region: 'South America', influence: 65 },
      { region: 'Middle East', influence: 40 },
      { region: 'Africa', influence: 80 },
    ]
  },
  {
    genre: 'Afrobeats',
    regions: [
      { region: 'North America', influence: 60 },
      { region: 'Europe', influence: 55 },
      { region: 'East Asia', influence: 20 },
      { region: 'Southeast Asia', influence: 25 },
      { region: 'Oceania', influence: 45 },
      { region: 'South America', influence: 40 },
      { region: 'Middle East', influence: 30 },
      { region: 'Africa', influence: 95 },
    ]
  },
  {
    genre: 'Reggaeton',
    regions: [
      { region: 'North America', influence: 75 },
      { region: 'Europe', influence: 65 },
      { region: 'East Asia', influence: 25 },
      { region: 'Southeast Asia', influence: 30 },
      { region: 'Oceania', influence: 50 },
      { region: 'South America', influence: 95 },
      { region: 'Middle East', influence: 25 },
      { region: 'Africa', influence: 30 },
    ]
  },
  {
    genre: 'Indie',
    regions: [
      { region: 'North America', influence: 85 },
      { region: 'Europe', influence: 90 },
      { region: 'East Asia', influence: 65 },
      { region: 'Southeast Asia', influence: 60 },
      { region: 'Oceania', influence: 88 },
      { region: 'South America', influence: 75 },
      { region: 'Middle East', influence: 40 },
      { region: 'Africa', influence: 35 },
    ]
  },
  {
    genre: 'Classical',
    regions: [
      { region: 'North America', influence: 70 },
      { region: 'Europe', influence: 85 },
      { region: 'East Asia', influence: 80 },
      { region: 'Southeast Asia', influence: 65 },
      { region: 'Oceania', influence: 70 },
      { region: 'South America', influence: 65 },
      { region: 'Middle East', influence: 60 },
      { region: 'Africa', influence: 55 },
    ]
  },
];

// Helper function to get the broad region for a city
export const getCityRegion = (cityName: string): string => {
  // Map cities to broader regions - simplified version
  const cityToRegionMap: { [key: string]: string } = {
    // North America
    'New York': 'North America',
    'Los Angeles': 'North America',
    'Chicago': 'North America',
    'Toronto': 'North America',
    'Mexico City': 'North America',
    'Miami': 'North America',
    'Vancouver': 'North America',
    'Montreal': 'North America',
    'Houston': 'North America',
    'Havana': 'North America',
    
    // South America
    'São Paulo': 'South America',
    'Rio de Janeiro': 'South America',
    'Buenos Aires': 'South America',
    'Lima': 'South America',
    'Santiago': 'South America',
    'Bogotá': 'South America',
    'Caracas': 'South America',
    'Quito': 'South America',
    'Montevideo': 'South America',
    
    // Europe
    'London': 'Europe',
    'Paris': 'Europe',
    'Berlin': 'Europe',
    'Madrid': 'Europe',
    'Rome': 'Europe',
    'Amsterdam': 'Europe',
    'Stockholm': 'Europe',
    'Barcelona': 'Europe',
    'Vienna': 'Europe',
    'Milan': 'Europe',
    'Brussels': 'Europe',
    'Prague': 'Europe',
    'Copenhagen': 'Europe',
    'Dublin': 'Europe',
    'Athens': 'Europe',
    'Warsaw': 'Europe',
    'Moscow': 'Europe',
    'Istanbul': 'Europe',
    
    // East Asia
    'Tokyo': 'East Asia',
    'Seoul': 'East Asia',
    'Beijing': 'East Asia',
    'Shanghai': 'East Asia',
    'Hong Kong': 'East Asia',
    'Osaka': 'East Asia',
    'Taipei': 'East Asia',
    
    // Southeast Asia
    'Singapore': 'Southeast Asia',
    'Bangkok': 'Southeast Asia',
    'Jakarta': 'Southeast Asia',
    'Manila': 'Southeast Asia',
    'Kuala Lumpur': 'Southeast Asia',
    
    // South Asia
    'Mumbai': 'South Asia',
    'Delhi': 'South Asia',
    
    // Oceania
    'Sydney': 'Oceania',
    'Melbourne': 'Oceania',
    'Auckland': 'Oceania',
    
    // Middle East
    'Dubai': 'Middle East',
    'Cairo': 'Middle East',
    'Riyadh': 'Middle East',
    'Tel Aviv': 'Middle East',
    
    // Africa
    'Lagos': 'Africa',
    'Johannesburg': 'Africa',
    'Cape Town': 'Africa',
    'Nairobi': 'Africa',
    'Casablanca': 'Africa',
    'Accra': 'Africa',
    'Addis Ababa': 'Africa',
    'Algiers': 'Africa',
  };
  
  return cityToRegionMap[cityName] || 'Other';
};