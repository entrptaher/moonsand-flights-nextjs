import { notFound } from 'next/navigation';
import { getAllCitySlugs, getEnhancedCityData } from '@/lib/cities';
import { getUserLocation, getAirlinesByDestination, getFlightSchedule, getNearestPlaces } from '@/lib/api';
import HeroSearchSection from '@/components/HeroSearchSection';
import DirectFlightsSection from '@/components/DirectFlightsSection';
import PopularFlightsHeroSection from '@/components/PopularFlightsHeroSection';
import PopularNearbyFlightsSection from '@/components/PopularNearbyFlightsSection';
import CityInformationSection from '@/components/CityInformationSection';
import DiscoverCitySection from '@/components/DiscoverCitySection';
import StoreInitializer from '@/components/StoreInitializer';

interface FlightPageProps {
  params: Promise<{
    city: string;
  }>;
}

export async function generateStaticParams() {
  const citySlugs = getAllCitySlugs();
  return citySlugs.map((city) => ({
    city,
  }));
}

export async function generateMetadata({ params }: FlightPageProps) {
  const { city } = await params;
  const cityData = await getEnhancedCityData(city);
  
  if (!cityData) {
    return {
      title: 'City Not Found',
    };
  }

  return {
    title: `Cheap Flights to ${cityData.name} (${cityData.iata}) - Moonsand`,
    description: `Find and compare cheap flights to ${cityData.name}${cityData.country ? `, ${cityData.country}` : ''}. Book your flight tickets at the best prices.`,
  };
}

export default async function FlightPage({ params }: FlightPageProps) {
  const { city } = await params;
  const cityData = await getEnhancedCityData(city);
  
  if (!cityData) {
    notFound();
  }

  // Default user location (Dhaka) - fallback if API fails
  const defaultLocation = {
    iata: 'DAC',
    name: 'Dhaka',
    country_name: 'Bangladesh',
    coordinates: '23.8103,90.4125'
  };

  // Fetch all flight data server-side
  let userLocation = defaultLocation;
  let airlines: string[] = [];
  let flightSchedule = null;
  let nearestPlaces = null;

  try {
    // Try to get user location, fall back to default
    try {
      userLocation = await getUserLocation();
    } catch (error) {
      console.warn('Using default location:', error);
      userLocation = defaultLocation;
    }

    const originIATA = userLocation.iata;
    const destinationIATA = cityData.iata;

    // Fetch all flight data in parallel
    const [airlinesResult, flightScheduleResult, nearestPlacesResult] = await Promise.allSettled([
      getAirlinesByDestination(destinationIATA),
      getFlightSchedule(originIATA, destinationIATA),
      getNearestPlaces(originIATA, destinationIATA),
    ]);

    // Extract results
    if (airlinesResult.status === 'fulfilled') {
      airlines = airlinesResult.value.airlines;
    }
    if (flightScheduleResult.status === 'fulfilled') {
      flightSchedule = flightScheduleResult.value;
    }
    if (nearestPlacesResult.status === 'fulfilled') {
      nearestPlaces = nearestPlacesResult.value;
    }
  } catch (error) {
    console.warn('Error fetching flight data:', error);
  }

  return (
    <main>
      {/* Initialize Zustand store with city data and pre-fetched flight data */}
      <StoreInitializer 
        cityData={cityData}
        userLocation={userLocation}
        airlines={airlines}
        flightSchedule={flightSchedule}
        nearestPlaces={nearestPlaces}
      />
      
      {/* Hero Search Section - includes widget + compare/save section */}
      <HeroSearchSection />
      
      {/* Direct Flights Promotion Section */}
      <DirectFlightsSection />
      
      {/* Popular Flights Hero Image Section */}
      <PopularFlightsHeroSection />
      
      {/* Popular Nearby Flights Section */}
      <PopularNearbyFlightsSection />
      
      {/* City Information Section - conditionally renders based on available data */}
      <CityInformationSection />
      
      {/* Discover City Section - conditionally renders based on available data */}
      <DiscoverCitySection />
    </main>
  );
}