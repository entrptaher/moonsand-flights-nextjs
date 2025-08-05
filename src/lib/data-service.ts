import { getUserLocation, getAirlinesByDestination, getFlightSchedule, getNearestPlaces } from './api';
import { useAppStore } from './store';

// Data service for loading app data
export class DataService {
  private static instance: DataService;
  
  private constructor() {}
  
  static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }
  
  // Load user location
  async loadUserLocation() {
    const { setUserLocation, setLoadingUserLocation } = useAppStore.getState();
    
    setLoadingUserLocation(true);
    try {
      const location = await getUserLocation();
      setUserLocation(location);
      return location;
    } catch (error) {
      console.warn('Could not fetch user location:', error);
      // Set fallback location
      const fallbackLocation = {
        iata: 'DAC',
        name: 'Dhaka',
        country_name: 'Bangladesh',
        coordinates: '90.405876:23.848648'
      };
      setUserLocation(fallbackLocation);
      return fallbackLocation;
    } finally {
      setLoadingUserLocation(false);
    }
  }
  
  // Load airlines for destination
  async loadAirlines(destinationIATA: string) {
    const { setAirlines, setLoadingAirlines } = useAppStore.getState();
    
    setLoadingAirlines(true);
    try {
      const airlinesData = await getAirlinesByDestination(destinationIATA);
      setAirlines(airlinesData.airlines);
      return airlinesData.airlines;
    } catch (error) {
      console.warn('Could not fetch airlines:', error);
      setAirlines([]);
      return [];
    } finally {
      setLoadingAirlines(false);
    }
  }
  
  // Load flight schedule
  async loadFlightSchedule(originIATA: string, destinationIATA: string) {
    const { setFlightSchedule, setLoadingFlightSchedule } = useAppStore.getState();
    
    setLoadingFlightSchedule(true);
    try {
      const schedule = await getFlightSchedule(originIATA, destinationIATA);
      setFlightSchedule(schedule);
      return schedule;
    } catch (error) {
      console.warn('Could not fetch flight schedule:', error);
      setFlightSchedule(null);
      return null;
    } finally {
      setLoadingFlightSchedule(false);
    }
  }
  
  // Load nearest places (popular nearby flights)
  async loadNearestPlaces(originIATA: string, destinationIATA: string) {
    const { setNearestPlaces, setLoadingNearestPlaces } = useAppStore.getState();
    
    setLoadingNearestPlaces(true);
    try {
      const places = await getNearestPlaces(originIATA, destinationIATA);
      setNearestPlaces(places);
      return places;
    } catch (error) {
      console.warn('Could not fetch nearest places:', error);
      setNearestPlaces(null);
      return null;
    } finally {
      setLoadingNearestPlaces(false);
    }
  }
  
  // Load all flight data for a destination
  async loadAllFlightData(destinationIATA: string) {
    // First load user location if not already loaded
    const { userLocation } = useAppStore.getState();
    const location = userLocation || await this.loadUserLocation();
    
    const originIATA = location?.iata || 'DAC';
    
    // Load all flight-related data in parallel
    const [airlines, flightSchedule, nearestPlaces] = await Promise.allSettled([
      this.loadAirlines(destinationIATA),
      this.loadFlightSchedule(originIATA, destinationIATA),
      this.loadNearestPlaces(originIATA, destinationIATA),
    ]);
    
    return {
      airlines: airlines.status === 'fulfilled' ? airlines.value : [],
      flightSchedule: flightSchedule.status === 'fulfilled' ? flightSchedule.value : null,
      nearestPlaces: nearestPlaces.status === 'fulfilled' ? nearestPlaces.value : null,
    };
  }
  
  // Initialize app data for a city
  async initializeAppData(destinationIATA: string) {
    const { resetFlightData } = useAppStore.getState();
    
    // Reset previous flight data
    resetFlightData();
    
    // Load user location first
    await this.loadUserLocation();
    
    // Then load all flight data
    return this.loadAllFlightData(destinationIATA);
  }
}

// Export singleton instance
export const dataService = DataService.getInstance();