'use client';

import { useCurrentCity } from '@/lib/store';
import RichTextRenderer from './RichTextRenderer';

export default function DiscoverCitySection() {
  const currentCity = useCurrentCity();
  
  // Only render if we have city data with discover text
  if (!currentCity || !currentCity.discoverCityText) {
    return null;
  }
  
  const cityData = currentCity;
  return (
    <section className="py-16 bg-white">
      {/* Container matching other sections */}
      <div className="max-w-[1140px] mx-auto px-5">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Discover {cityData.name}
          </h2>
        </div>

        {/* Rich Text Content */}
        <div className="max-w-none">
          {cityData.discoverCityText && (
            <RichTextRenderer content={cityData.discoverCityText} />
          )}
        </div>
      </div>
    </section>
  );
}