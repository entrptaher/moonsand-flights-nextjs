import { notFound } from 'next/navigation';
import { getAllCitySlugs, getEnhancedCityData } from '@/lib/cities';
import { getUserLocation, getNearestPlaces } from '@/lib/api';
import HeroSearchSection from '@/components/HeroSearchSection';
import DirectFlightsSection from '@/components/DirectFlightsSection';
import PopularFlightsHeroSection from '@/components/PopularFlightsHeroSection';
import PopularNearbyFlightsSection from '@/components/PopularNearbyFlightsSection';
import CityInformationSection from '@/components/CityInformationSection';
import DiscoverCitySection from '@/components/DiscoverCitySection';

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

  // Get user location for dynamic content
  let userLocation = null;
  let nearestPlaces = null;
  try {
    userLocation = await getUserLocation();
  } catch (error) {
    console.warn('Could not fetch user location:', error);
  }

  // Get flight data for pricing information
  if (userLocation?.iata) {
    try {
      nearestPlaces = await getNearestPlaces(userLocation.iata, cityData.iata);
    } catch (error) {
      console.warn('Could not fetch nearest places for pricing:', error);
    }
  }

  return (
    <main>
      {/* Hero Search Section - includes widget + compare/save section */}
      <HeroSearchSection 
        destinationIATA={cityData.iata} 
        destinationName={cityData.name} 
      />
      
      {/* Direct Flights Promotion Section */}
      <DirectFlightsSection
        destinationIATA={cityData.iata}
        destinationName={cityData.name}
      />
      
      {/* Popular Flights Hero Image Section */}
      <PopularFlightsHeroSection
        destinationIATA={cityData.iata}
        destinationName={cityData.name}
      />
      
      {/* Popular Nearby Flights Section */}
      <PopularNearbyFlightsSection
        destinationIATA={cityData.iata}
        destinationName={cityData.name}
      />
      
      {/* City Information Section */}
      {cityData.discoverCityText && (
        <CityInformationSection 
          cityData={cityData} 
          userLocation={userLocation}
          flightData={nearestPlaces}
        />
      )}
      
      {/* Discover City Section */}
      {cityData.discoverCityText && (
        <DiscoverCitySection cityData={cityData} />
      )}
    </main>
  );
}