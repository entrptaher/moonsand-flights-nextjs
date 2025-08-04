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
    <section className="relative min-h-[500px] bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200">
      {/* Sky background with clouds effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-20 w-48 h-24 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute top-8 right-32 w-36 h-16 bg-white/15 rounded-full blur-2xl"></div>
        <div className="absolute top-16 right-20 w-24 h-12 bg-white/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
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

          {/* Alert banner */}
          <div className="mt-4 bg-orange-100 border-l-4 border-orange-500 p-4 rounded-r-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-orange-700">
                  Please check current travel restrictions and requirements before booking your flight to {destinationName}.
                </p>
              </div>
              <div className="ml-auto pl-3">
                <button className="inline-flex text-orange-400 hover:text-orange-600">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}