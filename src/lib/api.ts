// API utility functions for flight booking data

export interface UserLocation {
  iata: string;
  name: string;
  country_name: string;
  coordinates: string;
}

export interface AirlinesByDestination {
  destination: string;
  airlines: string[];
}

export interface FlightScheduleResponse {
  result: {
    subtitle: {
      origin: {
        country: string;
        city: string;
        airport: string;
      };
      destination: {
        country: string;
        city: string;
        airport: string;
      };
    };
    flights: Array<{
      origin_iata: string;
      destination_iata: string;
      depart_time: string;
      arrival_time: string;
      choose_dates_url: string;
      details: Array<{
        airline_logo: string;
        airline_code: string;
        airline_name: string;
        flight_number: number;
      }>;
      stops: any[];
      arrival_day_indicator: number;
      op_days: boolean[];
    }>;
    title: {
      flights_every_day: boolean;
      flights_number: number;
      min_flight_duration: {
        days: number;
        hours: number;
        min: number;
      };
    };
  };
}

export interface GroupedPricesResponse {
  data: Record<string, {
    flight_number: string;
    link: string;
    origin_airport: string;
    destination_airport: string;
    departure_at: string;
    airline: string;
    destination: string;
    origin: string;
    price: number;
    return_transfers: number;
    duration: number;
    duration_to: number;
    duration_back: number;
    transfers: number;
  }>;
  currency: string;
  success: boolean;
}

// Get user's current location IATA
export async function getUserLocation(): Promise<UserLocation> {
  const response = await fetch('https://www.travelpayouts.com/whereami', {
    headers: {
      'accept': '*/*',
      'cache-control': 'no-cache',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch user location');
  }
  
  return response.json();
}

// Get airlines serving a specific destination
export async function getAirlinesByDestination(iata: string): Promise<AirlinesByDestination> {
  const response = await fetch(`https://tpproxy.blue-heart-794e.workers.dev/airlines-by-destination?iata=${iata}`, {
    headers: {
      'accept': '*/*',
      'cache-control': 'no-cache',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch airlines by destination');
  }
  
  return response.json();
}

// Get airline logo URL
export function getAirlineLogo(airlineCode: string, size: number = 64): string {
  return `https://images.kiwi.com/airlines/${size}/${airlineCode}.png`;
}

// Get flight schedule
export async function getFlightSchedule(
  origin: string,
  destination: string
): Promise<FlightScheduleResponse> {
  const params = new URLSearchParams({
    origin,
    destination,
    locale: 'en',
    host: 'flights.moonsand.co/flights',
    marker: '281122.281122._tpwsched',
    non_direct_flights: 'false',
    with_fallback: 'true',
    campaign_id: '100'
  });
  
  const response = await fetch(`https://suggest.apistp.com/widgets/v1/flight-schedule?${params}`, {
    headers: {
      'accept': '*/*',
      'cache-control': 'no-cache',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch flight schedule');
  }
  
  return response.json();
}

// Get grouped prices by date
export async function getGroupedPrices(
  origin: string,
  destination: string,
  currency: string = 'USD'
): Promise<GroupedPricesResponse> {
  const response = await fetch(
    `https://tpproxy.blue-heart-794e.workers.dev/grouped-prices?origin=${origin}&destination=${destination}&currency=${currency}`,
    {
      headers: {
        'accept': '*/*',
        'cache-control': 'no-cache',
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch grouped prices');
  }
  
  return response.json();
}

// Search cities for autocomplete
export async function searchCities(term: string): Promise<Array<{
  slug: string;
  subtitle: string;
  title: string;
}>> {
  const response = await fetch(
    `https://suggest.apistp.com/search?service=aviasales&term=${encodeURIComponent(term)}&locale=en`,
    {
      headers: {
        'accept': '*/*',
        'cache-control': 'no-cache',
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to search cities');
  }
  
  return response.json();
}