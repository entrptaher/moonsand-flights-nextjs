'use client';

import Image from 'next/image';
import { useCurrentCity, useUserLocation, useFlightData } from '@/lib/store';
import { getAirlineLogo } from '@/lib/api';

export default function PopularNearbyFlightsSection() {
  const currentCity = useCurrentCity();
  const userLocation = useUserLocation();
  const { nearestPlaces } = useFlightData();
  
  const destinationIATA = currentCity?.iata || 'BER';
  const destinationName = currentCity?.name || 'Berlin';
  const flights = nearestPlaces?.prices || [];

  // Format price with currency symbol
  const formatPrice = (price: number, currency: string = 'USD') => {
    const symbols: Record<string, string> = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'BDT': '৳'
    };
    return `${symbols[currency] || '$'}${price}`;
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1140px] mx-auto px-5">

        {/* Popular Nearby Flights Widget */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Popular Nearby Flights
            </h3>
            <a 
              href={flights.length > 0 ? `https://flights.moonsand.co${flights[0].link}` : `https://flights.moonsand.co/flights/?destination=${destinationName.toLowerCase()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline"
            >
              View all available flights to {destinationName} ↗
            </a>
          </div>
          
          {flights.length > 0 ? (
            <div className="space-y-4">
              {flights.slice(0, 6).map((flight, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    {/* Airline logo */}
                    <div className="w-8 h-8 flex-shrink-0">
                      <Image
                        src={getAirlineLogo(flight.main_airline, 32)}
                        alt={flight.main_airline_name}
                        width={32}
                        height={32}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    {/* Route information */}
                    <div>
                      <div className="font-medium text-gray-900">
                        {flight.origin_name} to {destinationName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {flight.main_airline_name} • {flight.transfers === 0 ? 'Direct' : `${flight.transfers} stops`}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    {/* Flight details */}
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        {formatDate(flight.depart_date)}
                      </div>
                      <div className="text-xs text-gray-400">
                        via {flight.gate}
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {formatPrice(flight.price)}
                      </div>
                    </div>
                    
                    {/* Book button */}
                    <a
                      href={`https://flights.moonsand.co${flight.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                    >
                      Book
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <p className="text-gray-500 mb-4">No popular nearby flights available</p>
              <div className="text-xs text-gray-400 text-left">
                <p>Debug info:</p>
                <p>• User location: {userLocation?.name || 'Not available'} ({userLocation?.iata || 'No IATA'})</p>
                <p>• Origin: {userLocation?.iata || 'DAC'} → Destination: {destinationIATA}</p>
                <p>• API Response: {nearestPlaces ? 'Success' : 'Failed'}</p>
              </div>
            </div>
          )}
          
          {/* Green checkmarks for verified deals */}
          {flights.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Real-time prices
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Verified deals
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No hidden fees
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}