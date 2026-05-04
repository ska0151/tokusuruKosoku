import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface SearchRoutesRequest {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  entryIcId: string;
  exitIcId: string;
  vehicleType: 'light' | 'regular' | 'large';
  hasETC: boolean;
  searchTime?: string;
}

export interface RouteResult {
  routeId: string;
  name: string;
  distance: number;
  duration: number;
  entryIC: any;
  exitIC: any;
  baseToll: number;
  discountedToll: number;
  savingsVsReference: number;
  durationVsReference: number;
}

export async function searchRoutes(req: SearchRoutesRequest) {
  const response = await apiClient.post('/api/routes/search', req);
  return response.data;
}

export async function estimateToll(fromIcId: string, toIcId: string, hasETC: boolean) {
  const response = await apiClient.get('/api/tolls/estimate', {
    params: { fromIcId, toIcId, hasETC },
  });
  return response.data;
}

export async function nearbyICs(lat: number, lng: number, radiusKm: number = 15) {
  const response = await apiClient.get('/api/ics/nearby', {
    params: { lat, lng, radiusKm },
  });
  return response.data;
}

export default apiClient;
