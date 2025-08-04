import { getAirlinesByDestination, getFlightSchedule, getUserLocation } from '@/lib/api';
import AirlineGrid from './AirlineGrid';

interface DirectFlightsSectionProps {
  destinationIATA: string;
  destinationName: string;
}

export default async function DirectFlightsSection({
  destinationIATA,
  destinationName
}: DirectFlightsSectionProps) {
  // Get airlines serving this destination and user location
  let airlines: string[] = [];
  let flightSchedule = null;
  let userLocation = null;
  
  try {
    // Get user location first
    userLocation = await getUserLocation();
    console.log('User location:', userLocation);
  } catch (error) {
    console.warn('Could not fetch user location:', error);
  }
  
  try {
    const airlinesData = await getAirlinesByDestination(destinationIATA);
    airlines = airlinesData.airlines;
    console.log('Airlines for', destinationIATA, ':', airlines);
    
    // Get flight schedule using user's location or fallback to DAC
    const originIATA = userLocation?.iata || 'DAC';
    try {
      flightSchedule = await getFlightSchedule(originIATA, destinationIATA);
      console.log('Flight schedule:', flightSchedule);
    } catch (error) {
      console.warn('Could not fetch flight schedule:', error);
    }
  } catch (error) {
    console.warn('Could not fetch airlines:', error);
  }

  const flights = flightSchedule?.result?.flights || [];

  return (
    <section className="py-24 bg-white">
      {/* Container matching original w-layout-blockcontainer thecontainer w-container */}
      <div className="max-w-[1140px] mx-auto px-5">
        
        {/* Airport tag - matching div-block-6233 and flytotag */}
        <div className="mb-8">
          <div className="inline-flex items-center bg-yellow-400 text-black px-4 py-2 rounded-full">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
            </svg>
            <span className="text-sm font-bold uppercase tracking-wide">
              {destinationName.toUpperCase()} {destinationIATA} AIRPORT
            </span>
          </div>
        </div>

        {/* Main heading - matching heading h2 no-margin */}
        <div className="mb-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-0">
            Browse direct flights to {destinationName} ({destinationIATA})
          </h2>
        </div>

        {/* Description paragraph - matching paragraph dark no-margin */}
        <div className="mb-8">
          <p className="text-base text-gray-900 mb-0 leading-relaxed">
            Browse the cheapest flights to {destinationName} over the next 7 days—flight prices are dynamic and update regularly.
            <br />
            Flight prices and tickets are subject to availability.
          </p>
        </div>

        {/* Flight deals widget container - matching code-embed-16 w-embed w-script */}
        <div className="mb-12">
          <div 
            id="flight-deals-widget" 
            className="min-h-[300px] w-full block opacity-100 visible"
          >
            {/* Flight schedule content */}
            {flights.length > 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {flightSchedule?.result?.title?.flights_number || flights.length} flights in a week
                    {flightSchedule?.result?.title?.min_flight_duration && (
                      <span className="text-base font-normal text-gray-600 ml-2">
                        , {flightSchedule.result.title.min_flight_duration.hours}h {flightSchedule.result.title.min_flight_duration.min}m
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {flightSchedule?.result?.subtitle?.origin?.city || userLocation?.name || 'Dhaka'}, {flightSchedule?.result?.subtitle?.origin?.country || userLocation?.country_name || 'Bangladesh'} 
                    ({flightSchedule?.result?.subtitle?.origin?.airport || 'Hazrat Shahjalal International Airport'}) → {' '}
                    <span className="font-medium">
                      {destinationName}, {flightSchedule?.result?.subtitle?.destination?.country || 'United Kingdom'} 
                      ({flightSchedule?.result?.subtitle?.destination?.airport || `${destinationName} Airport`})
                    </span>
                  </p>
                </div>

                {/* Flight listings */}
                <div className="space-y-4">
                  {flights.slice(0, 2).map((flight, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center space-x-6">
                        <div>
                          <div className="font-bold text-base">
                            {flight.depart_time} → {flight.arrival_time}
                          </div>
                          <div className="text-sm text-gray-500">Direct</div>
                        </div>
                        
                        {flight.details[0] && (
                          <div className="flex items-center space-x-3">
                            <img 
                              src={flight.details[0].airline_logo} 
                              alt={flight.details[0].airline_name}
                              className="w-6 h-6"
                            />
                            <span className="text-sm text-gray-700">
                              {flight.details[0].airline_name} {flight.details[0].flight_number}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-xs text-gray-400 uppercase tracking-wide">
                            {flight.origin_iata} — {flight.destination_iata}
                          </div>
                        </div>
                        
                        {/* Operating days */}
                        <div className="flex space-x-1">
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, dayIndex) => (
                            <span 
                              key={dayIndex}
                              className={`w-5 h-5 text-xs flex items-center justify-center ${
                                flight.op_days[dayIndex] 
                                  ? 'bg-gray-900 text-white' 
                                  : 'text-gray-300'
                              }`}
                            >
                              {flight.op_days[dayIndex] ? day : '—'}
                            </span>
                          ))}
                        </div>

                        <a 
                          href={flight.choose_dates_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                        >
                          Select dates
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show more indicator */}
                {flights.length > 2 && (
                  <div className="text-center mt-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <p className="text-gray-500 mb-4">No flight schedule available</p>
                <div className="text-xs text-gray-400 text-left">
                  <p>Debug info:</p>
                  <p>• User location: {userLocation?.name || 'Not available'} ({userLocation?.iata || 'No IATA'})</p>
                  <p>• Origin: {userLocation?.iata || 'DAC'} → Destination: {destinationIATA}</p>
                  <p>• Airlines found: {airlines.length}</p>
                  <p>• Airlines: {airlines.slice(0, 5).join(', ')}{airlines.length > 5 ? '...' : ''}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Airlines section */}
        <AirlineGrid airlines={airlines} destinationName={destinationName} />
      </div>
    </section>
  );
}