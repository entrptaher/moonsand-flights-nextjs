'use client';

import { useEffect, useState } from 'react';
import { useCurrentCity } from '@/lib/store';
import { getDestinationImage, PexelsImageResponse } from '@/lib/api';

export default function PopularFlightsHeroSection() {
  const currentCity = useCurrentCity();
  const [imageData, setImageData] = useState<PexelsImageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const destinationName = currentCity?.name || 'Berlin';
  
  useEffect(() => {
    if (destinationName) {
      setIsLoading(true);
      getDestinationImage(destinationName, 'large')
        .then(setImageData)
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [destinationName]);
  
  if (!imageData || isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-[1140px] mx-auto px-5">
          <div className="relative h-80 overflow-hidden rounded-lg bg-gray-400 mb-12 animate-pulse">
            <div className="relative z-10 h-full flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg">
                Popular flights to {destinationName}
              </h2>
            </div>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Save money when you compare flights with Moonsand
            </h3>
            <p className="text-base text-gray-700 leading-relaxed max-w-4xl">
              Browse popular flight routes to {destinationName} departing from local airports. Displayed prices are the cheapest from the last 7 days and are subject to availability.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      {/* Container matching other sections */}
      <div className="max-w-[1140px] mx-auto px-5">
        {/* Hero image with text overlay */}
        <div className="relative h-80 overflow-hidden rounded-lg bg-gray-400 mb-12">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-gray-400"
            style={{
              backgroundImage: `url('${imageData.url}')`
            }}
          >
            {/* Very light overlay for text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Text overlay */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg">
              Popular flights to {destinationName}
            </h2>
          </div>

          {/* Photo credit */}
          <div className="absolute bottom-2 right-2 z-10">
            <p className="text-xs text-white/70">
              Photo by {imageData.photographer_url ? (
                <a 
                  href={imageData.photographer_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white/90 underline"
                >
                  {imageData.photographer}
                </a>
              ) : (
                imageData.photographer
              )} on Pexels
            </p>
          </div>
        </div>

        {/* Content section */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Save money when you compare flights with Moonsand
          </h3>
          <p className="text-base text-gray-700 leading-relaxed max-w-4xl">
            Browse popular flight routes to {destinationName} departing from local airports. Displayed prices are the cheapest from the last 7 days and are subject to availability.
          </p>
        </div>
      </div>
    </section>
  );
}