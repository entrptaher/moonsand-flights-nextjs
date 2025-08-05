'use client';

import Image from 'next/image';
import { getAirlineLogo } from '@/lib/api';

interface AirlineLogosProps {
  airlines: string[];
  destinationName: string;
}

export default function AirlineLogos({ airlines, destinationName }: AirlineLogosProps) {
  if (airlines.length === 0) return null;

  return (
    <div className="text-center">
      <p className="text-sm text-gray-500 mb-3">Airlines serving {destinationName}:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {airlines.slice(0, 6).map((airlineCode) => (
          <Image
            key={airlineCode}
            src={getAirlineLogo(airlineCode, 32)}
            alt={`${airlineCode} airline`}
            width={32}
            height={32}
            className="w-8 h-8 rounded opacity-70 hover:opacity-100 transition-opacity"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ))}
      </div>
    </div>
  );
}