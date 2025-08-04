export interface IPLocationResponse {
  iata?: string;
  name?: string;
  country_name?: string;
  coordinates?: string;
  ip?: string;
  city?: string;
  country?: string;
  region?: string;
}

// Get visitor's real IP address from headers
export async function getVisitorIP(): Promise<string | null> {
  try {
    // Dynamically import headers to avoid build issues
    const { headers } = await import('next/headers');
    const headersList = await headers();
    
    // Check various headers for the real IP
    const possibleHeaders = [
      'x-forwarded-for',
      'x-real-ip',
      'cf-connecting-ip', // Cloudflare
      'x-vercel-forwarded-for', // Vercel
      'x-forwarded',
      'forwarded-for',
      'forwarded'
    ];

    for (const header of possibleHeaders) {
      const ip = headersList.get(header);
      if (ip) {
        // x-forwarded-for can contain multiple IPs, take the first one
        const firstIP = ip.split(',')[0].trim();
        if (firstIP && !isPrivateIP(firstIP)) {
          return firstIP;
        }
      }
    }
  } catch (error) {
    console.warn('Could not access headers:', error);
  }

  return null;
}

// Check if IP is private/local
function isPrivateIP(ip: string): boolean {
  const privateRanges = [
    /^10\./,
    /^172\.(1[6-9]|2\d|3[01])\./,
    /^192\.168\./,
    /^127\./,
    /^169\.254\./,
    /^::1$/,
    /^fc00:/,
    /^fe80:/
  ];

  return privateRanges.some(range => range.test(ip));
}

// Get location from IP using ipapi.co (free tier: 1000 requests/day)
export async function getLocationFromIP(ip: string): Promise<IPLocationResponse | null> {
  try {
    console.log('Getting location for IP:', ip);
    
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: {
        'User-Agent': 'Moonsand-Flight-App/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log('IP location data:', data);

    if (data.error) {
      throw new Error(data.error);
    }

    // Try to map city to IATA code
    const iata = await getCityIATA(data.city, data.country);

    return {
      iata,
      name: data.city,
      country_name: data.country_name,
      coordinates: `${data.longitude}:${data.latitude}`,
      ip,
      city: data.city,
      country: data.country,
      region: data.region
    };
  } catch (error) {
    console.warn('Error getting location from IP:', error);
    return null;
  }
}

// Simple city to IATA mapping for major cities
async function getCityIATA(city: string, country: string): Promise<string | undefined> {
  const cityLower = city?.toLowerCase() || '';
  const countryLower = country?.toLowerCase() || '';

  // Major city mappings
  const cityMappings: Record<string, string> = {
    // US Cities
    'new york': 'JFK',
    'los angeles': 'LAX',
    'chicago': 'ORD',
    'miami': 'MIA',
    'san francisco': 'SFO',
    'boston': 'BOS',
    'washington': 'DCA',
    'seattle': 'SEA',
    'denver': 'DEN',
    'atlanta': 'ATL',
    
    // UK Cities
    'london': 'LHR',
    'manchester': 'MAN',
    'birmingham': 'BHX',
    'glasgow': 'GLA',
    'edinburgh': 'EDI',
    
    // European Cities
    'paris': 'CDG',
    'berlin': 'BER',
    'amsterdam': 'AMS',
    'madrid': 'MAD',
    'rome': 'FCO',
    'barcelona': 'BCN',
    'vienna': 'VIE',
    'zurich': 'ZUR',
    'stockholm': 'ARN',
    
    // Asian Cities
    'tokyo': 'NRT',
    'beijing': 'PEK',
    'shanghai': 'PVG',
    'hong kong': 'HKG',
    'singapore': 'SIN',
    'bangkok': 'BKK',
    'dubai': 'DXB',
    'mumbai': 'BOM',
    'delhi': 'DEL',
    'dhaka': 'DAC',
    
    // Canadian Cities
    'toronto': 'YYZ',
    'vancouver': 'YVR',
    'montreal': 'YUL',
    'calgary': 'YYC',
    
    // Australian Cities
    'sydney': 'SYD',
    'melbourne': 'MEL',
    'brisbane': 'BNE',
    'perth': 'PER',
    
    // Other major cities
    'mexico city': 'MEX',
    'sao paulo': 'GRU',
    'buenos aires': 'EZE',
    'cape town': 'CPT',
    'johannesburg': 'JNB'
  };

  // Try direct city mapping first
  if (cityMappings[cityLower]) {
    return cityMappings[cityLower];
  }

  // Try country-specific mappings
  if (countryLower === 'us' || countryLower === 'united states') {
    // Default to JFK for US if no specific city match
    return 'JFK';
  } else if (countryLower === 'gb' || countryLower === 'united kingdom') {
    return 'LHR';
  } else if (countryLower === 'de' || countryLower === 'germany') {
    return 'BER';
  } else if (countryLower === 'fr' || countryLower === 'france') {
    return 'CDG';
  } else if (countryLower === 'ca' || countryLower === 'canada') {
    return 'YYZ';
  } else if (countryLower === 'au' || countryLower === 'australia') {
    return 'SYD';
  } else if (countryLower === 'jp' || countryLower === 'japan') {
    return 'NRT';
  } else if (countryLower === 'cn' || countryLower === 'china') {
    return 'PEK';
  } else if (countryLower === 'in' || countryLower === 'india') {
    return 'DEL';
  } else if (countryLower === 'bd' || countryLower === 'bangladesh') {
    return 'DAC';
  }

  return undefined;
}

// Main function to get visitor location with fallback
export async function getVisitorLocation(): Promise<IPLocationResponse> {
  // First try to get real visitor IP
  const visitorIP = await getVisitorIP();
  
  if (visitorIP) {
    const ipLocation = await getLocationFromIP(visitorIP);
    if (ipLocation && ipLocation.iata) {
      return ipLocation;
    }
  }

  // Fallback to the original travelpayouts API (which gets server location)
  try {
    const response = await fetch('https://www.travelpayouts.com/whereami', {
      headers: {
        'accept': '*/*',
        'cache-control': 'no-cache',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Fallback location:', data);
      return data;
    }
  } catch (error) {
    console.warn('Fallback location failed:', error);
  }

  // Final fallback to DAC
  return {
    iata: 'DAC',
    name: 'Dhaka',
    country_name: 'Bangladesh',
    coordinates: '90.405876:23.848648'
  };
}