import { getAirlinesByDestination } from '@/lib/api';
import AirlineLogos from './AirlineLogos';

interface DirectFlightsSectionProps {
  destinationIATA: string;
  destinationName: string;
}

export default async function DirectFlightsSection({
  destinationIATA,
  destinationName
}: DirectFlightsSectionProps) {
  // Get airlines serving this destination
  let airlines: string[] = [];
  try {
    const airlinesData = await getAirlinesByDestination(destinationIATA);
    airlines = airlinesData.airlines.slice(0, 8); // Show first 8 airlines
  } catch (error) {
    console.warn('Could not fetch airlines:', error);
  }

  return (
    <div className="w-full bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Two-column layout matching original */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-4">
            <div className="text-xl font-bold text-gray-900">
              Compare and save on flight prices with moonsand.co – Save up to 60%
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              Moonsand compares thousands of vetted and trusted airlines and online travel aggregators, scraping flight prices and displaying them in one place. Save up to 60% on your next flight.
            </p>
            
            {/* Show airlines serving this destination */}
            {airlines.length > 0 && (
              <div className="mt-4">
                <AirlineLogos airlines={airlines} destinationName={destinationName} />
              </div>
            )}
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
  );
}