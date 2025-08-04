'use client';

import { useEffect, useRef, useState } from 'react';

interface TravelPayoutsWidgetProps {
  destinationIATA: string;
  userIATA?: string;  
  userCurrency?: string;
}

export default function TravelPayoutsWidget({ 
  destinationIATA, 
  userIATA, 
  userCurrency = 'USD' 
}: TravelPayoutsWidgetProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finalUserIATA = userIATA || localStorage.getItem('userIATA');
    const finalUserCurrency = userCurrency || localStorage.getItem('userCurrency') || 'USD';

    if (!finalUserIATA || !destinationIATA) {
      setError('Unable to determine departure location');
      setIsLoading(false);
      return;
    }

    // Set global variables like the original code
    (window as any).userIATA = finalUserIATA;
    (window as any).userCurrency = finalUserCurrency;

    const injectWidget = () => {
      const widgetUrl = new URL('https://tp.media/content');
      const params = {
        currency: finalUserCurrency.toLowerCase(),
        trs: '161282',
        shmarker: '281122.281122',
        show_hotels: 'true',
        powered_by: 'false',
        locale: 'en',
        searchUrl: 'flights.moonsand.co/flights',
        primary_override: '#007BFf',
        color_button: '#080422',
        color_icons: '#0804223d',
        dark: '#080422',
        light: '#FFFFFF',
        secondary: '#FFFFFF',
        special: '#C4C4C400',
        color_focused: '#000000ff',
        border_radius: '0',
        plain: 'true',
        origin: finalUserIATA,
        destination: destinationIATA,
        promo_id: '7879',
        campaign_id: '100'
      };

      Object.entries(params).forEach(([key, value]) => {
        widgetUrl.searchParams.set(key, value);
      });

      console.log('📦 Injecting TP Widget:', widgetUrl.toString());

      const script = document.createElement('script');
      script.src = widgetUrl.toString();
      script.async = true;
      script.defer = true;

      script.onload = () => {
        console.log('✅ TP Widget loaded successfully');
        setIsLoading(false);
      };

      script.onerror = () => {
        console.error('❌ Failed to load TravelPayouts widget');
        setError('Failed to load flight search');
        setIsLoading(false);
      };

      // Append to the widget container
      if (widgetRef.current) {
        widgetRef.current.appendChild(script);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(injectWidget, 100);

    return () => {
      clearTimeout(timer);
      // Clean up global variables
      delete (window as any).userIATA;
      delete (window as any).userCurrency;
      
      const existingScript = document.querySelector(`script[src*="tp.media/content"]`);
      existingScript?.remove();
    };
  }, [destinationIATA, userIATA, userCurrency]);

  if (error) {
    return (
      <div className="min-h-[160px] flex items-center justify-center bg-gray-50 rounded-md">
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div ref={widgetRef} id="top-widget" className="min-h-[160px] w-full relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 bg-[length:200%_100%] animate-pulse rounded-md flex items-center justify-center">
          <span className="text-gray-500 text-sm">Loading flight search...</span>
        </div>
      )}
      
      <noscript>
        <div className="p-6 text-center text-gray-600">
          <p>Use the form below to search for flights. You can enter your departure airport, dates of travel, number of passengers and ticket class to filter the search to suit you.</p>
        </div>
      </noscript>
    </div>
  );
}