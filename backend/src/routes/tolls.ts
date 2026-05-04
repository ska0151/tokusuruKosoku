import { Request, Response } from 'express';
import { TOLL_SEGMENTS } from '../data/tolls';
import { calculateToll as calcToll } from '../services/tollService';

export async function estimateToll(req: Request, res: Response) {
  try {
    const { fromIcId, toIcId, vehicleType, hasETC } = req.query;

    if (!fromIcId || !toIcId) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    // 料金セグメント取得
    const segment = TOLL_SEGMENTS.find(
      s => s.fromIcId === fromIcId && s.toIcId === toIcId
    );

    if (!segment) {
      return res.status(404).json({ message: 'Toll segment not found' });
    }

    const baseToll = segment.baseToll;
    const applicableDiscounts = [];

    // 割引ルール計算
    if (hasETC === 'true') {
      applicableDiscounts.push({
        rule: 'ETC昼間30%割引',
        condition: '平日 6:00-22:00',
        discount: Math.floor(baseToll * 0.3),
        finalToll: Math.floor(baseToll * 0.7),
      });

      applicableDiscounts.push({
        rule: 'ETC夜間50%割引',
        condition: '平日 22:00-6:00 + 土日',
        discount: Math.floor(baseToll * 0.5),
        finalToll: Math.floor(baseToll * 0.5),
      });
    }

    res.json({
      icFrom: fromIcId,
      icTo: toIcId,
      distance: segment.distance,
      baseToll,
      applicableDiscounts,
      appliedDiscount: hasETC === 'true' ? 'ETC昼間30%割引' : '割引なし',
      finalToll: hasETC === 'true' ? Math.floor(baseToll * 0.7) : baseToll,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
  } catch (error) {
    console.error('estimateToll error:', error);
    res.status(500).json({ message: 'Failed to estimate toll', error: String(error) });
  }
}
