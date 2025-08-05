'use client';

import { useEffect } from 'react';
import { useAppStore, UserLocation, FlightScheduleData, NearestPlacesData } from '@/lib/store';
import { CityData, ApiCityData } from '@/lib/cities';

interface StoreInitializerProps {
  cityData: CityData & Partial<ApiCityData>;
  userLocation: UserLocation;
  airlines: string[];
  flightSchedule: FlightScheduleData | null;
  nearestPlaces: NearestPlacesData | null;
}

// Client component to initialize Zustand store with server data
export default function StoreInitializer({ 
  cityData, 
  userLocation, 
  airlines, 
  flightSchedule, 
  nearestPlaces 
}: StoreInitializerProps) {
  const { 
    setCurrentCity, 
    setUserLocation, 
    setAirlines, 
    setFlightSchedule, 
    setNearestPlaces 
  } = useAppStore();
  
  useEffect(() => {
    // Initialize all store data with server-fetched data
    setCurrentCity(cityData);
    setUserLocation(userLocation);
    setAirlines(airlines);
    setFlightSchedule(flightSchedule);
    setNearestPlaces(nearestPlaces);
  }, [
    cityData, 
    userLocation, 
    airlines, 
    flightSchedule, 
    nearestPlaces,
    setCurrentCity, 
    setUserLocation, 
    setAirlines, 
    setFlightSchedule, 
    setNearestPlaces
  ]);
  
  return null; // This component doesn't render anything
}