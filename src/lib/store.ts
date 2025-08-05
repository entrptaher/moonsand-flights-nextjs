import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';
import { ApiCityData, CityData } from './cities';

// User location interface
export interface UserLocation {
  iata: string;
  name: string;
  country_name: string;
  coordinates: string;
}

// Flight data interfaces
export interface FlightPrice {
  link: string;
  origin: string;
  gate: string;
  main_airline: string;
  depart_date: string;
  destination: string;
  found_at: string;
  transfers: number;
  distance: number;
  duration: number;
  price: number;
  trip_class: number;
  origin_name: string;
  destination_name: string;
  main_airline_name: string;
}

export interface NearestPlacesData {
  prices: FlightPrice[];
  origins: string[];
  destinations: string[];
}

export interface FlightScheduleData {
  result: {
    subtitle: {
      origin: {
        country: string;
        city: string;
        airport: string;
      };
      destination: {
        country: string;
        city: string;
        airport: string;
      };
    };
    flights: Array<{
      origin_iata: string;
      destination_iata: string;
      depart_time: string;
      arrival_time: string;
      choose_dates_url: string;
      details: Array<{
        airline_logo: string;
        airline_code: string;
        airline_name: string;
        flight_number: number;
      }>;
      stops: unknown[];
      arrival_day_indicator: number;
      op_days: boolean[];
    }>;
    title: {
      flights_every_day: boolean;
      flights_number: number;
      min_flight_duration: {
        days: number;
        hours: number;
        min: number;
      };
    };
  };
}

// App state interface
interface AppState {
  // Current city data
  currentCity: (CityData & Partial<ApiCityData>) | null;
  
  // User location
  userLocation: UserLocation | null;
  
  // Flight data
  airlines: string[];
  flightSchedule: FlightScheduleData | null;
  nearestPlaces: NearestPlacesData | null;
  
  // Loading states
  isLoadingUserLocation: boolean;
  isLoadingAirlines: boolean;
  isLoadingFlightSchedule: boolean;
  isLoadingNearestPlaces: boolean;
  
  // Actions
  setCurrentCity: (city: (CityData & Partial<ApiCityData>) | null) => void;
  setUserLocation: (location: UserLocation | null) => void;
  setAirlines: (airlines: string[]) => void;
  setFlightSchedule: (schedule: FlightScheduleData | null) => void;
  setNearestPlaces: (places: NearestPlacesData | null) => void;
  
  // Loading state actions
  setLoadingUserLocation: (loading: boolean) => void;
  setLoadingAirlines: (loading: boolean) => void;
  setLoadingFlightSchedule: (loading: boolean) => void;
  setLoadingNearestPlaces: (loading: boolean) => void;
  
  // Reset actions
  resetFlightData: () => void;
  resetAll: () => void;
}

// Default location (Dhaka)
const DEFAULT_LOCATION: UserLocation = {
  iata: 'DAC',
  name: 'Dhaka',
  country_name: 'Bangladesh',
  coordinates: '23.8103,90.4125'
};

// Create the store
export const useAppStore = create<AppState>((set) => ({
  // Initial state
  currentCity: null,
  userLocation: DEFAULT_LOCATION,
  airlines: [],
  flightSchedule: null,
  nearestPlaces: null,
  
  // Loading states
  isLoadingUserLocation: false,
  isLoadingAirlines: false,
  isLoadingFlightSchedule: false,
  isLoadingNearestPlaces: false,
  
  // Actions
  setCurrentCity: (city) => set({ currentCity: city }),
  setUserLocation: (location) => set({ userLocation: location }),
  setAirlines: (airlines) => set({ airlines }),
  setFlightSchedule: (schedule) => set({ flightSchedule: schedule }),
  setNearestPlaces: (places) => set({ nearestPlaces: places }),
  
  // Loading state actions
  setLoadingUserLocation: (loading) => set({ isLoadingUserLocation: loading }),
  setLoadingAirlines: (loading) => set({ isLoadingAirlines: loading }),
  setLoadingFlightSchedule: (loading) => set({ isLoadingFlightSchedule: loading }),
  setLoadingNearestPlaces: (loading) => set({ isLoadingNearestPlaces: loading }),
  
  // Reset actions
  resetFlightData: () => set({
    airlines: [],
    flightSchedule: null,
    nearestPlaces: null,
    isLoadingAirlines: false,
    isLoadingFlightSchedule: false,
    isLoadingNearestPlaces: false,
  }),
  
  resetAll: () => set({
    currentCity: null,
    userLocation: DEFAULT_LOCATION,
    airlines: [],
    flightSchedule: null,
    nearestPlaces: null,
    isLoadingUserLocation: false,
    isLoadingAirlines: false,
    isLoadingFlightSchedule: false,
    isLoadingNearestPlaces: false,
  }),
}));

// Custom hooks for specific data
export const useCurrentCity = () => useAppStore((state) => state.currentCity);
export const useUserLocation = () => useAppStore((state) => state.userLocation);
export const useFlightData = () => useAppStore(useShallow((state) => ({
  airlines: state.airlines,
  flightSchedule: state.flightSchedule,
  nearestPlaces: state.nearestPlaces,
})));
export const useLoadingStates = () => useAppStore(useShallow((state) => ({
  isLoadingUserLocation: state.isLoadingUserLocation,
  isLoadingAirlines: state.isLoadingAirlines,
  isLoadingFlightSchedule: state.isLoadingFlightSchedule,
  isLoadingNearestPlaces: state.isLoadingNearestPlaces,
})));