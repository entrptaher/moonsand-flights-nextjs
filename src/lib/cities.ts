// City to IATA code mapping for dynamic routes

export interface CityData {
  name: string;
  iata: string;
  country: string;
  slug: string;
}

export const CITIES: Record<string, CityData> = {
  // European Cities
  'berlin': {
    name: 'Berlin',
    iata: 'BER',
    country: 'Germany',
    slug: 'berlin'
  },
  'london': {
    name: 'London',
    iata: 'LHR',
    country: 'United Kingdom',
    slug: 'london'
  },
  'paris': {
    name: 'Paris',
    iata: 'CDG',
    country: 'France',
    slug: 'paris'
  },
  'amsterdam': {
    name: 'Amsterdam',
    iata: 'AMS',
    country: 'Netherlands',
    slug: 'amsterdam'
  },
  'rome': {
    name: 'Rome',
    iata: 'FCO',
    country: 'Italy',
    slug: 'rome'
  },
  'madrid': {
    name: 'Madrid',
    iata: 'MAD',
    country: 'Spain',
    slug: 'madrid'
  },
  'barcelona': {
    name: 'Barcelona',
    iata: 'BCN',
    country: 'Spain',
    slug: 'barcelona'
  },
  'vienna': {
    name: 'Vienna',
    iata: 'VIE',
    country: 'Austria',
    slug: 'vienna'
  },
  'zurich': {
    name: 'Zurich',
    iata: 'ZUR',
    country: 'Switzerland',
    slug: 'zurich'
  },
  'stockholm': {
    name: 'Stockholm',
    iata: 'ARN',
    country: 'Sweden',
    slug: 'stockholm'
  },
  
  // North American Cities
  'new-york': {
    name: 'New York',
    iata: 'JFK',
    country: 'United States',
    slug: 'new-york'
  },
  'los-angeles': {
    name: 'Los Angeles',
    iata: 'LAX',
    country: 'United States',
    slug: 'los-angeles'
  },
  'toronto': {
    name: 'Toronto',
    iata: 'YYZ',
    country: 'Canada',
    slug: 'toronto'
  },
  'vancouver': {
    name: 'Vancouver',
    iata: 'YVR',
    country: 'Canada',
    slug: 'vancouver'
  },
  
  // Asian Cities
  'tokyo': {
    name: 'Tokyo',
    iata: 'NRT',
    country: 'Japan',
    slug: 'tokyo'
  },
  'singapore': {
    name: 'Singapore',
    iata: 'SIN',
    country: 'Singapore',
    slug: 'singapore'
  },
  'hong-kong': {
    name: 'Hong Kong',
    iata: 'HKG',
    country: 'Hong Kong',
    slug: 'hong-kong'
  },
  'dubai': {
    name: 'Dubai',
    iata: 'DXB',
    country: 'United Arab Emirates',
    slug: 'dubai'
  },
  'bangkok': {
    name: 'Bangkok',
    iata: 'BKK',
    country: 'Thailand',
    slug: 'bangkok'
  },
  
  // South American Cities
  'buenos-aires': {
    name: 'Buenos Aires',
    iata: 'EZE',
    country: 'Argentina',
    slug: 'buenos-aires'
  },
  'sao-paulo': {
    name: 'São Paulo',
    iata: 'GRU',
    country: 'Brazil',
    slug: 'sao-paulo'
  },
  
  // African Cities
  'cape-town': {
    name: 'Cape Town',
    iata: 'CPT',
    country: 'South Africa',
    slug: 'cape-town'
  },
  
  // Oceania Cities
  'sydney': {
    name: 'Sydney',
    iata: 'SYD',
    country: 'Australia',
    slug: 'sydney'
  },
  'melbourne': {
    name: 'Melbourne',
    iata: 'MEL',
    country: 'Australia',
    slug: 'melbourne'
  }
};

// Get city data by slug
export function getCityBySlug(slug: string): CityData | null {
  return CITIES[slug.toLowerCase()] || null;
}

// Get all city slugs for static generation
export function getAllCitySlugs(): string[] {
  return Object.keys(CITIES);
}

// Check if city slug is valid
export function isValidCitySlug(slug: string): boolean {
  return slug.toLowerCase() in CITIES;
}