interface PopularFlightsHeroSectionProps {
  destinationName: string;
  destinationIATA: string;
}

export default function PopularFlightsHeroSection({
  destinationName,
  destinationIATA
}: PopularFlightsHeroSectionProps) {
  // Generate dynamic Picsum URL for the city
  const getCityImageUrl = (cityName: string) => {
    // Use Picsum with a seed based on city name for consistent images
    const seed = cityName.toLowerCase().replace(/\s+/g, '-');
    return `https://picsum.photos/seed/${seed}/1200/400`;
  };

  return (
    <section className="py-16">
      {/* Hero image with text overlay */}
      <div className="relative h-64 overflow-hidden rounded-lg mx-4 md:mx-8 bg-gray-400">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-gray-400"
          style={{
            backgroundImage: `url('${getCityImageUrl(destinationName)}')`
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
      </div>

      {/* Content section below image */}
      <div className="max-w-[1140px] mx-auto px-5 mt-12">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Save money when you compare flights with Moonsand
        </h3>
        <p className="text-base text-gray-700 leading-relaxed max-w-4xl">
          Browse popular flight routes to {destinationName} departing from local airports. Displayed prices are the cheapest from the last 7 days and are subject to availability.
        </p>
      </div>
    </section>
  );
}