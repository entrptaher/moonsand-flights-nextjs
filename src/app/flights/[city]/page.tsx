import { notFound } from 'next/navigation';
import { getCityBySlug, getAllCitySlugs } from '@/lib/cities';
import HeroSearchSection from '@/components/HeroSearchSection';
import DirectFlightsSection from '@/components/DirectFlightsSection';
import PopularFlightsHeroSection from '@/components/PopularFlightsHeroSection';
import PopularNearbyFlightsSection from '@/components/PopularNearbyFlightsSection';

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
  const cityData = getCityBySlug(city);
  
  if (!cityData) {
    return {
      title: 'City Not Found',
    };
  }

  return {
    title: `Cheap Flights to ${cityData.name} (${cityData.iata}) - Moonsand`,
    description: `Find and compare cheap flights to ${cityData.name}, ${cityData.country}. Book your flight tickets at the best prices.`,
  };
}

export default async function FlightPage({ params }: FlightPageProps) {
  const { city } = await params;
  const cityData = getCityBySlug(city);
  
  if (!cityData) {
    notFound();
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
      
      {/* Additional sections will be added here */}
    </main>
  );
}