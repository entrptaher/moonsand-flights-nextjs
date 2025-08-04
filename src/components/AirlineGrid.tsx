'use client';

import { getAirlineLogo } from '@/lib/api';

interface AirlineGridProps {
  airlines: string[];
  destinationName: string;
}

export default function AirlineGrid({ airlines, destinationName }: AirlineGridProps) {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        Airlines that fly to {destinationName}. Browse all flights to {destinationName} with one simple Moonsand search.
      </h3>
      
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {airlines.slice(0, 15).map((airlineCode) => (
          <div key={airlineCode} className="w-10 h-10 bg-gray-100 rounded p-1 hover:bg-gray-200 transition-colors">
            <img
              src={getAirlineLogo(airlineCode, 64)}
              alt={`${airlineCode} airline`}
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        ))}
        {airlines.length > 15 && (
          <div className="text-gray-600 text-sm font-medium">
            +{airlines.length - 15} more
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">
        *Moonsand always attempts to display accurate pricing, however prices can fluctuate. Flights are based on on travelling passenger(s).
      </p>
    </div>
  );
}