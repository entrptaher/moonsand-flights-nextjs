'use client';

import { useCurrentCity, useUserLocation } from '@/lib/store';
import TravelPayoutsWidget from './TravelPayoutsWidget';
import Link from 'next/link';

export default function HeroSearchSection() {
  const currentCity = useCurrentCity();
  const userLocation = useUserLocation();
  
  const destinationIATA = currentCity?.iata || 'BER';
  const destinationName = currentCity?.name || 'Berlin';
  const userIATA = userLocation?.iata;

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200 flex items-center overflow-hidden">
      {/* Animated Sky background with SVG clouds */}
      <div className="absolute inset-0">
        {/* Cloud layer 1 - Large slow SVG clouds */}
        <div className="absolute inset-0 opacity-80">
          <svg className="absolute animate-float-slow blur-xl" style={{left: '-10%', top: '5%', width: '450px', height: '130px'}} viewBox="0 0 350 100" fill="none">
            <path d="M40 75C40 75 15 75 15 50C15 25 40 25 40 25C40 25 45 15 65 15C85 15 90 25 90 25C90 25 115 25 115 50C115 75 90 75 90 75C90 75 120 75 120 55C120 35 140 35 140 55C140 75 120 75 120 75H40Z" fill="white" opacity="0.4"/>
          </svg>
          
          <svg className="absolute animate-float-slower blur-2xl" style={{right: '-12%', top: '20%', width: '380px', height: '110px'}} viewBox="0 0 280 80" fill="none">
            <path d="M30 60C30 60 10 60 10 40C10 20 30 20 30 20C30 20 35 12 50 12C65 12 70 20 70 20C70 20 90 20 90 40C90 60 70 60 70 60C70 60 95 60 95 45C95 30 110 30 110 45C110 60 95 60 95 60H30Z" fill="white" opacity="0.35"/>
          </svg>
          
          <svg className="absolute animate-float-slow blur-xl" style={{left: '15%', top: '60%', width: '420px', height: '120px'}} viewBox="0 0 320 90" fill="none">
            <path d="M35 70C35 70 12 70 12 45C12 20 35 20 35 20C35 20 42 10 60 10C78 10 85 20 85 20C85 20 108 20 108 45C108 70 85 70 85 70C85 70 115 70 115 52C115 34 135 34 135 52C135 70 115 70 115 70H35Z" fill="white" opacity="0.3"/>
          </svg>
          
          <svg className="absolute animate-float-slower blur-3xl" style={{left: '65%', top: '80%', width: '360px', height: '100px'}} viewBox="0 0 260 70" fill="none">
            <path d="M25 55C25 55 8 55 8 35C8 15 25 15 25 15C25 15 30 8 45 8C60 8 65 15 65 15C65 15 82 15 82 35C82 55 65 55 65 55C65 55 88 55 88 42C88 29 103 29 103 42C103 55 88 55 88 55H25Z" fill="white" opacity="0.28"/>
          </svg>
          
          <svg className="absolute animate-float-slow blur-2xl" style={{right: '25%', top: '12%', width: '400px', height: '115px'}} viewBox="0 0 300 85" fill="none">
            <path d="M32 65C32 65 12 65 12 42C12 19 32 19 32 19C32 19 38 10 55 10C72 10 78 19 78 19C78 19 98 19 98 42C98 65 78 65 78 65C78 65 105 65 105 50C105 35 122 35 122 50C122 65 105 65 105 65H32Z" fill="white" opacity="0.32"/>
          </svg>
          
          <svg className="absolute animate-float-slower blur-3xl" style={{left: '40%', top: '95%', width: '320px', height: '90px'}} viewBox="0 0 220 60" fill="none">
            <path d="M20 48C20 48 5 48 5 30C5 12 20 12 20 12C20 12 24 6 35 6C46 6 50 12 50 12C50 12 65 12 65 30C65 48 50 48 50 48C50 48 70 48 70 38C70 28 82 28 82 38C82 48 70 48 70 48H20Z" fill="white" opacity="0.26"/>
          </svg>
        </div>
        
        {/* Cloud layer 2 - Medium speed SVG clouds */}
        <div className="absolute inset-0 opacity-85">
          <svg className="absolute animate-float-medium blur-2xl" style={{left: '-8%', top: '25%', width: '240px', height: '70px'}} viewBox="0 0 180 50" fill="none">
            <path d="M18 38C18 38 6 38 6 25C6 12 18 12 18 12C18 12 22 8 30 8C38 8 42 12 42 12C42 12 54 12 54 25C54 38 42 38 42 38C42 38 58 38 58 32C58 26 68 26 68 32C68 38 58 38 58 38H18Z" fill="white" opacity="0.45"/>
          </svg>
          
          <svg className="absolute animate-float-medium-reverse blur-xl" style={{right: '-5%', top: '45%', width: '280px', height: '85px'}} viewBox="0 0 200 60" fill="none">
            <path d="M22 45C22 45 8 45 8 30C8 15 22 15 22 15C22 15 26 9 36 9C46 9 50 15 50 15C50 15 64 15 64 30C64 45 50 45 50 45C50 45 68 45 68 38C68 31 80 31 80 38C80 45 68 45 68 45H22Z" fill="white" opacity="0.4"/>
          </svg>
          
          <svg className="absolute animate-float-medium blur-3xl" style={{left: '55%', top: '8%', width: '220px', height: '65px'}} viewBox="0 0 150 42" fill="none">
            <path d="M15 32C15 32 4 32 4 20C4 8 15 8 15 8C15 8 18 4 25 4C32 4 35 8 35 8C35 8 46 8 46 20C46 32 35 32 35 32C35 32 48 32 48 27C48 22 56 22 56 27C56 32 48 32 48 32H15Z" fill="white" opacity="0.38"/>
          </svg>
          
          <svg className="absolute animate-float-medium-reverse blur-2xl" style={{right: '35%', top: '70%', width: '200px', height: '55px'}} viewBox="0 0 140 38" fill="none">
            <path d="M14 28C14 28 3 28 3 18C3 8 14 8 14 8C14 8 17 5 23 5C29 5 32 8 32 8C32 8 43 8 43 18C43 28 32 28 32 28C32 28 44 28 44 24C44 20 50 20 50 24C50 28 44 28 44 28H14Z" fill="white" opacity="0.42"/>
          </svg>
          
          <svg className="absolute animate-float-medium blur-xl" style={{left: '10%', top: '88%', width: '250px', height: '70px'}} viewBox="0 0 170 48" fill="none">
            <path d="M17 36C17 36 6 36 6 24C6 12 17 12 17 12C17 12 20 7 28 7C36 7 39 12 39 12C39 12 50 12 50 24C50 36 39 36 39 36C39 36 52 36 52 31C52 26 61 26 61 31C61 36 52 36 52 36H17Z" fill="white" opacity="0.43"/>
          </svg>
          
          <svg className="absolute animate-float-medium-reverse blur-3xl" style={{right: '50%', top: '35%', width: '270px', height: '80px'}} viewBox="0 0 190 55" fill="none">
            <path d="M20 42C20 42 7 42 7 27C7 12 20 12 20 12C20 12 24 6 33 6C42 6 46 12 46 12C46 12 59 12 59 27C59 42 46 42 46 42C46 42 62 42 62 36C62 30 72 30 72 36C72 42 62 42 62 42H20Z" fill="white" opacity="0.39"/>
          </svg>
        </div>
        
        {/* Cloud layer 3 - Fast small SVG clouds */}
        <div className="absolute inset-0 opacity-90">
          <svg className="absolute animate-float-fast blur-xl" style={{left: '-3%', top: '15%', width: '170px', height: '50px'}} viewBox="0 0 120 35" fill="none">
            <path d="M12 26C12 26 2 26 2 17C2 8 12 8 12 8C12 8 15 5 20 5C25 5 28 8 28 8C28 8 38 8 38 17C38 26 28 26 28 26C28 26 40 26 40 22C40 18 46 18 46 22C46 26 40 26 40 26H12Z" fill="white" opacity="0.5"/>
          </svg>
          
          <svg className="absolute animate-float-fast-reverse blur-2xl" style={{right: '8%', top: '55%', width: '150px', height: '42px'}} viewBox="0 0 100 28" fill="none">
            <path d="M10 21C10 21 1 21 1 14C1 7 10 7 10 7C10 7 12 4 17 4C22 4 24 7 24 7C24 7 33 7 33 14C33 21 24 21 24 21C24 21 34 21 34 18C34 15 39 15 39 18C39 21 34 21 34 21H10Z" fill="white" opacity="0.48"/>
          </svg>
          
          <svg className="absolute animate-float-fast blur-xl" style={{left: '42%', top: '75%', width: '140px', height: '38px'}} viewBox="0 0 90 25" fill="none">
            <path d="M9 19C9 19 1 19 1 12C1 5 9 5 9 5C9 5 11 3 15 3C19 3 21 5 21 5C21 5 29 5 29 12C29 19 21 19 21 19C21 19 30 19 30 16C30 13 35 13 35 16C35 19 30 19 30 19H9Z" fill="white" opacity="0.46"/>
          </svg>
          
          <svg className="absolute animate-float-fast-reverse blur-3xl" style={{right: '22%', top: '92%', width: '130px', height: '35px'}} viewBox="0 0 80 22" fill="none">
            <path d="M8 17C8 17 1 17 1 11C1 5 8 5 8 5C8 5 10 3 13 3C16 3 18 5 18 5C18 5 25 5 25 11C25 17 18 17 18 17C18 17 26 17 26 14C26 11 30 11 30 14C30 17 26 17 26 17H8Z" fill="white" opacity="0.49"/>
          </svg>
          
          <svg className="absolute animate-float-fast blur-2xl" style={{left: '20%', top: '40%', width: '160px', height: '45px'}} viewBox="0 0 110 32" fill="none">
            <path d="M11 24C11 24 2 24 2 16C2 8 11 8 11 8C11 8 13 5 18 5C23 5 25 8 25 8C25 8 34 8 34 16C34 24 25 24 25 24C25 24 36 24 36 21C36 18 42 18 42 21C42 24 36 24 36 24H11Z" fill="white" opacity="0.47"/>
          </svg>
          
          <svg className="absolute animate-float-fast-reverse blur-xl" style={{right: '45%', top: '85%', width: '145px', height: '40px'}} viewBox="0 0 95 26" fill="none">
            <path d="M9 20C9 20 1 20 1 13C1 6 9 6 9 6C9 6 11 4 15 4C19 4 21 6 21 6C21 6 29 6 29 13C29 20 21 20 21 20C21 20 30 20 30 17C30 14 35 14 35 17C35 20 30 20 30 20H9Z" fill="white" opacity="0.44"/>
          </svg>
        </div>
      </div>

      
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Main heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Find cheap flights to {destinationName} ({destinationIATA})
          </h1>
        </div>

        {/* Search widget container */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Hidden data attribute for destination */}
            <div data-destination-iata={destinationIATA} className="hidden" />
            
            {/* TravelPayouts Widget */}
            <TravelPayoutsWidget 
              destinationIATA={destinationIATA}
              userIATA={userIATA}
            />
          </div>

          {/* Compare and save section - directly below widget */}
          <div className="mt-6 bg-white p-6 rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
              {/* Left Column - Text Content */}
              <div className="space-y-3">
                <div className="text-lg font-bold text-gray-900">
                  Compare and save on flight prices with moonsand.co – Save up to 60%
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Moonsand compares thousands of vetted and trusted airlines and online travel aggregators, scraping flight prices and displaying them in one place. Save up to 60% on your next flight.
                </p>
              </div>

              {/* Right Column - Button */}
              <div className="flex-shrink-0">
                <Link 
                  href="/flights" 
                  className="inline-block px-6 py-3 border border-gray-300 text-gray-700 font-medium text-sm rounded hover:bg-gray-50 transition-colors"
                >
                  Browse Flights
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}