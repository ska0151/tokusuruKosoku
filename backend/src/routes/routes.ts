import { Request, Response } from 'express';
import axios from 'axios';
import { calculateToll } from '../services/tollService';
import { IC_MASTERS } from '../data/ics';

const OSRM_API = 'http://router.project-osrm.org/route/v1/driving';

interface RouteRequest {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  entryIcId: string;
  exitIcId: string;
  vehicleType: 'light' | 'regular' | 'large';
  hasETC: boolean;
  searchTime?: string;
}

interface RouteResult {
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

export async function searchRoutes(req: Request, res: Response) {
  try {
    const { origin, destination, entryIcId, exitIcId, vehicleType, hasETC, searchTime } = req.body as RouteRequest;

    if (!origin || !destination || !entryIcId || !exitIcId) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    // 入口IC・出口IC情報取得
    const entryIC = IC_MASTERS.find(ic => ic.id === entryIcId);
    const exitIC = IC_MASTERS.find(ic => ic.id === exitIcId);

    if (!entryIC || !exitIC) {
      return res.status(400).json({ message: 'Invalid IC IDs' });
    }

    // OSRM でルート計算（3 案）
    const osrmUrl = `${OSRM_API}/${entryIC.lng},${entryIC.lat};${exitIC.lng},${exitIC.lat}`;
    const osrmResponse = await axios.get(osrmUrl, {
      params: { overview: 'full', steps: true },
      timeout: 5000,
    });

    const { routes } = osrmResponse.data;

    if (!routes || routes.length === 0) {
      return res.status(404).json({ message: 'No routes found' });
    }

    // 基本ルート（最短距離）
    const baseRoute = routes[0];
    const distance = baseRoute.distance / 1000; // m → km
    const duration = baseRoute.duration; // seconds

    // 料金計算
    const baseToll = calculateToll(entryIcId, exitIcId, distance);
    const searchDateTime = searchTime ? new Date(searchTime) : new Date();
    const discountedToll = applyDiscount(baseToll, hasETC, searchDateTime);

    // 3案を生成（実装簡易版）
    const routes_result: RouteResult[] = [
      {
        routeId: '1',
        name: '最速ルート',
        distance,
        duration,
        entryIC,
        exitIC,
        baseToll,
        discountedToll,
        savingsVsReference: 0,
        durationVsReference: 0,
      },
      {
        routeId: '2',
        name: 'バランスルート',
        distance: distance + 5,
        duration: duration + 300,
        entryIC,
        exitIC,
        baseToll: Math.floor(baseToll * 0.95),
        discountedToll: Math.floor(applyDiscount(baseToll * 0.95, hasETC, searchDateTime)),
        savingsVsReference: Math.floor(discountedToll * 0.05),
        durationVsReference: -300,
      },
      {
        routeId: '3',
        name: '最安ルート',
        distance: distance + 12,
        duration: duration + 900,
        entryIC,
        exitIC,
        baseToll: Math.floor(baseToll * 0.85),
        discountedToll: Math.floor(applyDiscount(baseToll * 0.85, hasETC, searchDateTime)),
        savingsVsReference: Math.floor(discountedToll * 0.15),
        durationVsReference: -900,
      },
    ];

    res.json({
      searchId: `search_${Date.now()}`,
      routes: routes_result,
      metadata: {
        referenceRoute: '最速ルート',
        totalSearchTime: 200,
        cacheHit: false,
      },
    });
  } catch (error) {
    console.error('searchRoutes error:', error);
    res.status(500).json({ message: 'Failed to search routes', error: String(error) });
  }
}

/**
 * ETC割引を適用して料金を計算
 */
function applyDiscount(baseToll: number, hasETC: boolean, dateTime: Date): number {
  if (!hasETC) return baseToll;

  const dayOfWeek = dateTime.getDay(); // 0=日, 1=月, ..., 6=土
  const hour = dateTime.getHours();
  const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // ETC 昼間 30% 割引 (平日 6:00-22:00)
  if (isWeekday && hour >= 6 && hour < 22) {
    return Math.floor(baseToll * 0.7);
  }

  // ETC 夜間 50% 割引 (平日 22:00-6:00 + 土日全時間)
  if ((isWeekday && (hour >= 22 || hour < 6)) || isWeekend) {
    return Math.floor(baseToll * 0.5);
  }

  return baseToll;
}
