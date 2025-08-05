import { ApiCityData } from '@/lib/cities';

interface CityInformationSectionProps {
  cityData: ApiCityData;
  userLocation?: {
    name: string;
    iata: string;
    country_name: string;
  } | null;
  flightData?: {
    prices: Array<{
      price: number;
      link: string;
      currency?: string;
    }>;
  } | null;
}

export default function CityInformationSection({ cityData, userLocation, flightData }: CityInformationSectionProps) {
  // Get cheapest flight price and link
  const cheapestFlight = flightData?.prices?.[0];
  const flightPrice = cheapestFlight ? `$${cheapestFlight.price.toFixed(2)}` : '$367.00';
  const flightLink = cheapestFlight ? `https://flights.moonsand.co${cheapestFlight.link}` : `https://flights.moonsand.co/flights/?destination=${cityData.name.toLowerCase()}`;
  const informationCards = [
    {
      icon: '🗓️',
      title: `Best time to visit ${cityData.name}?`,
      mainText: cityData.bestTimeToVisit,
      subText: `Based on frequent traveller feedback we suggest ${cityData.bestTimeToVisit} as the best time to visit ${cityData.name}.`,
    },
    {
      icon: '📊',
      title: `Hottest month(s) in ${cityData.name}:`,
      mainText: cityData.hottestMonth,
      subText: `On average, the warmest month in ${cityData.name} is ${cityData.hottestMonth}.`,
    },
    {
      icon: '☁️',
      title: `Coldest month(s) in ${cityData.name}:`,
      mainText: cityData.coldestMonth,
      subText: `Historical weather data suggests the coldest month in ${cityData.name} is ${cityData.coldestMonth}.`,
    },
    {
      icon: '✈️',
      title: `${userLocation?.name || 'Your Location'} (${userLocation?.iata || '---'}) • ${cityData.name} (${cityData.iata})`,
      mainText: flightPrice,
      subText: `Based on flight data from ${userLocation?.iata || 'your location'} to ${cityData.iata} within the last 72 hours.`,
      linkText: 'View flights',
      linkUrl: flightLink,
      hasAmericanAirlines: true,
    },
    {
      icon: '✈️',
      title: `Major airports near ${cityData.name}:`,
      mainText: '',
      airports: cityData.name === 'London' ? [
        { name: 'London City Airport (LCY)', distance: '12.4km' },
        { name: 'London Heathrow International Airport (LHR)', distance: '23.18km' },
        { name: 'London Gatwick Airport (LGW)', distance: '39.5km' },
        { name: 'London Luton (LTN)', distance: '45km' },
        { name: 'London Stansted (STN)', distance: '50.53km' },
      ] : [
        { name: cityData.cityMajorAirport || `${cityData.name} Airport (${cityData.iata})`, distance: '0km' },
      ],
    },
    {
      icon: '🇦',
      title: 'Official Language(s):',
      mainText: cityData.officialLanguage,
      subText: `Looking to translate to the native language? Try Google Translate.`,
    },
    {
      icon: '💳',
      title: 'Local Currency:',
      mainText: cityData.currency,
      subText: `The ${cityData.currency.split(' ')[0]} is the currency used in ${cityData.name}.`,
    },
    {
      icon: '⏰',
      title: 'Timezone:',
      mainText: cityData.timezone,
      subText: `The standard time zone in ${cityData.name} is ${cityData.timezone}.`,
    },
  ];

  return (
    <section className="py-16 bg-slate-900">
      {/* Container matching other sections */}
      <div className="max-w-[1140px] mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-yellow-400 text-black px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-bold uppercase tracking-wide">
              {cityData.iata}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Useful information about {cityData.name}
          </h2>
          <p className="text-gray-300 text-lg">
            Find useful insights for {cityData.name} to help plan your next trip.
          </p>
        </div>

        {/* Information Grid - Dynamic 5-column layout, no empty columns */}
        <div className="space-y-2">
          {/* Row 1: First 4 cards - last card (flight price) takes 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
            {informationCards.slice(0, 4).map((card, index) => {
              // Row 1: 1+1+1+2 = 5 columns (no empty columns)
              const colSpan = index === 3 ? 'lg:col-span-2' : 'lg:col-span-1';
              return (
                <div
                  key={index}
                  className={`bg-white rounded-lg p-6 shadow-lg flex flex-col h-full md:col-span-1 ${colSpan}`}
                >
              {/* Top content */}
              <div className="flex-1">
                {/* Icon */}
                <div className="text-4xl mb-4">{card.icon}</div>
                
                {/* Title */}
                <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">
                  {card.title}
                </h3>
                
                {/* Main content */}
                {card.mainText && (
                  <p className="text-gray-900 text-lg font-medium mb-2">
                    {card.mainText}
                  </p>
                )}
                
                {/* Special content for flight price card */}
                {card.hasAmericanAirlines && (
                  <div className="mb-2">
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="mr-1">{userLocation?.iata || '---'}</span>
                      <span className="mx-1">→</span>
                      <span>{cityData.iata}</span>
                    </div>
                  </div>
                )}
                
                {/* Airport list for airports card */}
                {card.airports && (
                  <div className="space-y-0.5 mb-3 text-xs">
                    {card.airports.slice(0, 3).map((airport, airportIndex) => (
                      <div key={airportIndex} className="flex items-center text-gray-600">
                        <span className="mr-1">✓</span>
                        <span className="flex-1 truncate">{airport.name}</span>
                        <span className="text-gray-400 ml-1">~{airport.distance}</span>
                      </div>
                    ))}
                    {card.airports.length > 3 && (
                      <div className="text-gray-400 text-xs">
                        +{card.airports.length - 3} more
                      </div>
                    )}
                  </div>
                )}
                
                {/* Link text */}
                {card.linkText && (
                  <div className="mb-3">
                    <a 
                      href={card.linkUrl || '#'} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm hover:underline"
                    >
                      {card.linkText}
                    </a>
                  </div>
                )}
              </div>
              
                {/* Sub text / explanation - always at bottom with no bottom margin */}
                {card.subText && (
                  <p className="text-gray-600 text-xs leading-relaxed">
                    ⓘ {card.subText}
                  </p>
                )}
                </div>
              );
            })}
          </div>

          {/* Row 2: Last 4 cards - first card (airports) takes 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
            {informationCards.slice(4, 8).map((card, index) => {
              // Row 2: 2+1+1+1 = 5 columns (no empty columns)
              const colSpan = index === 0 ? 'lg:col-span-2' : 'lg:col-span-1';
              return (
                <div
                  key={index + 4}
                  className={`bg-white rounded-lg p-6 shadow-lg flex flex-col h-full md:col-span-1 ${colSpan}`}
                >
                {/* Top content */}
                <div className="flex-1">
                  {/* Icon */}
                  <div className="text-4xl mb-4">{card.icon}</div>
                  
                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">
                    {card.title}
                  </h3>
                  
                  {/* Main content */}
                  {card.mainText && (
                    <p className="text-gray-900 text-lg font-medium mb-2">
                      {card.mainText}
                    </p>
                  )}
                  
                  {/* Special content for flight price card */}
                  {card.hasAmericanAirlines && (
                    <div className="mb-2">
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="mr-1">{userLocation?.iata || '---'}</span>
                        <span className="mx-1">→</span>
                        <span>{cityData.iata}</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Airport list for airports card */}
                  {card.airports && (
                    <div className="space-y-0.5 mb-3 text-xs">
                      {card.airports.slice(0, 3).map((airport, airportIndex) => (
                        <div key={airportIndex} className="flex items-center text-gray-600">
                          <span className="mr-1">✓</span>
                          <span className="flex-1 truncate">{airport.name}</span>
                          <span className="text-gray-400 ml-1">~{airport.distance}</span>
                        </div>
                      ))}
                      {card.airports.length > 3 && (
                        <div className="text-gray-400 text-xs">
                          +{card.airports.length - 3} more
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Link text */}
                  {card.linkText && (
                    <div className="mb-3">
                      <a 
                        href={card.linkUrl || '#'} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm hover:underline"
                      >
                        {card.linkText}
                      </a>
                    </div>
                  )}
                </div>
                
                {/* Sub text / explanation - always at bottom with no bottom margin */}
                {card.subText && (
                  <p className="text-gray-600 text-xs leading-relaxed">
                    ⓘ {card.subText}
                  </p>
                )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}