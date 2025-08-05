import { ApiCityData } from '@/lib/cities';
import RichTextRenderer from './RichTextRenderer';

interface DiscoverCitySectionProps {
  cityData: ApiCityData;
}

export default function DiscoverCitySection({ cityData }: DiscoverCitySectionProps) {
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
          <RichTextRenderer content={cityData.discoverCityText} />
        </div>
      </div>
    </section>
  );
}