import { getUserLocation } from '@/lib/api';
import TravelPayoutsWidget from './TravelPayoutsWidget';

interface HeroSearchSectionProps {
  destinationIATA?: string;
  destinationName?: string;
}

export default async function HeroSearchSection({ 
  destinationIATA = 'BER',
  destinationName = 'Berlin' 
}: HeroSearchSectionProps) {
  // Get user location for widget
  let userIATA: string | undefined;
  try {
    const userLocation = await getUserLocation();
    userIATA = userLocation.iata;
  } catch (error) {
    console.warn('Could not fetch user location:', error);
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200 flex items-center">
      {/* Sky background with clouds effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-20 w-48 h-24 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute top-8 right-32 w-36 h-16 bg-white/15 rounded-full blur-2xl"></div>
        <div className="absolute top-16 right-20 w-24 h-12 bg-white/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Main heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Find cheap flights to {destinationName} ({destinationIATA})
          </h1>
        </div>

        {/* Search widget container */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Hidden data attribute for destination */}
            <div data-destination-iata={destinationIATA} className="hidden" />
            
            {/* TravelPayouts Widget */}
            <TravelPayoutsWidget 
              destinationIATA={destinationIATA}
              userIATA={userIATA}
            />
          </div>

          {/* Compare and save section - directly below widget */}
          <div className="mt-6 bg-white p-6 rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
              {/* Left Column - Text Content */}
              <div className="space-y-3">
                <div className="text-lg font-bold text-gray-900">
                  Compare and save on flight prices with moonsand.co – Save up to 60%
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Moonsand compares thousands of vetted and trusted airlines and online travel aggregators, scraping flight prices and displaying them in one place. Save up to 60% on your next flight.
                </p>
              </div>

              {/* Right Column - Button */}
              <div className="flex-shrink-0">
                <a 
                  href="/flights" 
                  className="inline-block px-6 py-3 border border-gray-300 text-gray-700 font-medium text-sm rounded hover:bg-gray-50 transition-colors"
                >
                  Browse Flights
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}