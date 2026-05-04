import { Request, Response } from 'express';
import { IC_MASTERS } from '../data/ics';

export async function nearby(req: Request, res: Response) {
  try {
    const { lat, lng, radiusKm } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: 'Missing latitude or longitude' });
    }

    const centerLat = parseFloat(lat as string);
    const centerLng = parseFloat(lng as string);
    const radius = parseFloat((radiusKm as string) || '15');

    // 簡易的な距離計算（Haversine）
    const nearbyICs = IC_MASTERS
      .map(ic => ({
        ...ic,
        distance: calculateDistance(centerLat, centerLng, ic.lat, ic.lng),
      }))
      .filter(ic => ic.distance <= radius)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 10)
      .map(({ distance, ...ic }) => ({
        ...ic,
        distanceFromOrigin: parseFloat(distance.toFixed(1)),
        accessTime: Math.round(distance * 60), // 時速 60km 仮定
      }));

    res.json({ ics: nearbyICs });
  } catch (error) {
    console.error('nearby error:', error);
    res.status(500).json({ message: 'Failed to get nearby ICs', error: String(error) });
  }
}

/**
 * Haversine 公式で2点間の距離を計算（km）
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // 地球の半径（km）
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
